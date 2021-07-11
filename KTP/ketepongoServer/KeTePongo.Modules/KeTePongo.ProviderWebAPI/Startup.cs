using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.ProviderWebAPI.EventHandlers;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Modules;
using AutoMapper;
using System.Reflection;
using OrchardCore.Security.Permissions;
using OrchardCore.Data.Migration;
using YesSql.Indexes;
using KeTePongo.ProviderWebAPI.Indexes;
using System;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using System.Linq;
using KeTePongo.Core.Extensions;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using OrchardCore.Navigation;
using Microsoft.AspNetCore.Mvc;
using KeTePongo.Core.YesSqlCollections;
using KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument;
using Swashbuckle.AspNetCore.Filters;
using OrchardCore.ResourceManagement;
using KeTePongo.ProviderWebAPI.Models.Examples;
using KeTePongo.ProviderWebAPI.BackgroundAppServices;

namespace KeTePongo.ProviderWebAPI
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IModuleCollections, ModuleCollections>();
            services.AddScoped<IUserChangesEventHandler, UserChangesEventHandlerOnProvider>();
            services.AddScoped<IProductChangesEventHandler, ConsumerConsumptionProductChangesEventHandlerOnProvider>();
            services.AddScoped<INewConsumerOrderCreatedEventHandler, NewConsumerOrderCreatedEventHandlerOnProvider>();
            services.AddScoped<IConsumerProviderChangesEventHandler, ConsumerProviderChangesEventHandlerOnProvider>();
            services.AddScoped<IConsumerUserChangesEventHandler, ConsumerUserChangesEventHandlerOnProvider>();
            services.AddScoped<IConsumerChangesEventHandler, ConsumerChangesEventHandlerOnProvider>();
            services.AddScoped<IOpenIdAppProviderEventHandler, OpenIdAppProviderEventHandlerOnProvider>();
            services.AddScoped<IERPProviderCatalogProductsChangesEventHandler, ERPProviderCatalogProductsChangesEventHandlerOnProvider>();
            services.AddScoped<IERPClientsPortfolioProviderChangesEventHandler, ERPClientsPortfolioProviderChangesEventHandlerOnProvider>();

            services.AddScoped<IProviderAppService, ProviderAppService>();
            services.AddScoped<IProviderUserProfileAppService, ProviderUserProfileAppService>();
            services.AddScoped<ISectionAppService, SectionAppService>();
            services.AddScoped<ICatalogProductAppService, CatalogProductAppService>();
            services.AddScoped<IProviderCatalogProductsAppService, ProviderCatalogProductsAppService>();
            services.AddScoped<IProviderOrderAppService, ProviderOrderAppService>();
            services.AddScoped<IERPClientsPortfolioAppService, ERPClientsPortfolioAppService>();
            services.AddScoped<IERPProviderCatalogProductsAppService, ERPProviderCatalogProductsAppService>();
            services.AddScoped<ICatalogProductsInConsumerConsumptionBackgroundAppService, CatalogProductsInConsumerConsumptionBackgroundAppService>();
            services.AddScoped<IERPProviderCatalogProductsChangesBackgroundAppService, ERPProviderCatalogProductsChangesBackgroundAppService>();
            services.AddScoped<IERPClientsPortfolioBackgroundAppService, ERPClientsPortfolioBackgroundAppService>();


            services.AddScoped<IManifestAppService, ManifestAppService>();
            services.AddScoped<IConsumerProviderLinkingBackgroundAppService, ConsumerProviderLinkingBackgroundAppService>();
            services.AddScoped<IConsumersOfAProviderSalesmanAppService, ConsumersOfAProviderSalesmanAppService>();

            services.AddSingleton<IIndexProvider, ProviderIndexProvider>();
            services.AddSingleton<IIndexProvider, ProviderInvitationIndexProvider>();
            services.AddSingleton<IIndexProvider, ProviderUserProfileIndexProvider>();
            services.AddSingleton<IIndexProvider, ConsumerUserIndexProvider>();
            services.AddSingleton<IIndexProvider, ProviderOrderIndexProvider>();
            services.AddSingleton<IIndexProvider, ProviderCatalogProductsIndexProvider>();
            services.AddSingleton<IIndexProvider, ERPClientsPortfolioIndexProvider>();
            services.AddSingleton<IIndexProvider, ConsumersOfAProviderSalesmanIndexIndexProvider>();
            services.AddSingleton<IIndexProvider, CatalogProductInConsumerConsumptionIndexProvider>();
            services.AddSingleton<IIndexProvider, ERPMostConsumedCatalogProductsIndexProvider>();


            services.AddScoped<IDataMigration, Migrations>();
            services.AddScoped<IPermissionProvider, Permissions>();
            services.AddScoped<INavigationProvider, AdminMenu>();
            services.AddScoped<Profile, ProviderAutoMapperProfile>();
            services.AddSwaggerExamplesFromAssemblyOf<CatalogProductExampleProvider>();
            services.AddSwaggerExamplesFromAssemblyOf<CatalogProductsExampleProvider>();
            services.ReplaceAutoMapper();
            services.Configure<MvcOptions>((options) =>
            {
                options.Filters.Add(typeof(VersionFilter));
            });
            services.AddScoped<IResourceManifestProvider, ResourceManifest>();
        }

        public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        {
            //var mapper = serviceProvider.GetService<IMapper>();
            //mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
