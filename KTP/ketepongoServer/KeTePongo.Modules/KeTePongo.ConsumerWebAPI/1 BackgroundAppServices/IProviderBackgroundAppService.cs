using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.AppServices;
using System;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.BackgroundAppServices
{
    public interface IProviderBackgroundAppService
    {
        public Task<bool> RemoveAsync(long consumerOID, long providerOID, Action<string, string> addError);
        Task<bool> ValidateAsync(long consumerOID, long keTePongoProviderOID, string salesmanEmail, Action<string, string> addError);
    }
}
