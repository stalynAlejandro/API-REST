using System;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.ViewModels
{
    public class ProviderInvitationValidationViewModel
    {
        [EmailAddress(ErrorMessage = Resources.EmailAddressAttribute_Invalid)]
        public String Email { get; set; }
        public long OID { get; set; }
        public string Submit { get; set; }
        public string NewProviderTradeName{ get; set; }
        public string OldProviderTradeName { get; set; }
        public bool UserExists { get; set; }
        public bool SaveButtonClicked()
        {
            return this.Submit.Equals("Guardar");
        }
        public bool CancelButtonClicked()
        {
            return this.Submit.Equals("Cancelar");
        }
    }
}
