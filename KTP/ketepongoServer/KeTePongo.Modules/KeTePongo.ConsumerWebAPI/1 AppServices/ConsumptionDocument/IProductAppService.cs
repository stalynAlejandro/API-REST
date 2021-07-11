using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.AppServices;

namespace KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument
{
    public interface IProductAppService : IDocumentAppService<IConsumerClaims, UpdateProductDTOWithImage, NewProductDTOWithImage, ProductDTO> { }
}
