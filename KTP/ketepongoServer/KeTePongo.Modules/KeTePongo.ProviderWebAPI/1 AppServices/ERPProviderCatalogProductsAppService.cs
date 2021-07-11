using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using YesSql;
using OrchardCore.Modules;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Indexes;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using KeTePongo.Notifications.Abstractions.DTOs;
using KeTePongo.Notifications.Abstractions.Events;
using Microsoft.Extensions.Localization;
using KeTePongo.Core.Extensions;
using KeTePongo.ProviderWebAPI.DomainServices.ProviderCatalogProductDocument;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public class ERPProviderCatalogProductsAppService : IERPProviderCatalogProductsAppService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ERPProviderCatalogProductsAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;
        private readonly Lazy<IEnumerable<IERPProviderCatalogProductsChangesEventHandler>> _erpProviderCatalogProductsChangesEventHandler;
        private readonly IStringLocalizer S;
        private readonly CatalogProductDomainService _catalogProductDomainService;
        private readonly SectionDomainService _sectionDomainService;
        public ERPProviderCatalogProductsAppService(
            IServiceProvider serviceProvider,
            ISession session,
            IMapper mapper,
            ILogger<ERPProviderCatalogProductsAppService> logger,
            IStringLocalizer<ERPProviderCatalogProductsAppService> stringLocalizer,
            IStringLocalizer<CatalogProductDomainService> stringLocalizerDomain
            )
        {
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _erpProviderCatalogProductsChangesEventHandler = new Lazy<IEnumerable<IERPProviderCatalogProductsChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IERPProviderCatalogProductsChangesEventHandler>>());
            _session = session;
            _mapper = mapper;
            _logger = logger;
            S = stringLocalizer;
            _catalogProductDomainService = new CatalogProductDomainService(stringLocalizerDomain);
            _sectionDomainService = new SectionDomainService();
        }

        public async Task UpdateERPProviderCatalogProductsAsync(ProviderClaimsPrincipal user, ERPProviderCatalogProductsDTO erpProviderCatalogProductsDTO, Action<string, string> addError)
        {
            var providerCatalogProducts = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderOID == user.ProviderOID).FirstOrDefaultAsync();

            UpdateSectionsList(providerCatalogProducts, erpProviderCatalogProductsDTO, addError);
            var allERPProviderCatalogProductsChangesDTO = UpdateCatalogProductsList(providerCatalogProducts, erpProviderCatalogProductsDTO, addError);

            providerCatalogProducts.ChangeVersion++;
            _session.Save(providerCatalogProducts);
            await _session.CommitAsync();

            var indexes = await _session.QueryIndex<CatalogProductInConsumerConsumptionIndex>(CatalogProductInConsumerConsumptionIndex.GetExprByProviderOID(user.ProviderOID)).ListAsync();
            foreach (IGrouping<long, CatalogProductInConsumerConsumptionIndex> index in indexes.GroupBy(i=>i.ConsumptionOID))
            {
                var erpProviderCatalogProductsChangesDTOByConsumption = new ERPProviderCatalogProductsChangesDTO();
                var catalogProductsInThisConsumptionDictionay = index.Select(c => c).Select(e => e).ToDictionary(cp=>cp.ProductERPId);
                ProcessUpdatedCatalogProducts(erpProviderCatalogProductsChangesDTOByConsumption, allERPProviderCatalogProductsChangesDTO, catalogProductsInThisConsumptionDictionay);
                ProcessRemovedCatalogProducts(erpProviderCatalogProductsChangesDTOByConsumption, allERPProviderCatalogProductsChangesDTO, catalogProductsInThisConsumptionDictionay);

                var context = new ERPProviderCatalogProductsChangesContext(user.ProviderOID, index.Key,erpProviderCatalogProductsChangesDTOByConsumption);
                await _erpProviderCatalogProductsChangesEventHandler.Value.InvokeAsync(x => x.UpdatedERPProviderCatalogProductsAsync(context, addError), _logger);
            }
           
        }
        private void ProcessUpdatedCatalogProducts(ERPProviderCatalogProductsChangesDTO erpProviderCatalogProductsChangesDTOByConsumption, ERPProviderCatalogProductsChangesDTO allERPProviderCatalogProductsChangesDTO, Dictionary<string, CatalogProductInConsumerConsumptionIndex> catalogProductsInThisConsumptionDictionay)
        {
            var updatedCatalogProductsForThisConsumption = allERPProviderCatalogProductsChangesDTO.UpdatedCatalogProducts.Where(p => catalogProductsInThisConsumptionDictionay.ContainsKey(p.ERPId));
            foreach (var item in updatedCatalogProductsForThisConsumption)
            {
                item.ConsumerProductId = catalogProductsInThisConsumptionDictionay[item.ERPId].ConsumerProductId;
            }
            erpProviderCatalogProductsChangesDTOByConsumption.UpdatedCatalogProducts = updatedCatalogProductsForThisConsumption.ToList();
        }
        private void ProcessRemovedCatalogProducts(ERPProviderCatalogProductsChangesDTO erpProviderCatalogProductsChangesDTOByConsumption, ERPProviderCatalogProductsChangesDTO allERPProviderCatalogProductsChangesDTO, Dictionary<string, CatalogProductInConsumerConsumptionIndex> catalogProductsInThisConsumptionDictionay)
        {
            var removedCatalogProductsForThisConsumption = allERPProviderCatalogProductsChangesDTO.RemovedCatalogProducts.Where(p => catalogProductsInThisConsumptionDictionay.ContainsKey(p.ERPId));
            foreach (var item in removedCatalogProductsForThisConsumption)
            {
                item.ConsumerProductId = catalogProductsInThisConsumptionDictionay[item.ERPId].ConsumerProductId;
            }
            erpProviderCatalogProductsChangesDTOByConsumption.RemovedCatalogProducts = removedCatalogProductsForThisConsumption.ToList();

        }
        private void UpdateSectionsList(ProviderCatalogProducts providerCatalogProducts, ERPProviderCatalogProductsDTO erpProviderCatalogProductsDTO, Action<string, string> addError)
        {
            Dictionary<string, int> erpIdSectionsToIdDictionary = providerCatalogProducts.Sections.ToDictionary(c => c.ERPId, c => c.Id);

            var sections = _mapper.Map<List<ERPSectionDTO>, List<Section>>(erpProviderCatalogProductsDTO.Sections,
                    opts =>
                    {
                        opts.Items[ProviderConstants.ERPIdSectionsToIdDictionary] = erpIdSectionsToIdDictionary;
                    }
                );

            foreach (var section in sections)
            {
                if (section.Id == 0)
                    _sectionDomainService.Add(providerCatalogProducts, section, addError);
                else
                    _sectionDomainService.Update(providerCatalogProducts, section, null, addError);
            }

            foreach (var deletedSectionId in erpIdSectionsToIdDictionary.Values)
            {
                _sectionDomainService.Remove(providerCatalogProducts, deletedSectionId, null, addError);
            }
        }
        private ERPProviderCatalogProductsChangesDTO UpdateCatalogProductsList(ProviderCatalogProducts providerCatalogProducts, ERPProviderCatalogProductsDTO erpProviderCatalogProductsDTO, Action<string, string> addError)
        {
            Dictionary<string, int> erpIdSectionsToIdDictionary = providerCatalogProducts.Sections.ToDictionary(c => c.ERPId, c => c.Id);
            Dictionary<string, int> erpIdCatalogProductsToIdDictionary = providerCatalogProducts.CatalogProducts.ToDictionary(c => c.ERPId, c => c.Id);
            var catalogProducts = _mapper.Map<List<ERPCatalogProductDTO>, List<CatalogProduct>>(erpProviderCatalogProductsDTO.CatalogProducts,
                    opts =>
                    {
                        opts.Items[ProviderConstants.ERPIdCatalogProductsToIdDictionary] = erpIdCatalogProductsToIdDictionary;
                        opts.Items[ProviderConstants.ERPIdSectionsToIdDictionary] = erpIdSectionsToIdDictionary;
                    }
                );

            List<CatalogProduct> updatedCatalogProducts = new List<CatalogProduct>();
            List<CatalogProduct> removedCatalogProducts = new List<CatalogProduct>();
            foreach (var catalogProduct in catalogProducts)
            {
                if (catalogProduct.Id == 0)
                {
                    _catalogProductDomainService.Add(providerCatalogProducts, catalogProduct, addError);
                }
                else
                {
                    _catalogProductDomainService.Update(providerCatalogProducts, catalogProduct, null, addError);
                    updatedCatalogProducts.Add(catalogProduct);
                }
            }

            foreach (var deletedCatalogProductId in erpIdCatalogProductsToIdDictionary.Values)
            {
                removedCatalogProducts.Add(providerCatalogProducts.CatalogProducts.FirstOrDefault(c => c.Id == deletedCatalogProductId));
                _catalogProductDomainService.Remove(providerCatalogProducts, deletedCatalogProductId, null, addError);
            }
            var erpProviderCatalogProductsChangesDTO = new ERPProviderCatalogProductsChangesDTO();
            erpProviderCatalogProductsChangesDTO.UpdatedCatalogProducts = _mapper.Map<List<CatalogProduct>, List<ERPCatalogProductUpdatedDTO>>(updatedCatalogProducts);
            erpProviderCatalogProductsChangesDTO.RemovedCatalogProducts = _mapper.Map<List<CatalogProduct>, List<ERPCatalogProductUpdatedDTO>>(removedCatalogProducts);

            return erpProviderCatalogProductsChangesDTO;
        }

        public async Task<IList<MostConsumedCatalogProductDTO>> UpdateERPMostConsumedCatalogProductsAsync(ProviderClaimsPrincipal user, IList<MostConsumedCatalogProductDTO> erpMostConsumedCatalogProductsDTO, Action<string, string> addError)
        {
            var mostConsumedCatalogProduct = await _session.Query<ERPMostConsumedCatalogProducts, ERPMostConsumedCatalogProductsIndex>(ERPMostConsumedCatalogProductsIndex.GetExprByProviderOID(user.ProviderOID)).FirstOrDefaultAsync();
            if (mostConsumedCatalogProduct == null)
            {
                mostConsumedCatalogProduct = new ERPMostConsumedCatalogProducts();
                mostConsumedCatalogProduct.ProviderOID = user.ProviderOID;
            }
            var providerCatalogProducts = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(ProviderCatalogProductsIndex.GetExprByProviderOID(user.ProviderOID)).FirstOrDefaultAsync();
            var eRPClientsPortfolio = await _session.Query<ERPClientsPortfolio, ERPClientsPortfolioIndex>(ERPClientsPortfolioIndex.GetExprByProviderOID(user.ProviderOID)).FirstOrDefaultAsync();
            var valids = erpMostConsumedCatalogProductsDTO.Where(p => eRPClientsPortfolio.Clients.Any(c => c.ERPId == p.ERPIdConsumer) && providerCatalogProducts.CatalogProducts.Any(cp=>cp.ERPId == p.ERPIdProduct)).ToList();

            var exluded = erpMostConsumedCatalogProductsDTO.Except(valids);
            
            mostConsumedCatalogProduct.MostConsumedCatalogProducts = _mapper.Map<IList<MostConsumedCatalogProductDTO>, List<MostConsumedCatalogProduct>>(erpMostConsumedCatalogProductsDTO);
            
            
            mostConsumedCatalogProduct.ChangeVersion++;
            _session.Save(mostConsumedCatalogProduct);
            await _session.CommitAsync();

            return exluded.ToList();
        }
    }
}