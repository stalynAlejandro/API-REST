using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public interface IProviderUserProfileAppService
    {
        Task<(ProviderDTO provider, ProviderUserProfileDTO providerUserProfile)> GetProviderAndUserInfoAsync(string userName);
        Task<IEnumerable<ProviderUserProfileDTO>> GetProviderUsersAsync(long providerOID, Pager pager);
        Task<IEnumerable<ProviderDTO>> GetProvidersToMoveUserFromCurrentProviderAsync(long currentProviderOID, Pager pager);
        Task<int> GetCountOfProvidersToMoveUserFromCurrentProviderAsync(long currentProviderOID);
        Task<bool> AssignProviderToUserAsync(string userName, long consumerOID, Action<string, string> addError);
        Task<List<ProviderInvitationDTO>> CreateProviderInvitationAsync(List<NewProviderInvitationDTO> providerInvitationsDTO, ProviderClaimsPrincipal user, IUrlHelper urlHelper, string httpContextScheme, Action<string, string> addError);
        Task<ProviderInvitationDTO> GetProviderInvitation(long oid);
        Task<bool> ConfirmProviderInvitationAsync(ProviderInvitationValidationViewModel invitationToProviderViewModel, Action<string, string> addError);
        Task<ProviderInvitationValidationViewModel> GetProviderInvitationValidationViewModelAsync(string token, Action<string, string> addError);
    }
}
