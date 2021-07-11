using KeTePongoServer.Spec.Infraestructure;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.UnitTestProvider;
using System.Linq;
using HtmlAgilityPack;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using AutoMapper;
using Microsoft.Net.Http.Headers;
using KeTePongoServer.Spec.Model.v1_0;
using KeTePongoServer.Spec.Extensions;
using System.Threading;
using KeTePongoServer.Spec.Model.v0_1;
using Microsoft.AspNetCore.SignalR.Client;

namespace KeTePongoServer.Spec.Steps.v1_0
{
    [Binding]
    public class CoreSteps
    {
        private TestsSharedState _testsSharedState;
        private const string ApiVersion = "0.1.0.0";
        public CoreSteps(TestsSharedState testsSharedState, FeatureContext featureContext, ScenarioContext scenarioContext)
        {
            if (testsSharedState.HttpClient == null)
            {
                var factory = new APIWebApplicationFactory<Startup>();
                testsSharedState.HttpClient = factory.CreateClient();
                testsSharedState.Server = factory.Server;
                testsSharedState.HubConnectionDictionary = new Dictionary<string, HubConnection>();
                testsSharedState.SignalRStatusDictionary = new Dictionary<string, int>();
                testsSharedState.Mapper = new Mapper(new MapperConfiguration(cfg =>
                        cfg.AddMaps(new[] {typeof(KeTePongo.ConsumerWebAPI.ConsumerAutoMapperProfile),
                                            typeof(KeTePongo.ProviderWebAPI.ProviderAutoMapperProfile)
                                            })));
            }
            _testsSharedState = testsSharedState;
        }

        [BeforeScenario]
        public void BeforeScenario(ScenarioContext context)
        {
#if DEBUG
            if (context.ScenarioInfo.Tags.Contains("LongRunning"))
            {
                var unitTestRuntimeProvider = (IUnitTestRuntimeProvider)context.GetBindingInstance((typeof(IUnitTestRuntimeProvider)));
                unitTestRuntimeProvider.TestIgnore("ignored");
            }
#endif
            GivenEmailServiceIsWorkingProperly();
        }
        [AfterScenario]
        public void AfterScenario(ScenarioContext context)
        {
            _testsSharedState.HttpClient.CancelPendingRequests();
        }
        [BeforeTestRun]
        static public void BeforeTestRun()
        {

        }
        [AfterTestRun]
        static public void AfterTestRun()
        {
            //DeleteAppData();
        }
        static public string GetVerificationToken(HtmlDocument doc)
        {
            string token = "";
            token = doc.DocumentNode.SelectSingleNode("//form/input[1]").Attributes["value"].Value;
            return token;
        }
        [StepArgumentTransformation(@"null")]
        public string ToNull()
        {
            return null;
        }
        [StepArgumentTransformation(@"(.*)")]
        public double? ToNullableDouble(string value)
        {
            return value == null ? default(double?) : double.Parse(value);
        }
        [StepArgumentTransformation(@"(.*)")]
        public decimal? ToNullableDecimal(string value)
        {
            return value == null ? default(decimal?) : decimal.Parse(value);
        }
        [StepArgumentTransformation(@"(.*)")]
        public int? ToNullableInt(string value)
        {
            return value == null ? default(int?) : int.Parse(value);
        }
        [StepArgumentTransformation(@"(.*)")]
        public bool? ToNullableBool(string value)
        {
            return value == null ? default(bool?) : bool.Parse(value);
        }

        [Given(@"1_0 reset client cookies")]
        [When(@"1_0 reset client cookies")]
        [Then(@"1_0 reset client cookies")]
        public void ResetClient()
        {
            var factory = new APIWebApplicationFactory();
            _testsSharedState.HttpClient = factory.CreateClient();
            //_testsSharedState.HttpClient.DefaultRequestHeaders.Add(VersionAttribute.ApiVersionHeader, "0.1.0.0");
        }

        [Given(@"1_0 email service is broken")]
        public void GivenEmailServiceIsBroken()
        {
            if (Directory.Exists(DeploymentStep.EmailPickupFolderPath))
            {
                Directory.Delete(DeploymentStep.EmailPickupFolderPath, true);
            }
        }
        [Then(@"1_0 email service is working properly")]
        [When(@"1_0 email service is working properly")]
        [Given(@"1_0 email service is working properly")]
        public void GivenEmailServiceIsWorkingProperly()
        {
            if (!Directory.Exists(DeploymentStep.EmailPickupFolderPath))
            {
                Directory.CreateDirectory(DeploymentStep.EmailPickupFolderPath);
            }
        }

        [Given(@"1_0 start using access token for all requests")]
        [Then(@"1_0 start using access token for all requests")]
        [When(@"1_0 start using access token for all requests")]
        public void StartUsingAccessTokenForAllRequests()
        {
            var result = JsonConvert.DeserializeObject<TokenDTO>(_testsSharedState.TestContext.ContentResponse);
            _testsSharedState.TestContext.AccessToken = result.access_token;
            _testsSharedState.HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _testsSharedState.TestContext.AccessToken);
            _testsSharedState.TestContext.RefreshToken = result.refresh_token ?? _testsSharedState.TestContext.RefreshToken;
        }

        [Given(@"1_0 stop using access token for all requests")]
        [Then(@"1_0 stop using access token for all requests")]
        [When(@"1_0 stop using access token for all requests")]
        public void StopUsingAccessTokenForAllRequests()
        {
            _testsSharedState.HttpClient.DefaultRequestHeaders.Authorization = null;
        }

        [Given(@"1_0 get access token from refresh token to get updated claims")]
        [Then(@"1_0 get access token from refresh token to get updated claims")]
        public async Task GetAccessTokenFromRefresh()
        {
            var requestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://localhost:5002/connect/token"),
                Headers = { { HttpRequestHeader.ContentType.ToString(), "application/x-www-form-urlencoded" } },
                Content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]
                {
                    KeyValuePair.Create("grant_type","refresh_token"),
                    KeyValuePair.Create("refresh_token",_testsSharedState.TestContext.RefreshToken),
                    KeyValuePair.Create("client_id","KeTePongoProviderApp"),
                    KeyValuePair.Create("client_secret","253=asdf,YH3-937yhsiuh"),
                })
            };

            var response = await _testsSharedState.HttpClient.SendAsync(requestMessage);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            Assert.AreEqual(_testsSharedState.TestContext.ResponseStatusCode, HttpStatusCode.OK);
        }

        [Then(@"1_0 read last-(.*) email to '(.*)' with subject '(.*)'")]
        public void ReadLastEmailWithSubject(int offset, string toEmails, string subject)
        {
            string[] eml = GetEmailContent(offset, toEmails);
            Assert.IsTrue(eml[2].Contains("Subject: " + subject));
            _testsSharedState.TestContext.LastReadedEmail = GetHtmlDocumentFromEmailContent(eml);
        }
        [Then(@"1_0 check for last read email that xpath expression '(.*)' points to inner text with value '(.*)'")]
        public void CheckForLastReadEmailThatXpathExpressionPointsToInnerTextWithValue(string xpath, string value)
        {
            var node = _testsSharedState.TestContext.LastReadedEmail.DocumentNode.SelectSingleNode(xpath);
            if (node == null)
            {
                throw new InvalidOperationException($"XPath node wasn't found {xpath}");
            }
            Assert.AreEqual(value, node.InnerText);
        }
        [Then(@"1_0 check for last-(.*) read email to '(.*)' that xpath expression '(.*)' points to inner text with value '(.*)'")]
        public void CheckForLastReadEmailThatXpathExpressionPointsToInnerTextWithValue(int offset, string toemails, string xpath, string value)
        {
            var node = GetHtmlDocumentFromEmailContent(GetEmailContent(offset, toemails)).DocumentNode.SelectSingleNode(xpath);
            if (node == null)
            {
                throw new InvalidOperationException($"XPath node wasn't found {xpath}");
            }
            Assert.AreEqual(value, node.InnerText.Trim());
        }
        [When(@"1_0 response is Ok")]
        [Then(@"1_0 response is Ok")]
        [Given(@"1_0 response is Ok")]
        public void ThenResponseIsOk()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.OK, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
        }
        [When(@"1_0 response is Accepted")]
        [Then(@"1_0 response is Accepted")]
        [Given(@"1_0 response is Accepted")]
        public void ThenResponseIsAccepted()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.Accepted, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
        }
        [When(@"1_0 response is Ok with title \(title:'(.*)'\)")]
        [Then(@"1_0 response is Ok with title \(title:'(.*)'\)")]
        [Given(@"1_0 response is Ok with title \(title:'(.*)'\)")]
        public void ThenResponseIsOkWithTitle(string expectedTitle)
        {
            Assert.AreEqual(System.Net.HttpStatusCode.OK, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            var doc = new HtmlDocument();
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            var title = doc.DocumentNode.SelectSingleNode("//main/h1").InnerText;
            Assert.IsTrue(title.Contains(expectedTitle));
        }
        [When(@"1_0 response is Ok and shows LoginPage")]
        [Then(@"1_0 response is Ok and shows LoginPage")]
        [Given(@"1_0 response is Ok and shows LoginPage")]
        public void ThenResponseIsOkAndShowsLoginPage()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.OK, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            var doc = new HtmlDocument();
            string expectedTitle = "¡Bienvenido de nuevo!";
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            var title = doc.DocumentNode.SelectSingleNode("//form/p[@class='main-body__title']").InnerText;
            Assert.AreEqual(expectedTitle, title);
        }
        [When(@"1_0 response is Ok with Errors in the View")]
        [Then(@"1_0 response is Ok with Errors in the View")]
        [Given(@"1_0 response is Ok with Errors in the View")]
        public void ThenResponseIsOkWithFormErrors()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.OK, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
            var doc = new HtmlDocument();
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            var fieldErrors = doc.DocumentNode.SelectSingleNode("//*[contains(@class, 'field-validation-error')]");
            Assert.IsNotNull(fieldErrors);
        }
        [When(@"1_0 response is Ok without Errors in the View")]
        [Then(@"1_0 response is Ok without Errors in the View")]
        [Given(@"1_0 response is Ok without Errors in the View")]
        public void ThenResponseIsOkWithoutFormErrors()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.OK, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
            var doc = new HtmlDocument();
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            var fieldErrors = doc.DocumentNode.SelectSingleNode("//*[contains(@class, 'field-validation-error')]");
            Assert.IsNull(fieldErrors);
        }
        [When(@"1_0 response is Created")]
        [Then(@"1_0 response is Created")]
        [Given(@"1_0 response is Created")]
        public void ThenResponseIsCreated()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.Created, _testsSharedState.TestContext.ResponseStatusCode);
        }
        [Given(@"1_0 response is Ok \(Content:'(.*)'\)")]
        [When(@"1_0 response is Ok \(Content:'(.*)'\)")]
        [Then(@"1_0 response is Ok \(Content:'(.*)'\)")]
        public void ThenResponseIsOk(string content)
        {
            Assert.AreEqual(System.Net.HttpStatusCode.OK, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
            Assert.AreEqual(content, _testsSharedState.TestContext.ContentResponse);
        }
        [Given(@"1_0 response is Ok \(RegExp:'(.*)'\)")]
        [When(@"1_0 response is Ok \(RegExp:'(.*)'\)")]
        [Then(@"1_0 response is Ok \(RegExp:'(.*)'\)")]
        // You need to escape \[ \] characters and put ^ at the begining and $ at the end to check complete jsons
        // .* is replaced per any character
        public void ThenResponseIsOkWithRegExp(string regExp)
        {
            Assert.AreEqual(System.Net.HttpStatusCode.OK, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
            Assert.IsTrue(Regex.Match(_testsSharedState.TestContext.ContentResponse, regExp).Success);
        }
        [Given(@"1_0 response is Created \(RegExp:'(.*)'\)")]
        [When(@"1_0 response is Created \(RegExp:'(.*)'\)")]
        [Then(@"1_0 response is Created \(RegExp:'(.*)'\)")]
        // You need to escape \[ \] characters and put ^ at the begining and $ at the end to check complete jsons
        // .* is replaced per any character
        public void ThenResponseIsCreatedWithRegExp(string regExp)
        {
            Assert.AreEqual(System.Net.HttpStatusCode.Created, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
            var result = Regex.Match(_testsSharedState.TestContext.ContentResponse, regExp).Success;
            if (!result)
            {
                if (regExp.Length == 0)
                {
                    Assert.Fail("Empty RegExp");
                }
                var partialRegExp = regExp.Remove(regExp.Length - 1, 1);
                Func<string, bool> checkExpression = (exp) => { try { return Regex.Match(_testsSharedState.TestContext.ContentResponse, exp).Success; } catch { return false; } };
                while (partialRegExp.Length > 0 && !checkExpression(partialRegExp))
                {
                    partialRegExp = partialRegExp.Remove(partialRegExp.Length - 1, 1);
                }
                if (partialRegExp.Length > 0)
                {
                    var regExpPortion = regExp.Remove(partialRegExp.Length + 20);
                    regExpPortion = regExpPortion.Remove(0, partialRegExp.Length - 1);
                    var contentPortion = _testsSharedState.TestContext.ContentResponse.Substring(partialRegExp.Length - (20 > partialRegExp.Length ? partialRegExp.Length : 20), 40);
                    Assert.Fail($"Not matched this portion of regExp: \"...  {regExpPortion} ...\" at \"... {contentPortion} ...\"");
                }
                else
                {
                    Assert.Fail($"Not matched any substring of the regExp");
                }
            }
            Assert.IsTrue(result);
        }
        [When(@"1_0 response is BadRequest \(Message:'(.*)'\)")]
        [Then(@"1_0 response is BadRequest \(Message:'(.*)'\)")]
        public void ThenResponseIsBadRequestMessage(string message)
        {
            Assert.AreEqual(System.Net.HttpStatusCode.BadRequest, _testsSharedState.TestContext.ResponseStatusCode);
            Assert.AreEqual(message, _testsSharedState.TestContext.ContentResponse);
        }

        [When(@"1_0 response is UnprocessableEntity \(MessageStartsWith:'(.*)'\)")]
        [Then(@"1_0 response is UnprocessableEntity \(MessageStartsWith:'(.*)'\)")]
        public void ThenResponseIsUnprocessableEntityMessageStartsWith(string message)
        {
            Assert.AreEqual(System.Net.HttpStatusCode.UnprocessableEntity, _testsSharedState.TestContext.ResponseStatusCode);
            Assert.AreEqual(message, _testsSharedState.TestContext.ContentResponse.Substring(0, (message.Length < _testsSharedState.TestContext.ContentResponse.Length) ? message.Length : _testsSharedState.TestContext.ContentResponse.Length));
        }

        [When(@"1_0 response is BadRequest \(MessageStartsWith:'(.*)'\)")]
        [Then(@"1_0 response is BadRequest \(MessageStartsWith:'(.*)'\)")]
        public void ThenResponseIsBadRequestMessageStartsWith(string message)
        {
            Assert.AreEqual(System.Net.HttpStatusCode.BadRequest, _testsSharedState.TestContext.ResponseStatusCode);
            Assert.AreEqual(message, _testsSharedState.TestContext.ContentResponse.Substring(0, (message.Length < _testsSharedState.TestContext.ContentResponse.Length) ? message.Length : _testsSharedState.TestContext.ContentResponse.Length));
        }
        [Then(@"1_0 response is Unauthorized")]
        [When(@"1_0 response is Unauthorized")]
        [Given(@"1_0 response is Unauthorized")]
        public void ThenResponseIsUnauthorized()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.Unauthorized, _testsSharedState.TestContext.ResponseStatusCode);
        }

        [Given(@"1_0 response is InternalServerError")]
        [Then(@"1_0 response is InternalServerError")]
        public void ThenResponseIsInternalServerError()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.InternalServerError, _testsSharedState.TestContext.ResponseStatusCode);
        }

        [Given(@"1_0 user waits for (.*) minutes")]
        public Task GivenUserWaitsForMinutes(int minutes)
        {
            return Task.Delay(minutes * 60 * 1000);
        }
        [Given(@"1_0 user waits for (.*) seconds")]
        public Task GivenUserWaitsForSeconds(int seconds)
        {
            return Task.Delay(seconds * 1000);
        }

        public string[] GetEmailContent(int offset, string toemails)
        {
            var directory = new DirectoryInfo(DeploymentStep.EmailPickupFolderPath);
            var myFile = directory.GetFiles()
                         .Where(f => f.Name.StartsWith(toemails.Replace("@", "AT") + " "))
                         .OrderByDescending(f => f.LastWriteTime)
                         .Take(offset + 1)
                         .Last();
            var eml = File.ReadLines(myFile.FullName).ToArray();
            return eml;
        }

        public HtmlDocument GetHtmlDocumentFromEmailContent(string[] eml)
        {
            string emailContent = "";
            for (int i = 10; i < eml.Length; i++)
            {
                emailContent += eml[i];
            }
            HtmlDocument pageDocument = new HtmlDocument();
            pageDocument.LoadHtml(emailContent);
            return pageDocument;
        }
        public void SetRequestCookieHeader(HttpRequestMessage requestMsg, string cookie)
        {
            requestMsg.Headers.Add("Set-Cookie", new CookieHeaderValue(name: cookie.Split(";")[0].Split("=")[0],
                                                                               value: cookie.Split(";")[0].Split("=")[1]).ToString());
        }
    }
}