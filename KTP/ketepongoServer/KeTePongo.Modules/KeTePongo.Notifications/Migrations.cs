using Dapper;
using KeTePongo.Core.Data;
using KeTePongo.Core.Interfaces;
using KeTePongo.Core.Services;
using OrchardCore.Data.Migration;
using OrchardCore.Users.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YesSql;
using YesSql.Sql;
using YesSql.Sql.Schema;
using KeTePongo.Core.Extensions;
using System.Data.Common;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Identity;
using OrchardCore.Users;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Modules;
using KeTePongo.Notifications.Indexes;

namespace KeTePongo.Notifications
{
    public class Migrations : DataMigration
    {
        private readonly ISession _session;
        private readonly IIdForTypeGenerator _idForTypeGenerator;
        private readonly IStore _store;
        private readonly LocalSessionFactory _localSessionFactory;
        private readonly IMapper _mapper;
        private readonly ILogger<Migrations> _logger;
        public Migrations(ISession session
            , IIdForTypeGenerator idForTypeGenerator
            , IStore store
            , LocalSessionFactory localSessionFactory
            ,IMapper mapper
            ,ILogger<Migrations> logger
            )
        {
            _session = session;
            _idForTypeGenerator = idForTypeGenerator;
            _store = store;
            _localSessionFactory = localSessionFactory;
            _mapper = mapper;
            _logger = logger;
        }
        public int Create()
        {
            SchemaBuilder.CreateMapIndexTable(nameof(ConsumerNotificationsIndex), table => table
                .Column<long>(nameof(ConsumerNotificationsIndex.OID), column => column.Unique().NotNull())
                .Column<long>(nameof(ConsumerNotificationsIndex.ConsumerOID), column => column.NotNull())
                .Column<string>(nameof(ConsumerNotificationsIndex.UserName), column => column.Unique().NotNull()));

            SchemaBuilder.AlterTable(nameof(ConsumerNotificationsIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(ConsumerNotificationsIndex)}_{nameof(ConsumerNotificationsIndex.OID)}", new[] { "DocumentId", nameof(ConsumerNotificationsIndex.OID) });
                table.CreateIndex($"IX_{nameof(ConsumerNotificationsIndex)}_{nameof(ConsumerNotificationsIndex.ConsumerOID)}", new[] { "DocumentId", nameof(ConsumerNotificationsIndex.ConsumerOID) });
                table.CreateIndex($"IX_{nameof(ConsumerNotificationsIndex)}_{nameof(ConsumerNotificationsIndex.UserName)}", new[] { "DocumentId", nameof(ConsumerNotificationsIndex.UserName) });
                table.CreateIndex($"IX_{nameof(ConsumerNotificationsIndex)}{nameof(ConsumerNotificationsIndex.UserName)}{nameof(ConsumerNotificationsIndex.ConsumerOID)}", new[] { "DocumentId", nameof(ConsumerNotificationsIndex.UserName), nameof(ConsumerNotificationsIndex.ConsumerOID) });
            });

            SchemaBuilder.CreateMapIndexTable(nameof(ProviderNotificationsIndex), table => table
                .Column<long>(nameof(ProviderNotificationsIndex.OID), column => column.Unique().NotNull())
                .Column<long>(nameof(ProviderNotificationsIndex.ProviderOID), column => column.NotNull())
                .Column<string>(nameof(ProviderNotificationsIndex.UserName), column => column.Unique().NotNull()));

            SchemaBuilder.AlterTable(nameof(ProviderNotificationsIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(ProviderNotificationsIndex)}_{nameof(ProviderNotificationsIndex.OID)}", new[] { "DocumentId", nameof(ProviderNotificationsIndex.OID) });
                table.CreateIndex($"IX_{nameof(ProviderNotificationsIndex)}_{nameof(ProviderNotificationsIndex.ProviderOID)}", new[] { "DocumentId", nameof(ProviderNotificationsIndex.ProviderOID) });
                table.CreateIndex($"IX_{nameof(ProviderNotificationsIndex)}_{nameof(ProviderNotificationsIndex.UserName)}", new[] { "DocumentId", nameof(ProviderNotificationsIndex.UserName) });
                table.CreateIndex($"IX_{nameof(ProviderNotificationsIndex)}{nameof(ProviderNotificationsIndex.UserName)}{nameof(ProviderNotificationsIndex.ProviderOID)}", new[] { "DocumentId", nameof(ProviderNotificationsIndex.UserName), nameof(ProviderNotificationsIndex.ProviderOID) });
            });
            return 1;
        }     
    }
}