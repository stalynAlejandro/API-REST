using HtmlAgilityPack;
using ConsumerDTOs = KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using ProviderDTOs = KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using UserDTOs = KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using AutoMapper;
using ProviderCatalogProductDTOs=  KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.SignalR.Client;

namespace KeTePongoServer.Spec.Model.v1_0
{
    public class IntegrationTestsContext
    {
        public UserStepsTestsContext UserContext { get; set; } = new UserStepsTestsContext();
        public ConsumerStepsTestsContext ConsumerContext { get; set; } = new ConsumerStepsTestsContext();
        public ProviderStepsTestsContext ProviderContext { get; set; } = new ProviderStepsTestsContext();
        public HttpStatusCode ResponseStatusCode { get; set; }
        public string ContentResponse { get; set; }
        public string AccessToken { get; set; }
        public string AntiForgeryCookie { get; set; }
        public string RefreshToken { get; internal set; }
        public HtmlDocument LastReadedEmail { get; set; }
        public string Token { get; set; }
    }
    public class UserStepsTestsContext
    {
        public UserDTOs.NewUserDTO NewUserDTO { get; set; }
        public UserDTOs.UserDTO ResponseUserDTO { get; set; }
        public string PhoneConfirmationCode { get; internal set; }
    }
    public class ConsumerStepsTestsContext
    {
        public List<ConsumerDTOs.ConsumerInvitationDTO> ResponseListConsumerInvitation { get; set; }
        public ConsumerDTOs.ConsumerDTO ResponseConsumerDTO { get; internal set; }
        public ConsumerDTOs.NewProviderDTO NewConsumerProviderDTO { get; internal set; }
        public ConsumerDTOs.NewLocationDTO NewLocationDTO { get; internal set; }
        public ConsumerDTOs.NewProductDTO NewProductDTO { get; internal set; }
        public ConsumerDTOs.NewConsumerOrderDTO NewConsumerOrderDTO { get; internal set; } = new ConsumerDTOs.NewConsumerOrderDTO() { SubOrders = new List<ConsumerDTOs.NewSubOrderDTO>() };
        public List<ConsumerDTOs.ProviderDTO> ResponseConsumerProviderDTOs { get; internal set; } = new List<ConsumerDTOs.ProviderDTO>();
        public List<ConsumerDTOs.LocationDTO> ResponseLocationDTOs { get; internal set; } = new List<ConsumerDTOs.LocationDTO>();
        public List<ConsumerDTOs.ProductDTO> ResponseProductDTOs { get; internal set; } = new List<ConsumerDTOs.ProductDTO>();
        public ConsumerDTOs.ConsumerOrderDTO ResponseConsumerOrderDTO { get; internal set; }
        public List<ConsumerDTOs.NewConsumerInvitationDTO> ListConsumerInvitation { get; internal set; }
        public ConsumerDTOs.ConsumerInvitationDTO ResponseConsumerInvitation { get; internal set; }
        public ConsumerDTOs.UpdateLocationDTO UpdateLocationDTO { get; internal set; }
        public ConsumerDTOs.NewConsumerDTO NewConsumerDTO { get; internal set; }
        public ConsumerDTOs.UpdateConsumerDTO UpdateConsumerDTO { get; internal set; }
        public ConsumerDTOs.ConsumerDTO ResponseUpdatedConsumerDTO { get; internal set; }
        public ConsumerDTOs.ConsumerDTO BackupConsumerDTO { get; internal set; }
    }
    public class ProviderStepsTestsContext
    {
        public List<ProviderDTOs.ProviderInvitationDTO> ResponseListProviderInvitation { get; set; }

        public ProviderDTOs.ProviderDTO ResponseProviderDTO { get; internal set; }
        public List<ProviderDTOs.NewProviderInvitationDTO> ListProviderInvitation { get; internal set; }
        public ProviderDTOs.ProviderInvitationDTO ResponseProviderInvitation { get; internal set; }
        //public ProviderDTOs.UpdateProductsDTO UpdateCatalogProductsDTO { get; internal set; } = new ProviderDTOs.UpdateProductsDTO() { Products = new List<ProviderDTOs.ProductDTO>() };
        //public ProviderDTOs.ProductsDTO ReceivedCatalogProductsDTO { get; internal set; }
        //public ProviderDTOs.ProductsDTO SubmittedCatalogProductsDTO { get; internal set; }

        public int ProductNextId { get; set; } = 1;
        public int SectionNextId { get; set; } = 1;

        public ProviderCatalogProductDTOs.NewSectionDTO NewSectionDTO { get; internal set; }
        public List<ProviderCatalogProductDTOs.SectionDTO> ResponseProductCarteSectionDTOs { get; internal set; } = new List<ProviderCatalogProductDTOs.SectionDTO>();
        public ProviderCatalogProductDTOs.NewSectionDTO NewCarteSectionDTO { get; internal set; }
        public List<ProviderCatalogProductDTOs.CatalogProductDTO> ResponseCarteProductDTOs { get; internal set; } = new List<ProviderCatalogProductDTOs.CatalogProductDTO>();
        public ProviderCatalogProductDTOs.NewCatalogProductDTO NewCarteProductDTO { get; internal set; }
        public ProviderCatalogProductDTOs.CarteBulkChangesDTO CarteBulkChangesDTO { get; internal set; } = new ProviderCatalogProductDTOs.CarteBulkChangesDTO();
        public ProviderDTOs.ProviderCatalogProductsDTO ProductCarteDTO { get; internal set; } =
            new ProviderDTOs.ProviderCatalogProductsDTO() { Allergens = new List<ProviderCatalogProductDTOs.AllergenDTO>(), CatalogProducts = new List<ProviderCatalogProductDTOs.CatalogProductDTO>(), Sections = new List<ProviderCatalogProductDTOs.SectionDTO>() };

        public ProviderDTOs.ProviderCatalogProductsDTO ReceivedProductCarteDTO { get; internal set; }
        public ProviderCatalogProductDTOs.UpdateCatalogProductDTO UpdateProductDTO { get; internal set; }
        public ProviderCatalogProductDTOs.UpdateSectionDTO UpdateCarteSectionDTO { get; internal set; }
        public string ProductCarteDTOBackup { get; internal set; }

        public ProviderDTOs.NewProviderDTO NewProviderDTO { get; internal set; }
        public ProviderDTOs.UpdateProviderDTO UpdateProviderDTO { get; internal set; }
        public ProviderDTOs.ProviderDTO ResponseUpdatedProviderDTO { get; internal set; }
        public ProviderDTOs.ProviderDTO BackupProviderDTO { get; internal set; }

        public List<ProviderDTOs.ERPSectionDTO> SectionsForPutRequest { get; internal set; }
        public List<ProviderDTOs.ERPCatalogProductDTO> CatalogProductsForPutRequest { get; internal set; }
    }
}
