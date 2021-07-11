using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using RestSharp;
using Microsoft.Extensions.Localization;
using System.Text.RegularExpressions;
using KeTePongo.SMS.Models;
using KeTePongo.SMS.Abstractions;
using System.IO;
using MimeKit;
using System.Threading;
using Microsoft.Extensions.Logging;

namespace KeTePongo.SMS.Services
{
    public class SMSService : ISMSService
    {
        private readonly IStringLocalizer S;
        private readonly ISMSRestClientService _smsRestClientService;
        private readonly SMSSettings _options;
        private readonly ILogger<SMSService> _logger;
        public SMSService(
            ISMSRestClientService smsRestClientService,
            IStringLocalizer<SMSService> localizer,
            IOptions<SMSSettings> smsSettings,
            ILogger<SMSService> logger)
        {
            S = localizer;
            _smsRestClientService = smsRestClientService;
            _options = smsSettings.Value;
            _logger = logger;
        }

        public async Task<bool> SendSMSAsync(MessageSMS message, Action<string, string> addError)
        {
            if (_options.Sender == null)
            {
                addError("", S["SMS settings must be configured before an SMS can be sent."]);
                return false;
            }

            if (!IsNumberFormatValid(message.PhoneNumber, addError))
            {
                return false;
            }

            switch (_options.DeliveryMethod)
            {
                case SmsDeliveryMethod.SmsUp:
                    if (!await IsWorkingPhone(message.PhoneNumber, addError))
                    {
                        return false;
                    }
                    if (!await SendOnlineSMS(message, addError))
                    {
                        return false;
                    }
                    break;
                case SmsDeliveryMethod.SpecifiedPickupDirectory:
                    var mimeMessage = FromSMSMessage(message);
                    await SendOfflineSMS(mimeMessage, _options.PickupDirectoryLocation);
                    break;
                default:
                    addError("", S["The {0} delivery method is not supported.", _options.DeliveryMethod]);
                    return false;
            }
            return true;
        }

        private bool IsNumberFormatValid(string telephone, Action<string, string> addError)
        {
            if (telephone == null || !new PhoneAttribute().IsValid(telephone) || telephone.Length != 11)
            {
                addError($"{nameof(telephone)}", S["The telephone requested to confirm is not valid"]);
                return false;
            }
            if (!Regex.Match(telephone, @"\b34\w*\b").Success)
            {
                addError($"{nameof(telephone)}", S["The telephone requested to confirm must have a valid prefix"]);
                return false;
            }
            if (Regex.Match(telephone, @"\b349\w*\b").Success)
            {
                addError($"{nameof(telephone)}", S["The telephone requested to confirm can not be a landline"]);
                return false;
            }
            return true;
        }

        private async Task<bool> IsWorkingPhone(string telephone, Action<string, string> addError)
        {
            if (!_options.IsLookupEnabled)
            {
                return true;
            }

            var body = new PhoneLookupValidationRequest()
            {
                Api_Key = _options.API_KEY,
                Msisdn = telephone
            };

            IRestResponse response = await _smsRestClientService.GetSMSRestClient("https://api.gateway360.com/api/hlr/request", body, Method.POST);

            if (response.Content.Contains("error"))
            {
                addError("", S["The phone number '{0}' is not operative.", telephone]);
                _logger.LogError("Error HLR Lookup: " + response.ErrorMessage);
                return false;
            }

            if (response.Content.Contains("false"))
            {
                return false;
            }

             return true;
        }

        private async Task<bool> SendOnlineSMS(MessageSMS message, Action<string, string> addError)
        {
            var body = new SMSRequest()
            {
                Api_Key = _options.API_KEY,
                Concat = (int)ConcatMessage.No,
                Messages = new List<Message>()
                {
                    new Message()
                    {
                        Send_At = DateTime.UtcNow.ToString("yyyy-MM-dd HH':'mm':'ss"),
                        Custom = "KTP-Server",
                        From = _options.Sender,
                        Text = message.Message,
                        To = message.PhoneNumber
                    }
                }
            };

            IRestResponse response = await _smsRestClientService.GetSMSRestClient("https://api.gateway360.com/api/3.0/sms/send", body, Method.POST);

            if (response.Content.Contains("error"))
            {
                addError("", S["Seems to be a problem with the SmsUp API."]);
                if (response.Content.Contains("UNAUTHORIZED"))
                {
                    _logger.LogError("Your API key may be invalid, double-check that your API key was input correctly or see if the IP is blocked in your account API settings");
                    return false;
                }

                if (response.Content.Contains("BAD_PARAMS"))
                {
                    _logger.LogError("One or more of your parameters has incorrect format or value");
                    return false;
                }

                if (response.Content.Contains("INVALID_DESTINATION"))
                {
                    _logger.LogError("The service was unable to process your destination. The number must be in MSISDN format");
                    return false;
                }

                if (response.Content.Contains("NOT_ENOUGH_BALANCE"))
                {
                    _logger.LogError("Your account has no funds to process this request, add credits to your account and try again");
                    return false;
                }

                _logger.LogError("Error sending SMS: " + response.ErrorMessage);
                return false;
            }

            return true;
        }
        private MimeMessage FromSMSMessage(MessageSMS message)
        {
            var mimeMessage = new MimeMessage
            {
                Sender = MailboxAddress.Parse(_options.Sender),
                Subject = message.PhoneNumber,
            };

            var body = new BodyBuilder();
            body.TextBody = message.Message;
            mimeMessage.Body = body.ToMessageBody();

            return mimeMessage;
        }

        private async Task SendOfflineSMS(MimeMessage mimeMessage, string pickupDirectory)
        {
            string extension = ".eml";
            var path = Path.Combine(pickupDirectory, Guid.NewGuid().ToString() + extension);
            await mimeMessage.WriteToAsync(path, CancellationToken.None);
        }
    }
}