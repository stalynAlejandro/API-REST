using KeTePongo.SMS.Abstractions;
using Microsoft.Extensions.Options;

namespace KeTePongoServer.Spec.Infraestructure
{
    public class SMSOptions : IOptions<SMSSettings>
    {
        private string _sender;
        private SmsDeliveryMethod _deliveryMethod;
        private bool _isLookupEnabled;
        private string _api;
        public SMSOptions(string api, string sender, SmsDeliveryMethod deliveryMethod, bool isLookupEnabled)
        {
            _api = api;
            _sender = sender;
            _deliveryMethod = deliveryMethod;
            _isLookupEnabled = isLookupEnabled;
        }
        public SMSSettings Value => new SMSSettings()
        {
            Sender = _sender,
            DeliveryMethod = _deliveryMethod,
            API_KEY = _api,
            IsLookupEnabled = _isLookupEnabled,
        };
    }
}
