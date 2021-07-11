using AutoMapper;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public class UserChangesEventHandlerOnConsumer : IUserChangesEventHandler
    {
        private readonly ISession _session;
        private readonly IMapper _mapper;
        private readonly ILogger<UserChangesEventHandlerOnConsumer> _logger;
        private IStringLocalizer S;
        public UserChangesEventHandlerOnConsumer(ISession session,
            IMapper mapper,
            ILogger<UserChangesEventHandlerOnConsumer> logger,
             IStringLocalizer<UserChangesEventHandlerOnConsumer> stringLocalizer)
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
                var consumerUserProfile = _mapper.Map<AddedConfirmedUserContext, ConsumerUserProfile>(context);
                consumerUserProfile.IsActivated = context.UserType == UserType.ConsumerUser;
                _session.Save(consumerUserProfile);
                await _session.CommitAsync();
            }
            catch (Exception e)
            {
                var errorMsg = "Failed to add confirmed user in consumer";
                addError("", S[errorMsg]);
                _logger.LogError(e, errorMsg);
            }
        }
        public async Task UserEmailChangedAsync(UserEmailChangedContext context, Action<string, string> addError)
        {
            if (!context.UserTypes.Contains(UserType.ConsumerUser))
            {
                return;
            }

            try
            {
                var consumerUserProfile = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(i => i.UserName == context.UserName).FirstOrDefaultAsync();
                if (consumerUserProfile == null || (consumerUserProfile.Email == context.NewEmail))
                {
                    _session.Cancel();
                    return;
                }

                consumerUserProfile.Email = context.NewEmail;
                _session.Save(consumerUserProfile);
                await _session.CommitAsync();
            }
            catch (Exception e)
            {
                var errorMsg = "Failed to update user's email in consumer";
                addError("", S[errorMsg]);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task UserPhoneChangedAsync(UserPhoneChangedContext context, Action<string, string> addError)
        {
            if (!context.UserTypes.Contains(UserType.ConsumerUser))
            {
                return;
            }

            try
            {
                var consumerUserProfile = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(i => i.UserName == context.UserName).FirstOrDefaultAsync();
                if (consumerUserProfile == null || (consumerUserProfile.Telephone == context.NewPhone))
                {
                    _session.Cancel();
                    return;
                }
                consumerUserProfile.Telephone = context.NewPhone;
                _session.Save(consumerUserProfile);
                await _session.CommitAsync();
            }
            catch (Exception e)
            {
                var errorMsg = "Failed to update user's telephone in consumer";
                addError("", S[errorMsg]);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task UpdatedUserAsync(UpdatedUserContext context, Action<string, string> addError)
        {
            if (!context.UserTypes.Contains(UserType.ConsumerUser))
            {
                return;
            }

            try
            {
                var consumerUserProfile = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(i => i.UserName == context.UserName).FirstOrDefaultAsync();
                if (consumerUserProfile == null)
                {
                    _session.Cancel();
                    return;
                }
                consumerUserProfile.Name = context.UpdatedUser.Name;
                _session.Save(consumerUserProfile);
                await _session.CommitAsync();
            }
            catch (Exception e)
            {
                var errorMsg = "Failed to update user's name in consumer";
                addError("", S[errorMsg]);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}
