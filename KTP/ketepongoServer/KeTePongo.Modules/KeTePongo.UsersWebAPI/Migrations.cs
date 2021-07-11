using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using KeTePongo.Core.AppServices;
using KeTePongo.Core.Services;
using KeTePongo.UsersWebAPI.Indexes;
using KeTePongo.UsersWebAPI.Models;
using KeTePongo.UsersWebAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualBasic;
using Newtonsoft.Json.Linq;
using OrchardCore.Data.Migration;
using OrchardCore.Entities;
using OrchardCore.Environment.Extensions;
using OrchardCore.Environment.Shell;
using OrchardCore.OpenId.YesSql.Migrations;
using OrchardCore.Roles.Services;
using OrchardCore.Security;
using OrchardCore.Security.Permissions;
using OrchardCore.Users.Indexes;
using OrchardCore.Users.Models;
using YesSql;
using YesSql.Collections;

namespace KeTePongo.UsersWebAPI
{
    public class Migrations : DataMigration
    {
        private readonly ISession _session;
        private readonly IExtensionManager _extensionManager;
        private readonly IEnumerable<IFeatureEventHandler> _featureEventHandlers;
        private readonly IIdForTypeGenerator _idForTypeGenerator;
        private readonly RoleManager<IRole> _roleManager;
        private readonly IMyRoleUpdater _myRoleUpdater;
        public Migrations(ISession session, IIdForTypeGenerator idForTypeGenerator, IExtensionManager extensionManager, IEnumerable<IFeatureEventHandler> featureEventHandlers,
            RoleManager<IRole> roleManager
            , IMyRoleUpdater myRoleUpdater)
        {
            _extensionManager = extensionManager;
            _featureEventHandlers = featureEventHandlers;
            _session = session;
            _idForTypeGenerator = idForTypeGenerator;
            _roleManager = roleManager;
            _myRoleUpdater = myRoleUpdater;
        }
        public int Create()
        {
            SchemaBuilder.CreateMapIndexTable(nameof(KeTePongoUserIndex), table => table
            .Column<long>(nameof(KeTePongoUserIndex.ConsumerOID))
            .Column<long>(nameof(KeTePongoUserIndex.ProviderOID))
            .Column<string>(nameof(KeTePongoUserIndex.PhoneNumber)));

            SchemaBuilder.CreateMapIndexTable(nameof(KeTePongoUserWithPhoneIndex), table => table
            .Column<string>(nameof(KeTePongoUserIndex.PhoneNumber), column => column.Unique().Nullable()));

            SchemaBuilder.AlterTable(nameof(KeTePongoUserIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(KeTePongoUserIndex)}_{nameof(KeTePongoUserIndex.ConsumerOID)}", new[] { "DocumentId", nameof(KeTePongoUserIndex.ConsumerOID) });
                table.CreateIndex($"IX_{nameof(KeTePongoUserIndex)}_{nameof(KeTePongoUserIndex.ProviderOID)}", new[] { "DocumentId", nameof(KeTePongoUserIndex.ProviderOID) });
                table.CreateIndex($"IX_{nameof(KeTePongoUserIndex)}_{nameof(KeTePongoUserIndex.PhoneNumber)}", new[] { "DocumentId", nameof(KeTePongoUserIndex.PhoneNumber) });
            });
            SchemaBuilder.CreateMapIndexTable(nameof(ProviderOnUserIndex), table => table
               .Column<long>(nameof(ProviderOnUserIndex.OID), column => column.NotNull())
               .Column<long>(nameof(ProviderOnUserIndex.ProviderOID), column => column.NotNull())
               .Column<string>(nameof(ProviderOnUserIndex.TradeName)));
            
            //Code for update roles if added default permissions
            //var extension = _extensionManager.GetExtension("KeTePongo.UsersWebAPI");
            //var roleUpdater = _featureEventHandlers.First(h => h as RoleUpdater != null) as RoleUpdater;
            //roleUpdater.AddDefaultRolesForFeatureAsync(extension.Features.First()).Wait();
            return 1;
        }
    }
}

