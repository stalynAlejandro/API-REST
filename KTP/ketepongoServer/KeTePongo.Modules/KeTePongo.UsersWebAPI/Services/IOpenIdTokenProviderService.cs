using KeTePongo.UsersWebAPI.Models.Authentication;
using Microsoft.AspNetCore.Authentication;
using OrchardCore.Users;
using OrchardCore.Users.Models;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Services
{
    public interface IOpenIdTokenProviderService
    {
        Task<AuthenticationTicket> GetOpenIdAuthenticationTicketAsync(ExternalProviderAccessTokenRequest accessTokenRequest);
        Task<AuthenticationTicket> CreateOpenIdAccesTokenAsync(string email);
        Task<AuthenticationTicket> CreateOpenIdAccesTokenAsync(IUser user);
        Task LogoutAsync(IUser user, string userId);
    }
}
