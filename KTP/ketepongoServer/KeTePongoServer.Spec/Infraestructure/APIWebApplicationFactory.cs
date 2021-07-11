using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Linq;

namespace KeTePongoServer.Spec.Infraestructure
{
    public class APIWebApplicationFactory : WebApplicationFactory<KeTePongoServer.Startup>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {
                // swap out dependencies
            });
        }
    }

    public class TestStartup : KeTePongoServer.Startup
    {
        public override void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            base.Configure(app, env);
        }
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
        }
    }

    public class APIWebApplicationFactory<Startup> : WebApplicationFactory<KeTePongoServer.Startup>
    {
        public APIWebApplicationFactory() : this(null)
        {

        }

        public Action<IServiceCollection> Registrations { get; set; }
        public APIWebApplicationFactory(Action<IServiceCollection> registrations = null) : base()
        {

            Registrations = registrations ?? (collection => { });
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {
                Registrations?.Invoke(services);
            });
        }
    }
}
