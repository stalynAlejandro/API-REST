using KeTePongoServer.Extensions.DbAccess;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.ResourceManagement.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeTePongoServer.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static OrchardCoreBuilder AddOrchardCmsForKTP(this IServiceCollection services)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            var builder = services.AddOrchardCore()

                .AddCommands()

                .AddMvc()
                .AddEmailAddressValidator()
                .AddHtmlSanitizer()
                .AddSetupFeatures("OrchardCore.Setup")

                //.AddDataAccess()
                .AddKTPDataAccess()
                .AddDataStorage()
                .AddBackgroundService()

                .AddTheming()
                .AddLiquidViews()
                .AddCaching();

            // OrchardCoreBuilder is not available in OrchardCore.ResourceManagement as it has to
            // remain independent from OrchardCore.
            builder.ConfigureServices(s =>
            {
                s.AddResourceManagement();

                s.AddTagHelpers<LinkTagHelper>();
                s.AddTagHelpers<MetaTagHelper>();
                s.AddTagHelpers<ResourcesTagHelper>();
                s.AddTagHelpers<ScriptTagHelper>();
                s.AddTagHelpers<StyleTagHelper>();
            });

            return builder;
        }
    }
}
