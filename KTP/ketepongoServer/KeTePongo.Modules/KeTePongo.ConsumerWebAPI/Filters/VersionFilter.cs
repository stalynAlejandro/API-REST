using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.Controllers.v0_1;
using KeTePongo.Core.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.OpenApi.Extensions;
using OrchardCore.Environment.Extensions;
using Org.BouncyCastle.Asn1.X509.Qualified;
using System;
using System.Linq;
using System.Threading.Tasks;
namespace KeTePongo.ConsumerWebAPI
{ 
    public class VersionFilter : IResourceFilter
    {
        static string ControllersNamespace = $"{typeof(VersionFilter).Namespace}.Controllers";
        const int Status521VersionMismatch = 521;
        public readonly IManifestAppService _manifestService;
        public VersionFilter(IManifestAppService manifestService)
        {
            _manifestService = manifestService;
        }
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            if (!(context.ActionDescriptor is ControllerActionDescriptor action)
                || action.ControllerTypeInfo.Namespace != ControllersNamespace 
                || action.ControllerName == nameof(APIVersionController).Replace("Controller", "")
                || action.ControllerName == nameof(VersionController)
                || !(action.ControllerTypeInfo.GetCustomAttributes(typeof(ApiControllerAttribute), false).Any()))
            {
                return;
            }
            string apiVersion = context.HttpContext.Request.Headers[VersionAttribute.ApiVersionHeader];
            if (string.IsNullOrEmpty(apiVersion))
            {
                apiVersion = "0.0.0.0";
            }
            var manifest = _manifestService.GetManifest();
            if (new Version(apiVersion)<new Version(manifest.MinAPIVersionSupported))
            {
                context.Result = new StatusCodeResult(Status521VersionMismatch);
            }
        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }
    }
}