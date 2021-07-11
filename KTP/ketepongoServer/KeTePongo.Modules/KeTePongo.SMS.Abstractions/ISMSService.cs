using System;
using System.Threading.Tasks;

namespace KeTePongo.SMS.Abstractions
{
    public interface ISMSService
    {
        Task<bool> SendSMSAsync(MessageSMS sms, Action<string, string> addError);
    }
}
