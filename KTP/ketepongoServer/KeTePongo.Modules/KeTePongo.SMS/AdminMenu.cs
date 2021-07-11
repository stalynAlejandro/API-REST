using KeTePongo.SMS.Drivers;
using Microsoft.Extensions.Localization;
using OrchardCore.Navigation;
using System;
using System.Threading.Tasks;

namespace KeTePongo.SMS
{
    public class AdminMenu : INavigationProvider
    {
        private readonly IStringLocalizer S;

        public AdminMenu(IStringLocalizer<AdminMenu> localizer)
        {
            S = localizer;
        }

        public Task BuildNavigationAsync(string name, NavigationBuilder builder)
        {
            if (!String.Equals(name, "admin", StringComparison.OrdinalIgnoreCase))
                return Task.CompletedTask;

            builder
                .Add(S["Configuration"], configuration => configuration
                    .Add(S["Settings"], settings => settings
                       .Add(S["SMS"], S["SMS"].PrefixPosition(), entry => entry
                       .AddClass("SMS").Id("SMS")
                          .Action("Index", "Admin", new { area = "OrchardCore.Settings", groupId = SMSSettingsDisplayDriver.GroupId })
                          .Permission(Permissions.ManageSMSSettings)
                          .LocalNav()
                )));

            return Task.CompletedTask;
        }
    }
}
