using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.Core.Services
{
    public interface IInvitationTokenProvider
    {
        string GenerateInvitationToken(long oid, string email, int userType);
        (long oid, string email, int userType) ValidateInvitationToken(string token);
    }
}
