using System.Collections.Generic;
using System.Threading.Tasks;
using KeTePongo.SMS.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using OrchardCore.DisplayManagement.Entities;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Environment.Shell;
using OrchardCore.Settings;

namespace KeTePongo.SMS.Drivers
{
    public class SMSSettingsDisplayDriver : SectionDisplayDriver<ISite, SMSSettings>
    {
        public const string GroupId = "sms";
        private readonly IShellHost _shellHost;
        private readonly ShellSettings _shellSettings;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAuthorizationService _authorizationService;

        public SMSSettingsDisplayDriver(
            IShellHost shellHost,
            ShellSettings shellSettings,
            IHttpContextAccessor httpContextAccessor,
            IAuthorizationService authorizationService)
        {
            _shellHost = shellHost;
            _shellSettings = shellSettings;
            _httpContextAccessor = httpContextAccessor;
            _authorizationService = authorizationService;
        }

        public override async Task<IDisplayResult> EditAsync(SMSSettings section, BuildEditorContext context)
        {
            if(context.GroupId != GroupId)
            {
                return null;
            }

            var user = _httpContextAccessor.HttpContext?.User;

            if (!await _authorizationService.AuthorizeAsync(user, Permissions.ManageSMSSettings))
            {
                return null;
            }

            var shapes = new List<IDisplayResult>
            {
                Initialize<SMSSettings>("SMSSettings_Edit", model =>
                {
                    model.Sender = section.Sender;
                    model.DeliveryMethod = section.DeliveryMethod;
                    model.PickupDirectoryLocation = section.PickupDirectoryLocation;
                    model.API_KEY = section.API_KEY;
                    model.IsLookupEnabled = section.IsLookupEnabled;
                }).Location("Content:5").OnGroup(GroupId)
            };

            if (section?.Sender != null)
            {
                shapes.Add(Dynamic("SMSSettings_TestButton").Location("Actions").OnGroup(GroupId));
            }

            return Combine(shapes);
        }

        public override async Task<IDisplayResult> UpdateAsync(SMSSettings section, BuildEditorContext context)
        {
            var user = _httpContextAccessor.HttpContext?.User;

            if (!await _authorizationService.AuthorizeAsync(user, Permissions.ManageSMSSettings))
            {
                return null;
            }
            if(context.GroupId == GroupId)
            {
                await context.Updater.TryUpdateModelAsync(section, Prefix);
                await _shellHost.ReleaseShellContextAsync(_shellSettings);
            }

            return await EditAsync(section, context);
        }
    }
}
