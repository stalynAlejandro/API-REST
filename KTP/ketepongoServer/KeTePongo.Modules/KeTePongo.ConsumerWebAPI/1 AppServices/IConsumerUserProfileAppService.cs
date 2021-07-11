using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public interface IConsumerUserProfileAppService
    {
        Task<(ConsumerDTO consumer, ConsumerUserProfileDTO consumerUserProfile)> GetConsumerAndUserInfoAsync(string userName);
        Task<IEnumerable<ConsumerUserProfileDTO>> GetConsumerUsersAsync(long consumerOID, Pager pager);
        Task<IEnumerable<ConsumerDTO>> GetConsumersToMoveUserFromCurrentConsumerAsync(long currentConsumerOID, Pager pager);
        Task<int> GetCountOfConsumersToMoveUserFromCurrentConsumerAsync(long currentConsumerOID);


        Task<bool> AssignConsumerToUserAsync(string userName, long consumerOID, Action<string, string> addError);
        Task<List<ConsumerInvitationDTO>> CreateConsumerInvitationAsync(List<NewConsumerInvitationDTO> consumerInvitationsDTO, ConsumerClaimsPrincipal user, IUrlHelper urlHelper, string httpContextScheme, Action<string, string> addError);
        Task<ConsumerInvitationDTO> GetConsumerInvitation(long OID);
        Task<bool> ConfirmConsumerInvitationAsync(ConsumerInvitationValidationViewModel invitationToConsumerViewModel, Action<string, string> addError);
        Task<ConsumerInvitationValidationViewModel> GetConsumerInvitationValidationViewModelAsync(string token, Action<string, string> addError);
    }
}
