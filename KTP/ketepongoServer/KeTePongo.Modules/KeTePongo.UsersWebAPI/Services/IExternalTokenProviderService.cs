using KeTePongo.UsersWebAPI.Models.Authentication;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Services
{
    public interface IExternalTokenProviderService
    {
        Task<AccessToken> GetAccessTokenAsync(ExternalProviderAccessTokenRequest accessTokenRequest);
        string GetEmail(AccessToken accessToken);
    }
}
