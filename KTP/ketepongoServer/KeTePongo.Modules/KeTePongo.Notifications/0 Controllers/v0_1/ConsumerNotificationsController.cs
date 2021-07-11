using AspNet.Security.OAuth.Validation;
using KeTePongo.Notifications.Models;
using KeTePongo.Notifications.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using KeTePongo.ConsumerWebAPI.Abstractions;
using Microsoft.Extensions.Localization;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using KeTePongo.Notifications.Abstractions.DTOs;

namespace KeTePongo.Notifications.Controllers.v0_1
{
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ConsumerNotificationsController : Controller
    {
        private readonly INotificationAppService _notificationAppService;
        private readonly IStringLocalizer S;

        public ConsumerNotificationsController(INotificationAppService notificationAppService,
            IStringLocalizer<ConsumerNotificationsController> stringLocalizer)
        {
            _notificationAppService = notificationAppService;
            S = stringLocalizer;
        }
        /// <summary>
        /// Gets the pending consumer user notifications
        /// </summary>
        /// <returns>Gets the pending consumer user notifications</returns>
        /// <response code="200">Returns user consumer data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{lastNotificationReadId:long}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(List<NotificationItemDTO>))]
        public async Task<IActionResult> GetConsumerNotifications(long lastNotificationReadId)
        {
            ConsumerClaimsPrincipal claims = new ConsumerClaimsPrincipal(User);
            if (claims.ConsumerOID == 0)
            {
                return Unauthorized(S["This user is not a consumer account."]);
            }
            var consumerNotifications = await _notificationAppService.GetAllConsumerUserNotificationsFromGivenIdAsync(claims.UserName, lastNotificationReadId);
            return Ok(consumerNotifications);
        }
    }
}
