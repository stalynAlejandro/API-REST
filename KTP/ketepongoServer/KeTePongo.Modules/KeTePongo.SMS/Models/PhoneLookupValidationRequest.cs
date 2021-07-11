using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.SMS.Models
{
    public class PhoneLookupValidationRequest
    {
        public string Api_Key { get; set; }
        public string Msisdn { get; set; }
    }
}