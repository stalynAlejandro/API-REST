using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.Core.Data;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.EventHandlers
{
    public class ProviderProductsChangedEventHandler : IProviderProductsChangedEventHandler
    {
        private readonly IConsumptionAppService _consumptionAppService;
        private readonly ISession _session;
        private readonly IMapper _mapper;
        ILogger<ProviderProductsChangedEventHandler> _logger;
        public ProviderProductsChangedEventHandler(ISession session, IConsumptionAppService consumptionAppService, LocalSessionFactory sessionFactory, IMapper mapper,
            ILogger<ProviderProductsChangedEventHandler> logger)
        {
            _consumptionAppService = consumptionAppService;
            _session = session;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task ProviderProductsChanged(ProviderProductsChangedContext context, Action<string, string> addError)
        {
            try
            {
                //To-Do Implement Interface
                //Best to submit productchanges with a list of constants per product.
                // Listener at Consumer side will act in consequence
                //if a product is removed it has to be removed from ALL provider mappings referencing it and from the related consumption referencing it
                //if a product is modified removing formats: ALL mappings with that product and removed format has to be removed and the same for the related Cosumptions
                //if a product name, or format name is modified: ALL consumtion referenced by its mappings needs to reflect the change at providerproductname and formatname.
                //if a product is added nothing else has to be done

                //TODO Keep in mind this is too much data. You should use a mapindex to store which references are used on each consumption.
                //Then use it to get all the consumption Ids to be changed. Retrieving only one consumption in memory each time for modyfing it and storing it on db to avoid causing memory exceptions and long transactions.
                //For this task it is more prioritary to do it without memory problems than to do it fast. Cause in the long term it will be executed by another process that will read events from a cue,
                //so client that triggered this operation won't need to wait this code ends

                var consumptions = await _consumptionAppService.GetConsumptionsAsync();

                foreach (var consumption in consumptions)
                {
                    var isUpdated = false;
                    var localProviderId = consumption.Providers.FirstOrDefault(p => p.KeTePongoProviderOID == context.ProviderOID)?.KeTePongoProviderOID;
                    if (localProviderId == 0)
                    {
                        continue;
                    }
                    var productsToUpdate = consumption.Products.Where(x => x.ProviderId == localProviderId && context.ProductChanges.Select(k => k.ProductId).Contains(x.Id));

                    foreach (var product in productsToUpdate)
                    {
                        var change = context.ProductChanges.FirstOrDefault(x => x.ProductId == product.Id);
                        switch (change.ChangeType)
                        {
                            case ProductChange.ProductChangeType.Removed:
                                consumption.Products.Remove(product);
                                break;
                            case ProductChange.ProductChangeType.Updated:
                                UpdateProduct(product, change);
                                break;
                        }
                        isUpdated = true;
                    }
                    if (isUpdated)
                    {
                        _session.Save(_mapper.Map<ConsumptionDTO, Consumption>(consumption));
                        await _session.CommitAsync();
                    }
                }
            }
            catch (Exception e)
            {
                var errorMsg = "Error tras cambio en los productos del proveedor en consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        private void UpdateProduct(ProductDTO product, ProductChange change)
        {
            product.Name = change.ChangedName;
        }
    }
}
