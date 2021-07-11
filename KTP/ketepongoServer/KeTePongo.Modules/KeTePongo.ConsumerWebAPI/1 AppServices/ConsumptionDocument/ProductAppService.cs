using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ConsumerWebAPI.DomainServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.Data;
using KeTePongo.Core.Services;
using Microsoft.Extensions.Logging;
using OrchardCore.Modules;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YesSql;
using Microsoft.Extensions.DependencyInjection;
using KeTePongo.Core.Interfaces;
using Microsoft.Extensions.Localization;

namespace KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument
{
    public class ProductAppService : ConsumptionBaseAppService<Product, UpdateProductDTOWithImage, NewProductDTOWithImage, ProcessedUpdateProductDTO, ProductDTO, ProductDomainService>, IProductAppService
    {
        public static string ProductsMediaFolderName(long consumerOID) => Path.Combine("consumer", consumerOID.ToString(), "products");
        private readonly IBlobStorageImageService _blobStorageImageService;
        private readonly ILogger<ProductAppService> _logger;
        private readonly IMapper _mapper;
        private readonly Lazy<IEnumerable<IProductChangesEventHandler>> _productChangesEventHandlers;
        private readonly ISession _session;
        private IStringLocalizer S;

        public ProductAppService(
            IStringLocalizer<ProductAppService> stringLocalizer,
            IStringLocalizer<ProductDomainService> productDomainServiceLocalizer,
            IBlobStorageImageService blobStorageImageService,
            ISession session,
            LocalSessionFactory sessionFactory, 
            IMapper mapper, 
            IServiceProvider serviceProvider,
            ILogger<ProductAppService> logger,
            YesSqlActionExecutor yesSqlActionExecutor) 
            : base(session, new ProductDomainService(productDomainServiceLocalizer), sessionFactory, mapper, logger, yesSqlActionExecutor) {
            S = stringLocalizer;
            _productChangesEventHandlers = new Lazy<IEnumerable<IProductChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IProductChangesEventHandler>>());
            _blobStorageImageService = blobStorageImageService;
            _mapper = mapper;
            _logger = logger;
            _session = session;
        }
        protected override async Task<IList<ProcessedUpdateProductDTO>> PreProcessAddAsync(IConsumerClaims user, IList<NewProductDTOWithImage> dtos, Action<string, string> addError)
        {
            var result = new List<ProcessedUpdateProductDTO>();
            foreach (var dto in dtos)
            {
                var productDTO = _mapper.Map<NewProductDTO, ProcessedUpdateProductDTO>(dto.Product);
                if (dto.ImageFile == null)
                {
                    productDTO.ImageUrl = "";
                }
                else
                {
                    var url = await _blobStorageImageService.UploadImageAsync(dto.ImageFile, ProductsMediaFolderName(user.ConsumerOID));
                    if (string.IsNullOrWhiteSpace(url))
                    {
                        addError($"{nameof(ProductDTOWithImage.ImageFile)}", S["Unable to load the image"]);
                        continue;
                    }
                    productDTO.ImageUrl = url;
                }
                result.Add(productDTO);
            }
            return result;
        }

        protected override async Task<ProcessedUpdateProductDTO> PreProcessUpdateAsync(IConsumerClaims user, UpdateProductDTOWithImage dto, Action<string, string> addError)
        {
            var result = _mapper.Map<UpdateProductDTO, ProcessedUpdateProductDTO>(dto.Product);
            result.ImageUrl = null;
            if (dto.ImageFile != null)
            {
                var url = await _blobStorageImageService.UploadImageAsync(dto.ImageFile, Path.Combine(user.ConsumerOID.ToString(), "products"));
                if (string.IsNullOrWhiteSpace(url))
                {
                    addError("ImageFile", S["Error uploading the image"]);
                    return null;
                }
                result.ImageUrl = url;
            }
            return result;
        }
        
        public override async Task OnAddSuccessAsync(IConsumerClaims user, Consumption consumption, IList<Product> newEntities, Action<string, string> addError)
        {
            if (user == null)
            {
                return;
            }
            foreach (var newEntity in newEntities)
            {
                var provider = consumption.Providers.FirstOrDefault(p => p.Id == newEntity.ExtraDataForConsumer.ProviderId);
                if (provider.KeTePongoProviderOID.GetValueOrDefault() == 0)
                {
                    Consumer consumer = await _session.Query<Consumer, ConsumerIndex>(i => i.OID == user.ConsumerOID).FirstOrDefaultAsync();
                    //TO-DO obtener emails a partir de los usuarios
                    /*  await _productChangesEventHandlers.InvokeAsync(x => x.ConsumerUserAddedProductOfNonRegisteredProvider(
                          user.GetConsumerUserProfile().ConsumerId, provider.Id, newEntity.Id, consumer.Emails,addError), _logger);*/
                }
                else
                {
                    var context = new ConsumerProductChangedOfLinkedProviderContext(
                        consumerOID: user.ConsumerOID, 
                        providerOID: provider.KeTePongoProviderOID.Value, 
                        consumerProductId: newEntity.Id, 
                        consumptionOID : consumption.OID,
                        productERPId: newEntity.ERPId
                        );
                    await _productChangesEventHandlers.Value.InvokeAsync(x => x.ConsumerUserAddedProductOfRegisteredProvider(context, addError),
                        _logger);
                }
            }
        }

        public override async Task OnDeleteSuccessAsync(IConsumerClaims user, Consumption consumption, Product removedEntity, Action<string, string> addError)
        {
            var provider = consumption.Providers.FirstOrDefault(p => p.Id == removedEntity.ExtraDataForConsumer.ProviderId);
            if (provider.KeTePongoProviderOID.GetValueOrDefault() == 0)
            {
                var context = new ConsumerUserRemovedProductOfNonRegisteredProviderContext(
                    consumerOID: user.ConsumerOID,
                    localProviderId: provider.Id,
                    consumerProductId: removedEntity.Id);
                await _productChangesEventHandlers.Value.InvokeAsync(x => x.ConsumerUserRemovedProductOfNonRegisteredProvider(context, addError), _logger);
            }
            else
            {
                var context = new ConsumerProductChangedOfLinkedProviderContext(
                   consumerOID: user.ConsumerOID,
                        providerOID: provider.KeTePongoProviderOID.Value,
                        consumerProductId: removedEntity.Id,
                        consumptionOID: consumption.OID,
                        productERPId: removedEntity.ERPId);
                await _productChangesEventHandlers.Value.InvokeAsync(x => x.ConsumerUserRemovedProductOfRegisteredProvider(context, addError), _logger);
            }
        }
    }
}
