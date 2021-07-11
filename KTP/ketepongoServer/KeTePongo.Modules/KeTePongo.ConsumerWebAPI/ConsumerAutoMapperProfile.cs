using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.Extensions;
using ProviderDTOs = KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using ProviderEvents = KeTePongo.ProviderWebAPI.Abstractions.Events;
using UserEvents = KeTePongo.UsersWebAPI.Abstractions.Events;
using System;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.DomainServices;
using System.Collections.Generic;

namespace KeTePongo.ConsumerWebAPI
{
    public class ConsumerAutoMapperProfile : Profile
    {
        public ConsumerAutoMapperProfile()
        {
            CreateMap<ConsumerDTO, NewConsumerDTO>();

            CreateMap<ConsumerUserProfile, ConsumerUserProfileDTO>();
            CreateMap<UserEvents.AddedConfirmedUserContext, ConsumerUserProfile>();
            CreateMap<ProviderEvents.AddedProviderOrdersContext, NewConsumerOrderProcessedByProviderDTO>();
            CreateMap<ProviderEvents.SubOrderProcessingStatus, SubOrderProcessingProviderStatusDTO>();

            CreateMap<ConsumptionDTO, Consumption>().IgnoreNullProperties();
            CreateMap<Consumption, ConsumptionDTO>();

            CreateMap<NewProviderDTO, ProviderDTO>();
            CreateMap<UpdateProviderDTO, ProviderDTO>().IgnoreNullProperties();
            CreateMap<ProviderDTO, Provider>().IgnoreNullProperties();
            CreateMap<Provider, ProviderDTO>();

            CreateMap<UpdateSalesmanDTO, Salesman>().IgnoreNullProperties();
            CreateMap<UpdateSalesmanDTO, SalesmanDTO>();
            CreateMap<Salesman, SalesmanDTO>().ReverseMap();
            CreateMap<Salesman, UpdateSalesmanDTO>().ReverseMap();

            CreateMap<NewLocationDTO, LocationDTO>();
            CreateMap<UpdateLocationDTO, LocationDTO>();
            CreateMap<Location, LocationDTO>().ReverseMap();

            CreateMap<ExtraDataForConsumer, ProductDTO>()
                  .ForMember(p => p.ProviderId, opts => opts.PreCondition((src, dest, srcMember) => src.ProviderId != 0))
                  .ForMember(p => p.ProviderProductId, opts => opts.PreCondition((src, dest, srcMember) => src.ProviderProductId != null && src.ProviderProductId != 0))
                  .ReverseMap();
            CreateMap<ExtraDataForConsumer, NewProductDTO>()
                  .ForMember(p => p.ProviderId, opts => opts.PreCondition((src, dest, srcMember) => src.ProviderId != 0))
                  .ForMember(p => p.ProviderProductId, opts => opts.PreCondition((src, dest, srcMember) => src.ProviderProductId != null && src.ProviderProductId != 0))
                  .ReverseMap();
            CreateMap<UpdateProductDTO, ExtraDataForConsumer>()
                   .ForMember(p => p.ProviderId, opts => opts.Ignore())
                  .ForMember(p => p.ProviderProductId, opts => opts.Ignore())
                  .ReverseMap();

            CreateMap<ExtraDataForConsumer, ProcessedUpdateProductDTO>()
                  .ForMember(p => p.ProviderId, opts => opts.PreCondition((src, dest, srcMember) => src.ProviderId != 0))
                  .IgnoreNullProperties();

            CreateMap<ProcessedUpdateProductDTO, ExtraDataForConsumer>()
            .ForMember(p => p.ProviderId, opts => opts.PreCondition((src, dest, scrMember) => src.ProviderId != 0))
            .IgnoreNullProperties();

            CreateMap<ProductDTO, Product>()
               .ForMember(dto => dto.ExtraDataForConsumer, opt => opt.MapFrom(src => src)).IgnoreNullProperties().ReverseMap();

            CreateMap<NewProductDTO, Product>()
              .ForMember(dto => dto.ExtraDataForConsumer, opt => opt.MapFrom(src => src)).IgnoreNullProperties().ReverseMap();

            CreateMap<UpdateProductDTO, Product>()
            .ForMember(dto => dto.ExtraDataForConsumer, opt => opt.MapFrom(src => src)).IgnoreNullProperties().ReverseMap();

            CreateMap<ProcessedUpdateProductDTO, Product>()
            .ForMember(dto => dto.ExtraDataForConsumer, opt => opt.MapFrom(src => src))
            .ForMember(p => p.ImageUrl, opts => opts.Condition((src, dest, srcMember) => srcMember != null))
            .IgnoreNullProperties().ReverseMap();

            CreateMap<NewProductDTOWithImage, ProductDTOWithImage>().IgnoreNullProperties();
            CreateMap<UpdateProductDTOWithImage, ProductDTOWithImage>().IgnoreNullProperties();
            CreateMap<UpdateProductDTO, ProcessedUpdateProductDTO>().IgnoreNullProperties();
            CreateMap<NewProductDTO, ProcessedUpdateProductDTO>().IgnoreNullProperties();


            CreateMap<ExtraDataForConsumerModule, ConsumerDTO>().ReverseMap();
            CreateMap<ExtraDataForConsumerModule, NewConsumerDTO>().ReverseMap();
            CreateMap<ExtraDataForConsumerModule, UpdateConsumerDTO>().ReverseMap();
            CreateMap<ConsumerDTO, Consumer>()
                .ForMember(c=>c.ExtraDataForConsumerModule, opt =>opt.MapFrom(src=>src))
                .ReverseMap();
            CreateMap<NewConsumerDTO, Consumer>()
                .ForMember(c=>c.ExtraDataForConsumerModule, opt=>opt.MapFrom(src=>src))
                .IgnoreNullProperties().ReverseMap();
            CreateMap<UpdateConsumerDTO, Consumer>().IgnoreNullProperties();
            CreateMap<ConsumerDTO, NewConsumerDTO>();
            CreateMap<ConsumerDTO, UpdateAnyConsumerDTO>();
            CreateMap<ConsumerDTO, UpdateConsumerDTO>();
            CreateMap<ConsumerDTO, UpdateAnyConsumerDTO>();
            CreateMap<UpdateConsumerDTO, ConsumerDTO>();
            //CreateMap<Consumer, ConsumerDTO>().IgnoreNullProperties();

            CreateMap<NewConsumerOrderDTO, ConsumerOrderDTO>().IgnoreNullProperties();
            CreateMap<NewSubOrderDTO, SubOrderDTO>().IgnoreNullProperties();
            CreateMap<NewConsumerOrderLineDTO, OrderLineDTO>().IgnoreNullProperties();

            CreateMap<ConsumerOrderDTO, ConsumerOrder>().IgnoreNullProperties();
            CreateMap<ConsumerOrder, ConsumerOrderDTO>();
            CreateMap<SubOrderDTO, SubOrder>().IgnoreNullProperties();
            CreateMap<SubOrder, SubOrderDTO>();

            CreateMap<OrderLineDTO, ConsumerOrderLine>().IgnoreNullProperties();
            CreateMap<ConsumerOrderLine, OrderLineDTO>();

            CreateMap<ConsumerInvitationDTO, ConsumerInvitation>();
            CreateMap<NewConsumerInvitationDTO, ConsumerInvitation>();
            CreateMap<ConsumerInvitation, ConsumerInvitationDTO>();

            CreateMap<LocationDTO, LocationDTO>();

            CreateMap<ConsumerDTO, ProviderDTOs.ProviderDTO>()
               .ForMember(dto => dto.OID, opt => opt.MapFrom(src => src.ProviderOID))
               .ForMember(dto => dto.ConsumerOID, opt => opt.MapFrom(src => src.OID));
            CreateMap<ProviderDTOs.ProviderDTO, ConsumerDTO>()
                .ForMember(dto => dto.OID, opt => opt.MapFrom(src => src.ConsumerOID))
                .ForMember(dto => dto.ProviderOID, opt => opt.MapFrom(src => src.OID));


            //CreateMap<NewConsumerDTO, ProviderDTOs.ProviderDTO>()
            //  .ForMember(dto => dto.OID, opt => opt.MapFrom(src => src.ProviderOID));
            //CreateMap<ProviderDTOs.ProviderDTO, NewConsumerDTO>()
            //    .ForMember(dto => dto.ProviderOID, opt => opt.MapFrom(src => src.OID));

            //CreateMap<UpdateConsumerDTO, ProviderDTOs.ProviderDTO>()
            //  .ForMember(dto => dto.OID, opt => opt.MapFrom(src => src.ProviderOID));
            CreateMap<ProviderDTOs.ProviderDTO, UpdateConsumerDTO>();
            CreateMap<ProviderDTOs.ERPCatalogProductUpdatedDTO, Product>();
        }
    }
}
