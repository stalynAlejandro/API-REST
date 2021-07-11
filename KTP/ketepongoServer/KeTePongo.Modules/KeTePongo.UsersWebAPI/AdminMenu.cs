using Microsoft.Extensions.Localization;
using OrchardCore.Environment.Shell;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.UserWebAPI
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
                    .Add(T["Users"], "0", entry => entry
                        .Action("Index", "BackOfficeUser", new { area = "KeTePongo.UsersWebAPI", groupId = "users" })
                        .LocalNav()
                    )
                )
                .Add(T["Back Office"], design => design
                    .Add(T["Client Apps Min Version"], "0", entry => entry
                        .Action("Index", "BackOfficeOpenIdAppMinVersion", new { area = "KeTePongo.UsersWebAPI", groupId = "users" })
                        .LocalNav()
                    )
                )
             .Add(T["Back Office"], design => design
                    .Add(T["Client Apps Provider"], "0", entry => entry
                        .Action("Index", "BackOfficeOpenIdAppProvider", new { area = "KeTePongo.UsersWebAPI", groupId = "users" })
                        .LocalNav()
                    )
                );

            return Task.CompletedTask;
        }
    }
}
