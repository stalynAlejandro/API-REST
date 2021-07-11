using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.AppServices;
using KeTePongo.UsersWebAPI.Controllers.v0_1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using OrchardCore.Environment.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI
{ 
    public class VersionFilter : IResourceFilter
    {
        static string ControllersNamespace = $"{typeof(VersionFilter).Namespace}.Controllers";
        public const int Status521VersionMismatch = 521;
        public readonly IManifestAppService _manifestService;
        public VersionFilter(IManifestAppService manifestService)
        {
            _manifestService = manifestService;
        }
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            if (!(context.ActionDescriptor is ControllerActionDescriptor action)
                || action.ControllerTypeInfo.Namespace != ControllersNamespace
                || action.ControllerName == nameof(ClientAppHasToUpdateController).Replace("Controller", "")
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