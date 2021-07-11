using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using KeTePongo.UsersWebAPI.Services;
using CoreUsers = OrchardCore.Users;

namespace KeTePongo.UsersWebAPI.Extensions
{
    public static class ServiceCollectionExtensions
    {

        public static void ReplaceUserClaimsPrincipalFactory(this IServiceCollection serviceCollection)
        {
            var orchardUserClaimsFactory = serviceCollection.FirstOrDefault(sd => sd.ServiceType == typeof(IUserClaimsPrincipalFactory<CoreUsers.IUser>));
            if (orchardUserClaimsFactory != null)
            {
                serviceCollection.Remove(orchardUserClaimsFactory);
            }
            serviceCollection.AddScoped<IUserClaimsPrincipalFactory<CoreUsers.IUser>, KeTePongoUserClaimsFactory>();
        }
    }
}
