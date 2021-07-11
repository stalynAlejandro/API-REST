using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using OrchardCore.Modules;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KeTePongo.Notifications.AppServices;
using OrchardCore.Data.Migration;
using YesSql.Indexes;
using KeTePongo.Notifications.Indexes;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.Notifications.EventHandlers;
using AutoMapper;
using KeTePongo.Notifications.Abstractions.Events;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.SignalR;
using KeTePongo.Notifications.Abstractions;
using KeTePongo.Notifications.Hubs;

namespace KeTePongo.Notifications
{
    public class Startup : StartupBase
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR().AddJsonProtocol(
                options =>
                {
                    options.PayloadSerializerOptions.PropertyNamingPolicy = null;
                });
            services.AddScoped<INotificationAppService, NotificationAppService>();
            services.AddScoped<IDataMigration, Migrations>();
            services.AddScoped<Profile, NotificationAutoMapperProfile>();
            services.AddScoped<INotificationPushedEventHandler, NotificationPushedEventHandlerOnNotifications>();
            services.AddScoped<IConsumerUserChangesEventHandler, ConsumerUserChangesEventHandlerOnNotifications>();
            services.AddScoped<IProviderUserChangesEventHandler, ProviderUserChangesEventHandlerOnNotifications>();
            services.AddSingleton<IIndexProvider, ConsumerNotificationsIndexProvider>();
            services.AddSingleton<IIndexProvider, ProviderNotificationsIndexProvider>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public override void Configure(IApplicationBuilder app, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        {
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ConsumerNotificationHub>("/consumerNotifications");
                endpoints.MapHub<ProviderNotificationHub>("/providerNotifications");

            });
        }
    }
}
