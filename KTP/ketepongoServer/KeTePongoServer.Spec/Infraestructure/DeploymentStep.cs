using Dapper;
using HtmlAgilityPack;
using KeTePongoServer.Spec.Steps.v1_0;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using TechTalk.SpecRun.Framework;

namespace KeTePongoServer.Spec.Infraestructure
{
    public class DeploymentStep : IDeploymentTransformationStep
    {
        static public string EmailPickupFolderPath = "C:\\temp\\Email";
        static public string SmsPickupDirectoryLocation = "C:\\temp\\Sms";        
        static string _connectionStringForTests = Environment.GetEnvironmentVariable("KTPConnectionStringForTests") ?? "Data Source=.\\SQLSERVER2014STD;Initial Catalog=ktptest;Integrated Security=True;";
        static bool _initialited = false;
        static object _initialitedLock = new object();
        private static SemaphoreSlim _initialitedSemaphore = new SemaphoreSlim(1, 1);
        public void Apply(IDeploymentContext deploymentContext)
        {
            if (_initialited == true)
            {
                return;
            }
            _initialitedSemaphore.Wait();
            if (!_initialited)
            {
                InitializeDb();
                _initialited = true;
            }
            _initialitedSemaphore.Release();
        }

        private static void InitializeDb()
        {
            DeleteAllTablesInDB();
            DeleteAppData();
            if (!Directory.Exists(EmailPickupFolderPath))
            {
                Directory.CreateDirectory(EmailPickupFolderPath);
            }
            if (!Directory.Exists(SmsPickupDirectoryLocation))
            {
                Directory.CreateDirectory(SmsPickupDirectoryLocation);
            }
            var factory = new APIWebApplicationFactory();
            using (var httpClient = factory.CreateClient())
            {
                var response = httpClient.GetAsync("https://localhost:5002").GetAwaiter().GetResult();
                var doc = new HtmlDocument();
                doc.LoadHtml(response.Content.ReadAsStringAsync().GetAwaiter().GetResult());
                var getCookieValue = response.Headers.Contains("Set-Cookie") ? response.Headers.GetValues("Set-Cookie") : null;
                var antiforgery = getCookieValue?.FirstOrDefault(x => x.Contains("orchantiforgery_Default"));

                IDictionary<string, string> contentData = new Dictionary<string, string>();
                contentData.Add(TestConstants.VerificationToken, CoreSteps.GetVerificationToken(doc));
                contentData.Add("DatabaseProvider", "SqlConnection");
                contentData.Add("ConnectionString", _connectionStringForTests);
                contentData.Add("DatabaseConfigurationPreset", "true");
                contentData.Add("Password", ",Adios22");
                contentData.Add("PasswordConfirmation", ",Adios22");
                contentData.Add("RecipeName", "KeTePongoServer");
                contentData.Add("Email", "jersio@hotmail.com");
                contentData.Add("SiteName", "KeTePongo");
                contentData.Add(TestConstants.UserName, TestConstants.UserAdmin);
                contentData.Add("SiteTimeZone", "Europe/Paris");

                var requestMsg = new HttpRequestMessage(HttpMethod.Post, "https://localhost:5002")
                {
                    Content = new FormUrlEncodedContent(contentData),
                };
                try
                {
                    var result = httpClient.SendAsync(requestMsg).GetAwaiter().GetResult();
                }
                catch (OperationCanceledException) { } // we silence this exception cause it happens cause orchard is restarted after setup
                httpClient.CancelPendingRequests();
            }
        }

        private static void DeleteAllTablesInDB()
        {
            using (var connection = new Microsoft.Data.SqlClient.SqlConnection(_connectionStringForTests))
            {
                try
                {
                    //Drop all referential constraints
                    connection.Execute("DECLARE @Sql NVARCHAR(500) DECLARE @Cursor CURSOR \n" +
                                        "SET @Cursor = CURSOR FAST_FORWARD FOR \n" +
                                        "SELECT DISTINCT sql = 'ALTER TABLE [' + tc2.TABLE_SCHEMA + '].[' + tc2.TABLE_NAME + '] DROP [' + rc1.CONSTRAINT_NAME + '];' \n" +
                                        "FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc1 \n" +
                                        "LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc2 ON tc2.CONSTRAINT_NAME = rc1.CONSTRAINT_NAME \n" +
                                        "OPEN @Cursor FETCH NEXT FROM @Cursor INTO @Sql \n" +
                                        "WHILE(@@FETCH_STATUS = 0) \n" +
                                        "BEGIN \n" +
                                        "Exec sp_executesql @Sql \n" +
                                        "FETCH NEXT FROM @Cursor INTO @Sql \n" +
                                        "END \n" +
                                        "CLOSE @Cursor DEALLOCATE @Cursor \n");

                    /* Drop all functions */
                    connection.Execute("DECLARE @name VARCHAR(128)\n" +
                                        "DECLARE @SQL VARCHAR(254)\n" +
                                        "SELECT @name = (SELECT TOP 1[name] FROM sysobjects WHERE[type] IN(N'FN', N'IF', N'TF', N'FS', N'FT') AND category = 0 ORDER BY[name])\n" +
                                        "SELECT @SQL = 'DROP FUNCTION [dbo].[' + RTRIM(@name) + ']'\n" +
                                        "EXEC(@SQL)\n");
                    //Drop all views
                    connection.Execute("DROP VIEW IF EXISTS GuidGenerator");

                    /* Drop all tables */
                    connection.Execute("EXEC sp_MSforeachtable 'DROP TABLE ?'");
                }
                catch (Exception e)
                {
                    Debug.Print(e.Message);
                    throw;
                }
            }
        }

        public void Restore(IDeploymentContext deploymentContext)
        {

        }


        static private void DeleteAppData()
        {
            var serverDataPath = Directory.GetCurrentDirectory() + "\\..\\KeTePongoServer\\App_Data\\";
            if (Directory.Exists(serverDataPath))
            {
                Directory.Delete(serverDataPath, true);
            }
        }
        static public void CopyFolder(string sourceFolder, string destFolder)
        {
            if (!Directory.Exists(destFolder))
                Directory.CreateDirectory(destFolder);
            string[] files = Directory.GetFiles(sourceFolder);
            foreach (string file in files)
            {
                string name = Path.GetFileName(file);
                string dest = Path.Combine(destFolder, name);
                File.Copy(file, dest, true);
            }
            string[] folders = Directory.GetDirectories(sourceFolder);
            foreach (string folder in folders)
            {
                string name = Path.GetFileName(folder);
                string dest = Path.Combine(destFolder, name);
                CopyFolder(folder, dest);
            }
        }
    }
}
