using System.Security.Claims;
using System.Threading.Tasks;
using KeTePongo.UsersWebAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using OrchardCore.Security;
using OrchardCore.Users;
using OrchardCore.Users.Models;
using OrchardCore.Entities;
using OrchardCore.Users.Services;
using YesSql;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions;
using System;
using KeTePongo.Core.AppServices;

namespace KeTePongo.UsersWebAPI.Services
{
    public class KeTePongoUserClaimsFactory : DefaultUserClaimsPrincipalFactory
    {
        public KeTePongoUserClaimsFactory(
            UserManager<IUser> userManager,
            RoleManager<IRole> roleManager,
            IOptions<IdentityOptions> identityOptions) : base(userManager, roleManager, identityOptions) {}
        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(IUser user)
        {
            var claims = await base.GenerateClaimsAsync(user);
            var userProfile = (user as User).As<UserProfile>();

            if (userProfile.ConsumerOID != 0)
            {
                claims.AddClaim(new Claim(ConsumerClaimsConsts.ConsumerOID, userProfile.ConsumerOID.ToString()));
            }
            if (userProfile.ProviderOID != 0)
            {
                claims.AddClaim(new Claim(CrossModuleClaims.ProviderOID, userProfile.ProviderOID.ToString()));
            }

            return claims;
        }
    }
}
