using KeTePongo.UsersWebAPI;
using KeTePongo.UsersWebAPI.AppServices;
using KeTePongo.UsersWebAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Admin;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.Notify;
using OrchardCore.Navigation;
using Settings = OrchardCore.Settings;
using System.Threading.Tasks;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using AutoMapper;

namespace KeTePongo.ConsumerWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeUserController : Controller
    {
        private readonly Settings.ISiteService _siteService;
        private readonly INotifier _notifier;
        public IHtmlLocalizer T { get; }
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger<BackOfficeUserController> _logger;
        private readonly IUserAppService _userAppService;
        private readonly IMapper _mapper;

        private readonly dynamic New;

        public BackOfficeUserController(
            INotifier notifier,
            IHtmlLocalizer<BackOfficeUserController> localizer,
            ILogger<BackOfficeUserController> logger,
            IAuthorizationService authorizationService,
            IUserAppService userAppService,
            Settings.ISiteService siteService,
            IShapeFactory shapeFactory,
            IMapper mapper)
        {
            _notifier = notifier;
            T = localizer;
            _logger = logger;
            _authorizationService = authorizationService;
            _userAppService = userAppService;
            _siteService = siteService;
            _mapper = mapper;

            New = shapeFactory;
        }

        //public async Task<ActionResult> Index(UserType userType, int companyId, string tradeName, PagerParameters pagerParameters)
        public async Task<ActionResult> Index(PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageKetepongoUsers))
            {
                return Unauthorized();
            }
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            var users = await _userAppService.GetAllAsync(pager);
            var count = await _userAppService.GetCountAsync();
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);

            return View(new UsersIndexViewModel()
            {
                Users = users,
                Pager = pagerShape
            });
        }

        [HttpGet]
        public async Task<IActionResult> Create(UserType userType, long companyOID, string returnUrl)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageKetepongoUsers))
            {
                return Unauthorized();
            }
            var userDTO = new NewUserBackOfficeDTO() { UserType = userType };
            if (userType == UserType.ConsumerUser)
            {
                userDTO.ConsumerOID = companyOID;
            }
            else if (userType == UserType.ProviderUser)
            {
                userDTO.ProviderOID = companyOID;
            }
            else
            {
                return BadRequest();
            }
            ViewData[nameof(returnUrl)] = returnUrl;
            return View(userDTO);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(NewUserBackOfficeDTO newUserDTO, string returnUrl)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageKetepongoUsers))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                return View(newUserDTO);
            }
            var user = await _userAppService.AddAsync(newUserDTO, true, (key, error) => ModelState.AddModelError(key, error));
            
            if (!ModelState.IsValid)
            {
                return View(newUserDTO);
            }
            if (newUserDTO.UserType == UserType.ConsumerUser)
            {
                return Redirect(Url.Action("SetConsumerOID", "BackOfficeChangeUserConsumer", new { area = "KeTePongo.ConsumerWebAPI", userName = user.UserName, consumerOID = newUserDTO.ConsumerOID, returnUrl = returnUrl }, HttpContext.Request.Scheme));
            }
            else
            {
                return Redirect(Url.Action("SetProviderOID", "BackOfficeChangeUserProvider", new { area = "KeTePongo.ProviderWebAPI", userName = user.UserName, providerOID = newUserDTO.ProviderOID, returnUrl = returnUrl }, HttpContext.Request.Scheme));
            }
        }
        [HttpGet]
        public async Task<IActionResult> Edit(string userName, string returnUrl)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageKetepongoUsers))
            {
                return Unauthorized();
            }
            if (string.IsNullOrWhiteSpace(userName))
            {
                return NotFound();
            }

            var userBackOfficeDTO = await _userAppService.GetAsync(userName);
            if (userBackOfficeDTO == null)
            {
                return NotFound();
            }
            ViewData["returnUrl"] = returnUrl;
            return View(userBackOfficeDTO);
        }
        [HttpPost, ActionName(nameof(Edit))]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPost(string userName, string returnUrl)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageKetepongoUsers))
            {
                return Unauthorized();
            }
            if (string.IsNullOrWhiteSpace(userName))
            {
                return NotFound();
            }
            var userDTO = await _userAppService.GetAsync(userName);
            if (userDTO == null)
            {
                return NotFound();
            }
            var updatedUserDTO = _mapper.Map<UserDTO, UpdatedUserDTO>(userDTO);
            if (await TryUpdateModelAsync<UpdatedUserDTO>(updatedUserDTO, ""))
            {
                if (!ModelState.IsValid)
                {
                    return View(userDTO);
                }
                await _userAppService.UpdateAsync(userDTO.UserName, updatedUserDTO, (key, message) => ModelState.AddModelError(key, message));
                if (!ModelState.IsValid)
                {
                    return View(userDTO);
                }
                if (returnUrl != null)
                {
                    return Redirect(returnUrl);
                }
                return RedirectToAction(nameof(Index));
            }
            return View(userDTO);
        }
    }
}
