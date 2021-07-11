using KeTePongo.Core.Interfaces;
using KeTePongo.Core.ModelBinding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ConsumersOfAProviderSalesmanDTO
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        public string SalesManUserName { get; set; }
        public List<ConsumerOfAProviderSalesmanDTO> Consumers { get; set; }
    }
    public class ConsumerOfAProviderSalesmanDTO
    {
        public long ConsumerOID { get; set; }
        public string ERPId { get; set; }
        public string TradeName { get; set; }
        public string BussinessName { get; set; }
        public string Address { get; set; }
        public string StateOrProvince { get; set; }
        public string Town { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
    }
    public class ConsumerOfAProviderSalesmanValidationDTO
    {
        public long ConsumerOID { get; set; }
        public string ERPId { get; set; }
    }
}