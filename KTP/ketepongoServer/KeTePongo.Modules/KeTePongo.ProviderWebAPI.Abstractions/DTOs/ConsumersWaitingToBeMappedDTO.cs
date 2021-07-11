using KeTePongo.Core.Interfaces;
using KeTePongo.Core.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ConsumerWaitingToBeMappedDTO
    {
        public int Id { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public String TradeName { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public String Address { get; set; }

        public List<string> UsersEmails { get; set; }
    }
}
