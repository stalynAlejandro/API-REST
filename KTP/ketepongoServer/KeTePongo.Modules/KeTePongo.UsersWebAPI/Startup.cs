using AutoMapper;
using KeTePongo.Core.Extensions;
using KeTePongo.UsersWebAPI.Services;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Modules;
using OrchardCore.Security.Permissions;
using KeTePongo.UsersWebAPI.Extensions;
using System;
using OrchardCore.Data.Migration;
using YesSql.Indexes;
using KeTePongo.UsersWebAPI.EventHandlers;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using OrchardCore.Navigation;
using Microsoft.AspNetCore.Mvc;
using KeTePongo.Core.YesSqlCollections;
using CoreUsers = OrchardCore.Users;
using Microsoft.Extensions.DependencyInjection.Extensions;
using OrchardCore.Users;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using KeTePongo.UsersWebAPI.Indexes;

namespace KeTePongo.UsersWebAPI
{
    public class Startup : StartupBase
    {
        private const string ForgotPasswordPath = "ForgotPassword";
        private const string ForgotPasswordConfirmationPath = "ForgotPasswordConfirmation";
        private const string ResetPasswordPath = "ResetPassword";
        private const string ResetPasswordConfirmationPath = "ResetPasswordConfirmation";

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IModuleCollections, ModuleCollections>();
            services.AddScoped<IMyRoleUpdater, MyRoleUpdater>();
            services.AddScoped<IUserAppService, UserAppService>();
            services.AddScoped<IPermissionProvider, Permissions>();
            services.AddScoped<IOpenIdTokenProviderService, OpenIdTokenProviderService>();
            services.AddScoped<IExternalTokenProviderService, GoogleTokenProviderService>();

            services.AddScoped<IConsumerUserChangesEventHandler, ConsumerUserChangesEventHandlerOnUser>();
            services.AddScoped<IProviderUserChangesEventHandler, ProviderUserChangesEventHandlerOnUser>();
            services.AddScoped<IProviderChangesEventHandler, ProviderChangesEventHandlerOnUser>();

            services.AddOpenIddict().AddServer().SetAccessTokenLifetime(null);
            services.AddScoped<Profile, UsersAutoMapperProfile>();
            services.AddScoped<IDataMigration, Migrations>();
            services.AddScoped<INavigationProvider, KeTePongo.UserWebAPI.AdminMenu>();
            services.AddScoped<IManifestAppService, ManifestAppService>();
            services.AddScoped<IOpenIdAppMinVersionAppService, OpenIdAppMinVersionAppService>();
            services.AddScoped<IOpenIdAppProviderAppService, OpenIdAppProviderAppService>();
            services.AddScoped<IProviderAppService, ProviderAppService>();

            services.ReplaceAutoMapper();
            services.ReplaceUserClaimsPrincipalFactory();
            services.AddSingleton<IIndexProvider, CoreUsers.Indexes.KeTePongoUserIndexProvider>();
            services.AddSingleton<IIndexProvider, CoreUsers.Indexes.KeTePongoUserWithPhoneIndexProvider>();
            services.AddSingleton<IIndexProvider, ProviderOnUserIndexProvider>();
            

            services.Configure<MvcOptions>((options) =>
            {
                options.Filters.Add(typeof(VersionFilter));
            });

            services.TryAddScoped<UserStoreWithPhoneImplementation>();
            services.TryAddScoped<IUserStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            services.TryAddScoped<IUserRoleStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            services.TryAddScoped<IUserPasswordStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            services.TryAddScoped<IUserEmailStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            services.TryAddScoped<IUserSecurityStampStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            services.TryAddScoped<IUserLoginStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            services.TryAddScoped<IUserClaimStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            services.TryAddScoped<IUserAuthenticationTokenStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            services.TryAddScoped<IUserPhoneNumberStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            ReplaceUserStoreModule(services);
        }

        public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaControllerRoute(
                name: "ForgotPassword",
                areaName: "KeTePongo.UsersWebAPI",
                pattern: ForgotPasswordPath,
                defaults: new { controller = "ResetPassword", action = "ForgotPassword" }
            );
            routes.MapAreaControllerRoute(
                name: "ForgotPasswordConfirmation",
                areaName: "KeTePongo.UsersWebAPI",
                pattern: ForgotPasswordConfirmationPath,
                defaults: new { controller = "ResetPassword", action = "ForgotPasswordConfirmation" }
            );
            routes.MapAreaControllerRoute(
                name: "ResetPassword",
                areaName: "KeTePongo.UsersWebAPI",
                pattern: ResetPasswordPath,
                defaults: new { controller = "ResetPassword", action = "ResetPassword" }
            );
            routes.MapAreaControllerRoute(
                name: "ResetPasswordConfirmation",
                areaName: "KeTePongo.UsersWebAPI",
                pattern: ResetPasswordConfirmationPath,
                defaults: new { controller = "ResetPassword", action = "ResetPasswordConfirmation" }
            );
        }

        private void ReplaceUserStoreModule(IServiceCollection serviceCollection)
        {
            var orchardUserStoreImplementation = serviceCollection.FirstOrDefault(sd => sd.ServiceType == typeof(IUserStore<IUser>));
            if (orchardUserStoreImplementation != null)
            {
                serviceCollection.Remove(orchardUserStoreImplementation);
            }
            serviceCollection.TryAddScoped<UserStoreWithPhoneImplementation>();
            serviceCollection.TryAddScoped<IUserStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
            serviceCollection.TryAddScoped<IUserPhoneNumberStore<IUser>>(sp => sp.GetRequiredService<UserStoreWithPhoneImplementation>());
        }
    }
}