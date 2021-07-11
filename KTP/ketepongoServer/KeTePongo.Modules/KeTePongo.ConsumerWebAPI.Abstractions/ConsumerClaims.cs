using KeTePongo.Core.DomainServices;
using Org.BouncyCastle.Utilities;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.Abstractions
{
    public static class ConsumerClaimsConsts
    {
        public const string ConsumerOID = "consumer_oid";
    }

    public interface IConsumerClaims
    {
        long ConsumerOID { get; }
        string UserName { get; }
    }
    public class ConsumerClaims : IConsumerClaims
    {
        public ConsumerClaims(string userName, long consumerOID)
        {
            UserName = userName;
            ConsumerOID = consumerOID;
        }
        public string UserName { get; private set; }
        public long ConsumerOID { get; private set; }
    }
    public class ConsumerClaimsPrincipal : IPrincipal, IConsumerClaims
    {
        ClaimsPrincipal _user;

        public ConsumerClaimsPrincipal(ClaimsPrincipal user)
        {
            _user = user;
            _userName = new Lazy<string>(() =>
            {
                var claim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
                return claim != null && !string.IsNullOrEmpty(claim.Value) ? claim.Value : null;
            });
            _consumerOID = new Lazy<long>(() =>
            {
                var claim = user.Claims.FirstOrDefault(c => c.Type == ConsumerClaimsConsts.ConsumerOID);

                return claim != null ? long.Parse(claim.Value) : 0;
            });
        }
        private Lazy<string> _userName;
        public string UserName { get { return _userName.Value; } }
        private Lazy<long> _consumerOID;
        public long ConsumerOID { get { return _consumerOID.Value; } }

        public IIdentity Identity => _user.Identity;

        public bool IsInRole(string role)
        {
            return _user.IsInRole(role);
        }
    }
}
