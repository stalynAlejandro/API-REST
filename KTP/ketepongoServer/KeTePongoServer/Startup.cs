using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Hosting;
using KeTePongoServer.Extensions;
using OrchardCore.Data;
using System.Threading.Tasks;
using OrchardCore.Users.Models;
using OrchardCore.Users;
using OrchardCore.Security;

namespace KeTePongoServer
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public virtual void ConfigureServices(IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedEmail = false;
                //For confirming phone numbers take a look to https://www.twilio.com/blog/verify-phone-number-ownership-asp-net-core-razor-pages
                options.SignIn.RequireConfirmedPhoneNumber = false;

                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 1;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._+";
                options.User.RequireUniqueEmail = true;
                options.Tokens.EmailConfirmationTokenProvider = "Email";
                options.Tokens.ChangeEmailTokenProvider = "Email";
            });
            services.AddOrchardCmsForKTP();
            services.TryAddDataProvider(name: "Sqlite With Connection String", value: "Sqlite", hasConnectionString: true, hasTablePrefix: false, isDefault: false, "DataSource=file::memory:?cache=shared");// "DataSource=file:memdb1?mode=memory&cache=shared");
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public virtual void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseRouting();

            app.UseOrchardCore();
        }
    }
}