using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.DomainServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.Data;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument
{
    public class LocationAppService : ConsumptionBaseAppService<Location, UpdateLocationDTO, NewLocationDTO, LocationDTO, LocationDTO, LocationDomainService>, ILocationAppService 
    {
        public LocationAppService(ISession session, LocalSessionFactory sessionFactory, IMapper mapper, ILogger<LocationAppService> logger, YesSqlActionExecutor yesSqlActionExecutor, IStringLocalizer<LocationDomainService> stringLocalizer)
            : base(session, new LocationDomainService(stringLocalizer), sessionFactory, mapper, logger, yesSqlActionExecutor) {}
    }
}
