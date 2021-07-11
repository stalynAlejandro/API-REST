using AspNet.Security.OAuth.Validation;
using KeTePongo.Notifications.Models;
using KeTePongo.Notifications.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using KeTePongo.ProviderWebAPI.Abstractions;
using Microsoft.Extensions.Localization;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;

namespace KeTePongo.Notifications.Controllers.v0_1
{
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ProviderNotificationsController : Controller
    {
        private readonly INotificationAppService _notificationAppService;
        private readonly ILogger<ProviderNotificationsController> _logger;

        private readonly IStringLocalizer S;

        public ProviderNotificationsController(INotificationAppService notificationAppService,
            ILogger<ProviderNotificationsController> logger,
            IStringLocalizer<ProviderNotificationsController> stringLocalizer)
        {
            _notificationAppService = notificationAppService;
            _logger = logger;
            S = stringLocalizer;
        }
        /// <summary>
        /// Gets the pending provider user notifications
        /// </summary>
        /// <returns>Gets the pending provider user notifications</returns>
        /// <response code="200">Returns user provider data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{lastNotificationReadId:long}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(NotificationItem))]
        public async Task<IActionResult> GetProviderNotifications(long lastNotificationReadId)
        {
            ProviderClaimsPrincipal claims = new ProviderClaimsPrincipal(User);
            if (claims.ProviderOID == 0)
            {
                return Unauthorized(S["This user is not a provider account."]);
            }
            var providerNotifications = await _notificationAppService.GetAllProviderUserNotificationsFromGivenIdAsync(claims.UserName, lastNotificationReadId);
            return Ok(providerNotifications);
        }
    }
}
