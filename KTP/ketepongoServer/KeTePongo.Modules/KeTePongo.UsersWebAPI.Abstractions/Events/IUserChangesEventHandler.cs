using KeTePongo.Core.AppServices;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using Microsoft.Azure.Storage.Blob.Protocol;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Abstractions.Events
{
    public interface IUserChangesEventHandler
    {
        //This should be called when an user with a validatedEmail is accepted by a consumer as user.
        //It is very important for security we don't set a consumer to a user till its email is validated 
        //and till the user not accepts to be user of that consumer.
        //The same has to be done for provider users: email validated and user accepting to be changed to that provider.
        Task UserEmailChangedAsync(UserEmailChangedContext context, Action<string, string> addError);
        Task UserPhoneChangedAsync(UserPhoneChangedContext context, Action<string, string> addError);
        Task AddedConfirmedUserAsync(AddedConfirmedUserContext context, Action<string, string> addError);
        Task UpdatedUserAsync(UpdatedUserContext context, Action<string, string> addError);
    }
    
    public class UpdatedUserContext {
        public UpdatedUserContext(List<UserType> userTypes, string userName, UpdatedUserDTO updatedUser)
        {
            UserTypes = userTypes;
            UserName = userName;
            UpdatedUser = updatedUser;
        }
        public List<UserType> UserTypes { get; private set; }
        public string UserName { get; private set; }
        public UpdatedUserDTO UpdatedUser { get; private set; }
    }
    public class AddedConfirmedUserContext
    {
        public AddedConfirmedUserContext(string userName, string name, string email, UserType userType)
        {
            UserName = userName;
            Name = name;
            Email = email;
            UserType = userType;

        }
        public int ConsumerId { get; private set; }
        public long ConsumerOID { get; private set; }
        public string UserName { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public UserType UserType { get; private set; }
    }

    public class UserEmailChangedContext
    {
        public UserEmailChangedContext(List<UserType> userTypes, string userName, string newEmail, string oldEmail)
        {
            UserTypes = userTypes;
            UserName = userName;
            NewEmail = newEmail;
            OldEmail = oldEmail;
        }
        public List<UserType> UserTypes { get; private set; }
        public string UserName { get; private set; }
        public string NewEmail { get; private set; }
        public string OldEmail { get; private set; }
    }

    public class UserPhoneChangedContext
    {
        public List<UserType> UserTypes { get; private set; }
        public string UserName { get; private set; }
        public string NewPhone { get; private set; }
        public UserPhoneChangedContext(List<UserType> userTypes, string userName, string newPhone)
        {
            UserTypes = userTypes;
            UserName = userName;
            NewPhone = newPhone;
        }
    }
}
