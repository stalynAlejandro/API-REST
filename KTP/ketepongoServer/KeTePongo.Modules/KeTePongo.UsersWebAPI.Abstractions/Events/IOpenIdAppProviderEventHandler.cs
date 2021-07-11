using System;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Abstractions.Events
{
    public interface IOpenIdAppProviderEventHandler
    {
        Task OpenIdAppLinkedToProviderAsync(OpenIdAppLinkedToProviderContext context, Action<string, string> addError);
    }
   
    public class OpenIdAppLinkedToProviderContext
    {
        public OpenIdAppLinkedToProviderContext(long sourceProviderOID, long targetProviderOID)
        {
            SourceProviderOID = sourceProviderOID;
            TargetProviderOID = targetProviderOID;
        }
        public long SourceProviderOID { get; private set; }
        public long TargetProviderOID { get; private set; }
    }
}
