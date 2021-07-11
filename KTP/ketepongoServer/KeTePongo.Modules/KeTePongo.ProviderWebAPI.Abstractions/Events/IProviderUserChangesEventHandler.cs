using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public interface IProviderUserChangesEventHandler
    {
        //This should be called when an user with a validatedEmail is accepted by a provider as user.
        //It is very important for security we don't set a prvider to a user till its email is validated 
        //and till the user not accepts to be user of that provider.
        Task AddedUsersToAProviderAsync(AddedUsersToAProviderContext context, Action<string, string> addError);
    }
    public class AddedUsersToAProviderContext
    {
        public AddedUsersToAProviderContext(long sourceProviderOID, long targetProviderOID, string[] userNames, bool isAdminUser)
        {
            SourceProviderOID = sourceProviderOID;
            TargetProviderOID = targetProviderOID;
            UserNames = userNames;
            IsAdminUser = isAdminUser;
        }
        public long SourceProviderOID { get; private set; }
        public long TargetProviderOID { get; private set; }
        public string[] UserNames { get; private set; }
        public bool IsAdminUser { get; private set; }
    }
}