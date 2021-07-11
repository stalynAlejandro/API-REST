using HtmlAgilityPack;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
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
using TechTalk.SpecFlow.Assist;
using KeTePongoServer.Spec.Extensions;
using KeTePongoServer.Spec.Model.v0_1;

namespace KeTePongoServer.Spec.Steps.v1_0
{
    [Binding]
    public class ConsumerSteps
    {
        private TestsSharedState _testsSharedState;
        private UserSteps _userSteps;
        private CoreSteps _coreSteps;
        private const string ApiVersion = "0.1.0.0";
        public ConsumerSteps(TestsSharedState testsSharedState, FeatureContext featureContext, ScenarioContext scenarioContext)
        {
            _userSteps = new UserSteps(testsSharedState, featureContext, scenarioContext);
            _coreSteps = new CoreSteps(testsSharedState, featureContext, scenarioContext);
            _testsSharedState = testsSharedState;
        }

        private async Task SubmitDataConsumer()
        {
            var dataContent = _testsSharedState.TestContext.ConsumerContext.NewConsumerDTO.GetMultipartFormDataContent();

            var response = await _testsSharedState.HttpClient.PostWithVersionAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/Consumer/", dataContent, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (_testsSharedState.TestContext.ResponseStatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseConsumerDTO = JsonConvert.DeserializeObject<ConsumerDTO>(_testsSharedState.TestContext.ContentResponse);
            }
        }

        [Given(@"1_0 a new consumer with \(UserEmail:'(.*)' Password:'(.*)' Name:'(.*)' TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanityMeasures:'(.*)' Image:'(.*)'\)")]
        [Then(@"1_0 a new consumer with \(UserEmail:'(.*)' Password:'(.*)' Name:'(.*)' TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanityMeasures:'(.*)' Image:'(.*)'\)")]
        [When(@"1_0 a new consumer with \(UserEmail:'(.*)' Password:'(.*)' Name:'(.*)' TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanityMeasures:'(.*)' Image:'(.*)'\)")]
        public async Task GivenANewConsumerWithUserEmailPasswordNameCifTradeNameBusinessNameAddressStateOrProvinceTownPostalCodeTelephone(string userEmail, string password, string name, string tradeName, string address, string stateOrProvince, string town, string postalCode, string sanityMeasures, string image)
        {
            await _userSteps.ANewUserConfirmedWithUserEmailPasswordName(UserType.ConsumerUser, userEmail, password, name);
            await ConsumerDataIsSubmittedConsumerNameAddressStateOrProvinceTownPostalCode(tradeName, address, stateOrProvince, town, postalCode, sanityMeasures, image);
        }
        [Given(@"1_0 a consumption request")]
        [Then(@"1_0 a consumption request")]
        [When(@"1_0 a consumption request")]
        public async Task AConsumptionRequestAsync()
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ConsumerWebAPI/Consumption", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [Given(@"1_0 consumption contains product \(name:'(.*)'\)")]
        [Then(@"1_0 consumption contains product \(name:'(.*)'\)")]
        [When(@"1_0 consumption contains product \(name:'(.*)'\)")]
        public async Task ConsumptionContainsProductAsync(string name)
        {
            var consumption =JsonConvert.DeserializeObject<KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1.ConsumptionDTO>(_testsSharedState.TestContext.ContentResponse);
            Assert.IsTrue(consumption.Products.Any(p => p.Name == name));
        }
        [Given(@"1_0 consumption doesn't contain product \(name:'(.*)'\)")]
        [Then(@"1_0 consumption doesn't contain product \(name:'(.*)'\)")]
        [When(@"1_0 consumption doesn't contain product \(name:'(.*)'\)")]
        public async Task ConsumptionNoContainsProductAsync(string name)
        {
            var consumption = JsonConvert.DeserializeObject<KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1.ConsumptionDTO>(_testsSharedState.TestContext.ContentResponse);
            Assert.IsTrue(!consumption.Products.Any(p => p.Name == name));
        }
        [Given(@"1_0 consumption contains product but empty erpId and ProviderOID \(name:'(.*)'\)")]
        [Then(@"1_0 consumption contains product but empty erpId and ProviderOID \(name:'(.*)'\)")]
        [When(@"1_0 consumption contains product but empty erpId and ProviderOID \(name:'(.*)'\)")]
        public async Task ConsumptionContainsProductButItHasEmptyERPIdAndProviderOIDAsync(string name)
        {
            var consumption = JsonConvert.DeserializeObject<KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1.ConsumptionDTO>(_testsSharedState.TestContext.ContentResponse);
            var product = consumption.Products.FirstOrDefault(p => p.Name == name);
            Assert.IsTrue(product.ERPId =="");
            Assert.IsTrue(product.KeTePongoProviderOID == null);
        }

        [Given(@"1_0 a new provider request with \(TradeName:'(.*)' OrderWeekDays:'(.*)' SalesmanEmail:'(.*)' SalesmanTelephone:'(.*)'\)")]
        [When(@"1_0 a new provider request with \(TradeName:'(.*)' OrderWeekDays:'(.*)' SalesmanEmail:'(.*)' SalesmanTelephone:'(.*)'\)")]
        public async Task ANewProviderRequestAsync(string tradeName, string orderWeekDays, string salesmanEmail, string salesmanTelephone)
        {
            ANewConsumerProvider(tradeName, orderWeekDays, salesmanEmail, salesmanTelephone);
            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/Provider/", _testsSharedState.TestContext.ConsumerContext.NewConsumerProviderDTO, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseConsumerProviderDTOs.Add(JsonConvert.DeserializeObject<KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1.ProviderDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }
        [Given(@"1_0 update provider request with \(Id:'(.*)' TradeName:'(.*)' OrderWeekDays:'(.*)' SalesmanEmail:'(.*)' SalesmanTelephone:'(.*)'\)")]
        [When(@"1_0 update provider request with \(Id:'(.*)' TradeName:'(.*)' OrderWeekDays:'(.*)' SalesmanEmail:'(.*)' SalesmanTelephone:'(.*)'\)")]
        public async Task UpdateProviderRequestAsync(int id, string tradeName, string orderWeekDays, string salesmanEmail, string salesmanTelephone)
        {
            var updateProviderDTO = new UpdateProviderDTO()
            {
                Id = id,
                TradeName = tradeName,
                Salesman = new UpdateSalesmanDTO() { Email = salesmanEmail, Telephone = salesmanTelephone },
                OrderWeekDays = orderWeekDays.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(s => (DayOfWeek)Enum.Parse(typeof(DayOfWeek), s)).ToArray()
            };
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/Provider/", updateProviderDTO, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.OK)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseConsumerProviderDTOs.Add(JsonConvert.DeserializeObject<KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1.ProviderDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }
        [Given(@"1_0 a new location request with \(Name:'(.*)'\)")]
        [When(@"1_0 a new location request with \(Name:'(.*)'\)")]
        public async Task ANewLocationRequestAsync(string name)
        {
            ANewConsumerLocation(name);
            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/Location/", _testsSharedState.TestContext.ConsumerContext.NewLocationDTO, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseLocationDTOs.Add(JsonConvert.DeserializeObject<LocationDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }
        [Given(@"1_0 an update location request with \(Id:'(.*)' Name:'(.*)'\)")]
        [When(@"1_0 an update location request with \(Id:'(.*)' Name:'(.*)'\)")]
        public async Task AnUpdatedLocationRequestAsync(int id, string name)
        {

            _testsSharedState.TestContext.ConsumerContext.UpdateLocationDTO = new UpdateLocationDTO() { Id = id, Name = name };
            var response = await _testsSharedState.HttpClient.PutAsJsonAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/Location/", _testsSharedState.TestContext.ConsumerContext.UpdateLocationDTO, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.OK)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseLocationDTOs.Add(JsonConvert.DeserializeObject<LocationDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }
        [Given(@"1_0 a new not linked consumer product request with \(Name:'(.*)' LocationIds:'(.*)' ProviderId:'(.*)' Image:'(.*)'\)")]
        [When(@"1_0 a new not linked consumer product request with \(Name:'(.*)' LocationIds:'(.*)' ProviderId:'(.*)' Image:'(.*)'\)")]
        public async Task ANewNotLinkedConsumerProductRequestWithNameLocationIdsProviderIdImage(string name, string LocationIds, string providerId, string image)
        {
            ANewConsumerProduct(name, LocationIds, providerId);
            var requestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://localhost:5002/KeTePongo.ConsumerWebAPI/Product/"),
                Headers = { { HttpRequestHeader.ContentType.ToString(), "application/x-www-form-urlencoded" } },
                Content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]
                {
                    //KeyValuePair.Create("ImageFile",string.IsNullOrEmpty(image)?"":image),
                    KeyValuePair.Create("Product",JsonConvert.SerializeObject(_testsSharedState.TestContext.ConsumerContext.NewProductDTO))
                })
            };
            var response = await _testsSharedState.HttpClient.SendAsync(requestMessage, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseProductDTOs.Add(JsonConvert.DeserializeObject<ProductDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }

        [Given(@"1_0 a new linked consumer product request with \(Name:'(.*)'\)")]
        [When(@"1_0 a new linked consumer product request with \(Name:'(.*)'\)")]
        [Then(@"1_0 a new linked consumer product request with \(Name:'(.*)'\)")]
        public async Task ANewLinkedConsumerProductRequestWithNameLocationIdsProviderIdImage(string name)
        {
            var providerRequestedToLink = _testsSharedState.TestContext.ConsumerContext.ResponseConsumerProviderDTOs.FirstOrDefault();
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ConsumerWebAPI/Provider/{providerRequestedToLink.Id}", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            var provider = JsonConvert.DeserializeObject<KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1.ProviderDTO>(_testsSharedState.TestContext.ContentResponse);

            response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ProviderCatalogProductsForConsumer?providerOID={provider.KeTePongoProviderOID}", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
           
            var providerCatalogProducts =  JsonConvert.DeserializeObject<KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductsDTO>(_testsSharedState.TestContext.ContentResponse);
           
            var product = providerCatalogProducts.CatalogProducts.FirstOrDefault(p => p.Name == name);

            _testsSharedState.TestContext.ConsumerContext.NewProductDTO = new NewProductDTO()
            {
                Name = name,
                ProviderId = provider.Id,
                ERPId = product.ERPId,
                KeTePongoProviderOID = provider.KeTePongoProviderOID,
                ProviderProductId = product.Id,
            };
            var requestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://localhost:5002/KeTePongo.ConsumerWebAPI/Product/"),
                Headers = { { HttpRequestHeader.ContentType.ToString(), "application/x-www-form-urlencoded" } },
                Content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]
                {
                    KeyValuePair.Create("Product",JsonConvert.SerializeObject(_testsSharedState.TestContext.ConsumerContext.NewProductDTO))
                })
            };
            response = await _testsSharedState.HttpClient.SendAsync(requestMessage, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseProductDTOs.Add(JsonConvert.DeserializeObject<ProductDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }

        [Given(@"1_0 remove linked consumer product request with \(name:'(.*)'\)")]
        [When(@"1_0 remove linked consumer product request with \(name:'(.*)'\)")]
        [Then(@"1_0 remove linked consumer product request with \(name:'(.*)'\)")]
        public async Task RemoveLinkedProduct(string name)
        {
            var product = _testsSharedState.TestContext.ConsumerContext.ResponseProductDTOs.FirstOrDefault(p => p.Name == name);
            var response = await _testsSharedState.HttpClient.DeleteAsync($"https://localhost:5002/KeTePongo.ConsumerWebAPI/Product/{product.Id}", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            Assert.IsTrue(response.StatusCode == HttpStatusCode.OK);
        }

        [Given(@"1_0 update consumer product request with \(Id:'(.*)' Name:'(.*)' LocationIds:'(.*)' Image:'(.*)'\)")]
        [When(@"1_0 update consumer product request with \(Id:'(.*)' Name:'(.*)' LocationIds:'(.*)' Image:'(.*)'\)")]
        public async Task UpdateConsumerProductRequestWithNameLocationIdsProviderIdImage(int id, string name, string LocationIds, string image)
        {
            var updateProductDTO = new UpdateProductDTO()
            {
                Id = id,
                Name = name,
                LocationIds = LocationIds.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(i => int.Parse(i)).ToArray()
            };

            var requestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri("https://localhost:5002/KeTePongo.ConsumerWebAPI/Product/"),
                Headers = { { HttpRequestHeader.ContentType.ToString(), "application/x-www-form-urlencoded" } },
                Content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]
                {
                    //KeyValuePair.Create("ImageFile",string.IsNullOrEmpty(image)?"":image),
                    KeyValuePair.Create("Product",JsonConvert.SerializeObject(updateProductDTO))
                })
            };
            var response = await _testsSharedState.HttpClient.SendAsync(requestMessage, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.OK)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseProductDTOs.Add(JsonConvert.DeserializeObject<ProductDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }

        [When(@"1_0 the new consumer order is requested")]
        public async Task WhenTheNewConsumerOrderIsRequested()
        {
            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/Order/", _testsSharedState.TestContext.ConsumerContext.NewConsumerOrderDTO, ApiVersion);

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseConsumerOrderDTO = JsonConvert.DeserializeObject<ConsumerOrderDTO>(_testsSharedState.TestContext.ContentResponse);
                _testsSharedState.TestContext.ConsumerContext.NewConsumerOrderDTO = new NewConsumerOrderDTO();
            }
        }
        [Then(@"1_0 request last (.*) consumer orders submitted and check last one is the same")]
        public async Task ThenRequestLastConsumerOrdersSubmittedAndCheckLastOneIsTheSame(int page)
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ConsumerWebAPI/Order/orders?Page=1&PageSize=10");
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;

            if (response.StatusCode == HttpStatusCode.OK)
            {
                var order = JsonConvert.DeserializeObject<ConsumerOrderDTO>(_testsSharedState.TestContext.ContentResponse);
                var originalOrder = _testsSharedState.TestContext.ConsumerContext.ResponseConsumerOrderDTO;
                CompareOrignalAndStoredOrder(order, originalOrder);
            }
        }

        [Then(@"1_0 request last consumer order submitted and check last one is the same")]
        public async Task ThenRequestLastConsumerOrderSubmittedAndCheckLastOneIsTheSame()
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ConsumerWebAPI/Order/{_testsSharedState.TestContext.ConsumerContext.ResponseConsumerOrderDTO.OID}", ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;

            if (response.StatusCode == HttpStatusCode.OK)
            {
                var order = JsonConvert.DeserializeObject<ConsumerOrderDTO>(_testsSharedState.TestContext.ContentResponse);
                var originalOrder = _testsSharedState.TestContext.ConsumerContext.ResponseConsumerOrderDTO;
                CompareOrignalAndStoredOrder(order, originalOrder);
            }
        }

        private void CompareOrignalAndStoredOrder(ConsumerOrderDTO order, ConsumerOrderDTO originalOrder)
        {
            Assert.IsFalse(order.HasErrors);
            int index = 0;
            foreach (var suborder in order.SubOrders)
            {
                var originalSuborder = originalOrder.SubOrders[index];
                Assert.IsTrue(suborder.WasProcessed);
                suborder.WasProcessed = originalSuborder.WasProcessed;
                Assert.IsTrue(suborder.WasEmailSentToProvider);
                suborder.WasEmailSentToProvider = originalSuborder.WasEmailSentToProvider;
                Assert.IsNull(suborder.ProcessingError);
                suborder.ProcessingError = originalSuborder.ProcessingError;
            }
            Assert.AreEqual(JsonConvert.SerializeObject(_testsSharedState.TestContext.ConsumerContext.ResponseConsumerOrderDTO), JsonConvert.SerializeObject(order));
        }

        [Given(@"1_0 a new consumer provider with \(TradeName:'(.*)' SalesmanEmail:'(.*)' SalesmanTelephone:'(.*)'\)")]
        public void ANewConsumerProvider(string tradeName, string orderWeekDays, string salesmanEmail, string salesmanTelephone)
        {
            _testsSharedState.TestContext.ConsumerContext.NewConsumerProviderDTO = new NewProviderDTO()
            {
                TradeName = tradeName,
                Salesman = new UpdateSalesmanDTO() { Email = salesmanEmail, Telephone = salesmanTelephone },
                OrderWeekDays = orderWeekDays.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(s => (DayOfWeek)Enum.Parse(typeof(DayOfWeek), s)).ToArray()
            };
        }
        [Given(@"1_0 a new consumer location with \(Name:'(.*)'\)")]
        public void ANewConsumerLocation(string name)
        {
            _testsSharedState.TestContext.ConsumerContext.NewLocationDTO = new NewLocationDTO() { Name = name };
        }
        [Given(@"1_0 a new consumer product with \(Name:'(.*)'\)")]
        public void ANewConsumerProduct(string name, string LocationIds, string providerId)
        {
            _testsSharedState.TestContext.ConsumerContext.NewProductDTO = new NewProductDTO()
            {
                Name = name,
                LocationIds = LocationIds.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(id => int.Parse(id)).ToArray(),
                ProviderId = string.IsNullOrEmpty(providerId) ? 0 : int.Parse(providerId),
            };
        }
        [Given(@"1_0 a new consumer SubOrder with \(SubOrderId:'(.*)' ProviderId:'(.*)' Observation:'(.*)' DeliveryDate:'(.*)'\)")]
        public void ANewConsumerSubOrderWithProviderIdObservationsDeliveryDate(int subOrderId, int providerId, string observation, string deliveryDate)
        {
            var subOrder = new NewSubOrderDTO()
            {
                SubOrderId = subOrderId,
                ProviderId = providerId,
                Observation = observation,
                UtcMinimumDeliveryDateTime = String.IsNullOrWhiteSpace(deliveryDate) ? (DateTime?)null : DateTime.Parse(deliveryDate).ToUniversalTime(),
                OrderLines = new List<NewConsumerOrderLineDTO>()
            };
            _testsSharedState.TestContext.ConsumerContext.NewConsumerOrderDTO.SubOrders.Add(subOrder);
        }

        [Given(@"1_0 a new consumer order line with \(SubOrderId:'(.*)' ProductId:'(.*)' Quantity:'(.*)' Observation:'(.*)'\)")]
        public void GivenANewConsumerOrderLineWithSubOrderProductIdQuantityObservations(int subOrderId, int productId, int quantity, string observation)
        {
            var suborder = _testsSharedState.TestContext.ConsumerContext.NewConsumerOrderDTO.SubOrders.First(s => s.SubOrderId == subOrderId);
            suborder.OrderLines.Add(new NewConsumerOrderLineDTO()
            {
                ProductId = productId,
                Quantity = quantity,
                Observation = observation
            });
        }
        [Given(@"1_0 consumer data is submitted \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' Image:'(.*)'\)")]
        [When(@"1_0 consumer data is submitted \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' Image:'(.*)'\)")]
        [Then(@"1_0 consumer data is submitted \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' Image:'(.*)'\)")]
        public async Task ConsumerDataIsSubmittedConsumerNameAddressStateOrProvinceTownPostalCode
            (string tradeName, string address, string stateOrProvince, string town, string postalCode, string sanitaryMeasures, string image)
        {
            _testsSharedState.TestContext.ConsumerContext.NewConsumerDTO = new NewConsumerDTO()
            {
                ImageFile = null,
                TradeName = tradeName,
                Address = address,
                StateOrProvince = stateOrProvince,
                Town = town,
                PostalCode = postalCode,
                SanitaryMeasures = sanitaryMeasures.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList()
            };

            await SubmitDataConsumer();

        }
        [When(@"1_0 backup Consumer received")]
        public void WhenBackupConsumerReceived()
        {
            _testsSharedState.TestContext.ConsumerContext.BackupConsumerDTO = _testsSharedState.TestContext.ConsumerContext.ResponseConsumerDTO;
        }
        [Then(@"1_0 consumer backup is equtal to Consumer received")]
        public void ThenConsumerBackupIsEqutalToConsumerReceived()
        {
            Assert.AreEqual(JsonConvert.SerializeObject(_testsSharedState.TestContext.ConsumerContext.ResponseConsumerDTO),
                            JsonConvert.SerializeObject(_testsSharedState.TestContext.ConsumerContext.BackupConsumerDTO));
        }

        [Given(@"1_0 update consumer data \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' ImageUrl:'(.*)' Image:'(.*)'\)")]
        [When(@"1_0 update consumer data \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' ImageUrl:'(.*)' Image:'(.*)'\)")]
        [Then(@"1_0 update consumer data \(TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' ImageUrl:'(.*)' Image:'(.*)'\)")]
        public async Task UpdateConsumerDataConsumerNameAddressStateOrProvinceTownPostalCode
            (string tradeName, string address, string stateOrProvince, string town, string postalCode, string sanitaryMeasures, string imageUrl, string image)
        {
            _testsSharedState.TestContext.ConsumerContext.UpdateConsumerDTO = new UpdateConsumerDTO()
            {
                TradeName = tradeName,
                Address = address,
                StateOrProvince = stateOrProvince,
                Town = town,
                PostalCode = postalCode,
                ImageUrl = imageUrl,
                SanitaryMeasures = sanitaryMeasures.Split(", ", StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList()
            };
            var dataContent = _testsSharedState.TestContext.ConsumerContext.UpdateConsumerDTO.GetMultipartFormDataContent();
            var response = await _testsSharedState.HttpClient.PutAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/Consumer/", dataContent, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (_testsSharedState.TestContext.ResponseStatusCode == HttpStatusCode.Accepted)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseUpdatedConsumerDTO = JsonConvert.DeserializeObject<ConsumerDTO>(_testsSharedState.TestContext.ContentResponse);
            }
        }
        [Given(@"1_0 updated consumer has same info submitted and is valid")]
        [When(@"1_0 updated consumer has same info submitted and is valid")]
        [Then(@"1_0 updated consumer has same info submitted and is valid")]
        public void ThenUpdatedConsumerHasSameInfoSubmittedAndIsValid()
        {
            var receivedConsumer = _testsSharedState.TestContext.ConsumerContext.ResponseUpdatedConsumerDTO;
            var expectedConsumer = _testsSharedState.Mapper.Map<UpdateConsumerDTO, ConsumerDTO>(_testsSharedState.TestContext.ConsumerContext.UpdateConsumerDTO, _testsSharedState.TestContext.ConsumerContext.ResponseConsumerDTO);
            expectedConsumer.ChangeVersion++;
            Assert.AreEqual(JsonConvert.SerializeObject(expectedConsumer), JsonConvert.SerializeObject(receivedConsumer));
        }

        [Then(@"1_0 changes the consumer \(button:'(.*)'\)")]
        [When(@"1_0 changes the consumer \(button:'(.*)'\)")]
        [Given(@"1_0 changes the consumer \(button:'(.*)'\)")]
        public async Task ChangeTheUserConsumer(string button)
        {
            var doc = new HtmlDocument();
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            IDictionary<string, string> contentData = new Dictionary<string, string>();
            contentData.Add("__RequestVerificationToken", _userSteps.GetVerificationToken(doc));
            contentData.Add("Email", _testsSharedState.TestContext.ConsumerContext.ResponseConsumerInvitation.Email);
            contentData.Add("OID", _testsSharedState.TestContext.ConsumerContext.ResponseConsumerInvitation.OID.ToString());
            contentData.Add("submit", button);

            var requestMsg = new HttpRequestMessage(HttpMethod.Post, "https://localhost:5002/KeTePongo.ConsumerWebAPI/CheckConsumerInvitation/PostConsumerInvitationValidation")
            {
                Content = new FormUrlEncodedContent(contentData),
            };

            if (_testsSharedState.TestContext.AntiForgeryCookie != null)
            {
                _coreSteps.SetRequestCookieHeader(requestMsg, _testsSharedState.TestContext.AntiForgeryCookie);
            }

            var response = await _testsSharedState.HttpClient.SendAsync(requestMsg, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [Then(@"1_0 send new consumer user invitation")]
        [When(@"1_0 send new consumer user invitation")]
        [Given(@"1_0 send new consumer user invitation")]
        public Task SendANewConsumerUserInvitationAsync(Table tableNewUserInvitations)
        {
            List<NewConsumerInvitationDTO> listNewUserInvitation = tableNewUserInvitations.CreateSet<NewConsumerInvitationDTO>().ToList();
            return ANewUserInvitationRequestAsync(listNewUserInvitation);
        }
        public async Task ANewUserInvitationRequestAsync(List<NewConsumerInvitationDTO> listNewUserInvitation)
        {
            _testsSharedState.TestContext.ConsumerContext.ListConsumerInvitation = new List<NewConsumerInvitationDTO>();
            foreach (NewConsumerInvitationDTO newUserInvitation in listNewUserInvitation) { ANewUserInvitation(newUserInvitation); };

            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/ConsumerInvitation", _testsSharedState.TestContext.ConsumerContext.ListConsumerInvitation, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseListConsumerInvitation = JsonConvert.DeserializeObject<List<ConsumerInvitationDTO>>(_testsSharedState.TestContext.ContentResponse);
            }
        }
        [When(@"1_0 invitation created contains valid consumerId")]
        [Then(@"1_0 invitation created contains valid consumerId")]
        [Given(@"1_0 invitation created contains valid consumerId")]
        public void ThenInvitationCreatedContainsConsumerId()
        {
            foreach (ConsumerInvitationDTO consumerInvitation in _testsSharedState.TestContext.ConsumerContext.ResponseListConsumerInvitation)
            {
                Assert.AreEqual(_testsSharedState.TestContext.ConsumerContext.ResponseConsumerDTO.OID, consumerInvitation.ConsumerOID);
                Assert.AreEqual(_testsSharedState.TestContext.UserContext.ResponseUserDTO.UserName, consumerInvitation.CreatorUserName);
            }
        }

        [Given(@"1_0 store last consumer user invitations")]
        [Then(@"1_0 store last consumer user invitations")]
        public void StoreLastConsumerUserInvitation()
        {
            foreach (ConsumerInvitationDTO consumerInvitation in _testsSharedState.TestContext.ConsumerContext.ResponseListConsumerInvitation)
            {
                Assert.IsNotNull(consumerInvitation.CreationDate);
                Assert.IsNotNull(consumerInvitation.ConsumerOID);
                Assert.IsNotNull(consumerInvitation.CreatorUserName);
                _testsSharedState.TestContext.ConsumerContext.ResponseConsumerInvitation = consumerInvitation;
            }
        }
        [Given(@"1_0 a new user invitation with \(Type:'(.*)' UserName:'(.*)' UserEmail:'(.*)' Password:'(.*)' Name:'(.*)'\)")]
        public void ANewUserInvitation(NewConsumerInvitationDTO newUserInvitation)
        {
            _testsSharedState.TestContext.ConsumerContext.ListConsumerInvitation.Add(new NewConsumerInvitationDTO
            {
                Email = newUserInvitation.Email
            });
        }
        [Then(@"1_0 complete consumer user registration \(Password:'(.*)'\)")]
        [When(@"1_0 complete consumer user registration \(Password:'(.*)'\)")]
        [Given(@"1_0 complete consumer user registration \(Password:'(.*)'\)")]
        public async Task CompleteTheRegistration(string password)
        {
            var doc = new HtmlDocument();
            _testsSharedState.TestContext.ContentResponse = _testsSharedState.TestContext.ContentResponse.Replace("\r\n", "");
            doc.LoadHtml(_testsSharedState.TestContext.ContentResponse);
            IDictionary<string, string> contentData = new Dictionary<string, string>();
            contentData.Add("__RequestVerificationToken", CoreSteps.GetVerificationToken(doc));
            contentData.Add("Email", _testsSharedState.TestContext.ConsumerContext.ResponseConsumerInvitation.Email);
            contentData.Add("OID", _testsSharedState.TestContext.ConsumerContext.ResponseConsumerInvitation.OID.ToString());
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
            var response = await _testsSharedState.HttpClient.SendAsync(requestMsg, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }

        [Then(@"1_0 consumer request to link provider by email or phone \(Email:'(.*)' Phone:'(.*)'\)")]
        public async Task ThenConsumerRequestToLinkProviderByPhonePhone(string email, string phone)
        {
            var response = await _testsSharedState.HttpClient.GetAsync($"https://localhost:5002/KeTePongo.ProviderWebAPI/ProviderRequestLink?email={email}&phone={phone}");

            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
        }


        [When(@"1_0 response message contains \(Message: '(.*)'\)")]
        [Then(@"1_0 response message contains \(Message: '(.*)'\)")]
        [Given(@"1_0 response message contains \(Message: '(.*)'\)")]
        public void ThenResponseMessageContains(string message)
        {
            Assert.AreEqual(_testsSharedState.TestContext.ContentResponse.Contains(message), true);
        }

        [When(@"1_0 response is BadRequest")]
        [Then(@"1_0 response is BadRequest")]
        public void ThenResponseIsBadRequestMessage()
        {
            Assert.AreEqual(System.Net.HttpStatusCode.BadRequest, _testsSharedState.TestContext.ResponseStatusCode);
        }

        [Then(@"1_0 request to link a new provider with given response")]
        public async Task ThenRequestToLinkANewProviderWithResponseAsync()
        {
            var providerLinkRequestDTO = JsonConvert.DeserializeObject<KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderLinkRequestDTO>(_testsSharedState.TestContext.ContentResponse);
            _testsSharedState.TestContext.ConsumerContext.NewConsumerProviderDTO = new NewProviderDTO()
            {
                TradeName = "tradename-test",
                Salesman = new UpdateSalesmanDTO() { Email = providerLinkRequestDTO.SalesmanEmail, Telephone = providerLinkRequestDTO.SalesmanTelephone },
            };
            var response = await _testsSharedState.HttpClient.PostAsJsonAsync("https://localhost:5002/KeTePongo.ConsumerWebAPI/Provider/", _testsSharedState.TestContext.ConsumerContext.NewConsumerProviderDTO, ApiVersion);
            _testsSharedState.TestContext.ContentResponse = await response.Content.ReadAsStringAsync();
            _testsSharedState.TestContext.ResponseStatusCode = response.StatusCode;
            if (response.StatusCode == HttpStatusCode.Created)
            {
                _testsSharedState.TestContext.ConsumerContext.ResponseConsumerProviderDTOs.Add(JsonConvert.DeserializeObject<KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1.ProviderDTO>(_testsSharedState.TestContext.ContentResponse));
            }
        }

        [When(@"1_0 consumer data is submitted with consumerType \(ConsumerType:'(.*)' TradeName:'(.*)' Address:'(.*)' StateOrProvince:'(.*)' Town:'(.*)' PostalCode:'(.*)' SanitaryMeasures:'(.*)' Image:'(.*)'\)")]
        public async Task WhenConsumerDataIsSubmittedConsumerTypeTradeNameAddressStateOrProvinceTownPostalCodeSanitaryMeasuresImage(ConsumerType consumerType, string tradeName, string address, string stateOrProvince, string town, string postalCode, string sanitaryMeasures, string image)
        {
            _testsSharedState.TestContext.ConsumerContext.NewConsumerDTO = new NewConsumerDTO()
            {
                ConsumerType = consumerType,
                ImageFile = null,
                TradeName = tradeName,
                Address = address,
                StateOrProvince = stateOrProvince,
                Town = town,
                PostalCode = postalCode,
                SanitaryMeasures = sanitaryMeasures.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList()
            };

            await SubmitDataConsumer();

        }
    }
}

