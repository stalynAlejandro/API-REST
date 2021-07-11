using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Localization;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ConsumerWebAPI.ViewModels
{
    public class ConsumerInvitationValidationViewModel
    {
        [DisplayName(nameof(Email))]
        [EmailAddress(ErrorMessage = Resources.EmailAddressAttribute_Invalid)]
        public String Email { get; set; }
        public long OID { get; set; }
        [DisplayName(nameof(Submit))]
        public string Submit { get; set; }
        [DisplayName(nameof(NewConsumerTradeName))] 
        public string NewConsumerTradeName { get; set; }
        [DisplayName(nameof(OldConsumerTradeName))]
        public string OldConsumerTradeName { get; set; }
        [DisplayName(nameof(UserExists))]
        public bool UserExists { get; set; }
        public bool SaveButtonClicked(IStringLocalizer S)
        {
            return this.Submit.Equals(S["Save"]);
        }
        public bool CancelButtonClicked(IStringLocalizer S)
        {
            return this.Submit.Equals(S["Cancel"]);
        }
    }
}
