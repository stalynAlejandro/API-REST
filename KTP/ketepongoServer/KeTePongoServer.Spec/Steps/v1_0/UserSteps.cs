using HtmlAgilityPack;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using KeTePongoServer.Spec.Extensions;
using KeTePongoServer.Spec.Model.v1_0;
using KeTePongoServer.Spec.Model.v0_1;
using AutoMapper;
using Microsoft.Extensions.Options;
using KeTePongo.SMS.Abstractions;
using Moq;
using KeTePongoServer.Spec.Infraestructure;
using KeTePongo.Core.Extensions;

namespace KeTePongoServer.Spec.Steps.v1_0
{
    [Binding]
    public class UserSteps
    {
        private TestsSharedState _testsSharedState;
        private CoreSteps _coreSteps;

        public UserSteps(TestsSharedState testsSharedState, FeatureContext featureContext, ScenarioContext scenarioContext)
        {
            _coreSteps = new CoreSteps(testsSharedState, featureContext, scenarioContext);
            _testsSharedState = testsSharedState;
        }

        private void ChangeStub(Mock<ISMSRestClientService> mockMethod)
        {
            var _smsRestClientServiceStub = mockMethod;

            var factory = new APIWebApplicationFactory<Startup>(services =>
            {
                services.SwapTransient<ISMSRestClientService>(provider => _smsRestClientServiceStub.Object);
                services.SwapTransient<IOptions<SMSSettings>>(provider => new SMSOptions("none", "KeTePongo", SmsDeliveryMethod.SmsUp, false) { });
            });

            _testsSharedState.HttpClient = factory.CreateClient();
            _coreSteps.StartUsingAccessTokenForAllRequests();
        }

        [Given(@"1_0 a user with \(Type:'(.*)' UserName:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        public void ANewUser(UserType userType, string userName, string userEmail, string password, string user_name)
        {
            _testsSharedState.TestContext.UserContext.NewUserDTO = new NewUserDTO()
            {
                UserName = string.IsNullOrWhiteSpace(userName) ? null : userName,
                Name = user_name,
                Email = userEmail,
                Password = password,
                UserType = userType
            };
        }

        [Then(@"1_0 user requests to confirm his phone number MockUp the API with UNAUTHORIZED settings \(Telephone:'(.*)'\)")]
        public async Task UserRequestsToConfirmHisTelephoneWithMockUpAPIwithUNAUTHORIZEDsettings(string telephone)
        {
            ChangeStub(SMSRestClientServiceStubFactory.CreateWithUnauthorized());

            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.UsersWebAPI/SendUserTelephoneConfirmationCode?telephone={telephone}");
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;

        }

        [Then(@"1_0 user requests to confirm his phone number MockUp the API without FOUNDS \(Telephone:'(.*)'\)")]
        public async Task WhenUserRequestsToConfirmHisPhoneNumberMockUpTheAPIWithoutFOUNDSTelephone(string telephone)
        {
            ChangeStub(SMSRestClientServiceStubFactory.CreateWithNotEnoughBalance());

            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.UsersWebAPI/SendUserTelephoneConfirmationCode?telephone={telephone}");
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [Then(@"1_0 user requests to confirm his phone number MockUp the API with BAD_PARAMS \(Telephone:'(.*)'\)")]
        public async Task WhenUserRequestsToConfirmHisPhoneNumberMockUpTheAPIWithBAD_PARAMSTelephone(string telephone)
        {
            ChangeStub(SMSRestClientServiceStubFactory.CreateWithBadParams());

            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.UsersWebAPI/SendUserTelephoneConfirmationCode?telephone={telephone}");
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [Then(@"1_0 user requests to confirm his phone number MockUp the API with INVALID_DESTINATION \(Telephone:'(.*)'\)")]
        public async Task WhenUserRequestsToConfirmHisPhoneNumberMockUpTheAPIWithINVALID_DESTINATIONTelephone(string telephone)
        {
            ChangeStub(SMSRestClientServiceStubFactory.CreateWithInvalidDestination());

            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.UsersWebAPI/SendUserTelephoneConfirmationCode?telephone={telephone}");
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [When(@"1_0 user requests to confirm his phone number \(Telephone:'(.*)'\)")]
        public async Task UserRequestsToConfirmHisTelephone(string telephone)
        {
            var updatedUserEmailDTO = new UpdatedPhoneDTO() { NewPhone = telephone };
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.UsersWebAPI/ChangePhone/", updatedUserEmailDTO);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [When(@"1_0 user fails to confirms successfully his phone number \(Telephone:'(.*)'\) with a wrong two factor authentication code")]
        public async Task WhenUserFailsToConfirmHisTelephoneWithAWrongTwoFactorAuthenticationCode(string telephone)
        {
            var confirmUserPhoneDTO = new ConfirmUserPhoneDTO() { Code = "000000", Telephone = telephone };
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.UsersWebAPI/ConfirmUserTelephone", confirmUserPhoneDTO);
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
        }

        [Then(@"1_0 a confirm phone sms was sent successfully to the user phone number by second time \(Telephone:'(.*)'\) and the user was issued a valid two factor code using sms provider")]
        public async Task AConfirmPhoneRequestIsSentToUserTwice(string telephone)
        {
            var response = await _testsSharedState.HttpClient.GetAsync("https://localhost:5002/KeTePongo.UsersWebAPI/User/");
            var userJson = await response.Content.ReadAsStringAsync();
            var userDTO = JsonConvert.DeserializeObject<UserDTO>(userJson);

            Assert.IsNotNull(userDTO.UserPhone.TwoFactorPhoneConfirmationCode);
            Assert.IsNull(userDTO.UserPhone.PhoneNumber);
            Assert.AreEqual(userDTO.UserPhone.NewPhoneNumberRequested, telephone);
            _testsSharedState.TestContext.UserContext.PhoneConfirmationCode = userDTO.UserPhone.TwoFactorPhoneConfirmationCode;
        }

        [When(@"1_0 user confirms successfully his phone number \(Telephone:'(.*)'\) with the two factor authentication code")]
        public async Task WhenUserConfirmsSuccessfullyHisTelephoneWithTheTwoFactorAuthenticationCode(string telephone)
        {
            var confirmUserPhoneDTO = new ConfirmUserPhoneDTO() { Code = _testsSharedState.TestContext.UserContext.PhoneConfirmationCode, Telephone = telephone };
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.UsersWebAPI/ConfirmUserTelephone", confirmUserPhoneDTO);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            Assert.AreEqual(System.Net.HttpStatusCode.Accepted, _testsSharedState.TestContext.ResponseStatusCode, _testsSharedState.TestContext.ContentResponse);
        }

        [Then(@"1_0 a confirm phone sms was sent successfully to the user phone number \(Telephone:'(.*)'\) and the user was issued a valid two factor code using sms provider")]
        public async Task AConfirmPhoneRequestIsSentToUser(string telephone)
        {
            var response = await _testsSharedState.HttpClient.GetAsync("https://localhost:5002/KeTePongo.UsersWebAPI/User/");
            var userJson = await response.Content.ReadAsStringAsync();
            var userDTO = JsonConvert.DeserializeObject<UserDTO>(userJson);


            Assert.IsNotNull(userDTO.UserPhone.TwoFactorPhoneConfirmationCode);
            Assert.AreEqual(userDTO.UserPhone.NewPhoneNumberRequested, telephone);
            _testsSharedState.TestContext.UserContext.PhoneConfirmationCode = userDTO.UserPhone.TwoFactorPhoneConfirmationCode;
        }

        [Then(@"1_0 response is BadRequest and external API sends message \(MessageStartsWith:'(.*)'\)")]
        public void ThenResponseIsBadRequestAndExternalAPISendMessage(string message)
        {
            Assert.AreEqual(System.Net.HttpStatusCode.BadRequest, _testsSharedState.TestContext.ResponseStatusCode);
            Assert.AreEqual(message, _testsSharedState.TestContext.ContentResponse.Substring(0, (message.Length < _testsSharedState.TestContext.ContentResponse.Length) ? message.Length : _testsSharedState.TestContext.ContentResponse.Length));

        }

        [Then(@"1_0 check current NewPhoneRequested is null")]
        public async Task ThenCheckCurrentPhoneNumberRequestedIsNull()
        {
            var response = await _testsSharedState.HttpClient.GetAsync("https://localhost:5002/KeTePongo.UsersWebAPI/User/");
            var userJson = await response.Content.ReadAsStringAsync();
            var userDTO = JsonConvert.DeserializeObject<UserDTO>(userJson);
            Assert.IsNull(userDTO.UserPhone.NewPhoneNumberRequested);
        }

        [Then(@"1_0 user has a phone number \(Telephone:'(.*)'\) assigned and his phone is confirmed and user can be retrieved using his phone number")]
        [When(@"1_0 user has a phone number \(Telephone:'(.*)'\) assigned and his phone is confirmed and user can be retrieved using his phone number")]
        [Given(@"1_0 user has a phone number \(Telephone:'(.*)'\) assigned and his phone is confirmed and user can be retrieved using his phone number")]
        public async Task ThenUserHasATelephoneAssignedAndHisPhoneIsConfirmed(string telephone)
        {
            var response = await _testsSharedState.HttpClient.GetAsync("https://localhost:5002/KeTePongo.UsersWebAPI/User/");
            var userJson = await response.Content.ReadAsStringAsync();
            var userDTO = JsonConvert.DeserializeObject<UserDTO>(userJson);

            Assert.AreEqual(userDTO.UserPhone.PhoneNumber, telephone);
            Assert.AreEqual(userDTO.UserPhone.IsPhoneConfirmed, true);
        }

        [Then(@"1_0 a new user request without username \(Type:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        [When(@"1_0 a new user request without username \(Type:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        [Given(@"1_0 a new user request without username \(Type:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        public Task ANewUserRequestWithoutNameAsync(UserType userType, string userEmail, string password, string user_name)
        {
            return ANewUserRequestAsync(userType, null, userEmail, password, user_name);
        }

        [Then(@"1_0 a new user request with \(Type:'(.*)' UserName:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        [When(@"1_0 a new user request with \(Type:'(.*)' UserName:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        [Given(@"1_0 a new user request with \(Type:'(.*)' UserName:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        public async Task ANewUserRequestAsync(UserType userType, string userName, string userEmail, string password, string user_name)
        {
            ANewUser(userType, userName, userEmail, password, user_name);
            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.UsersWebAPI/User/", _testsSharedState.TestContext.UserContext.NewUserDTO);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
            _testsSharedState.TestContext.UserContext.ResponseUserDTO = JsonConvert.DeserializeObject<UserDTO>(_testsSharedState.TestContext.ContentResponse);
        }
        [When(@"1_0 Updating username \(NewName:'(.*)'\)")]
        public async Task WhenUpdatingUsernameNewName(string newName)
        {
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.UsersWebAPI/User/", new UpdatedUserDTO() { Name = newName });
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            Assert.AreEqual(HttpStatusCode.Accepted, response.StatusCode);
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            
        }

        [Given(@"1_0 change user password \(CurrentPassword:'(.*)' NewPassword:'(.*)' NewPasswordConfirmation:'(.*)'\)")]
        [When(@"1_0 change user password \(CurrentPassword:'(.*)' NewPassword:'(.*)' NewPasswordConfirmation:'(.*)'\)")]
        [Then(@"1_0 change user password \(CurrentPassword:'(.*)' NewPassword:'(.*)' NewPasswordConfirmation:'(.*)'\)")]
        public async Task GivenChangeUserPasswordCurentPasswordNewPasswordNewPasswordConfirmation(string currentPassword, string newPassword, string newPasswordConfirmation)
        {
            var updatedUserEmailDTO = 
                new ChangePasswordDTO() { 
                    CurrentPassword = currentPassword, 
                    NewPassword = newPassword, 
                    NewPasswordConfirmation = newPasswordConfirmation };
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.UsersWebAPI/ChangePassword/", updatedUserEmailDTO);
            var content = await response.Content.ReadAsStringAsync();

            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            _testsSharedState.TestContext.ContentResponse = content;
        }

        [When(@"1_0 request an email address change \(NewEmail:'(.*)'\)")]
        [Then(@"1_0 request an email address change \(NewEmail:'(.*)'\)")]
        public async Task WhenRequestAnEmailAddressChangeNewEmail(string newEmail)
        {
            var updatedUserEmailDTO = new UpdatedEmailDTO() { NewEmail = newEmail };
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.UsersWebAPI/ChangeEmail/", updatedUserEmailDTO);
            var content = await response.Content.ReadAsStringAsync();

            _testsSharedState.TestContext.UserContext.NewUserDTO.Email = newEmail;
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            _testsSharedState.TestContext.ContentResponse = content;
        }
        [When(@"1_0 confirm email change request with confirmation code received at last(.*) user email")]
        [Then(@"1_0 confirm email change request with confirmation code received at last(.*) user email")]
        public async Task ThenConfirmEmailChangeRequestWithConfirmationCodeReceivedAtLastUserEmail(int offset)
        {
            string[] eml = _coreSteps.GetEmailContent(offset, _testsSharedState.TestContext.UserContext.NewUserDTO.Email);
            Assert.AreEqual($"Subject: KeTePongo - Confirma tu nuevo email", eml[2]);
            _testsSharedState.TestContext.LastReadedEmail = _coreSteps.GetHtmlDocumentFromEmailContent(eml);
            var code = _testsSharedState.TestContext.LastReadedEmail.DocumentNode
                .SelectSingleNode("//*[@id='confirmationCode']").InnerText;

            var confirmEmailChangeDTO = new ConfirmEmailChangeDTO() { Code = code };
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync($"https://localhost:5002/KeTePongo.UsersWebAPI/ConfirmEmailChange", confirmEmailChangeDTO);
            Assert.AreEqual(HttpStatusCode.Accepted, response.StatusCode);
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            response = await _testsSharedState.HttpClient.GetAsync("https://localhost:5002/KeTePongo.UsersWebAPI/User/");
        }
        [Then(@"1_0 check current user email is '(.*)'")]
        public async Task ThenCheckCurrentUserEmailIs(string email)
        {
            var userJson = await (await _testsSharedState.HttpClient.GetAsync("https://localhost:5002/KeTePongo.UsersWebAPI/User/")).Content.ReadAsStringAsync();
            var user = JsonConvert.DeserializeObject<UserDTO>(userJson);
            Assert.AreEqual(email, user.Email);
            Assert.AreEqual(user.EmailConfirmed, true);
        }

        [Given(@"1_0 user in response is valid")]
        [Then(@"1_0 user in response is valid")]
        public void UserInResponseIsValid()
        {
            Assert.NotNull(_testsSharedState.TestContext.UserContext.ResponseUserDTO);
            Assert.That(() => !string.IsNullOrWhiteSpace(_testsSharedState.TestContext.UserContext.ResponseUserDTO.Name));
            Assert.That(() => !string.IsNullOrWhiteSpace(_testsSharedState.TestContext.UserContext.ResponseUserDTO.UserName));
            Assert.That(() => !string.IsNullOrWhiteSpace(_testsSharedState.TestContext.UserContext.ResponseUserDTO.Email));
            Assert.AreEqual(_testsSharedState.TestContext.UserContext.NewUserDTO.Name, _testsSharedState.TestContext.UserContext.ResponseUserDTO.Name);
            Assert.AreEqual(_testsSharedState.TestContext.UserContext.NewUserDTO.Email, _testsSharedState.TestContext.UserContext.ResponseUserDTO.Email);
            Assert.IsFalse(_testsSharedState.TestContext.UserContext.ResponseUserDTO.EmailConfirmed);
        }

        [Given(@"1_0 user username is '(.*)'")]
        [Then(@"1_0 user username is '(.*)'")]
        public void ThenUserUsernameIs(string userName)
        {
            _testsSharedState.TestContext.UserContext.ResponseUserDTO.UserName = userName;
        }
        [When(@"1_0 a new user confirmed with \(Type:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        [Given(@"1_0 a new user confirmed with \(Type:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        [Then(@"1_0 a new user confirmed with \(Type:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        public async Task ANewUserConfirmedWithUserEmailPasswordName(UserType userType, string userEmail, string password, string name)
        {
            await ANewUserRequestWithoutNameAsync(userType: userType, userEmail: userEmail, password: password, user_name: name);
            await GetUserAccessToken();
            _coreSteps.StartUsingAccessTokenForAllRequests();
            await ConfirmUserEmailRequestWithConfirmationCodeReceivedAtUserEmail(0);
            _coreSteps.StopUsingAccessTokenForAllRequests();
            await _coreSteps.GetAccessTokenFromRefresh();
            _coreSteps.StartUsingAccessTokenForAllRequests();
        }
        [Given(@"1_0 get user access token")]
        [When(@"1_0 get user access token")]
        public async Task GetUserAccessToken()
        {
            await GetAccessToken("password",
                _testsSharedState.TestContext.UserContext.NewUserDTO.UserName ?? _testsSharedState.TestContext.UserContext.ResponseUserDTO.UserName,
                _testsSharedState.TestContext.UserContext.NewUserDTO.Password,
                "KeTePongoProviderApp",
                "253=asdf,YH3-937yhsiuh",
                "openid profile roles offline_access");
        }
        [Given(@"1_0 get access token for user \(userName: '(.*)' password: '(.*)'\)")]
        [When(@"1_0 get access token for user \(userName: '(.*)' password: '(.*)'\)")]
        [Then(@"1_0 get access token for user \(userName: '(.*)' password: '(.*)'\)")]
        public async Task GetAccessTokenForUser(string userName, string password)
        {
            await GetAccessToken("password",
                userName,
                password,
                "KeTePongoProviderApp",
                "253=asdf,YH3-937yhsiuh",
                "openid profile roles offline_access");
        }

        [Given(@"1_0 get admin user access token")]
        [When(@"1_0 get admin user access token")]
        public async Task GetAdminUserAccessToken()
        {
            await GetAccessToken("password", "admin", ",Adios22", "KeTePongoProviderApp", "253=asdf,YH3-937yhsiuh", "openid profile roles offline_access");
        }
        private async Task GetAccessToken(string grantType, string userName, string password, string clientId, string clientSecret, string scope)
        {
            var requestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://localhost:5002/connect/token"),
                Headers = { { HttpRequestHeader.ContentType.ToString(), "application/x-www-form-urlencoded" } },
                Content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]
                {
                    KeyValuePair.Create("grant_type",grantType),
                    KeyValuePair.Create("username",userName),
                    KeyValuePair.Create("password",password),
                    KeyValuePair.Create("client_id",clientId),
                    KeyValuePair.Create("client_secret",clientSecret),
                    KeyValuePair.Create("scope",scope),
                    KeyValuePair.Create("resource","https://localhost:5002/")
                })
            };
            var response = await _testsSharedState.HttpClient.SendAsync(requestMessage);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            Assert.AreEqual(HttpStatusCode.OK, _testsSharedState.TestContext.ResponseStatusCode);
        }
        
        [Given(@"1_0 get OAuthApp access token \(ClientId:'(.*)'\)")]
        [When(@"1_0 get OAuthApp access token \(ClientId:'(.*)'\)")]
        [Then(@"1_0 get OAuthApp access token \(ClientId:'(.*)'\)")]
        public async Task GetOauthAppAccessToken(string clientId)
        {
            await GetAccessToken("client_credentials", "", "", clientId, ",Adios22", "openid profile roles");
        }
        [Given(@"1_0 get client access token by consumer app")]
        [When(@"1_0 get client access token by consumer app")]
        [Then(@"1_0 get client access token by consumer app")]
        public async Task GetClientAccessTokenByConsumerApp()
        {
            await GetAccessToken("client_credentials", "", "", "KeTePongoConsumerApp", "-,ewñ89(%./jmlfSDggvml3,eoru", "openid profile roles");
        }

        [When(@"1_0 a new user confirmation code request")]
        [Given(@"1_0 a new user confirmation code request")]
        [Then(@"1_0 a new user confirmation code request")]
        public async Task ANewUserConfirmationCodeRequest()
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.UsersWebAPI/SendNewUserConfirmationCode?userName={_testsSharedState.TestContext.UserContext.ResponseUserDTO.UserName}");
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [Then(@"1_0 confirm user email request with confirmation code received at last-(.*) user email")]
        [When(@"1_0 confirm user email request with confirmation code received at last-(.*) user email")]
        [Given(@"1_0 confirm user email request with confirmation code received at last-(.*) user email")]
        public async Task ConfirmUserEmailRequestWithConfirmationCodeReceivedAtUserEmail(int offset)
        {
            string[] eml = _coreSteps.GetEmailContent(offset, _testsSharedState.TestContext.UserContext.NewUserDTO.Email);
            Assert.AreEqual($"Subject: KeTePongo - Confirma tu cuenta", eml[2]);
            _testsSharedState.TestContext.LastReadedEmail = _coreSteps.GetHtmlDocumentFromEmailContent(eml);
            var code = _testsSharedState.TestContext.LastReadedEmail.DocumentNode.SelectSingleNode("//p[contains(@id,'confirmationCode')]").InnerText;

            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.UsersWebAPI/ConfirmNewUser?code={code}");
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [Then(@"1_0 confirm user invitation to (.*) request received at last-(.*) user email")]
        [When(@"1_0 confirm user invitation to (.*) request received at last-(.*) user email")]
        [Given(@"1_0 confirm user invitation to (.*) request received at last-(.*) user email")]
        public async Task ConfirmUserInvitationRequestWithConfirmationCodeReceivedAtUserEmail(string toEmail, int offset)
        {
            string[] eml = _coreSteps.GetEmailContent(offset, toEmail);
            Assert.AreEqual($"Subject: KeTePongo - Accede a tu cuenta", eml[2]);
            _testsSharedState.TestContext.LastReadedEmail = _coreSteps.GetHtmlDocumentFromEmailContent(eml);
            var href = _testsSharedState.TestContext.LastReadedEmail.DocumentNode
                .SelectSingleNode("(//div[contains(@class,'message-main')]/a)[1]").Attributes["href"].Value;

            var response = await _testsSharedState.HttpClient.GetAsync(href);
            _testsSharedState.TestContext.Token = (href.Split("token=")[1]);
            var getCookieValue = response.Headers.Contains("Set-Cookie")? response.Headers.GetValues("Set-Cookie"):null;
            var antiforgery = getCookieValue?.FirstOrDefault(x => x.Contains("orchantiforgery_Default"));
            if (antiforgery != null)
                _testsSharedState.TestContext.AntiForgeryCookie = antiforgery;
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }
        
        [Then(@"1_0 user login with username and password \(Password:'(.*)' UserName:'(.*)'\)")]
        [When(@"1_0 user login with username and password \(Password:'(.*)' UserName:'(.*)'\)")]
        [Given(@"1_0 user login with username and password \(Password:'(.*)' UserName:'(.*)'\)")]
        public async Task UserLoginWithUserNameAndPassword(string password, string username)
        {
            var requestMsg = new HttpRequestMessage(HttpMethod.Get, "https://localhost:5002/Login");
            var response = await _testsSharedState.HttpClient.SendAsync(requestMsg);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;

            var doc = new HtmlDocument();
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            IDictionary<string, string> contentData = new Dictionary<string, string>();
            contentData.Add("__RequestVerificationToken", GetVerificationToken(doc));
            contentData.Add("UserName", username);
            contentData.Add("Password", password);
            contentData.Add("RememberMe", "true");

            requestMsg = new HttpRequestMessage(HttpMethod.Post, "https://localhost:5002/Login?returnUrl=" + "/KeTePongo.ConsumerWebAPI/CheckConsumerInvitation/CheckConsumerInvitation?token=" + _testsSharedState.TestContext.Token)
            {
                Content = new FormUrlEncodedContent(contentData),
            };

            response = await _testsSharedState.HttpClient.SendAsync(requestMsg);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }
        public string GetVerificationToken(HtmlDocument doc)
        {
            string token = "";
            token = doc.DocumentNode.SelectSingleNode("//form/input[1]").Attributes["value"].Value;
            return token;
        }
    }
}
