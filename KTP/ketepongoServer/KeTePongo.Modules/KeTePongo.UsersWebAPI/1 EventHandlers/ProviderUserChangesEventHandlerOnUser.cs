using KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.UsersWebAPI.Models;
using Microsoft.AspNetCore.Identity;
using OrchardCore.Users;
using System;
using System.Threading.Tasks;
using OrchardCore.Entities;
using OrchardCore.Users.Models;
using KeTePongo.Core.AppServices;
using YesSql;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace KeTePongo.UsersWebAPI.EventHandlers
{
    public class ProviderUserChangesEventHandlerOnUser : IProviderUserChangesEventHandler
    {
        private readonly UserManager<IUser> _userManager;
        private readonly ISession _session;
        private readonly ILogger<ProviderUserChangesEventHandlerOnUser> _logger;
        public ProviderUserChangesEventHandlerOnUser(UserManager<IUser> userManager, ISession session, ILogger<ProviderUserChangesEventHandlerOnUser> logger)
        {
            _userManager = userManager;
            _session = session;
            _logger = logger;
        }
        public async Task AddedUsersToAProviderAsync(AddedUsersToAProviderContext context, Action<string, string> addError)
        {
            try
            {
                foreach (var userName in context.UserNames)
                {
                    var user = (await _userManager.FindByNameAsync(userName)) as User;
                    user.RoleNames = user.RoleNames.Where(r => !r.Contains(_userManager.NormalizeName("Provider"))).ToList();
                    if (context.TargetProviderOID == 0)
                    {
                        user.RoleNames.Add(_userManager.NormalizeName(Roles.NoProviderUserRoleName));
                    }
                    else
                    {
                        if (context.IsAdminUser)
                        {
                            user.RoleNames.Add(_userManager.NormalizeName(Roles.ProviderAdminUserRoleName));
                        }
                        else
                        {
                            user.RoleNames.Add(_userManager.NormalizeName(Roles.ProviderUserRoleName));
                        }
                    }

                    var userProfile = user.As<UserProfile>();
                    userProfile.ProviderOID = context.TargetProviderOID;
                    user.Put<UserProfile>(userProfile);
                    await _userManager.UpdateAsync(user);
                    await _session.CommitAsync();
                }
                //To-Do: store in cache user and current datetime, then a filter fill read every token received and will check if
                //it issued date/time is previous to stored datetime in cache it will be revoke. So, the user will be forced to request another 
                //token
            }
            catch (Exception e)
            {
                var errorMsg = "Error añadiendo usuarios provider en usuarios";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}