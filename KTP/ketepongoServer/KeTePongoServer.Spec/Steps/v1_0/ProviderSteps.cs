using HtmlAgilityPack;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongoServer.Spec.Model.v1_0;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using KeTePongoServer.Spec.Extensions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using KeTePongoServer.Spec.Model.v0_1;
using AutoMapper;
using OrchardCore.OpenId.ViewModels;
using KeTePongo.Core.AppServices;
using OpenIddict.Abstractions;
using OrchardCore.Security.Services;
using System.Text;
using KeTePongoServer.Spec.Infraestructure;
using System.Linq.Expressions;
using System.Reflection;

namespace KeTePongoServer.Spec.Steps.v1_0
{
    [Binding]
    public class ProviderSteps
    {
        private TestsSharedState _testsSharedState;
        private CoreSteps _coreSteps;
        private UserSteps _userSteps;
        private const string ApiVersion = "0.2.0.0";
        public ProviderSteps(TestsSharedState testsSharedState, FeatureContext featureContext, ScenarioContext scenarioContext)
        {
            _coreSteps = new CoreSteps(testsSharedState, featureContext, scenarioContext);
            _userSteps = new UserSteps(testsSharedState, featureContext, scenarioContext);
            _testsSharedState = testsSharedState;
        }
        [Given(@"1_0 a new provider with \(UserEmail:'(.*)' Password:'(.*)' Name:'(.*)' TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' Telephone:'(.*) SanityMeasures:'(.*)' Image:'(.*)'\)")]
        public async Task GivenANewProviderWithUserEmailPasswordNameTradeNameAddressStateOrProvinceTownPostalCodeTelephone(string userEmail, string password, string name, string tradeName, string address, string stateOrProvince, string town, string postalCode, string telephone, string sanitaryMeasures, string image)
        {
            await _userSteps.ANewUserConfirmedWithUserEmailPasswordName(UserType.ProviderUser, userEmail, password, name);
            await ProviderDataIsSubmittedConsumerNameAddressStateOrProvinceTownPostalCodeTelephone(tradeName, address, stateOrProvince, town, postalCode, sanitaryMeasures, image);
        }
        [Given(@"1_0 provider data is submitted \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' Image:'(.*)'\)")]
        [When(@"1_0 provider data is submitted \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' Image:'(.*)'\)")]
        [Then(@"1_0 provider data is submitted \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' Image:'(.*)'\)")]
        public async Task ProviderDataIsSubmittedConsumerNameAddressStateOrProvinceTownPostalCodeTelephone
            (string tradeName, string address, string stateOrProvince, string town, string postalCode, string sanitaryMeasures, string image)
        {
            var newProviderDTO = new NewProviderDTO()
            {
                TradeName = tradeName,
                Address = address,
                StateOrProvince = stateOrProvince,
                Town = town,
                PostalCode = postalCode,
                SanitaryMeasures = sanitaryMeasures.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList()
            };
            try
            {
                var dataContent = newProviderDTO.GetMultipartFormDataContent();
                var response = await _testsSharedState.HttpClient.PostWithVersionAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/Provider/", dataContent);
                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
                if (response.StatusCode == HttpStatusCode.Created)
                {
                    _testsSharedState.TestContext.ProviderContext.ResponseProviderDTO = JsonConvert.DeserializeObject<KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderDTO>(_testsSharedState.TestContext.ContentResponse);
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }

        
        [Then(@"1_0 a new OauthApp request \(ClientId:'(.*)'\)")]
        [When(@"1_0 a new OauthApp request \(ClientId:'(.*)'\)")]
        [Given(@"1_0 a new OauthApp request \(ClientId:'(.*)'\)")]
        public async Task NewOauthAppRequest(string clientId)
        {
            var displayName = clientId;
            List<KeyValuePair<string, string>> contentData = new List<KeyValuePair<string, string>>();
            contentData.Add(new KeyValuePair<string, string>("Token", System.Web.HttpUtility.UrlDecode(_testsSharedState.TestContext.Token)));

            var requestMsg = new HttpRequestMessage(HttpMethod.Get, "https://localhost:5002/Login")
            {
                Content = new FormUrlEncodedContent(contentData),
            };
            if (_testsSharedState.TestContext.AntiForgeryCookie != null)
            {
                _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
            }
            var response = await _testsSharedState.HttpClient.SendAsync(requestMsg);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            var doc = new HtmlDocument();
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            contentData = new List<KeyValuePair<string, string>>();
            contentData.Add( new KeyValuePair<string, string>(TestConstants.VerificationToken, _userSteps.GetVerificationToken(doc)));
            contentData.Add(new KeyValuePair<string, string>(TestConstants.UserName, TestConstants.UserAdmin));
            contentData.Add(new KeyValuePair<string, string>("Password", ",Adios22"));
            contentData.Add(new KeyValuePair<string, string>("RememberMe", "true"));

            requestMsg = new HttpRequestMessage(HttpMethod.Post, "https://localhost:5002/Login")
            {
                Content = new FormUrlEncodedContent(contentData),
            };

            if (_testsSharedState.TestContext.AntiForgeryCookie != null)
            {
                _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
            }

            response = await _testsSharedState.HttpClient.SendAsync(requestMsg);
            try
            {
                contentData = new List<KeyValuePair<string, string>>();
                contentData.Add(new KeyValuePair<string, string>("Token", System.Web.HttpUtility.UrlDecode(_testsSharedState.TestContext.Token)));

                requestMsg = new HttpRequestMessage(HttpMethod.Get, "https://localhost:5002/Admin/OpenId/Application/Create")
                {
                    Content = new FormUrlEncodedContent(contentData),
                };
                if (_testsSharedState.TestContext.AntiForgeryCookie != null)
                {
                    _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
                }
                response = await _testsSharedState.HttpClient.SendAsync(requestMsg);


                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                doc = new HtmlDocument();
                _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
                doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
                contentData = new List<KeyValuePair<string, string>>();
                contentData.Add(new KeyValuePair<string, string>("__RequestVerificationToken", _userSteps.GetVerificationToken(doc)));
                contentData.Add(new KeyValuePair<string, string>("ClientSecret", ",Adios22"));
                contentData.Add(new KeyValuePair<string, string>("ClientId", clientId));
                contentData.Add(new KeyValuePair<string, string>("AllowClientCredentialsFlow", "true"));
                contentData.Add(new KeyValuePair<string, string>("Type", OpenIddictConstants.ClientTypes.Confidential));
                contentData.Add(new KeyValuePair<string, string>("DisplayName", displayName));
                contentData.Add(new KeyValuePair<string, string>("ConsentType", OpenIddictConstants.ConsentTypes.Implicit));

                foreach(var child in doc.DocumentNode.SelectNodes("//form/div[@id='RoleGroup']/div/input[@type='hidden']"))
                {
                    if (child.Attributes["value"].Value == Roles.ERPProviderRoleName)
                    {
                        var index = child.Attributes["name"].Value.Substring(child.Attributes["name"].Value.IndexOf("[") + 1, 1);
                        contentData.Add(new KeyValuePair<string, string>("RoleEntries[" + index + "].Selected", "true"));
                    }
                    contentData.Add(new KeyValuePair<string, string>(child.Attributes["name"].Value, child.Attributes["value"].Value));
                }
                foreach (var child in doc.DocumentNode.SelectNodes("//form/div[@id='RoleGroup']/div/input[@type='checkbox']"))
                {
                    contentData.Add(new KeyValuePair<string, string>(child.Attributes["name"].Value, "false"));
                    contentData.Add(new KeyValuePair<string, string>(child.Attributes["name"].Value, "false"));
                }
                contentData.Add(new KeyValuePair<string, string>("Token", System.Web.HttpUtility.UrlDecode(_testsSharedState.TestContext.Token)));
                requestMsg = new HttpRequestMessage(HttpMethod.Post, "https://localhost:5002/Admin/OpenId/Application/Create")
                {
                    Content = new FormUrlEncodedContent(contentData),
                };

                if (_testsSharedState.TestContext.AntiForgeryCookie != null)
                {
                    _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
                }

                response = await _testsSharedState.HttpClient.SendAsync(requestMsg);

                _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
                Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }

        [Then(@"1_0 a link from OAuthApp to provider request \(ClientId:'(.*)'\)")]
        [When(@"1_0 a link from OAuthApp to provider request \(ClientId:'(.*)'\)")]
        [Given(@"1_0 a link from OAuthApp to provider request \(ClientId:'(.*)'\)")]
        public async Task LinkOAuthAppToProvider(string clientId)
        {
            try
            {
                var displayName = clientId;
                var contentData = new List<KeyValuePair<string, string>>();
                contentData.Add(new KeyValuePair<string, string>("Token", System.Web.HttpUtility.UrlDecode(_testsSharedState.TestContext.Token)));

                var requestMsg = new HttpRequestMessage(HttpMethod.Get, "https://localhost:5002/Admin/KeTePongo.UsersWebAPI/BackOfficeOpenIdAppProvider/Edit/" + clientId)
                {
                    Content = new FormUrlEncodedContent(contentData),
                };
                if (_testsSharedState.TestContext.AntiForgeryCookie != null)
                {
                    _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
                }
                var response = await _testsSharedState.HttpClient.SendAsync(requestMsg);

                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                var doc = new HtmlDocument();
                _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
                doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
                contentData = new List<KeyValuePair<string, string>>();
                contentData.Add(new KeyValuePair<string, string>("__RequestVerificationToken", _userSteps.GetVerificationToken(doc)));
                contentData.Add(new KeyValuePair<string, string>("id", clientId));
                contentData.Add(new KeyValuePair<string, string>("DisplayName", displayName));
                contentData.Add(new KeyValuePair<string, string>("ClientId", clientId));
                contentData.Add(new KeyValuePair<string, string>("ProviderOID", _testsSharedState.TestContext.ProviderContext.ResponseProviderDTO.OID.ToString()));
                contentData.Add(new KeyValuePair<string, string>("Token", System.Web.HttpUtility.UrlDecode(_testsSharedState.TestContext.Token)));
                requestMsg = new HttpRequestMessage(HttpMethod.Post, "https://localhost:5002/Admin/KeTePongo.UsersWebAPI/BackOfficeOpenIdAppProvider/Edit")
                {
                    Content = new FormUrlEncodedContent(contentData),
                };

                if (_testsSharedState.TestContext.AntiForgeryCookie != null)
                {
                    _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
                }

                response = await _testsSharedState.HttpClient.SendAsync(requestMsg);
                _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
                Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }
        [Then(@"1_0 provider has now LinkedToERP true and catalog is private")]
        [When(@"1_0 provider has now LinkedToERP true and catalog is private")]
        [Given(@"1_0 provider has now LinkedToERP true and catalog is private")]
        public async Task ProviderHasNowLinkedToERPTrue()
        {
            try
            {
                var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ProviderCatalogProducts", ApiVersion);
                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                _testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO = JsonConvert.DeserializeObject<ProviderCatalogProductsDTO>(_testsSharedState.TestContext.ContentResponse);
                Assert.IsTrue(_testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO.Provider.IsLinkedToERP);
                Assert.IsTrue(_testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO.Provider.IsProviderCatalogProductsPublic == false);
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }

        [Then(@"1_0 a new Provider LinkedToERP put ERPClientsPortfolio request")]
        [When(@"1_0 a new Provider LinkedToERP put ERPClientsPortfolio request")]
        [Given(@"1_0 a new Provider LinkedToERP put ERPClientsPortfolio request")]
        public async Task PutERPClientsPortfolioRequest(Table tableERPClients)
        {
            try
            {
                List<ERPClientDTO> eRPClients = tableERPClients.CreateSet<ERPClientDTO>().ToList();
                var content = JsonConvert.SerializeObject(eRPClients);
                var httpContent = new StringContent(content, Encoding.UTF8, "application/json");
                var response = await _testsSharedState.HttpClient.PutAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ERPClientsPortfolio", httpContent);
                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
                
                Assert.AreEqual(_testsSharedState.TestContext.ResponseStatusCode, HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }

        [Then(@"1_0 set Sections for Put")]
        [When(@"1_0 set Sections for Put")]
        [Given(@"1_0 set Sections for Put")]
        public async Task SetSectionsForPut(Table tableERPSections)
        {
            try
            {
                List<ERPSectionDTO> erpSections = tableERPSections.CreateSet<ERPSectionDTO>().ToList();

                _testsSharedState.TestContext.ProviderContext.SectionsForPutRequest = erpSections;
                await Task.CompletedTask;
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }

        [Then(@"1_0 Put ERPCatalogProducts")]
        [When(@"1_0 Put ERPCatalogProducts")]
        [Given(@"1_0 Put ERPCatalogProducts")]
        public async Task PutCatalogProductsAndPreviousSectionsERPCatalogProducts(Table tableERPCatalogProducts)
        {
            try
            {
                List<ERPCatalogProductDTO> erpCatalogProducts = tableERPCatalogProducts.CreateSet<ERPCatalogProductDTO>().ToList();
                var erpProviderCatalogProductsDTO = new ERPProviderCatalogProductsDTO();
                _testsSharedState.TestContext.ProviderContext.CatalogProductsForPutRequest = erpCatalogProducts;
                erpProviderCatalogProductsDTO.CatalogProducts = erpCatalogProducts;
                erpProviderCatalogProductsDTO.Sections = _testsSharedState.TestContext.ProviderContext.SectionsForPutRequest;
                
                var content = JsonConvert.SerializeObject(erpProviderCatalogProductsDTO);
                var httpContent = new StringContent(content, Encoding.UTF8, "application/json");
                var response = await _testsSharedState.HttpClient.PutAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ERPCatalogProducts", httpContent);
                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;

                Assert.AreEqual(_testsSharedState.TestContext.ResponseStatusCode, HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }

        [Then(@"1_0 changes the provider \(button:'(.*)'\)")]
        [When(@"1_0 changes the provider \(button:'(.*)'\)")]
        [Given(@"1_0 changes the provider \(button:'(.*)'\)")]
        public async Task ChangeTheUserProvider(string button)
        {
            var doc = new HtmlDocument();
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            IDictionary<string, string> contentData = new Dictionary<string, string>();
            contentData.Add("__RequestVerificationToken", _userSteps.GetVerificationToken(doc));
            contentData.Add("Email", _testsSharedState.TestContext.ProviderContext.ResponseProviderInvitation.Email);
            contentData.Add("OID", _testsSharedState.TestContext.ProviderContext.ResponseProviderInvitation.OID.ToString());
            contentData.Add("submit", button);
            var requestMsg = new HttpRequestMessage(HttpMethod.Post, "https://localhost:5002/KeTePongo.ProviderWebAPI/CheckProviderInvitation/PostProviderInvitationValidation")
            {
                Content = new FormUrlEncodedContent(contentData),
            };

            if (_testsSharedState.TestContext.AntiForgeryCookie != null)
            {
                _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
            }

            var response = await _testsSharedState.HttpClient.SendAsync(requestMsg);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }
        
        [Then(@"1_0 send new provider user invitation")]
        [When(@"1_0 send new provider user invitation")]
        [Given(@"1_0 send new provider user invitation")]
        public Task SendANewProviderUserInvitationAsync(Table tableNewUserInvitations)
        {
            List<NewProviderInvitationDTO> listNewUserInvitation = tableNewUserInvitations.CreateSet<NewProviderInvitationDTO>().ToList();
            return ANewUserInvitationRequestAsync(listNewUserInvitation);
        }
        public async Task ANewUserInvitationRequestAsync(List<NewProviderInvitationDTO> listNewUserInvitation)
        {
            _testsSharedState.TestContext.ProviderContext.ListProviderInvitation = new List<NewProviderInvitationDTO>();
            foreach (NewProviderInvitationDTO newUserInvitation in listNewUserInvitation) { ANewUserInvitation(newUserInvitation); };
            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/ProviderInvitation", _testsSharedState.TestContext.ProviderContext.ListProviderInvitation);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ProviderContext.ResponseListProviderInvitation = JsonConvert.DeserializeObject<List<ProviderInvitationDTO>>(_testsSharedState.TestContext.ContentResponse);
            }
        }
        [When(@"1_0 invitation created contains valid providerId")]
        [Then(@"1_0 invitation created contains valid providerId")]
        [Given(@"1_0 invitation created contains valid providerId")]
        public void ThenInvitationCreatedContainsProviderId()
        {
            foreach (ProviderInvitationDTO providerInvitation in _testsSharedState.TestContext.ProviderContext.ResponseListProviderInvitation)
            {
                Assert.AreEqual(_testsSharedState.TestContext.ProviderContext.ResponseProviderDTO.OID, providerInvitation.ProviderOID);
            }
        }

        [Given(@"1_0 store last provider user invitations")]
        [Then(@"1_0 store last provider user invitations")]
        public void StoreLastProviderUserInvitation()
        {
            foreach (ProviderInvitationDTO providerInvitation in _testsSharedState.TestContext.ProviderContext.ResponseListProviderInvitation)
            {
                Assert.IsNotNull(providerInvitation.CreationDate);
                Assert.IsNotNull(providerInvitation.ProviderOID);
                _testsSharedState.TestContext.ProviderContext.ResponseProviderInvitation = providerInvitation;
            }
        }
        [Given(@"1_0 a new user invitation with \(Type:'(.*)' UserName:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        public void ANewUserInvitation(NewProviderInvitationDTO newUserInvitation)
        {
            _testsSharedState.TestContext.ProviderContext.ListProviderInvitation.Add(new NewProviderInvitationDTO
            {
                Email = newUserInvitation.Email
            });
        }
        [Then(@"1_0 complete provider user registration \(Password:'(.*)'\)")]
        [When(@"1_0 complete provider user registration \(Password:'(.*)'\)")]
        [Given(@"1_0 complete provider user registration \(Password:'(.*)'\)")]
        public async Task CompleteTheRegistration(string password)
        {
            var doc = new HtmlDocument();
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            IDictionary<string, string> contentData = new Dictionary<string, string>();
            contentData.Add("__RequestVerificationToken", _userSteps.GetVerificationToken(doc));
            contentData.Add("Email", _testsSharedState.TestContext.ProviderContext.ResponseProviderInvitation.Email);
            contentData.Add("OID", _testsSharedState.TestContext.ProviderContext.ResponseProviderInvitation.OID.ToString());
            contentData.Add("Password", password);
            contentData.Add("Token", System.Web.HttpUtility.UrlDecode(_testsSharedState.TestContext.Token));
            var requestMsg = new HttpRequestMessage(HttpMethod.Post, "https://localhost:5002/KeTePongo.UsersWebAPI/ConfirmInvitation/Create")
            {
                Content = new FormUrlEncodedContent(contentData),
            };
            if (_testsSharedState.TestContext.AntiForgeryCookie != null)
            {
                _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
            }
            var response = await _testsSharedState.HttpClient.SendAsync(requestMsg);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [Given(@"1_0 a provider catalog products request")]
        [Then(@"1_0 a provider catalog products request")]
        [When(@"1_0 a provider catalog products request")]
        public async Task AProductCarteRequestAsync()
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ProviderCatalogProducts", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            _testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO = JsonConvert.DeserializeObject<ProviderCatalogProductsDTO>(_testsSharedState.TestContext.ContentResponse);
        }
        [Given(@"1_0 a provider catalog products request by Consumer Code")]
        [Then(@"1_0 a provider catalog products request by Consumer Code")]
        [When(@"1_0 a provider catalog products request by Consumer Code")]
        public async Task AProductCarteRequestByConsumerCodeAsync()
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ProviderCatalogProductsForConsumer?providerCode={_testsSharedState.TestContext.ProviderContext.ResponseProviderDTO.Code}", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.OK)
            {
                _testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO = JsonConvert.DeserializeObject<ProviderCatalogProductsDTO>(_testsSharedState.TestContext.ContentResponse); 
            }
        }
        [Given(@"1_0 a provider catalog products request by ProviderOID")]
        [Then(@"1_0 a provider catalog products request by ProviderOID")]
        [When(@"1_0 a provider catalog products request by ProviderOID")]
        public async Task AProductCarteRequestByProviderOIDAsync()
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ProviderCatalogProductsForConsumer?providerOID={_testsSharedState.TestContext.ProviderContext.ResponseProviderDTO.OID}", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.OK)
            {
                _testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO = JsonConvert.DeserializeObject<ProviderCatalogProductsDTO>(_testsSharedState.TestContext.ContentResponse);
            }
        }
        [Given(@"1_0 a new catalog section request with \(Name:'(.*)' DisplayOrder:'(.*)' \)")]
        [When(@"1_0 a new catalog section request with \(Name:'(.*)' DisplayOrder:'(.*)' \)")]
        public async Task ANewCarteSectionRequestAsync(string name, string displayOrder)
        {
            ANewCatalogSection(name, displayOrder);
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.ChangeVersion++;
            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/Section/", _testsSharedState.TestContext.ProviderContext.NewCarteSectionDTO, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ProviderContext.ResponseProductCarteSectionDTOs.Add(JsonConvert.DeserializeObject<SectionDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }

        [Given(@"1_0 a new catalog section for adding in a bulk operation \(Name:'(.*)' DisplayOrder:'(.*)' \)")]
        [When(@"1_0 a new catalog section for adding in a bulk operation \(Name:'(.*)' DisplayOrder:'(.*)' \)")]
        public void ANewCarteSectionForAddingInABulkOperation(string name, string displayOrder)
        {
            ANewCatalogSection(name, displayOrder);
            _testsSharedState.TestContext.ProviderContext.CarteBulkChangesDTO.Operations.Add(new CarteBulkOperationDTO(_testsSharedState.TestContext.ProviderContext.NewCarteSectionDTO));
        }
        [When(@"1_0 remove a catalog section request with \(Id:'(.*)'\)")]
        public async Task WhenRemoveACarteSectionRequestWithId(int id)
        {
            var response = await _testsSharedState.HttpClient.DeleteAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/Section/{id}", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(id, int.Parse(_testsSharedState.TestContext.ContentResponse));
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Sections = _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Sections.Where(p => p.Id != id).ToList();
            foreach (var product in _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts)
            {
                product.SectionIds.Remove(id);
            }
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.ChangeVersion++;
        }
        [Given(@"1_0 an updated catalog section for adding in a bulk operation \(Id:'(.*)' Name:'(.*)' DisplayOrder:'(.*)' \)")]
        [When(@"1_0 an updated catalog section for adding in a bulk operation \(Id:'(.*)' Name:'(.*)' DisplayOrder:'(.*)' \)")]
        public void AnUpdatedCarteSection(int id, string name, string displayOrder)
        {
            _testsSharedState.TestContext.ProviderContext.UpdateCarteSectionDTO = new UpdateSectionDTO() { Id = id, Name = name, DisplayOrder = int.Parse(displayOrder) };
            var sectionAtDb = _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Sections.FirstOrDefault(s => s.Id == _testsSharedState.TestContext.ProviderContext.UpdateCarteSectionDTO.Id);
            if (sectionAtDb != null)
            {
                var updatedDto = _testsSharedState.Mapper.Map<UpdateSectionDTO, SectionDTO>(_testsSharedState.TestContext.ProviderContext.UpdateCarteSectionDTO, sectionAtDb);
                updatedDto.ChangeVersion++;
                var index = _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Sections.IndexOf(sectionAtDb);
                _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Sections[index] = updatedDto;
            }
        }
        [Given(@"1_0 update catalog section request with \(Id:'(.*)' Name:'(.*)' DisplayOrder:'(.*)' \)")]
        [When(@"1_0 update catalog section request with \(Id:'(.*)' Name:'(.*)' DisplayOrder:'(.*)' \)")]
        public async Task UpdateCarteSectionRequestAsync(int id, string name, string displayOrder)
        {
            AnUpdatedCarteSection(id, name, displayOrder);
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.ChangeVersion++;

            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/Section/", _testsSharedState.TestContext.ProviderContext.UpdateCarteSectionDTO, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ProviderContext.ResponseProductCarteSectionDTOs.Add(JsonConvert.DeserializeObject<SectionDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }
        [Given(@"1_0 update catalog section for adding in a bulk operation \(Id:'(.*)' Name:'(.*)' DisplayOrder:'(.*)' \)")]
        [When(@"1_0 update catalog section for adding in a bulk operation \(Id:'(.*)' Name:'(.*)' DisplayOrder:'(.*)' \)")]
        public void UpdateCatalogSectionForAddingInABulkOperation(int id, string name, string displayOrder)
        {
            AnUpdatedCarteSection(id, name, displayOrder);
            _testsSharedState.TestContext.ProviderContext.CarteBulkChangesDTO.Operations.Add(new CarteBulkOperationDTO(_testsSharedState.TestContext.ProviderContext.UpdateCarteSectionDTO));
        }
        [Given(@"1_0 a new catalog product request with \(Name:'(.*)' SectionIds:'(.*)' AllergenIds:'(.*)' IsVegan:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        [When(@"1_0 a new catalog product request with \(Name:'(.*)' SectionIds:'(.*)' AllergenIds:'(.*)' IsVegan:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        public async Task ANewCatalogProductRequest(string name, string sectionIds, string allergenIds, bool isVegan, string description, string pvp, int displayOrder, bool IsHiddenInCarte)
        {
            ANewCatalogProduct(name, sectionIds, allergenIds, isVegan, description, pvp, displayOrder, IsHiddenInCarte);
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.ChangeVersion++;

            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/CatalogProduct/", _testsSharedState.TestContext.ProviderContext.NewCarteProductDTO, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ProviderContext.ResponseCarteProductDTOs.Add(JsonConvert.DeserializeObject<CatalogProductDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }
        [Given(@"1_0 backup state of provider catalog products")]
        [When(@"1_0 backup state of provider catalog products")]
        public void BackupStateOfCarte()
        {
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Allergens = _testsSharedState.Mapper.Map<List<Allergen>, List<AllergenDTO>>(Allergen.KnownAllergens.ToList());
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Provider = _testsSharedState.TestContext.ProviderContext.ResponseProviderDTO;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTOBackup = JsonConvert.SerializeObject(_testsSharedState.TestContext.ProviderContext.ProductCarteDTO);
        }
        [Given(@"1_0 request a provider catalog products bulk operation")]
        [When(@"1_0 request a provider catalog products bulk operation")]
        public async Task RequestABulkOperation()
        {
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.ChangeVersion++;

            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/CatalogBulkChanges/", _testsSharedState.TestContext.ProviderContext.CarteBulkChangesDTO, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }
        [When(@"1_0 remove a catalog product request with \(Id:'(.*)'\)")]
        public async Task WhenRemoveACarteProductRequestWithId(int id)
        {
            var response = await _testsSharedState.HttpClient.DeleteAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/CatalogProduct/{id}", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(id, int.Parse(_testsSharedState.TestContext.ContentResponse));
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts = _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts.Where(p => p.Id != id).ToList();
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.ChangeVersion++;
        }

        [Given(@"1_0 update a catalog product request with \(Id:'(.*)' Name:'(.*)' SectionIds:'(.*)' AllergenIds:'(.*)' IsVegan:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        [When(@"1_0 update a catalog product request with \(Id:'(.*)' Name:'(.*)' SectionIds:'(.*)' AllergenIds:'(.*)' IsVegan:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        public async Task UpdateProductRequest(int id, string name, string sectionIds, string allergenIds, bool isVegan, string description, string pvp, int displayOrder, bool isHiddenInCarte)
        {
            AnUpdatedCatalogProduct(id, name, sectionIds, allergenIds, isVegan, description, pvp, displayOrder, isHiddenInCarte);
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.ChangeVersion++;

            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/CatalogProduct/", _testsSharedState.TestContext.ProviderContext.UpdateProductDTO, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.OK)
            {
                _testsSharedState.TestContext.ProviderContext.ResponseCarteProductDTOs.Add(JsonConvert.DeserializeObject<CatalogProductDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }
        [Given(@"1_0 a new catalog product with \(Id:'(.*)' Name:'(.*)' SectionIds:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        public void AnUpdatedCatalogProduct(int id, string name, string sectionIds, string allergenIds, bool? isVegan, string description, string pvp, int? displayOrder, bool? isHiddenInCarte)
        {
            _testsSharedState.TestContext.ProviderContext.UpdateProductDTO = new UpdateCatalogProductDTO()
            {
                Id = id,
                Name = name,
                Description = description,
                PVP = (pvp != null) ? decimal.Parse(pvp) as decimal? : null,

                SectionIds = sectionIds?.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(i => int.Parse(i)).ToArray(),
                DisplayOrder = displayOrder ?? 0,
                IsHiddenInCarte = isHiddenInCarte ?? false,
                AllergenIds = allergenIds?.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(i => int.Parse(i)).ToArray(),
                IsVegan = isVegan,
            };
            var index = _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts.IndexOf(_testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts.FirstOrDefault(p => p.Id == id));
            if (index >= 0)
            {
                var oldProduct = _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts[index];
                _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts[index] = _testsSharedState.Mapper.Map<UpdateCatalogProductDTO, CatalogProductDTO>(_testsSharedState.TestContext.ProviderContext.UpdateProductDTO, _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts[index]);
                _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts[index].ChangeVersion = oldProduct.ChangeVersion + 1;
            }
        }
        [Given(@"1_0 an updated provider catalog products for adding in a bulk operation \(Id:'(.*)' Name:'(.*)' SectionIds:'(.*)' AllergenIds:'(.*)' IsVegan:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        [When(@"1_0 an updated provider catalog products for adding in a bulk operation \(Id:'(.*)' Name:'(.*)' SectionIds:'(.*)' AllergenIds:'(.*)' IsVegan:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        public void AnUpdatedCatalogProductForAddingInABulkOperation(int id, string name, string sectionIds, string allergenIds, bool? isVegan, string description, string pvp, int? displayOrder, bool? isHiddenInCarte)
        {
            AnUpdatedCatalogProduct(id, name, sectionIds, allergenIds, isVegan, description, pvp, displayOrder, isHiddenInCarte);
            _testsSharedState.TestContext.ProviderContext.CarteBulkChangesDTO.Operations.Add(new CarteBulkOperationDTO(_testsSharedState.TestContext.ProviderContext.UpdateProductDTO));
        }

        [Given(@"1_0 a new catalog section with \(Name:'(.*)' DisplayOrder:'(.*)'\)")]
        public void ANewCatalogSection(string name, string displayOrder)
        {
            _testsSharedState.TestContext.ProviderContext.NewCarteSectionDTO = new NewSectionDTO() { Name = name, DisplayOrder = int.Parse(displayOrder) };
            var addedDto = _testsSharedState.Mapper.Map<NewSectionDTO, SectionDTO>(_testsSharedState.TestContext.ProviderContext.NewCarteSectionDTO);
            addedDto.ChangeVersion = 0;
            addedDto.Id = _testsSharedState.TestContext.ProviderContext.SectionNextId++;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Sections.Add(addedDto);
        }
        [Given(@"1_0 a new catalog product with \(Name:'(.*)' SectionIds:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        public void ANewCatalogProduct(string name, string sectionIds, string allergenIds, bool isVegan, string description, string pvp, int displayOrder, bool isHiddenInCarte)
        {
            _testsSharedState.TestContext.ProviderContext.NewCarteProductDTO = new NewCatalogProductDTO()
            {
                Name = name,
                Description = description,
                PVP = decimal.Parse(pvp),

                SectionIds = sectionIds.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(id => int.Parse(id)).ToArray(),
                DisplayOrder = displayOrder,
                IsHiddenInCarte = isHiddenInCarte,
                AllergenIds = allergenIds.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(id => int.Parse(id)).ToArray(),
                IsVegan = isVegan,
            };
            var addedDto = _testsSharedState.Mapper.Map<NewCatalogProductDTO, CatalogProductDTO>(_testsSharedState.TestContext.ProviderContext.NewCarteProductDTO);
            addedDto.ChangeVersion = 0;
            addedDto.Id = _testsSharedState.TestContext.ProviderContext.ProductNextId++;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts.Add(addedDto);
        }

        [Given(@"1_0 a new provider catalog products for adding in a bulk operation\(Name:'(.*)' SectionIds:'(.*)' AllergenIds:'(.*)' IsVegan:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        [When(@"1_0 a new provider catalog products for adding in a bulk operation \(Name:'(.*)' SectionIds:'(.*)' AllergenIds:'(.*)' IsVegan:'(.*)' Description:'(.*)' PVP:'(.*)' DisplayOrder:'(.*)' IsHiddenInCarte:'(.*)'\)")]
        public void ANewCarteProductForAddingInABulkOperation(string name, string sectionIds, string allergenIds, bool isVegan, string description, string pvp, int displayOrder, bool isHiddenInCarte)
        {
            ANewCatalogProduct(name, sectionIds, allergenIds, isVegan, description, pvp, displayOrder, isHiddenInCarte);
            _testsSharedState.TestContext.ProviderContext.CarteBulkChangesDTO.Operations.Add(new CarteBulkOperationDTO(_testsSharedState.TestContext.ProviderContext.NewCarteProductDTO));
        }

        [When(@"1_0 updated provider catalog products has same info submitted and is valid")]
        [Then(@"1_0 updated provider catalog products has same info submitted and is valid")]
        public void ThenUpdatedCarteProductHasSameInfoSubmittedAndIsValid()
        {
            var receivedProductCarte = _testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Provider = _testsSharedState.TestContext.ProviderContext.ResponseProviderDTO;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Allergens = _testsSharedState.Mapper.Map<List<Allergen>, List<AllergenDTO>>(Allergen.KnownAllergens.ToList());
            Assert.AreEqual(JsonConvert.SerializeObject(_testsSharedState.TestContext.ProviderContext.ProductCarteDTO), JsonConvert.SerializeObject(receivedProductCarte));
        }
        [When(@"1_0 updated provider catalog products has same info submitted by ERP and is valid")]
        [Then(@"1_0 updated provider catalog products has same info submitted by ERP and is valid")]
        public void ThenUpdatedCarteProductHasSameInfoSubmittedByERPAndIsValid()
        {
            var receivedProductCarte = _testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO;
            var sentCatalogProducts = _testsSharedState.Mapper.Map<List<ERPCatalogProductDTO>, List<CatalogProductDTO>>(_testsSharedState.TestContext.ProviderContext.CatalogProductsForPutRequest);
            var sentSections = _testsSharedState.Mapper.Map<List<ERPSectionDTO>, List<SectionDTO>>(_testsSharedState.TestContext.ProviderContext.SectionsForPutRequest);

            var first = sentCatalogProducts.FirstOrDefault();
            var ignoredList = new List<string>();
            ignoredList.Add(nameof(first.ChangeVersion));
            ignoredList.Add(nameof(first.Id));
            ignoredList.Add(nameof(first.AllergenIds));
            ignoredList.Add(nameof(first.SectionIds));


            for (int i = 0; i < receivedProductCarte.Sections.Count; i++)
            {
                Assert.IsTrue(AreObjectsEquals<SectionDTO>(sentSections[0], receivedProductCarte.Sections[0], ignoredList));
            }

            for (int i = 0; i < receivedProductCarte.CatalogProducts.Count; i++)
            {
                Assert.IsTrue(AreObjectsEquals<CatalogProductDTO>(sentCatalogProducts[0], receivedProductCarte.CatalogProducts[0], ignoredList));
            }
        }
        [Then(@"1_0 updated provider catalog products has same info submitted but not those hidden")]
        public void ThenUpdatedCarteProductHasSameInfoSubmittedButNotThoseHidden()
        {
            var receivedProductCarte = _testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Provider = _testsSharedState.TestContext.ProviderContext.ResponseProviderDTO;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Allergens = _testsSharedState.Mapper.Map<List<Allergen>, List<AllergenDTO>>(Allergen.KnownAllergens.ToList());
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts = _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.CatalogProducts.Where(p => !p.IsHiddenInCarte).ToList();
            Assert.AreEqual(JsonConvert.SerializeObject(_testsSharedState.TestContext.ProviderContext.ProductCarteDTO), JsonConvert.SerializeObject(receivedProductCarte));
        }

        [When(@"1_0 updated provider catalog products has same info the backup")]
        [Then(@"1_0 updated provider catalog products has same info the backup")]
        public void ThenUpdatedCarteProductHasSameInfoAsTheBackup()
        {
            var receivedProductCarte = _testsSharedState.TestContext.ProviderContext.ReceivedProductCarteDTO;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Provider = _testsSharedState.TestContext.ProviderContext.ResponseProviderDTO;
            _testsSharedState.TestContext.ProviderContext.ProductCarteDTO.Allergens = _testsSharedState.Mapper.Map<List<Allergen>, List<AllergenDTO>>(Allergen.KnownAllergens.ToList());
            Assert.AreEqual(_testsSharedState.TestContext.ProviderContext.ProductCarteDTOBackup, JsonConvert.SerializeObject(receivedProductCarte));
        }

        [Given(@"1_0 update provider data \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' Telephone:'(.*)' SanitaryMeasures:'(.*)' ImageUrl:'(.*)' Image:'(.*)'\)")]
        [When(@"1_0 update provider data \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' Telephone:'(.*)' SanitaryMeasures:'(.*)' ImageUrl:'(.*)' Image:'(.*)'\)")]
        [Then(@"1_0 update provider data \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' Telephone:'(.*)' SanitaryMeasures:'(.*)' ImageUrl:'(.*)' Image:'(.*)'\)")]
        public async Task UpdateProviderDataConsumerNameAddressStateOrProvinceTownPostalCodeTelephone
           (string tradeName, string address, string stateOrProvince, string town, string postalCode, string telephone, string sanitaryMeasures, string imageUrl, string image)
        {
            _testsSharedState.TestContext.ProviderContext.UpdateProviderDTO = new UpdateProviderDTO()
            {
                TradeName = tradeName,
                Address = address,
                StateOrProvince = stateOrProvince,
                Town = town,
                PostalCode = postalCode,
                ImageUrl = imageUrl,
                SanitaryMeasures = sanitaryMeasures.Split(", ", StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList()
            };
            var dataContent = _testsSharedState.TestContext.ProviderContext.UpdateProviderDTO.GetMultipartFormDataContent();
            var response = await _testsSharedState.HttpClient.PutAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/Provider/", dataContent, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (_testsSharedState.TestContext.ResponseStatusCode == HttpStatusCode.Accepted)
            {
                _testsSharedState.TestContext.ProviderContext.ResponseUpdatedProviderDTO = JsonConvert.DeserializeObject<KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderDTO>(_testsSharedState.TestContext.ContentResponse);
            }
        }
        [Given(@"1_0 updated provider has same info submitted and is valid")]
        [When(@"1_0 updated provider has same info submitted and is valid")]
        [Then(@"1_0 updated provider has same info submitted and is valid")]
        public void ThenUpdatedProvidereHasSameInfoSubmittedAndIsValid()
        {
            var receivedProvider = _testsSharedState.TestContext.ProviderContext.ResponseUpdatedProviderDTO;
            var expectedProvider = _testsSharedState.Mapper.Map<UpdateProviderDTO, KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderDTO>(_testsSharedState.TestContext.ProviderContext.UpdateProviderDTO, _testsSharedState.TestContext.ProviderContext.ResponseProviderDTO);
            if (expectedProvider.ChangeVersion == 0)
            {
                expectedProvider.ChangeVersion = receivedProvider.ChangeVersion;
            }
            if (expectedProvider.ConsumerOID == 0)
            {
                expectedProvider.ConsumerOID = receivedProvider.ConsumerOID;
            }
            Assert.AreEqual(JsonConvert.SerializeObject(expectedProvider), JsonConvert.SerializeObject(receivedProvider));
        }
        [When(@"1_0 backup provider received")]
        public void WhenBackupProviderReceived()
        {
            _testsSharedState.TestContext.ProviderContext.BackupProviderDTO = _testsSharedState.TestContext.ProviderContext.ResponseProviderDTO;
        }
        [Then(@"1_0 provider backup is equal to provider received")]
        public void ThenProviderBackupIsEqutalToProviderReceived()
        {
            Assert.AreEqual(JsonConvert.SerializeObject(_testsSharedState.TestContext.ProviderContext.ResponseProviderDTO),
                            JsonConvert.SerializeObject(_testsSharedState.TestContext.ProviderContext.BackupProviderDTO));
        }

        [Given(@"1_0 ConsumersOfAProviderSalesman has one entry with \(consumerTradename:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' Telephone:'(.*)'\)")]
        [When(@"1_0 ConsumersOfAProviderSalesman has one entry with \(consumerTradename:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' Telephone:'(.*)'\)")]
        [Then(@"1_0 ConsumersOfAProviderSalesman has one entry with \(consumerTradename:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' Telephone:'(.*)'\)")]
        public async Task ConsumersOfAProviderSalesmanHas1EntryWith(string consumerTradename, string address, string stateOrProvince, string town, string postalCode, string telephone)
        {
            try
            {
                var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ConsumersOfAProviderSalesman", ApiVersion);
                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                var consumerOfAProviderSalesmanDTOList = JsonConvert.DeserializeObject<List<ConsumerOfAProviderSalesmanDTO>>(_testsSharedState.TestContext.ContentResponse);
                var consumer = consumerOfAProviderSalesmanDTOList.FirstOrDefault();

                var originalConsumer = new ConsumerOfAProviderSalesmanDTO();
                originalConsumer.TradeName = consumerTradename;
                originalConsumer.Address = address;
                originalConsumer.StateOrProvince =  stateOrProvince;
                originalConsumer.Town = town;
                originalConsumer.PostalCode = postalCode;
                originalConsumer.Telephone = telephone;

                var ignoredList = new List<string>();
                ignoredList.Add(nameof(consumer.ERPId));
                ignoredList.Add(nameof(consumer.ConsumerOID));
                Assert.IsTrue(AreObjectsEquals<ConsumerOfAProviderSalesmanDTO>(originalConsumer, consumer,ignoredList));
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }
        [Given(@"1_0 Activate Consumer as Provider")]
        [When(@"1_0 Activate Consumer as Provider")]
        [Then(@"1_0 Activate Consumer as Provider")]
        public async Task ActivateConsumerAsProvider()
        {
            try
            {
                var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ProviderActivation", ApiVersion);
                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
                var provider = JsonConvert.DeserializeObject<KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderDTO>(_testsSharedState.TestContext.ContentResponse);
                Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }
        [Given(@"1_0 Provider validates the consumer of a provider salesman with \(consumerTradename:'(.*)' erpId:'(.*)'\)")]
        [When(@"1_0 Provider validates the consumer of a provider salesman with \(consumerTradename:'(.*)' erpId:'(.*)'\)")]
        [Then(@"1_0 Provider validates the consumer of a provider salesman with \(consumerTradename:'(.*)' erpId:'(.*)'\)")]
        public async Task ProviderValidatesTheConsumerOfAProviderSalesman(string consumerTradename, string erpId)
        {
            try
            {
                var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ConsumersOfAProviderSalesman", ApiVersion);
                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                var consumerOfAProviderSalesmanDTOList = JsonConvert.DeserializeObject<List<ConsumerOfAProviderSalesmanDTO>>(_testsSharedState.TestContext.ContentResponse);
                var consumerOfAProviderSalesman = consumerOfAProviderSalesmanDTOList.FirstOrDefault(c=>c.TradeName == consumerTradename);

                var consumerOfAProviderSalesmanValidationDTO = new ConsumerOfAProviderSalesmanValidationDTO()
                {
                    ConsumerOID = consumerOfAProviderSalesman.ConsumerOID,
                    ERPId = erpId,
                };
                try
                {
                    var content = JsonConvert.SerializeObject(consumerOfAProviderSalesmanValidationDTO);
                    var httpContent = new StringContent(content, Encoding.UTF8, "application/json");
                    response = await _testsSharedState.HttpClient.PutAsync("https://localhost:5002/KeTePongo.ProviderWebAPI/ConsumerValidation/", httpContent);
                    _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                    _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
                }
                catch (Exception e)
                {
                    Debug.WriteLine($"{e.ToString()} {e.Message}");
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }

        [Then(@"1_0 Put MostConsumedCatalogProducts")]
        [When(@"1_0 Put MostConsumedCatalogProducts")]
        [Given(@"1_0 Put MostConsumedCatalogProducts")]
        public async Task PutMostConsumedCatalogProducts(Table tableERPCatalogProducts)
        {
            try
            {
                List<MostConsumedCatalogProductDTO> erpMostConsumedCatalogProducts = tableERPCatalogProducts.CreateSet<MostConsumedCatalogProductDTO>().ToList();
                var content = JsonConvert.SerializeObject(erpMostConsumedCatalogProducts);
                var httpContent = new StringContent(content, Encoding.UTF8, "application/json");
                var response = await _testsSharedState.HttpClient.PutAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ERPMostConsumedCatalogProducts", httpContent);
                _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
                _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;

                Assert.AreEqual(_testsSharedState.TestContext.ResponseStatusCode, HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                Debug.WriteLine($"{e.ToString()} {e.Message}");
            }
        }

        private bool AreObjectsEquals<TObject>(TObject original, TObject final, List<string> ignoredList) where TObject:class
        {
            if (ignoredList == null)
                return original.Equals(final);

            foreach (PropertyInfo propertyInfo in typeof(TObject).GetProperties())
            {
                if (!ignoredList.Any(p => p == propertyInfo.Name))
                {

                    var valueA1 = propertyInfo.GetValue(original);
                    var valueA2 = propertyInfo.GetValue(final);
                    if (valueA1 != null && valueA2 != null)
                        if (!valueA1.Equals(valueA2))
                            return false;
                }
            }
            return true;
        }
    }
}
