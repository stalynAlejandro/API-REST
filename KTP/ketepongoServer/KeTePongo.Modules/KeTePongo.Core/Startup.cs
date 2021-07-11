using KeTePongo.Core.Filters;
using KeTePongo.Core.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.OpenApi.Models;
using OrchardCore.Email.Recipes;
using OrchardCore.Modules;
using OrchardCore.Recipes.Services;
using OrchardCore.Users.Recipes;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.IO;
using OrchardCore.Email;
using KeTePongo.Core.Data;

namespace KeTePongo.Core
{
    public class Startup : StartupBase
    {
        public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        {
            builder.UseStaticFiles();
#if DEBUG
            builder.UseSwagger();
            builder.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "KeTePongo V1");
            });
            builder.UseCors("DevelopmentNoCors");
#endif
        }
        public override void ConfigureServices(IServiceCollection services)
        {
            //This code will be useful when this is fixed at Orchard Core https://github.com/OrchardCMS/OrchardCore/issues/4038
            //var handlerToRemove = services.Where(s => s.ServiceType == typeof(IAuthorizationHandler)
            //                        && s.ImplementationType == typeof(SuperUserHandler)).ToList();
            //if (handlerToRemove != null && handlerToRemove.Any())
            //{
            //    services.Remove(handlerToRemove.First());
            //    handlerToRemove = services.Where(s => s.ServiceType == typeof(IAuthorizationHandler)
            //                        && s.ImplementationType == typeof(SuperUserHandler)).ToList();
            //}
            services.TryAddSingleton<IIdForTypeGenerator, KeTePongoIdGenerator>();
            services.AddScoped<IBlobStorageImageService, BlobStorageImageService>();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddScoped<IEmailTemplateService, EmailTemplateService>();
            services.AddScoped<IInvitationTokenProvider, InvitationTokenProvider>();

            services.AddScoped<IRecipeStepHandler, SmtpSettingsStep>();
            services.AddScoped<IRecipeStepHandler, LoginSettingsStep>();
            services.AddScoped<IRecipeStepHandler, ResetPasswordSettingsStep>();

            services.RemoveAll(typeof(ISmtpService));
            services.AddScoped<ISmtpService, KeTePongo.Services.SmtpService>();

            services.AddScoped<YesSqlActionExecutor>();

#if DEBUG
            services.AddSwaggerGen(swagger =>
            {
                swagger.SwaggerDoc("v1", new OpenApiInfo { Title = "KeTePongo API", Version = "v1" });
                var xmlPath = Path.Combine(AppContext.BaseDirectory, "KeTePongo.ConsumerWebAPI.xml");
                swagger.IncludeXmlComments(xmlPath);
                swagger.ExampleFilters();
                swagger.DescribeAllEnumsAsStrings();
                swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });
                swagger.AddSecurityRequirement(new OpenApiSecurityRequirement(){
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header,

                    },
                        new List<string>()
                    }
                });
                swagger.DocumentFilter<CustomSwaggerDocumentFilter>();
                swagger.CustomSchemaIds(x => x.FullName);
            });
            services.AddCors(o => o.AddPolicy("DevelopmentNoCors", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
#endif
        }
    }
}
