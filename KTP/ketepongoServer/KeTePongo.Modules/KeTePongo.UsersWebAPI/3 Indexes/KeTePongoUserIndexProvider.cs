using KeTePongo.Core.Extensions;
using KeTePongo.UsersWebAPI;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Models;
using OrchardCore.Entities;
using OrchardCore.Users.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace OrchardCore.Users.Indexes
{
    public class KeTePongoUserIndex : MapIndex
    {
        public long ConsumerOID { get; set; }
        public string PhoneNumber { get; set; }
        public long ProviderOID { get; set; }
    }

    public class KeTePongoUserIndexProvider : IndexProvider<User>
    {
        public override void Describe(DescribeContext<User> context)
        {
            context.For<KeTePongoUserIndex>()
                .Map(user =>
                {
                    var userProfile = user.As<UserProfile>();
                    
                    return new KeTePongoUserIndex
                    {
                        ConsumerOID = userProfile.ConsumerOID,
                        ProviderOID = userProfile.ProviderOID,
                        PhoneNumber = userProfile.PhoneNumber,
                    };
                });
        }
    }
}
