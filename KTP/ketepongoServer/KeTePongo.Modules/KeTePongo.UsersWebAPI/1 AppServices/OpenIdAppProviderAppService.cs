using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using OrchardCore.OpenId.YesSql.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using KeTePongo.UsersWebAPI.Extensions;
using OrchardCore.Navigation;
using OpenIddict.Abstractions;
using AutoMapper;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public class OpenIdAppProviderAppService : IOpenIdAppProviderAppService
    {
        IOpenIddictApplicationStore<OpenIdApplication> _openIdAppStore;
        private readonly IMapper _mapper;

        public OpenIdAppProviderAppService(IOpenIddictApplicationStoreResolver openIdAppStore, IMapper mapper)
        {
            _openIdAppStore = openIdAppStore.Get<OpenIdApplication>();
            _mapper = mapper;
        }

        public async Task<IEnumerable<OpenIdAppProviderDTO>> GetAllAsync(Pager pager = null)
        {
            var result = new List<OpenIdAppProviderDTO>();
            var cancellationToken = new CancellationToken();
            int? pageIndex = pager != null ? (pager.PageSize * (pager.Page - 1)): (int?)null;
            foreach (var app in await _openIdAppStore.ListAsync(pager?.PageSize, pageIndex, cancellationToken))
            {
                result.Add(_mapper.Map<OpenIdApplication, OpenIdAppProviderDTO>(app));
            }
            return result;
        }
        public async Task<long> GetCountAsync()
        {
            return await _openIdAppStore.CountAsync(new CancellationToken());
        }
        public async Task<OpenIdAppProviderDTO> GetAsync(string clientId)
        {
            var result = new List<OpenIdAppProviderDTO>();
            var cancellationToken = new CancellationToken();
            var app = await _openIdAppStore.FindByClientIdAsync(clientId, cancellationToken);
            return _mapper.Map<OpenIdApplication, OpenIdAppProviderDTO>(app);
        }

        public async Task<bool> UpdateAsync(string clientId, UpdatedOpenIdAppProviderDTO openIdAppDTO, Action<string, string> addError)
        {
            if (openIdAppDTO is null)
            {
                throw new ArgumentNullException(nameof(openIdAppDTO));
            }

            var result = new List<OpenIdAppProviderDTO>();
            var cancellationToken = new CancellationToken();
            var openidApp = await _openIdAppStore.FindByClientIdAsync(clientId, cancellationToken);
            openidApp = openidApp.SetProviderOIDAndDisplayName(openIdAppDTO.ProviderOID, openIdAppDTO.DisplayName);
            await _openIdAppStore.UpdateAsync(openidApp, cancellationToken);
            return true;
        }
    }
}