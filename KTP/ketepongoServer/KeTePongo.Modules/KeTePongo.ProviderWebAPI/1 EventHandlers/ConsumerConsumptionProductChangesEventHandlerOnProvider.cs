using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.ProviderWebAPI.BackgroundAppServices;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.EventHandlers
{
    public class ConsumerConsumptionProductChangesEventHandlerOnProvider : IProductChangesEventHandler
    {
        private readonly ILogger<ConsumerConsumptionProductChangesEventHandlerOnProvider> _logger;
        private readonly IMapper _mapper;
        private readonly ICatalogProductsInConsumerConsumptionBackgroundAppService _catalogProductsInConsumerConsumptionBackgroundApp;
        public ConsumerConsumptionProductChangesEventHandlerOnProvider(ILogger<ConsumerConsumptionProductChangesEventHandlerOnProvider> logger,
            IMapper mapper,
            ICatalogProductsInConsumerConsumptionBackgroundAppService catalogProductsInConsumerConsumptionBackgroundApp)
        {
            _logger = logger;
            _mapper = mapper;
            _catalogProductsInConsumerConsumptionBackgroundApp = catalogProductsInConsumerConsumptionBackgroundApp;
        }

        public async Task ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSide(ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSideContext context, Action<string, string> addError)
        {
            try
            {
                await Task.CompletedTask;
            }
            catch (Exception e)
            {
                var errorMsg = "Error ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSide";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task ConsumerUserAddedProductOfNonRegisteredProvider(ConsumerUserAddedProductOfNonRegisteredProviderContext context, Action<string, string> addError)
        {
            try
            {
                await Task.CompletedTask;
            }
            catch (Exception e)
            {
                var errorMsg = "Error ConsumerUserAddedProductOfNonRegisteredProvider";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task ConsumerUserAddedProductOfRegisteredProvider(ConsumerProductChangedOfLinkedProviderContext context, Action<string, string> addError)
        {
            try
            {
                var catalogProductInConsumerConsumptionDTO = _mapper.Map<ConsumerProductChangedOfLinkedProviderContext, CatalogProductInConsumerConsumptionDTO>(context);
                await _catalogProductsInConsumerConsumptionBackgroundApp.AddedAsync(catalogProductInConsumerConsumptionDTO, addError);
                
            }
            catch (Exception e)
            {
                addError("", "Error ConsumerUserAddedProductOfRegisteredProvider");
                var errorMsg = "Error ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSide";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task ConsumerUserRemovedProductOfNonRegisteredProvider(ConsumerUserRemovedProductOfNonRegisteredProviderContext context, Action<string, string> addError)
        {
            try
            {
                await Task.CompletedTask;
            }
            catch (Exception e)
            {
                addError("", "Error ConsumerUserRemovedProductOfNonRegisteredProvider");
                var errorMsg = "Error ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSide";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task ConsumerUserRemovedProductOfRegisteredProvider(ConsumerProductChangedOfLinkedProviderContext context, Action<string, string> addError)
        {
            try
            {
                var catalogProductInConsumerConsumptionDTO = _mapper.Map<ConsumerProductChangedOfLinkedProviderContext, CatalogProductInConsumerConsumptionDTO>(context);
                await _catalogProductsInConsumerConsumptionBackgroundApp.RemovedAsync(catalogProductInConsumerConsumptionDTO, addError);
            }
            catch (Exception e)
            {
                addError("", "Error ConsumerUserRemovedProductOfRegisteredProvider");
                _logger.LogError(e.Message);
                throw;
            }
        }
    }
}
