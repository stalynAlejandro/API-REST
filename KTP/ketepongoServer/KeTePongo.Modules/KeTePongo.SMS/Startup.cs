using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Modules;
using System;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;
using OrchardCore.Security.Permissions;
using KeTePongo.SMS.Controllers;
using OrchardCore.Mvc.Core.Utilities;
using OrchardCore.Settings;
using KeTePongo.SMS.Drivers;
using KeTePongo.SMS.Services;
using OrchardCore.Admin;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.Navigation;
using KeTePongo.SMS.Abstractions;
using KeTePongo.Core.Services;
using KeTePongo.SMS.Recipes;
using OrchardCore.Recipes.Services;

namespace KeTePongo.SMS
{
    public class Startup : StartupBase
    {
        private readonly AdminOptions _adminOptions;

        public Startup(IOptions<AdminOptions> adminOptions)
        {
            _adminOptions = adminOptions.Value;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IPermissionProvider, Permissions>();
            services.AddScoped<IDisplayDriver<ISite>, SMSSettingsDisplayDriver>();
            services.AddScoped<INavigationProvider, AdminMenu>();

            services.AddTransient<IConfigureOptions<SMSSettings>, SMSSettingsConfiguration>();
            services.AddScoped<ISMSService, SMSService>();
            services.AddScoped<ISMSRestClientService, SMSRestClientService>();
            services.AddScoped<IRecipeStepHandler, SMSSettingsStep>();
        }

        public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaControllerRoute(
                name: "SMSIndex",
                areaName: "KeTePongo.SMS",
                pattern: _adminOptions.AdminUrlPrefix + "/SMS/Index",
                defaults: new { controller = typeof(AdminController).ControllerName(), action = nameof(AdminController.Index) }
            );
        }
    }
}
