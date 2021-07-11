using KeTePongo.Core.Data;
using KeTePongo.Core.Services;
using KeTePongo.Core.YesSqlCollections;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OrchardCore.Data;
using OrchardCore.Data.Migration;
using OrchardCore.Environment.Shell;
using OrchardCore.Environment.Shell.Models;
using OrchardCore.Environment.Shell.Scope;
using OrchardCore.Modules;
using System;
using System.Data;
using System.IO;
using System.Linq;
using YesSql;
using YesSql.Collections;
using YesSql.Indexes;
using YesSql.Provider.MySql;
using YesSql.Provider.PostgreSql;
using YesSql.Provider.Sqlite;
using YesSql.Provider.SqlServer;

namespace KeTePongoServer.Extensions.DbAccess
{
    public static class OrchardCoreBuilderExtensions
    {
        public static OrchardCoreBuilder AddKTPDataAccess(this OrchardCoreBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton<YesSQLCollectionNameService>();
                services.AddScoped<IDataMigrationManager, CollectionDataMigrationManager>();

                services.AddScoped<IModularTenantEvents, AutomaticCollectionDataMigrations>();
                services.AddScoped<IModularTenantEvents, AutomaticDataMigrations>();

                // Adding supported databases
                string connectionString = Environment.GetEnvironmentVariable("KTPConnectionString") ?? "Server=.\\SQL2016;Integrated Security=SSPI;Database=ktp;User Id=username;";

                services.TryAddDataProvider(name: "Sql Server", value: "SqlConnection", hasConnectionString: true, sampleConnectionString: connectionString , hasTablePrefix: true, isDefault: true);
                
                //services.TryAddDataProvider(name: "Sqlite", value: "Sqlite", hasConnectionString: false, hasTablePrefix: false, isDefault: true);
                //services.TryAddDataProvider(name: "MySql", value: "MySql", hasConnectionString: true, sampleConnectionString: "Server=localhost;Database=Orchard;Uid=username;Pwd=password", hasTablePrefix: true, isDefault: false);
                //services.TryAddDataProvider(name: "Postgres", value: "Postgres", hasConnectionString: true, sampleConnectionString: "Server=localhost;Port=5432;Database=Orchard;User Id=username;Password=password", hasTablePrefix: true, isDefault: false);

                services.AddSingleton<IStore>(sp =>
                {
                    var shellSettings = sp.GetService<ShellSettings>();

                    // Before the setup a 'DatabaseProvider' may be configured without a required 'ConnectionString'.
                    if (shellSettings.State == TenantState.Uninitialized || shellSettings["DatabaseProvider"] == null)
                    {
                        return null;
                    }

                    IConfiguration storeConfiguration = new Configuration();
                    switch (shellSettings["DatabaseProvider"])
                    {
                        case "SqlConnection":
                            storeConfiguration
                                .UseSqlServer(shellSettings["ConnectionString"], IsolationLevel.ReadUncommitted)
                                .UseLogger(sp.GetService<ILogger<YesSql.Session>>())
                                .UseBlockIdGenerator();
                            break;
                        case "Sqlite":
                            var shellOptions = sp.GetService<IOptions<ShellOptions>>();
                            var option = shellOptions.Value;
                            var connectionString = shellSettings["ConnectionString"];
                            var databaseFolder = Path.Combine(option.ShellsApplicationDataPath, option.ShellsContainerName, shellSettings.Name);
                            var databaseFile = Path.Combine(databaseFolder, "yessql.db");
                            Directory.CreateDirectory(databaseFolder);
                            if (!string.IsNullOrWhiteSpace(connectionString))
                            {
                                storeConfiguration
                                   .UseSqLite(connectionString, IsolationLevel.ReadUncommitted)
                                   .UseDefaultIdGenerator();
                                //This code is only useful if we want to support sqllite in memory. It helps us to keep one connection in memory to persist the database between different connection
                                //if (connectionString.StartsWith("DataSource=file::memory:"))
                                //{
                                //    MainSQLiteConnection = storeConfiguration.ConnectionFactory.CreateConnection();
                                //    MainSQLiteConnection.OpenAsync().GetAwaiter().GetResult();
                                //}
                            }
                            else
                            {
                                storeConfiguration
                                    .UseSqLite($"DataSource={databaseFile};Cache=Shared", IsolationLevel.ReadUncommitted)
                                    .UseDefaultIdGenerator();
                            }
                            break;
                        case "MySql":
                            storeConfiguration
                                .UseMySql(shellSettings["ConnectionString"], IsolationLevel.ReadUncommitted)
                                .UseBlockIdGenerator();
                            break;
                        case "Postgres":
                            storeConfiguration
                                .UsePostgreSql(shellSettings["ConnectionString"], IsolationLevel.ReadUncommitted)
                                .UseBlockIdGenerator();
                            break;
                        default:
                            throw new ArgumentException("Unknown database provider: " + shellSettings["DatabaseProvider"]);
                    }

                    //Uncomment only if you want to log sqls with its data parameters
                    //storeConfiguration.ConnectionFactory = new DapperConnectionWithSQLLoggerFactory(sp.GetService<ILogger<DapperConnectionWithSQLLoggerFactory>>(), storeConfiguration.ConnectionFactory);

                    if (!string.IsNullOrWhiteSpace(shellSettings["TablePrefix"]))
                    {
                        storeConfiguration = storeConfiguration.SetTablePrefix(shellSettings["TablePrefix"] + "_");
                    }

                    var store = StoreFactory.CreateAsync(storeConfiguration).GetAwaiter().GetResult();
                    var indexProviders = sp.GetServices<IIndexProvider>();
                    var collectionService = sp.GetService<YesSQLCollectionNameService>();
                    foreach (var indexProvider in indexProviders)
                    {
                        var collectionName = collectionService.GetCollectionNameForType(indexProvider.ForType());
                        if (collectionName == null)
                        {
                            store.RegisterIndexes(indexProvider);
                        }
                        else
                        {
                            using (new NamedCollection(collectionName))
                            {
                                store.RegisterIndexes(indexProvider);
                            }
                        }
                    }
                    return store;
                });

                services.AddScoped(sp =>
                {
                    var store = sp.GetService<IStore>();

                    if (store == null)
                    {
                        return null;
                    }
                    var collectionNameService = sp.GetService<YesSQLCollectionNameService>();
                    if (collectionNameService == null)
                    {
                        return null;
                    }
                    var session = new CollectionSession(sp.GetService<IIdForTypeGenerator>(), store.CreateSession(), collectionNameService);

                    var scopedServices = sp.GetServices<IScopedIndexProvider>();

                    session.RegisterIndexes(scopedServices.ToArray());

                    ShellScope.RegisterBeforeDispose(scope =>
                    {
                        return session.CommitAsync();
                    });

                    return session as ISession;
                });
                services.AddScoped<LocalSessionFactory>();

                services.AddScoped<ISessionHelper, SessionHelper>();

                services.AddTransient<IDbConnectionAccessor, DbConnectionAccessor>();
            });
            return builder;
        }
    }
}
