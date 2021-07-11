using AutoMapper;
using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.ProviderWebAPI.Indexes;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public class UserChangesEventHandlerOnProvider : IUserChangesEventHandler
    {
        private readonly ISession _session;
        private readonly IMapper _mapper;
        private readonly ILogger<UserChangesEventHandlerOnProvider> _logger;
        private IStringLocalizer S;
        public UserChangesEventHandlerOnProvider(ISession session,
            IMapper mapper,
            ILogger<UserChangesEventHandlerOnProvider> logger,
            IStringLocalizer<UserChangesEventHandlerOnProvider> stringLocalizer)
        {
            _session = session;
            _mapper = mapper;
            _logger = logger;
            S = stringLocalizer;

        }
        public async Task AddedConfirmedUserAsync(AddedConfirmedUserContext context, Action<string, string> addError)
        {
            try
            {
                var providerUserProfile = _mapper.Map<AddedConfirmedUserContext, ProviderUserProfile>(context);
                providerUserProfile.IsActivated = context.UserType == UserType.ProviderUser;
                _session.Save(providerUserProfile);
                if (context.UserType == UserType.ConsumerUser)
                {
                    var consumerUser = _mapper.Map<AddedConfirmedUserContext, ConsumerUser>(context);
                    _session.Save(consumerUser);
                }
                await _session.CommitAsync();
            }
            catch (Exception e)
            {
                var errorMsg = "Failed to add confirmed user in provider";
                addError("", S[errorMsg]);
                _logger.LogError(e, errorMsg);
            }
        }
        public async Task UserEmailChangedAsync(UserEmailChangedContext context, Action<string, string> addError)
        {
            if (!context.UserTypes.Contains(UserType.ProviderUser))
            {
                return;
            }

            try
            {
                var providerUserProfile = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(i => i.UserName == context.UserName).FirstOrDefaultAsync();
                if (providerUserProfile == null || (providerUserProfile.Email == context.NewEmail))
                {
                    return;
                }
                providerUserProfile.Email = context.NewEmail;
                _session.Save(providerUserProfile);
                if (context.UserTypes.Any(ut => ut == UserType.ConsumerUser))
                {
                    ConsumerUser consumerUser = await _session.Query<ConsumerUser, ConsumerUserIndex>(i => i.UserName == context.UserName).FirstOrDefaultAsync();
                    if (consumerUser == null || (consumerUser.Email == context.NewEmail))
                    {
                        _session.Cancel();
                        return;
                    }
                    consumerUser.Email = context.NewEmail;
                    _session.Save(consumerUser);
                }
                await _session.CommitAsync();
            }
            catch (Exception e)
            {
                var errorMsg = "Failed to update user's email in provider";
                addError("", S[errorMsg]);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task UserPhoneChangedAsync(UserPhoneChangedContext context, Action<string, string> addError)
        {
            if (!context.UserTypes.Contains(UserType.ProviderUser))
            {
                return;
            }

            try
            {
                var providerUserProfile = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(i => i.UserName == context.UserName).FirstOrDefaultAsync();
                if (providerUserProfile == null || (providerUserProfile.Telephone == context.NewPhone))
                {
                    _session.Cancel();
                    return;
                }
                providerUserProfile.Telephone = context.NewPhone;
                _session.Save(providerUserProfile);
                await _session.CommitAsync();
            }
            catch (Exception e)
            {
                var errorMsg = "Failed to update user's telephone in provider";
                addError("", S[errorMsg]);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task UpdatedUserAsync(UpdatedUserContext context, Action<string, string> addError)
        {
            if (!context.UserTypes.Contains(UserType.ProviderUser))
            {
                return;
            }

            try
            {
                var providerUserProfile = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(i => i.UserName == context.UserName).FirstOrDefaultAsync();
                if (providerUserProfile == null)
                {
                    _session.Cancel();
                    return;
                }
                providerUserProfile.Name = context.UpdatedUser.Name;
                _session.Save(providerUserProfile);
                await _session.CommitAsync();
            }
            catch (Exception e)
            {
                var errorMsg = "Failed to update user's name in provider";
                addError("", S[errorMsg]);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}
