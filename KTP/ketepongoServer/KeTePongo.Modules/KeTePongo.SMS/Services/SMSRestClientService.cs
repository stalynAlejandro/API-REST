using RestSharp;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Threading.Tasks;
using KeTePongo.SMS.Abstractions;

namespace KeTePongo.SMS.Services
{
    public class SMSRestClientService : ISMSRestClientService
    {
        public SMSRestClientService() { }
        public async Task<IRestResponse> GetSMSRestClient(string url, object body, Method method)
        {
            var client = new RestClient(url);
            var request = new RestRequest(method);
            request.AddHeader("accept", "application/json");
            request.AddHeader("content-type", "application/json");
            request.AddJsonBody(JsonConvert.SerializeObject(body, new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver { NamingStrategy = new SnakeCaseNamingStrategy() },
                Formatting = Formatting.Indented
            }));

            return await client.ExecuteAsync(request);
        }
    }
}
