using Dapper;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
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
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using System.Data.Common;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Identity;
using OrchardCore.Users;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using AutoMapper;
using Microsoft.Extensions.Logging;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Modules;

namespace KeTePongo.ConsumerWebAPI
{
    public class Migrations : DataMigration
    {
        private readonly ISession _session;
        private readonly IIdForTypeGenerator _idForTypeGenerator;
        private readonly IStore _store;
        private readonly LocalSessionFactory _localSessionFactory;
        private readonly IBlobStorageImageService _IBlobStorageImageService;
        private readonly IMapper _mapper;
        private readonly ILogger<Migrations> _logger;
        private readonly Lazy<IEnumerable<IConsumerChangesEventHandler>> _consumerChangesEventHandler;
        public Migrations(ISession session
            , IIdForTypeGenerator idForTypeGenerator
            , IStore store
            , LocalSessionFactory localSessionFactory
            , IBlobStorageImageService blobStorageImageService
            ,IMapper mapper
            ,ILogger<Migrations> logger
            ,IServiceProvider serviceProvider)
        {
            _session = session;
            _idForTypeGenerator = idForTypeGenerator;
            _store = store;
            _localSessionFactory = localSessionFactory;
            _IBlobStorageImageService = blobStorageImageService;
            _mapper = mapper;
            _logger = logger;
            _consumerChangesEventHandler = new Lazy<IEnumerable<IConsumerChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IConsumerChangesEventHandler>>());
        }
        public int Create()
        {
            SchemaBuilder.CreateMapIndexTable(nameof(ConsumerIndex), table => table
                .Column<long>(nameof(ConsumerIndex.ProviderOID))
                .Column<long>(nameof(ConsumerIndex.OID), column => column.Unique().NotNull()));
            SchemaBuilder.AlterTable(nameof(ConsumerIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(ConsumerIndex)}_{nameof(ConsumerIndex.OID)}", new[] { "DocumentId", nameof(ConsumerIndex.OID) });
            });

            SchemaBuilder.CreateMapIndexTable(nameof(ConsumerUserProfileIndex), table => table
               .Column<long>(nameof(ConsumerUserProfileIndex.OID), column => column.Unique().NotNull())
               .Column<string>(nameof(ConsumerUserProfileIndex.UserName), column => column.Unique().NotNull())
               .Column<long>(nameof(ConsumerUserProfileIndex.ConsumerOID), column => column.NotNull())
               .Column<string>(nameof(ConsumerUserProfileIndex.Email))
               .Column<string>(nameof(ConsumerUserProfileIndex.Telephone)));

            SchemaBuilder.AlterTable(nameof(ConsumerUserProfileIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(ConsumerUserProfileIndex)}_{nameof(ConsumerUserProfileIndex.UserName)}", new[] { "DocumentId", nameof(ConsumerUserProfileIndex.UserName) });
                table.CreateIndex($"IX_{nameof(ConsumerUserProfileIndex)}_{nameof(ConsumerUserProfileIndex.ConsumerOID)}", new[] { "DocumentId", nameof(ConsumerUserProfileIndex.ConsumerOID) });
                table.CreateIndex($"IX_{nameof(ConsumerUserProfileIndex)}_{nameof(ConsumerUserProfileIndex.Email)}", new[] { "DocumentId", nameof(ConsumerUserProfileIndex.Email) });
                table.CreateIndex($"IX_{nameof(ConsumerUserProfileIndex)}_{nameof(ConsumerUserProfileIndex.Telephone)}", new[] { "DocumentId", nameof(ConsumerUserProfileIndex.Telephone) });
            });

            SchemaBuilder.CreateMapIndexTable(nameof(ConsumptionIndex), table => table
               .Column<long>(nameof(ConsumptionIndex.OID), column => column.Unique().NotNull())
               .Column<long>(nameof(ConsumptionIndex.ConsumerOID)));
            SchemaBuilder.AlterTable(nameof(ConsumptionIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(ConsumptionIndex)}_{nameof(ConsumptionIndex.ConsumerOID)}", new[] { "DocumentId", nameof(ConsumptionIndex.ConsumerOID) });
            });

            SchemaBuilder.CreateMapIndexTable(nameof(ConsumerOrderIndex), table => table
               .Column<long>(nameof(ConsumerOrderIndex.OID), column => column.Unique().NotNull())
               .Column<long>(nameof(ConsumerOrderIndex.ConsumerOID))
               .Column<string>(nameof(ConsumerOrderIndex.UserName))
               .Column<DateTime>(nameof(ConsumerOrderIndex.UtcDateTime)));

            SchemaBuilder.AlterTable(nameof(ConsumerOrderIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(ConsumerOrderIndex)}_{nameof(ConsumerOrderIndex.ConsumerOID)}", new[] { "DocumentId", nameof(ConsumerOrderIndex.ConsumerOID) });
                table.CreateIndex($"IX_{nameof(ConsumerOrderIndex)}_{nameof(ConsumerOrderIndex.UserName)}", new[] { "DocumentId", nameof(ConsumerOrderIndex.UserName) });
                table.CreateIndex($"IX_{nameof(ConsumerOrderIndex)}_{nameof(ConsumerOrderIndex.UtcDateTime)}", new[] { "DocumentId", nameof(ConsumerOrderIndex.UtcDateTime) });
            });

            SchemaBuilder.CreateMapIndexTable(nameof(ConsumerInvitationIndex), table => table
               .Column<long>(nameof(ConsumerInvitationIndex.OID), column => column.Unique().NotNull())
               .Column<string>(nameof(ConsumerInvitationIndex.Email), column => column.WithLength(256))
               .Column<DateTime>(nameof(ConsumerInvitationIndex.CreationDate))
               .Column<string>(nameof(ConsumerInvitationIndex.CreatorUserName)));

            SchemaBuilder.AlterTable(nameof(ConsumerInvitationIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(ConsumerInvitationIndex)}_{nameof(ConsumerInvitationIndex.Email)}", new[] { "DocumentId", nameof(ConsumerInvitationIndex.Email) });
                table.CreateIndex($"IX_{nameof(ConsumerInvitationIndex)}_{nameof(ConsumerInvitationIndex.CreationDate)}", new[] { "DocumentId", nameof(ConsumerInvitationIndex.CreationDate) });
                table.CreateIndex($"IX_{nameof(ConsumerInvitationIndex)}_{nameof(ConsumerInvitationIndex.CreatorUserName)}", new[] { "DocumentId", nameof(ConsumerInvitationIndex.CreatorUserName) });
            });


            SchemaBuilder.CreateTable(nameof(RandomStringsPool), table => table
                .Column<string>(nameof(RandomStringsPool.RandomString), column => column.PrimaryKey().NotNull().WithLength(50))
                .Column<bool>(nameof(RandomStringsPool.IsUsed), column => column.NotNull().WithLength(256).WithDefault(false)));
            SchemaBuilder.AlterTable(nameof(RandomStringsPool), table => table
                    .CreateIndex($"IX_{nameof(RandomStringsPool)}_{nameof(RandomStringsPool.IsUsed)}", nameof(RandomStringsPool.IsUsed)));
            var dialect = SqlDialectFactory.For(SchemaBuilder.Connection);
            if (dialect.Name == "SqlServer")
            {
                CreateSqlServerComponentsForDBAplphanumericCodeGenerator(SchemaBuilder);
            }

            return 1;
        }
        private void CreateSqlServerComponentsForDBAplphanumericCodeGenerator(ISchemaBuilder schemaBuilder)
        {
            /*How to generate random strings on SQL Server, and pre-populate a random strings pool
            https://zoharpeled.wordpress.com/2019/09/15/pre-populate-a-random-strings-pool/ */
            var stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("CREATE VIEW GuidGenerator");
            stringBuilder.AppendLine("AS");
            stringBuilder.AppendLine("                SELECT Newid() As NewGuid");
            schemaBuilder.Connection.Execute(stringBuilder.ToString(), null, SchemaBuilder.Transaction);
            //stringBuilder.AppendLine("GO");

            stringBuilder = new StringBuilder();
            stringBuilder.AppendLine();
            stringBuilder.AppendLine("CREATE FUNCTION RandomStringGenerator");
            stringBuilder.AppendLine("(");
            stringBuilder.AppendLine("    @Length int,");
            stringBuilder.AppendLine("    @Count int-- Note: up to 1, 000, 000 rows");
            stringBuilder.AppendLine(")");
            stringBuilder.AppendLine("RETURNS TABLE");
            stringBuilder.AppendLine("AS");
            stringBuilder.AppendLine("RETURN");
            stringBuilder.AppendLine("");
            stringBuilder.AppendLine("WITH E1(N) AS(SELECT N FROM(VALUES(1), (2), (3), (4), (5), (6), (7), (8), (9), (10)) V(N)),   --10");
            stringBuilder.AppendLine("     E2(N) AS(SELECT 1 FROM E1 a, E1 b), --100");
            stringBuilder.AppendLine("     E3(N) AS(SELECT 1 FROM E2 a, E2 b), --10,000");
            stringBuilder.AppendLine("     E4(N) AS(SELECT 1 FROM E3 a, E2 b), --1,000,000");
            stringBuilder.AppendLine("     Tally(N) AS(SELECT ROW_NUMBER() OVER(ORDER BY @@SPID) FROM E4)");
            stringBuilder.AppendLine("SELECT TOP(@Count) (");
            stringBuilder.AppendLine("    SELECT  TOP(@Length) CHAR(");
            stringBuilder.AppendLine("           CASE  Abs(Checksum(NewGuid)) % 2");
            stringBuilder.AppendLine("               WHEN 0 THEN 65 + Abs(Checksum(NewGuid)) % 26-- Random upper case letter");
            //stringBuilder.AppendLine("               WHEN 1 THEN 97 + Abs(Checksum(NewGuid)) % 26-- Random lower case letter");
            stringBuilder.AppendLine("               ELSE 48 + Abs(Checksum(NewGuid)) % 10-- Random digit");
            stringBuilder.AppendLine("           END");
            stringBuilder.AppendLine("           )");
            stringBuilder.AppendLine("    FROM Tally As t0");
            stringBuilder.AppendLine("    CROSS JOIN GuidGenerator");
            stringBuilder.AppendLine("    WHERE  t0.n <> -t1.n");
            stringBuilder.AppendLine("    FOR XML PATH('')");
            stringBuilder.AppendLine("    ) As RandomString");
            stringBuilder.AppendLine("FROM Tally As t1");
            //stringBuilder.AppendLine("GO");
            schemaBuilder.Connection.Execute(stringBuilder.ToString(), null, SchemaBuilder.Transaction);
        }
    }
}