using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Data.Migration;
using OrchardCore.Modules;
using System;
using AutoMapper;
using OrchardCore.Security.Permissions;
using OrchardCore.Navigation;
using YesSql.Indexes;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.Core.Extensions;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.ConsumerWebAPI.EventHandlers;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.Environment.Commands;
using KeTePongo.ConsumerWebAPI.Commands;
using KeTePongo.Core.YesSqlCollections;
using KeTePongo.ConsumerWebAPI.BackgroundAppServices;

namespace KeTePongo.ConsumerWebAPI
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IModuleCollections, ModuleCollections>();
            services.AddScoped<IUserChangesEventHandler, UserChangesEventHandlerOnConsumer>();
            services.AddScoped<IProviderOrderChangesEventHandler, ProviderOrderChangesEventHandlerOnConsumer>();
            services.AddScoped<IProviderProductsChangedEventHandler, ProviderProductsChangedEventHandler>();
            services.AddScoped<IProviderChangesEventHandler, ProviderChangesEventHandlerOnConsumer>();
            services.AddScoped<IERPClientsPortfolioProviderChangesEventHandler, ERPClientsPortfolioProviderChangesEventHandlerOnConsumer>();
            services.AddScoped<IConsumerValidationByProviderEventHandler, ConsumerValidationByProviderEventHandler>();
            services.AddScoped<IERPProviderCatalogProductsChangesEventHandler, ERPProviderCatalogProductsChangesEventHandlerOnConsumer>();

            services.AddScoped<ILocationAppService, LocationAppService>();
            services.AddScoped<IProviderAppService, ProviderAppService>();
            services.AddScoped<IProductAppService, ProductAppService>();
            services.AddScoped<IConsumerAppService, ConsumerAppService>();
            services.AddScoped<IConsumptionAppService, ConsumptionAppService>();
            services.AddScoped<IConsumerOrderAppService, ConsumerOrderAppService>();
            services.AddScoped<IConsumerUserProfileAppService, ConsumerUserProfileAppService>();
            services.AddScoped<IConsumerProviderBackgroundAppService, ConsumerProviderBackgroundAppService>();
            services.AddScoped<IProviderBackgroundAppService, ProviderBackgroundAppService>();
            services.AddScoped<IConsumptionProductsBackgroundAppService, ConsumptionProductsBackgroundAppService>();
            
            services.AddScoped<IManifestAppService, ManifestAppService>();

            services.AddSingleton<IIndexProvider, ConsumerUserProfileIndexProvider>();
            services.AddSingleton<IIndexProvider, ConsumptionIndexProvider>();
            services.AddSingleton<IIndexProvider, ConsumerOrderIndexProvider>();
            services.AddSingleton<IIndexProvider, ConsumerIndexProvider>();
            services.AddSingleton<IIndexProvider, ConsumerInvitationIndexProvider>();

            services.AddScoped<ICommandHandler, GenerateRandomCodesCommand>();
            services.AddScoped<IDataMigration, Migrations>();
            services.AddScoped<IPermissionProvider, Permissions>();
            services.AddScoped<INavigationProvider, AdminMenu>();
            services.AddScoped<Profile, ConsumerAutoMapperProfile>();
            services.ReplaceAutoMapper();
            services.Configure<MvcOptions>((options) =>
            {
                options.Filters.Add(typeof(VersionFilter));
            });
        }

        public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        {
            //var mapper = serviceProvider.GetService<IMapper>();
            //mapper.ConfigurationProvider.AssertConfigurationIsValid();
            routes.MapAreaControllerRoute(
                name: "Dashboard_consumer",
                areaName: "KeTePongo.ConsumerWebAPI",
                pattern: "Dashboard/Consumer",
                defaults: new { controller = "Consumer", action = "Index" }
            );

            routes.MapAreaControllerRoute(
                name: "Dashboard_users",
                areaName: "KeTePongo.ConsumerWebAPI",
                pattern: "Dashboard/Users",
                defaults: new { controller = "User", action = "Index" }
            );
            routes.MapAreaControllerRoute(
                name: "GoogleRedirectUri",
                areaName: "KeTePongo.ConsumerWebAPI",
                pattern: "KeTePongo.ConsumerWebAPI/google/oauth2",
                defaults: new { controller = "GoogleRedirectUri", action = "RedirectToApp" }
            );
        }
    }
}

