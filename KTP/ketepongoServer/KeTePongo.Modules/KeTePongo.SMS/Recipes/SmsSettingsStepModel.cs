using KeTePongo.SMS.Abstractions;

namespace KeTePongo.SMS.Recipes
{
    public class SMSSettingsStepModel
    {
        public string Sender { get; set; }
        public SmsDeliveryMethod DeliveryMethod { get; set; }
        public string PickupDirectoryLocation { get; set; }
        public string API_KEY { get; set; }
        public bool IsLookupEnabled { get; set; }
    }
}
