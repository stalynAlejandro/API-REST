using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Data;
using System;

namespace KeTePongo.Core.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ReplaceAutoMapper(this IServiceCollection services)
        {
            var profileTypes = services.Where(s => s.ServiceType == typeof(Profile)).Select(s => s.ImplementationType).ToArray();
            var mapperToRemove = services.FirstOrDefault(sd => sd.ServiceType == typeof(IMapper));
            if (mapperToRemove != null)
            {
                services.Remove(mapperToRemove);
            }
            return services.AddAutoMapper(profileTypes);
        }
        public static void SwapTransient<TService>(this IServiceCollection services, Func<IServiceProvider, TService> implementationFactory)
        {
            if (services.Any(x => x.ServiceType == typeof(TService) && x.Lifetime == ServiceLifetime.Transient))
            {
                var serviceDescriptors = services.Where(x => x.ServiceType == typeof(TService) && x.Lifetime == ServiceLifetime.Transient).ToList();
                foreach (var serviceDescriptor in serviceDescriptors)
                {
                    services.Remove(serviceDescriptor);
                }
            }

            services.AddTransient(typeof(TService), (sp) => implementationFactory(sp));
        }

    }

}
