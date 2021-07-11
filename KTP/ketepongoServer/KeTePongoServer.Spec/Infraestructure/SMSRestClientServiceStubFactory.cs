using KeTePongo.SMS.Abstractions;
using Moq;
using RestSharp;
using System.Net;

namespace KeTePongoServer.Spec.Infraestructure
{
    static class SMSRestClientServiceStubFactory
    {

        public static Mock<ISMSRestClientService> CreateWithUnauthorized()
        {
            var _smsRestClientServiceStub = new Mock<ISMSRestClientService>();

            _smsRestClientServiceStub.Setup(x => x.GetSMSRestClient(It.IsAny<string>(), It.IsAny<object>(), It.IsAny<Method>())).ReturnsAsync(((IRestResponse)new RestResponse()
            {
                Content = "status: error, error_id: UNAUTHORIZED, error_msg: Your API Key may be invalid or your API is blocked",
                StatusCode = HttpStatusCode.OK
            }));

            return _smsRestClientServiceStub;
        }

        public static Mock<ISMSRestClientService> CreateWithNotEnoughBalance()
        {
            var _smsRestClientServiceStub = new Mock<ISMSRestClientService>();

            _smsRestClientServiceStub.Setup(x => x.GetSMSRestClient(It.IsAny<string>(), It.IsAny<object>(), It.IsAny<Method>())).ReturnsAsync(((IRestResponse)new RestResponse()
            {
                Content = "status: error, error_id: NOT_ENOUGH_BALANCE, error_msg: Your account has no funds to process this request, add credits to your account and try again",
                StatusCode = HttpStatusCode.OK
            }));

            return _smsRestClientServiceStub;
        }

        public static Mock<ISMSRestClientService> CreateWithBadParams()
        {
            var _smsRestClientServiceStub = new Mock<ISMSRestClientService>();

            _smsRestClientServiceStub.Setup(x => x.GetSMSRestClient(It.IsAny<string>(), It.IsAny<object>(), It.IsAny<Method>())).ReturnsAsync(((IRestResponse)new RestResponse()
            {
                Content = "status: error, error_id: BAD_PARAMS, error_msg: One or more of your parameters has incorrect format or value.",
                StatusCode = HttpStatusCode.OK
            }));

            return _smsRestClientServiceStub;
        }

        public static Mock<ISMSRestClientService> CreateWithInvalidDestination()
        {
            var _smsRestClientServiceStub = new Mock<ISMSRestClientService>();

            _smsRestClientServiceStub.Setup(x => x.GetSMSRestClient(It.IsAny<string>(), It.IsAny<object>(), It.IsAny<Method>())).ReturnsAsync(((IRestResponse)new RestResponse()
            {
                Content = "status: error, error_id: INVALID_DESTINATION, error_msg: Our Gateway was unable to process your destination. The number must be in MSISDN format. Check format here.",
                StatusCode = HttpStatusCode.OK
            }));

            return _smsRestClientServiceStub;
        }

    }
}
