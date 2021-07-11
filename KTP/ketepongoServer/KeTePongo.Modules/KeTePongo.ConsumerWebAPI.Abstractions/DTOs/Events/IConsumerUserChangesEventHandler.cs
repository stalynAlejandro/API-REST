using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public interface IConsumerUserChangesEventHandler
    {
        //This should be called when an user with a validatedEmail is accepted by a consumer as user.
        //It is very important for security we don't set a consumer to a user till its email is validated 
        //and till the user not accepts to be user of that consumer.
        //The same has to be done for provider users: email validated and user accepting to be changed to that provider.
        Task AddedUsersToAConsumerAsync(AddedUsersToAConsumerContext context, Action<string, string> addError);
    }
    public class AddedUsersToAConsumerContext
    {
        public AddedUsersToAConsumerContext(long sourceConsumerOID, long targetConsumerOID, string[] userNames, bool isAdminUser)
        {
            SourceConsumerOID = sourceConsumerOID;
            TargetConsumerOID = targetConsumerOID;
            UserNames = userNames;
            IsAdminUser = isAdminUser;
        }
        public long SourceConsumerOID { get; private set; }
        public long TargetConsumerOID { get; private set; }
        public string[] UserNames { get; private set; }
        public bool IsAdminUser { get; private set; }
    }
}