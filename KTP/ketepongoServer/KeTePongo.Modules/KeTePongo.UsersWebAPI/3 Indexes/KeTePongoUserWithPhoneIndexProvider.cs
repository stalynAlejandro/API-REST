using KeTePongo.Core.Extensions;
using KeTePongo.UsersWebAPI;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Models;
using OrchardCore.Entities;
using OrchardCore.Users.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace OrchardCore.Users.Indexes
{
    //Index just for take care that non repeated phone numbers are stored
    public class KeTePongoUserWithPhoneIndex : MapIndex
    {
        public string PhoneNumber { get; set; }
        
    }

    public class KeTePongoUserWithPhoneIndexProvider : IndexProvider<User>
    {
        public override void Describe(DescribeContext<User> context)
        {
            context.For<KeTePongoUserWithPhoneIndex>()
                .Map(user =>
                {
                    var userProfile = user.As<UserProfile>();
                    if (string.IsNullOrWhiteSpace(userProfile.PhoneNumber))
                    {
                        return null;
                    }
                    return new KeTePongoUserWithPhoneIndex
                    {
                        PhoneNumber = userProfile.PhoneNumber,
                    };
                });
        }
    }
}
