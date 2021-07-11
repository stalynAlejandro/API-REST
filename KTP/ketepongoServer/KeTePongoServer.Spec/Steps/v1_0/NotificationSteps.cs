using KeTePongoServer.Spec.Model.v1_0;
using Newtonsoft.Json;
using NUnit.Framework;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using KeTePongo.Notifications.Abstractions.DTOs;
using Microsoft.AspNetCore.SignalR.Client;
using KeTePongoServer.Spec.Model.v0_1;
using System;
using KeTePongo.Core.AppServices;

namespace KeTePongoServer.Spec.Steps.v1_0
{
    [Binding]
    public class NotificationSteps
    {
        private TestsSharedState _testsSharedState;
        const int GetAllNotificationsWithoutDeleting = 0;
        public NotificationSteps(TestsSharedState testsSharedState, FeatureContext featureContext, ScenarioContext scenarioContext)
        {
            _testsSharedState = testsSharedState;
        }
        [When(@"1_0 (.*) (.*) connection to SignalR established")]
        public async Task ConnectionToSignalREstablished(string typeAccount, string userName)
        {
            _testsSharedState.HubConnectionDictionary.Add(userName, new HubConnectionBuilder()
                .WithUrl("http://localhost:5002/" + typeAccount + "Notifications",
                    o => {
                        o.HttpMessageHandlerFactory = _ => _testsSharedState.Server.CreateHandler();
                    })
                .WithAutomaticReconnect()
                .Build());
            _testsSharedState.HubConnectionDictionary[userName].On(Signals.NewNotification, () =>
            {
                _testsSharedState.SignalRStatusDictionary.Add(userName, 1);
            });
            //This must be in a Task.Run(), if not, it won't work
            await Task.Run(() =>
            {
                _testsSharedState.HubConnectionDictionary[userName].StartAsync();
            });
            await _testsSharedState.HubConnectionDictionary[userName].InvokeAsync(Signals.RegisterUser, userName, 0);
        }
        [Then(@"1_0 (.*) has (.*) notifications pending to read")]
        [Then(@"1_0 (.*) has (.*) notification pending to read")]
        public async Task ThenHasNotifications(string typeAccount, int number)
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.Notifications/"+ typeAccount.ToUpper().Substring(0,1) + typeAccount.ToLower().Substring(1) +"Notifications/" + GetAllNotificationsWithoutDeleting);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;

            if (response.StatusCode == HttpStatusCode.NoContent && number == 0)
            {
                Assert.AreEqual("", _testsSharedState.TestContext.ContentResponse);
            }
            else
            {
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var list = JsonConvert.DeserializeObject<List<NotificationItemDTO>>(_testsSharedState.TestContext.ContentResponse);
                    Assert.AreEqual(number, list.Count);
                }
                else
                    throw new AssertionException(response.StatusCode.ToString());
            }
        }
        [Then(@"1_0 (.*) had (.*) notifications read and now has (.*) pending to read")]
        public async Task ThenHadNotificationReadAndNowHas(string typeAccount, long lastNotificationReadId, long number)
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.Notifications/" + typeAccount.ToUpper().Substring(0, 1) + typeAccount.ToLower().Substring(1) + "Notifications/" + lastNotificationReadId);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.NoContent && number == 0)
            {
                Assert.AreEqual("", _testsSharedState.TestContext.ContentResponse);
            }
            else
            {
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var list = JsonConvert.DeserializeObject<List<NotificationItemDTO>>(_testsSharedState.TestContext.ContentResponse);
                    Assert.AreEqual(number, list.Count);
                }
                else
                    throw new AssertionException(response.StatusCode.ToString());
            }
        }
        [Then(@"1_0 (.*) has received a SignalR notification")]
        public async Task ThenHasReceivedSignalRNotification(string userName)
        {
            await _testsSharedState.HubConnectionDictionary[userName].StopAsync();
            Assert.AreEqual(1, _testsSharedState.SignalRStatusDictionary[userName]);
        }
        [Then(@"1_0 user tries to access (.*) notifications but it's unauthorized")]
        public async Task ThenCantAccessNotifications(string typeAccount)
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.Notifications/" + typeAccount.ToUpper().Substring(0, 1) + typeAccount.Substring(1) + "Notifications/" + GetAllNotificationsWithoutDeleting);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode != HttpStatusCode.Unauthorized)
            { 
                throw new AssertionException(response.StatusCode.ToString());
            }
        }
    }
}

