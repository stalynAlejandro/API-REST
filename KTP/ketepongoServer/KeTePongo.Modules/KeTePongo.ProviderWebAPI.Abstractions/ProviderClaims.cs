using KeTePongo.Core.AppServices;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace KeTePongo.ProviderWebAPI.Abstractions
{
    public interface IProviderClaims
    {
        long ProviderOID { get; }
        string UserName { get; }
    }
    public class ProviderClaims : IProviderClaims
    {
        public ProviderClaims(string userName, long providerOID)
        {
            UserName = userName;
            ProviderOID = providerOID;
        }
        public string UserName { get; private set; }
        public long ProviderOID { get; private set; }
    }
    public class ProviderClaimsPrincipal : IPrincipal, IProviderClaims
    {
        ClaimsPrincipal _user;
        public ProviderClaimsPrincipal(ClaimsPrincipal user)
        {
            _user = user;
            _userName = new Lazy<string>(() =>
            {
                var claim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
                return claim != null && !string.IsNullOrEmpty(claim.Value) ? claim.Value : null;
            });
            _providerOID = new Lazy<long>(() =>
            {
                var claim = user.Claims.FirstOrDefault(c => c.Type == CrossModuleClaims.ProviderOID);
                return claim != null ? long.Parse(claim.Value) : 0;
            });
        }
        private Lazy<string> _userName;
        public string UserName { get { return _userName.Value; } }

        private Lazy<long> _providerOID;
        public long ProviderOID { get { return _providerOID.Value; } }

        public IIdentity Identity => _user.Identity;

        public bool IsInRole(string role)
        {
            return _user.IsInRole(role);
        }
    }
}
