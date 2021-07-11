using KeTePongo.Core.AppServices;
using KeTePongo.Core.YesSqlCollections;
using KeTePongo.ProviderWebAPI.Models;
using OrchardCore.Entities;
using System;
using System.Linq.Expressions;
using System.Text;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ProviderUserProfileIndex : MapIndex
    {
        public string UserName { get; set; }
        public long ProviderOID { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public bool IsActivated { get; set; }

        static public Expression<Func<ProviderUserProfileIndex, bool>> GetExprByUserName(string userName)
        {
            return i => i.UserName == userName;
        }
        static public Expression<Func<ProviderUserProfileIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.ProviderOID == providerOID;
        }
        static public Expression<Func<ProviderUserProfileIndex, bool>> GetExprByUserEmail(string userEmail)
        {
            return i => i.Email == userEmail;
        }
        static public Expression<Func<ProviderUserProfileIndex, bool>> GetExprByActivatedAndUserEmailOrPhone(string userEmail, string phone)
        {
            return i =>i.IsActivated && (i.Email == userEmail || i.Telephone == phone);
        }
    }
    class ProviderUserProfileIndexProvider : IndexProvider<ProviderUserProfile>
    {
        public override void Describe(DescribeContext<ProviderUserProfile> context)
        {
            context.For<ProviderUserProfileIndex>()
                .Map(providerUserProfile =>
                {
                    return new ProviderUserProfileIndex()
                    {
                        UserName = providerUserProfile.UserName,
                        ProviderOID = providerUserProfile.ProviderOID,
                        Email = providerUserProfile.Email,
                        Telephone = providerUserProfile.Telephone,
                        IsActivated = providerUserProfile.IsActivated
                    };
                });
        }
    }
}
