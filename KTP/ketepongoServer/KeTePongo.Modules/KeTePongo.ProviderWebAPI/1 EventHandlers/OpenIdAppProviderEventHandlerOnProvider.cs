using AutoMapper;
using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.ProviderWebAPI.Indexes;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public class OpenIdAppProviderEventHandlerOnProvider : IOpenIdAppProviderEventHandler
    {
        private readonly ISession _session;
        private readonly IMapper _mapper;
        private readonly ILogger<OpenIdAppProviderEventHandlerOnProvider> _logger;
        IProviderAppService _providerAppService;
        private IStringLocalizer S;
        public OpenIdAppProviderEventHandlerOnProvider(ISession session, 
            IMapper mapper, 
            ILogger<OpenIdAppProviderEventHandlerOnProvider> logger,
            IProviderAppService providerAppService,
            IStringLocalizer<OpenIdAppProviderEventHandlerOnProvider> stringLocalizer)
        {
            _session = session;
            _mapper = mapper;
            _logger = logger;
            _providerAppService = providerAppService;
            S = stringLocalizer;
        }

        public async Task OpenIdAppLinkedToProviderAsync(OpenIdAppLinkedToProviderContext context, Action<string, string> addError)
        {
            try
            {
                await _providerAppService.ChangeProviderLinkedToAnERPAsync(context.SourceProviderOID, context.TargetProviderOID, addError);
            }
            catch (Exception e)
            {
                addError("", S["Error changing provider linked to an ERP"]);
                _logger.LogError(e, S["Error changing provider linked to an ERP SourceProviderOID {context.SourceProviderOID} TargetProviderOID {context.TargetProviderOID}"]);
            }
        }
    }
}
