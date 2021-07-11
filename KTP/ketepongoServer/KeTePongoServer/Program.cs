using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;
using OrchardCore.Logging;
using System;

namespace KeTePongoServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var isProd = environment == Microsoft.Extensions.Hosting.Environments.Production;

            return Host.CreateDefaultBuilder(args)
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
#if DEBUG
                logging.AddConsole();
#endif
                logging.AddNLog(isProd?"NLog.config": "NLog.config.debug");
            })
            .ConfigureWebHostDefaults(
                webBuilder => webBuilder.UseNLogWeb()
                                        .UseStartup<Startup>());
        }
    }
}
