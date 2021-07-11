using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public interface IConsumerAppService
    {
        Task<IEnumerable<ConsumerDTO>> GetAllAsync(Pager pager);
        Task<ConsumerDTO> GetAsync(ConsumerClaimsPrincipal user);
        Task<ConsumerDTO> GetAsync(long OID);
        Task<int> GetCountAsync();
        Task<ConsumerDTO> AddAsync(NewConsumerDTO consumer, Action<string, string> addError);
        Task<ConsumerDTO> AddAsync(ConsumerClaimsPrincipal user, NewConsumerDTO consumer, Action<string, string> addError);

        Task<ConsumerDTO> AddFromProviderAlreadyAddedAsync(ConsumerDTO consumer, Action<string, string> addError);
        Task<ConsumerDTO> UpdateAsync(ConsumerClaimsPrincipal user, UpdateConsumerDTO updateConsumerDTO, Action<string, string> addError);
        Task<ConsumerDTO> UpdateAsync(UpdateAnyConsumerDTO updateConsumerDTO, Action<string, string> addError);
        Task<ConsumerDTO> UpdateAsync(long consumerOID, UpdateConsumerDTO updateConsumerDTO, Action<string, string> addError);
        Task<ConsumerDTO> UpdateFromProviderAlreadyUpdatedAsync(long consumerOID, UpdateConsumerDTO updateConsumerDTO, Action<string, string> addError);
        Task<bool> RemoveAsync(ConsumerClaimsPrincipal user, Action<string, string> addError);
        Task<bool> RemoveAsync(long consumerOID, Action<string, string> addError);
        Task<bool> RemoveFromProviderAlreadyRemovedAsync(long consumerOID, Action<string, string> addError);
        Task UpdateProviderOIDAsync(long consumerOID, long providerOID,Action<string, string> addError);
        Task<ConsumerDTO> ActivateConsumerAsync(ConsumerClaimsPrincipal user, long providerOID, Action<string, string> addError);

    }
}
