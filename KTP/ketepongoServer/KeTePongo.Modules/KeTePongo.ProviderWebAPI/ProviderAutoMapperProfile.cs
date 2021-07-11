using AutoMapper;
using ConsumerEvents = KeTePongo.ConsumerWebAPI.Abstractions.Events;
using UserEvents = KeTePongo.UsersWebAPI.Abstractions.Events;
using KeTePongo.Core.Extensions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using Consumer = KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.TypeConverters;
using System.Collections.Generic;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using System.Linq;

namespace KeTePongo.ProviderWebAPI
{
    public class ProviderAutoMapperProfile: Profile
    {
        public ProviderAutoMapperProfile()
        {
            CreateMap<ProviderUserProfile, ProviderUserProfileDTO>();
            CreateMap<UserEvents.AddedConfirmedUserContext, ProviderUserProfile>();
            CreateMap<UserEvents.AddedConfirmedUserContext, ConsumerUser>();
            CreateMap<ConsumerEvents.NewConsumerOrderCreatedEventDTO, NewConsumerOrderCreatedDTO>()
                .ForMember(d => d.ConsumerInfoWhenOrderWasSubmitted, opt => opt.MapFrom(s => s.Consumer));
            
            CreateMap<Consumer.ProductDTO, ConsumerProductDTO>().IgnoreNullProperties();
            CreateMap<Consumer.SubOrderDTO, ConsumerSubOrderDTO>()
                .ForMember(d => d.ProviderInfoWhenOrderWasSubmitted, opt => opt.MapFrom(s => s.Provider));
            CreateMap<Consumer.OrderLineDTO, ConsumerOrderLineDTO>();
            CreateMap<Consumer.ProductDTO, ConsumerProductDTO>();
            CreateMap<Consumer.ConsumerDTO, ConsumerInfoAtOrderDTO>();
            CreateMap<Consumer.ProviderDTO, ProviderInfoAtOrderDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.KeTePongoProviderOID))
                .ForMember(d => d.IdForConsumer, opt => opt.MapFrom(s => s.Id));           
            CreateMap<NewConsumerOrderCreatedDTO, List<NewProviderOrderDTO>>().ConvertUsing(typeof(MapNewConsumerOrderCreatedDTOToNewProviderOrderDTOList));
            CreateMap<NewProviderInvitationDTO, ProviderInvitation>();
            CreateMap<ProviderInvitation, ProviderInvitationDTO>();
            CreateMap<ExtraDataForProviderModule, ProviderDTO>().ReverseMap();
            CreateMap<ExtraDataForProviderModule, NewProviderDTO>().ReverseMap();
            CreateMap<ExtraDataForProviderModule, UpdateProviderDTO>().ReverseMap();
            CreateMap<ProviderDTO, Provider>()
                .ForMember(c => c.ExtraDataForProviderModule, opt => opt.MapFrom(src => src))
                .ReverseMap();
            CreateMap<NewProviderDTO, Provider>()
                .ForMember(c => c.ExtraDataForProviderModule, opt => opt.MapFrom(src => src))
                .IgnoreNullProperties().ReverseMap();
            CreateMap<UpdateProviderDTO, Provider>().IgnoreNullProperties();
            CreateMap<Consumer.ConsumerDTO, UpdateProviderDTO>();
            CreateMap<ProviderDTO, UpdateAnyProviderDTO>();
            CreateMap<ProviderDTO, UpdateProviderDTO>();
            CreateMap<ProviderDTO, UpdateAnyProviderDTO>();
            CreateMap<UpdateProviderDTO, ProviderDTO>();
            CreateMap<ConsumerProductDTO, ConsumerProduct>().IgnoreNullProperties();
            CreateMap<ConsumerProduct, ConsumerProductDTO>();
            CreateMap<ProviderCatalogProductsDTO, ProviderCatalogProducts>().IgnoreNullProperties();
            CreateMap<ProviderCatalogProducts, ProviderCatalogProductsDTO>();
            CreateMap<SectionDTO, SectionDTO>();//If not exist generic classes mapping form one type to another make it wrong (id is lost)
            CreateMap<SectionDTO, Section>().IgnoreNullProperties();
            CreateMap<Section, SectionDTO>();
            CreateMap<NewSectionDTO, SectionDTO>();
            CreateMap<UpdateSectionDTO, SectionDTO>().IgnoreNullProperties();
            CreateMap<ExtraDataForConsumer, CatalogProductDTO>().ReverseMap();
            CreateMap<ExtraDataForConsumer, NewCatalogProductDTO>().ReverseMap();
            CreateMap<ExtraDataForConsumer, UpdateCatalogProductDTO>().ReverseMap();
            CreateMap<CatalogProductDTO, CatalogProductDTO>(); //If not exist generic classes mapping form one type to another make it wrong (id is lost)
            CreateMap<CatalogProductDTO, CatalogProduct>()
                .ForMember(dto => dto.ExtraDataForConsumer, opt => opt.MapFrom(src => src))
                .IgnoreNullProperties().ReverseMap();            
            CreateMap<NewCatalogProductDTO, CatalogProductDTO>().IgnoreNullProperties();
            CreateMap<UpdateCatalogProductDTO, CatalogProductDTO>().IgnoreNullProperties();
            CreateMap<UpdateCatalogProductDTO, CatalogProductDTO>().IgnoreNullProperties();
            CreateMap<NewCatalogProductDTO, NewCatalogProductDTO>();
            CreateMap<UpdateCatalogProductDTO, UpdateCatalogProductDTO>();
            CreateMap<AllergenDTO, AllergenDTO>();//If not exist generic classes mapping form one type to another make it wrong (id is lost)
            CreateMap<Allergen, AllergenDTO>().ReverseMap();
            CreateMap<ProviderCatalogProductsDTO, ProviderCatalogProductsDTO>();
            CreateMap<ProviderOrderLineDTO, ProviderOrderLine>().IgnoreNullProperties();
            CreateMap<ProviderOrderLine, ProviderOrderLineDTO>();
            CreateMap<NewProviderOrderDTO, ProviderOrder>().IgnoreNullProperties();
            CreateMap<ProviderOrderDTO, ProviderOrder>().IgnoreNullProperties();
            CreateMap<ProviderOrder, ProviderOrderDTO>();
            CreateMap<ConsumerInfoAtOrderDTO, ConsumerInfoAtOrder>().ReverseMap();
            CreateMap<ProviderInfoAtOrderDTO, ProviderInfoAtOrder>().ReverseMap();
            CreateMap<ProviderInfoAtOrderDTO, ProviderInfoAtOrder>().ReverseMap();
            CreateMap<ProviderDTO, Consumer.ConsumerDTO>()
                .ForMember(dto => dto.OID, opt => opt.MapFrom(src => src.ConsumerOID))
                .ForMember(dto => dto.ProviderOID, opt => opt.MapFrom(src => src.OID));
            CreateMap<Consumer.ConsumerDTO, ProviderDTO>()
                .ForMember(dto => dto.OID, opt => opt.MapFrom(src => src.ProviderOID))
                .ForMember(dto => dto.ConsumerOID, opt => opt.MapFrom(src => src.OID));
            CreateMap<Provider, ProviderUserProfile>()
                .ForMember(p => p.ProviderOID, opt => opt.MapFrom(s => s.OID));


            CreateMap<Consumer.ConsumerDTO, ConsumerOfAProviderSalesmanDTO>()
                .ForMember(p => p.ConsumerOID, opt => opt.MapFrom(s => s.OID));
            CreateMap<ConsumerOfAProviderSalesmanDTO, ConsumerOfAProviderSalesman>().ReverseMap();
            CreateMap<ERPClientDTO, ERPClient>()
                .ForMember(c => c.ConsumerOID, opt => 
                {
                    opt.PreCondition((src,dest,ctx) =>
                    {
                        HashSet<string> hash = null;
                        if (!ctx.Items.ContainsKey(ProviderConstants.ERPCustomerIdsProcessedHash))
                        {
                            ctx.Items[ProviderConstants.ERPCustomerIdsProcessedHash] = new HashSet<string>();
                            hash = new HashSet<string>();
                        }
                        else
                        {
                            hash = ctx.Items[ProviderConstants.ERPCustomerIdsProcessedHash] as HashSet<string>;
                        }
                        return !hash.Contains(src.ERPId);
                    });
                    opt.MapFrom<ERPClientResolver>();
                });
            CreateMap<ERPCatalogProductDTO, CatalogProductDTO>().ReverseMap();
            CreateMap<ERPSectionDTO, SectionDTO>().ReverseMap();
            CreateMap<ExtraDataForConsumer, ERPCatalogProductDTO>();
            CreateMap<ERPCatalogProductDTO, ExtraDataForConsumer>()
                .ForMember(c => c.SectionIds, opt =>
                {
                    opt.PreCondition((src, dest, ctx) =>
                    {
                        Dictionary<string, int> dictionary = null;
                        if (!ctx.Items.ContainsKey(ProviderConstants.ERPIdSectionsToIdDictionary))
                        {
                            return false;
                        }
                        else
                        {
                            dictionary = ctx.Items[ProviderConstants.ERPIdSectionsToIdDictionary] as Dictionary<string, int>;
                        }
                        foreach (var sectionERPId in src.SectionERPIds)
                        {
                            if (!dictionary.ContainsKey(sectionERPId))
                                return false;
                        }
                        return true;
                    });
                    opt.MapFrom<ERPCatalogProductSectionIdsResolver>();
                });
            CreateMap<CatalogProduct, ERPCatalogProductUpdatedDTO>();
            
            CreateMap<CatalogProduct, ERPCatalogProductDTO>();
            CreateMap<ERPCatalogProductDTO, CatalogProduct>()
                .ForMember(c => c.Id, opt =>
                {
                    opt.PreCondition((src, dest, ctx) =>
                    {
                        HashSet<string> hash = null;
                        if (!ctx.Items.ContainsKey(ProviderConstants.ERPCatalogProductsIdProcessedHash))
                        {
                            ctx.Items[ProviderConstants.ERPCatalogProductsIdProcessedHash] = new HashSet<string>();
                            hash = new HashSet<string>();
                        }
                        else
                        {
                            hash = ctx.Items[ProviderConstants.ERPCatalogProductsIdProcessedHash] as HashSet<string>;
                        }
                        return !hash.Contains(src.ERPId);
                    });
                    opt.MapFrom<ERPCatalogProductIdResolver>();
                })
                .ForMember(c => c.ExtraDataForConsumer, opt =>opt.MapFrom(src=>src));

            CreateMap<ERPSectionDTO, Section>()
                .ForMember(c => c.Id, opt =>
                {
                    opt.PreCondition((src, dest, ctx) =>
                    {
                        HashSet<string> hash = null;
                        if (!ctx.Items.ContainsKey(ProviderConstants.ERPSectionsIdProcessedHash))
                        {
                            ctx.Items[ProviderConstants.ERPSectionsIdProcessedHash] = new HashSet<string>();
                            hash = new HashSet<string>();
                        }
                        else
                        {
                            hash = ctx.Items[ProviderConstants.ERPSectionsIdProcessedHash] as HashSet<string>;
                        }
                        return !hash.Contains(src.ERPId);
                    });
                    opt.MapFrom<ERPSectionResolver>();
                });

            CreateMap<CatalogProductInConsumerConsumptionDTO, CatalogProductInConsumerConsumption>().ReverseMap();
            CreateMap<ConsumerEvents.ConsumerProductChangedOfLinkedProviderContext, CatalogProductInConsumerConsumptionDTO>().ReverseMap();
            CreateMap<MostConsumedCatalogProduct, MostConsumedCatalogProductDTO>().ReverseMap();
            CreateMap<ERPMostConsumedCatalogProducts, ERPMostConsumedCatalogProductsDTO>().ReverseMap();
        }
        public class ERPClientResolver : IValueResolver<ERPClientDTO, ERPClient, long>
        {
            public long Resolve(ERPClientDTO source, ERPClient destination, long member, ResolutionContext context)
            {
                Dictionary<string, long> dictionary = context.Items[ProviderConstants.ERPIdToConsumerOIDDictionary] as Dictionary<string, long>;
                HashSet<string> hash = context.Items[ProviderConstants.ERPCustomerIdsProcessedHash] as HashSet<string>;
                var containsKey = dictionary.ContainsKey(source.ERPId);
                var consumerOID = containsKey ? dictionary[source.ERPId] : 0;
                if (containsKey)
                    dictionary.Remove(source.ERPId);
                hash.Add(source.ERPId);

                if (consumerOID == 0 && source.ConsumerOID != 0)
                    return source.ConsumerOID;
                return consumerOID;
            }
        }
        public class ERPCatalogProductIdResolver : IValueResolver<ERPCatalogProductDTO, CatalogProduct, int>
        {
            public int Resolve(ERPCatalogProductDTO source, CatalogProduct destination, int member, ResolutionContext context)
            {
                Dictionary<string, int> dictionary = context.Items[ProviderConstants.ERPIdCatalogProductsToIdDictionary] as Dictionary<string, int>;
                HashSet<string> hash = context.Items[ProviderConstants.ERPCatalogProductsIdProcessedHash] as HashSet<string>;
                var containsKey = dictionary.ContainsKey(source.ERPId);
                var catalogProductId = containsKey ? dictionary[source.ERPId] : 0;
                if (containsKey)
                    dictionary.Remove(source.ERPId);
                hash.Add(source.ERPId);

                return catalogProductId;
            }
        }
        public class ERPCatalogProductSectionIdsResolver : IValueResolver<ERPCatalogProductDTO, ExtraDataForConsumer, IList<int>>
        {
            public IList<int> Resolve(ERPCatalogProductDTO source, ExtraDataForConsumer destination, IList<int> member, ResolutionContext context)
            {
                Dictionary<string, int> dictionary = context.Items[ProviderConstants.ERPIdSectionsToIdDictionary] as Dictionary<string, int>;
                IList<int> sectionsIds = new List<int>();
                foreach (var sectionERPId in source.SectionERPIds.Distinct())
                {
                    sectionsIds.Add(dictionary[sectionERPId]);
                }
                return sectionsIds;
            }
        }
        public class ERPSectionResolver : IValueResolver<ERPSectionDTO, Section, int>
        {
            public int Resolve(ERPSectionDTO source, Section destination, int member, ResolutionContext context)
            {
                Dictionary<string, int> dictionary = context.Items[ProviderConstants.ERPIdSectionsToIdDictionary] as Dictionary<string, int>;
                HashSet<string> hash = context.Items[ProviderConstants.ERPSectionsIdProcessedHash] as HashSet<string>;
                var containsKey = dictionary.ContainsKey(source.ERPId);
                var sectiontId = containsKey ? dictionary[source.ERPId] : 0;
                if (containsKey)
                    dictionary.Remove(source.ERPId);
                hash.Add(source.ERPId);

                return sectiontId;
            }
        }
    }
}