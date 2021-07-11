using AutoMapper;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using ProviderDTOS = KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using ProviderEvents = KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YesSql;

using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.BackgroundAppServices;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public class ConsumerValidationByProviderEventHandler : ProviderEvents.IConsumerValidationByProviderEventHandler
    {
        IProviderBackgroundAppService _providerBackgroundAppService;
        IMapper _mapper;
        ILogger<ConsumerValidationByProviderEventHandler> _logger;

        public ConsumerValidationByProviderEventHandler(
            IProviderBackgroundAppService providerBackgroundAppService,
            IMapper mapper,
            ILogger<ConsumerValidationByProviderEventHandler> logger)
        {
            _providerBackgroundAppService = providerBackgroundAppService;
            _mapper = mapper;
            _logger = logger;
        }

        public Task ConsumerValidatedAsync(ConsumerValidatedContext context, Action<string, string> addError)
        {
            return _providerBackgroundAppService.ValidateAsync(context.ConsumerOID, context.ProviderOID, context.SalesmanEmail, addError);
        }
    }
}