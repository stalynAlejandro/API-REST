using Microsoft.Extensions.Options;
using OrchardCore.Settings;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Logging;
using OrchardCore.Entities;
using KeTePongo.SMS.Abstractions;

namespace KeTePongo.SMS.Services
{
    public class SMSSettingsConfiguration : IConfigureOptions<SMSSettings>
    {
        private readonly ISiteService _site;
        private readonly IDataProtectionProvider _dataProtectionProvider;
        private readonly ILogger _logger;

        public SMSSettingsConfiguration
        (
            ISiteService site, 
            IDataProtectionProvider dataProtectionProvider,
            ILogger<SMSSettingsConfiguration> logger
        )
        {
            _site = site;
            _dataProtectionProvider = dataProtectionProvider;
            _logger = logger;
        }

        public void Configure(SMSSettings options)
        {
            var settings = _site.GetSiteSettingsAsync().GetAwaiter().GetResult().As<SMSSettings>();

            options.Sender = settings.Sender;
            options.DeliveryMethod = settings.DeliveryMethod;
            options.API_KEY = settings.API_KEY;
            options.PickupDirectoryLocation = settings.PickupDirectoryLocation;
            options.IsLookupEnabled = settings.IsLookupEnabled;

        }
    }
}
