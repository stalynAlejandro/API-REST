using Microsoft.Extensions.Localization;
using OrchardCore.Environment.Shell;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI
{
    public class AdminMenu : INavigationProvider
    {
        private readonly ShellSettings _shellSettings;
        public AdminMenu(IStringLocalizer<AdminMenu> localizer, ShellSettings shellSettings)
        {
            T = localizer;
            _shellSettings = shellSettings;
        }

        public IStringLocalizer T { get; set; }

        public Task BuildNavigationAsync(string name, NavigationBuilder builder)
        {
            if (!String.Equals(name, "admin", StringComparison.OrdinalIgnoreCase) || _shellSettings.Name != "Default")
            {
                return Task.CompletedTask;
            }

            builder
            .Add(T["Back Office"], design => design
                    .Add(T["Consumers"], "1", entry => entry
                        .Action("Index", "BackOfficeConsumer", new { area = "KeTePongo.ConsumerWebAPI", groupId = "consumer" })
                        .LocalNav()
                    )
                );
            return Task.CompletedTask;
        }
    }
}
