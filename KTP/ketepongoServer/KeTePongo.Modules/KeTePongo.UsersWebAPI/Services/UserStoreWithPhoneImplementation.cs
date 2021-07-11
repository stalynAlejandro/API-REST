using Microsoft.AspNetCore.Identity;
using OrchardCore.Users;
using OrchardCore.Users.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Logging;
using OrchardCore.Modules;
using OrchardCore.Security.Services;
using OrchardCore.Users.Handlers;
using YesSql;
using KeTePongo.UsersWebAPI.Models;
using OrchardCore.Users.Models;
using OrchardCore.Entities;

namespace KeTePongo.UsersWebAPI.Services
{
    public class UserStoreWithPhoneImplementation : UserStore,
        IUserPhoneNumberStore<IUser>
    {
        public UserStoreWithPhoneImplementation(ISession session,
           IRoleService roleService,
           ILookupNormalizer keyNormalizer,
           ILogger<UserStore> logger,
           IEnumerable<IUserEventHandler> handlers,
           IDataProtectionProvider dataProtectionProvider) : base(session, roleService, keyNormalizer, logger, handlers, dataProtectionProvider)
        {
        }

        public async Task<string> GetPhoneNumberAsync(IUser user, CancellationToken cancellationToken)
        {
            return await Task.FromResult((user as User).As<UserProfile>().PhoneNumber);
        }

        public async Task<bool> GetPhoneNumberConfirmedAsync(IUser user, CancellationToken cancellationToken)
        {
            return string.IsNullOrWhiteSpace(await GetPhoneNumberAsync(user, cancellationToken));
        }

        public Task SetPhoneNumberAsync(IUser user, string phoneNumber, CancellationToken cancellationToken)
        {
            var orchardUser = user as User;
            var userProfile = orchardUser.As<UserProfile>();
            userProfile.PhoneNumber = phoneNumber;
            orchardUser.Put<UserProfile>(userProfile);
            return Task.CompletedTask;
        }

        public Task SetPhoneNumberConfirmedAsync(IUser user, bool confirmed, CancellationToken cancellationToken)
        {
            var orchardUser = user as User;
            var userProfile = orchardUser.As<UserProfile>();
            userProfile.IsPhoneConfirmed = confirmed;
            orchardUser.Put<UserProfile>(userProfile);
            return Task.CompletedTask;
        }

    }
}
