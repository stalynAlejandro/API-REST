using RestSharp;
using System.Threading.Tasks;

namespace KeTePongo.SMS.Abstractions
{
    public interface ISMSRestClientService
    {
        Task<IRestResponse> GetSMSRestClient(string url, object body, Method method);
    }
}
