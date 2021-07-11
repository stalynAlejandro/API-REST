using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OrchardCore.Email;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace KeTePongo.Core.Services
{
    public class EmailTemplateService : IEmailTemplateService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISmtpService _smtpService;
        private readonly IRazorViewEngine _razorViewEngine;
        private readonly ICompositeViewEngine _compositeViewEngine;
        private readonly ITempDataProvider _tempDataProvider;
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<EmailTemplateService> _logger;
        public EmailTemplateService(
            IHttpContextAccessor httpContextAccessor,
            ISmtpService smtpService,
            IRazorViewEngine razorViewEngine,
            ICompositeViewEngine compositeViewEngine,
            ITempDataProvider tempDataProvider,
            IServiceProvider serviceProvider,
            ILogger<EmailTemplateService> logger
            )
        {
            _httpContextAccessor = httpContextAccessor;
            _smtpService = smtpService;
            _razorViewEngine = razorViewEngine;
            _compositeViewEngine = compositeViewEngine;
            _tempDataProvider = tempDataProvider;
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public Task<string> GetEmailBodyAsync(object model, string viewName)
        {
            return GetEmailBodyAsync(model, viewName, null);
        }
        public async Task<string> GetEmailBodyAsync(object model, string viewName, string cssContent)
        {
            using (var requestServices = _serviceProvider.CreateScope())
            {
                var httpContext = new DefaultHttpContext { RequestServices = requestServices.ServiceProvider };
                var moduleName = model.GetType().Assembly.GetName().Name;
                cssContent = cssContent ?? ReadEmbededCssFile(this.GetType().Assembly, "KeTePongo.Core.Assets>css>mail.css");
                var routeData = new RouteData();
                routeData.Values["action"] = $"{viewName}";
                routeData.Values["controller"] = "";
                routeData.Values["area"] = moduleName;
                var actionContext = new ActionContext(httpContext, routeData, new ActionDescriptor());

                using (var sw = new StringWriter())
                {
                    var viewResult = _compositeViewEngine.GetView($"/Areas/{moduleName}/Views/", $"{viewName}.cshtml", false);
                    if (viewResult.View == null)
                    {
                        throw new ArgumentNullException($"{viewName} does not match any available view at area {moduleName}");
                    }

                    var viewDictionary = new ViewDataDictionary(new EmptyModelMetadataProvider(), new ModelStateDictionary())
                    {
                        Model = model
                    };

                    var viewContext = new ViewContext(
                        actionContext,
                        viewResult.View,
                        viewDictionary,
                        new TempDataDictionary(actionContext.HttpContext, _tempDataProvider),
                        sw,
                        new HtmlHelperOptions()
                    );
                    await viewResult.View.RenderAsync(viewContext);
                    var html = sw.ToString();
                    var premailer = new PreMailer.Net.PreMailer(html);
                    var htmlWithcss = premailer.MoveCssInline(false, null, cssContent, false, false, null).Html;
                    return System.Net.WebUtility.HtmlDecode(htmlWithcss.ToString());
                }
            }
        }
        public async Task<bool> SendEmailAsync(string email, string subject, string body)
        {
            var options = _httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IOptions<MvcViewOptions>>();

            var message = new MailMessage() { Body = body, IsBodyHtml = true, Subject = subject };
            message.To = email;
            var result = await _smtpService.SendAsync(message);
            if (!result.Succeeded)
            {
                _logger.LogError($"There was a problem sending '{subject}' email for {email} ");
                throw new InvalidOperationException($"There was a problem sending '{subject}' email for {email} ");
            }
            return result.Succeeded;
        }
        private string ReadEmbededCssFile(Assembly assembly, string resourceName)
        {
            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }
            }
        }
    }
}
