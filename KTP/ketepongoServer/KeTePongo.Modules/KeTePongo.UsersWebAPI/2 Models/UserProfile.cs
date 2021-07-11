using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using System;
using System.Collections.Generic;

namespace KeTePongo.UsersWebAPI.Models
{
    public class UserProfile
    {
        private List<UserType> _UserTypes = new List<UserType>();
        public List<UserType> UserTypes 
        { 
            get 
            {
                return _UserTypes;
            }
            set
            {
                _UserTypes = value;
            }
        }
        public string Name { get; set; }
        public string NewEmailRequested { get; set; }
        public bool IsPhoneConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public string NewPhoneNumberRequested { get; set; }
        public string TwoFactorPhoneConfirmationCode { get; set; }
        public long ConsumerOID { get; set; }
        public long ProviderOID { get; set; }

        public void SetPendingToConfirm(string newPhoneNumberRequested, string twoFactorPhoneConfirmationCode)
        {
            this.NewPhoneNumberRequested = newPhoneNumberRequested;
            this.TwoFactorPhoneConfirmationCode = twoFactorPhoneConfirmationCode;
            this.IsPhoneConfirmed = false;
        }

        public void SetPhoneNumber()
        {
            this.PhoneNumber = this.NewPhoneNumberRequested;
            this.NewPhoneNumberRequested = null;
            this.TwoFactorPhoneConfirmationCode = null;
        }
    }
}