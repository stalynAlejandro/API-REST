using AutoMapper;

using KeTePongo.Core.Data;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using YesSql;
using KeTePongo.Core.Extensions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Indexes;
using Microsoft.Extensions.Logging;
using System.Threading;
using Microsoft.Extensions.Localization;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public class ProviderCatalogProductsAppService : IProviderCatalogProductsAppService
    {
        private readonly ISession _session;
        private readonly IMapper _mapper;
        private readonly LocalSessionFactory _sessionFactory;
        private readonly Lazy<ICatalogProductInternalAppService> _catalogProductAppService;
        private readonly Lazy<ISectionInternalAppService> _sectionAppService;
        private readonly IServiceProvider _serviceProvider;
        private readonly YesSqlActionExecutor _yesSqlActionExecutor;
        private IStringLocalizer S;

        public ProviderCatalogProductsAppService(
            ISession session,
            IMapper mapper,
            LocalSessionFactory sessionFactory,
            IServiceProvider serviceProvider,
            YesSqlActionExecutor yesSqlActionExecutor,
            IStringLocalizer<ProviderCatalogProductsAppService> stringLocalizer)
        {
            _session = session;
            _mapper = mapper;
            _sessionFactory = sessionFactory;
            _catalogProductAppService = new Lazy<ICatalogProductInternalAppService>(() => (ICatalogProductInternalAppService)serviceProvider.GetService<ICatalogProductAppService>());
            _sectionAppService = new Lazy<ISectionInternalAppService>(() => (ISectionInternalAppService)serviceProvider.GetService<ISectionAppService>());
            _serviceProvider = serviceProvider;
            _yesSqlActionExecutor = yesSqlActionExecutor;
            S = stringLocalizer;
        }
        public async Task<ProviderCatalogProductsDTO> GetProviderCatalogProductsByCompanyCodeAsync(string consumerCode, int? changeVersion, Action<string, string> addError)
        {
            var providerIndex = await _session.QueryIndex<ProviderIndex>(ProviderIndex.GetExprByProviderCode(consumerCode)).FirstOrDefaultAsync();
            if (!providerIndex.IsProviderCatalogProductsPublic)
            {
                addError("", S["The requested catalog is not public"]);
                return null;
            }
            ProviderCatalogProducts result;
            if (changeVersion.HasValue)
            {
                result = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderCode == consumerCode && i.ChangeVersion > changeVersion.Value).FirstOrDefaultAsync();
            }
            else
            {
                result = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderCode == consumerCode).FirstOrDefaultAsync();
            }

            if (result == null)
            {
                return null;
            }
            result.CatalogProducts = result.CatalogProducts.Where(x => !x.ExtraDataForConsumer.IsHiddenInCarte).ToList();
            return _mapper.Map<ProviderCatalogProducts, ProviderCatalogProductsDTO>(result);
        }
        private async Task<bool> IsConsumerAllowedToGetProviderCatalogAsync(long consumerOID, long providerOID, int? changeVersion, Action<string, string> addError)
        {
            var providerIndex = await _session.QueryIndex<ProviderIndex>(ProviderIndex.GetExprByProviderOID(providerOID)).FirstOrDefaultAsync();
            if (!providerIndex.IsProviderCatalogProductsPublic)
            {
                if (providerIndex.IsLinkedToERP && consumerOID != 0)
                {
                    var consumersOfAProviderSalesman = await _session.Query<ConsumersOfAProviderSalesman, ConsumersOfAProviderSalesmanIndex>(ConsumersOfAProviderSalesmanIndex.GetExprByProviderOID(providerOID)).FirstOrDefaultAsync();
                    var isConsumerOfProvider = consumersOfAProviderSalesman.Consumers.Any(c => c.ConsumerOID == consumerOID && c.ERPId != "");
                    if (!isConsumerOfProvider)
                    {
                        addError("", S["Your're not customer of this provider, you need to request access to it's catalog by adding him as your provider and await its approval"]);
                        return false;
                    }
                }
                else
                {
                    addError("", S["The requested catalog is not public"]);
                    return false;
                }
            }
            return true;
        }
        public async Task<ProviderCatalogProductsDTO> GetProviderCatalogProductsByProviderOIDAsync(long consumerOID, long providerOID, int? changeVersion, Action<string, string> addError)
        {
            if (!await IsConsumerAllowedToGetProviderCatalogAsync(consumerOID, providerOID, changeVersion, addError))
                return null;
            ProviderCatalogProducts result;
            if (changeVersion.HasValue)
            {
                result = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderOID == providerOID && i.ChangeVersion > changeVersion.Value).FirstOrDefaultAsync();
            }
            else
            {
                result = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderOID == providerOID).FirstOrDefaultAsync();
            }

            if (result == null)
            {
                return null;
            }
            result.CatalogProducts = result.CatalogProducts.Where(x => !x.ExtraDataForConsumer.IsHiddenInCarte).ToList();
            return _mapper.Map<ProviderCatalogProducts, ProviderCatalogProductsDTO>(result);
        }
        public async Task<ProviderCatalogProductsDTO> GetAsync(ProviderClaimsPrincipal user, int? changeVersion)
        {
            ProviderCatalogProducts result;
            if (changeVersion.HasValue)
            {
                result = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderOID == user.ProviderOID && i.ChangeVersion > changeVersion.Value).FirstOrDefaultAsync();
            }
            else
            {
                result = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderOID == user.ProviderOID).FirstOrDefaultAsync();
            }

            if (result == null)
            {
                return null;
            }
            return _mapper.Map<ProviderCatalogProducts, ProviderCatalogProductsDTO>(result);
        }

        public async Task<IList<ProviderCatalogProductsDTO>> GetProviderCatalogProductsAsync()
        {
            List<ProviderCatalogProducts> result = new List<ProviderCatalogProducts>();
            var consumerProductCarteCount = await _session.Query<ProviderCatalogProducts>().CountAsync();
            int pageSize = 20;
            var pagesCount = (consumerProductCarteCount + pageSize - 1) / pageSize;
            for (var page = 0; page < pagesCount; page++)
            {
                result.AddRange(await _session.Query<ProviderCatalogProducts>().Skip(page * pageSize).Take(pageSize).ListAsync());
            }
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<List<ProviderCatalogProducts>, List<ProviderCatalogProductsDTO>>(result);
        }

        public async Task AddProviderCatalogProductsAsync(ProviderDTO providerDTO)
        {
            var consumerProductCarte = new ProviderCatalogProducts(_mapper.Map<ProviderDTO, Provider>(providerDTO));
            _session.Save(consumerProductCarte);
            await _session.CommitAsync();
        }
        public async Task UpdateProviderCatalogProductsAsync(ProviderDTO providerDTO)
        {
            var providerCatalogProducts = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(ProviderCatalogProductsIndex.GetExprByProviderOID(providerDTO.OID)).FirstOrDefaultAsync();
            providerCatalogProducts.Provider = _mapper.Map<ProviderDTO, Provider>(providerDTO);
            _session.Save(providerCatalogProducts);
            await _session.CommitAsync();
        }
        public async Task RemoveProviderCatalogProductsAsync(long companyOID)
        {
            var providerCatalogProductsId = (await _session.QueryIndex<ProviderCatalogProductsIndex>(ProviderCatalogProductsIndex.GetExprByProviderOID(companyOID)).FirstOrDefaultAsync())?.DocumentId;
            if (providerCatalogProductsId == null)
            {
                _session.Delete<ProviderCatalogProducts>(providerCatalogProductsId.Value);
            }
            await _session.CommitAsync();
        }

        public async Task ApplyBulkChangesProviderCatalogProductsAsync(ProviderClaimsPrincipal user, CarteBulkChangesDTO carteBulkChanges, Action<string, string> addError)
        {
            Func<Task> asyncAction = () => ApplyBulkChangesProviderCatalogProductsInternalAsync(user, carteBulkChanges, addError);
            await _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(asyncAction);
        }
        public async Task ApplyBulkChangesProviderCatalogProductsInternalAsync(ProviderClaimsPrincipal user, CarteBulkChangesDTO carteBulkChanges, Action<string, string> addError)
        {
            using (var session = _sessionFactory.CreateSession())
            {
                var document = await session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderOID == user.ProviderOID).FirstOrDefaultAsync();
                bool hasErrors = false;
                Action<string, string> localAddError = (key, message) => { hasErrors = true; addError(key, message); };
                foreach (var operation in carteBulkChanges.Operations)
                {
                    switch (operation.DTOTypeName)
                    {
                        case nameof(UpdateSectionDTO):
                            var updateSectionDTO = JsonSerializer.Deserialize<UpdateSectionDTO>(operation.DTO, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                            if (!_serviceProvider.ValidateDataAnnotations(updateSectionDTO, true, localAddError))
                            {
                                return;
                            }
                            await _sectionAppService.Value.UpdateEntityAtDocumentAsync(user, updateSectionDTO, document, localAddError);
                            break;
                        case nameof(UpdateCatalogProductDTO):
                            var updateProductDTO = JsonSerializer.Deserialize<UpdateCatalogProductDTO>(operation.DTO, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                            if (!_serviceProvider.ValidateDataAnnotations(updateProductDTO, true, localAddError))
                            {
                                return;
                            }
                            await _catalogProductAppService.Value.UpdateEntityAtDocumentAsync(user, updateProductDTO, document, localAddError);
                            break;
                        case nameof(NewSectionDTO):
                            var newSectionDTO = JsonSerializer.Deserialize<NewSectionDTO>(operation.DTO, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                            if (!_serviceProvider.ValidateDataAnnotations(newSectionDTO, false, localAddError))
                            {
                                return;
                            }
                            await _sectionAppService.Value.AddEntityToDocumentAsync(user, newSectionDTO, document, localAddError);
                            break;
                        case nameof(NewCatalogProductDTO):
                            var newProductDTO = JsonSerializer.Deserialize<NewCatalogProductDTO>(operation.DTO, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                            if (!_serviceProvider.ValidateDataAnnotations(newProductDTO, false, localAddError))
                            {
                                await _catalogProductAppService.Value.AddEntityToDocumentAsync(user, newProductDTO, document, localAddError);
                            }
                            await _catalogProductAppService.Value.AddEntityToDocumentAsync(user, newProductDTO, document, localAddError);
                            break;
                        case nameof(DeleteSectionDTO):
                            var deleteSectionDTO = JsonSerializer.Deserialize<DeleteSectionDTO>(operation.DTO, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                            await _sectionAppService.Value.RemoveEntityAtDocumentAsync(user, document, deleteSectionDTO.Id, deleteSectionDTO.ChangeVersion, localAddError);
                            break;
                        case nameof(DeleteCatalogProductDTO):
                            var deleteProductDTO = JsonSerializer.Deserialize<DeleteCatalogProductDTO>(operation.DTO, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                            await _catalogProductAppService.Value.RemoveEntityAtDocumentAsync(user, document, deleteProductDTO.Id, deleteProductDTO.ChangeVersion, localAddError);
                            break;
                        default:
                            localAddError(nameof(CarteBulkOperationDTO.DTOTypeName), "Invalid Operation Type");
                            break;
                    }
                }
                if (hasErrors)
                {
                    return;
                }
                document.ChangeVersion++;
                session.Save(document, checkConcurrency: true);
            }
        }
        public async Task UpdateConsumerOIDAsync(long providerOID, long consumerOID, Action<string, string> addError)
        {
            var providerCatalogProducts = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderOID == consumerOID).FirstOrDefaultAsync();

            providerCatalogProducts.Provider.ChangeVersion = providerCatalogProducts.Provider.ChangeVersion + 1;
            //este modulo no tiene nada del OID de proveedor y no merece la pena  añadirlo porque se va a refactorizar
            //consumerProductCarte.Consumer.ProviderOID = providerOID;
            _session.Save(providerCatalogProducts);
            await _session.CommitAsync();
        }
    }
}
