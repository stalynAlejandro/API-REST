using OrchardCore.Environment.Commands;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using YesSql;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Dapper;
using System.Data.Common;
using KeTePongo.ConsumerWebAPI.Models;
using Microsoft.Extensions.Localization;

namespace KeTePongo.ConsumerWebAPI.Commands
{
    public class GenerateRandomCodesCommand : DefaultCommandHandler
    {
        private readonly ISession _session;
        public GenerateRandomCodesCommand(ISession session,
            IStringLocalizer<GenerateRandomCodesCommand> localizer) :base(localizer)
        {
            _session = session;
        }
        [OrchardSwitch]
        public uint CodeLength { get; set; } = 4;

        [CommandName("generateRandomCodes")]
        [CommandHelp("generateRandomCodes /codeLength:<codeLength>\r\n\t"
            + "Fullfills the RandomStringsPool table with all the distinct codes with a length <codeLength> generated. \r\n\t"
            + "Keep in mind the algorithm doens't get all the available ")]
        [OrchardSwitches("CodeLength")]
        public async Task GenerateRandomCodesAsync()
        {
            using (var connection = _session.Store.Configuration.ConnectionFactory.CreateConnection())
            {
                
                await connection.OpenAsync();
                
                var dialect = SqlDialectFactory.For(connection);
                if (_session.Store.Dialect.Name == "SqlServer")
                {
                    await connection.ExecuteAsync(GetSqlServerSqlForGetNextAlphanumericBlock((int)CodeLength), null, null, 600);
                }
                else if (_session.Store.Dialect.Name == "Sqlite")
                {
                    await InsertSqliteNextAlphanumericBlockAsync((int)CodeLength, connection);//, transaction);
                }
                else
                {
                    throw new UnsupportedContentTypeException($"Unsupported dialect type for generating random codes table {dialect.Name}");
                }
                await connection.CloseAsync();
            }
            Context.Output.WriteLine(S["Random codes created successfully"]);
        }

        private async Task InsertSqliteNextAlphanumericBlockAsync(int stringLength, DbConnection connection, int? amountOfNewCodes = null)
        {
            var maxAmountOfNewCodes = 20;
            if (!amountOfNewCodes.HasValue)
            {
                amountOfNewCodes = maxAmountOfNewCodes;
            }
            if (amountOfNewCodes > maxAmountOfNewCodes)
            {
                amountOfNewCodes = maxAmountOfNewCodes;
            }
            var hashSetOfNewCodes = new HashSet<string>();
            while (hashSetOfNewCodes.Count < amountOfNewCodes)
            {
                var newCode = GetNextAlphanumericCode(stringLength);
                if (!hashSetOfNewCodes.Contains(newCode))
                {
                    hashSetOfNewCodes.Add(newCode);
                }
            }
            using (var transaction = await connection.BeginTransactionAsync(System.Data.IsolationLevel.ReadUncommitted))
            {
                foreach (var newCode in hashSetOfNewCodes)
                {
                    await connection.ExecuteAsync(
                        $"INSERT INTO {_session.Store.Configuration.TablePrefix}{nameof(RandomStringsPool)} " +
                        $"({nameof(RandomStringsPool.RandomString)}) Values (@RandomString)",
                        new { RandomString = newCode }, transaction);
                }
                await transaction.CommitAsync();
            }
        }
        private string GetSqlServerSqlForGetNextAlphanumericBlock(int stringLength, int? amountOfNewCodes = null)
        {
            var maxAmountOfNewCodes = 1000000;
            if (!amountOfNewCodes.HasValue)
            {
                amountOfNewCodes = maxAmountOfNewCodes;
            }

            if (amountOfNewCodes > maxAmountOfNewCodes)
            {
                amountOfNewCodes = maxAmountOfNewCodes;
            }

            var stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("INSERT INTO RandomStringsPool(RandomString)");
            stringBuilder.AppendLine("SELECT DISTINCT RandomString ");
            stringBuilder.AppendLine($"FROM RandomStringGenerator({stringLength}, {amountOfNewCodes})");
            return stringBuilder.ToString();
        }
        private string GetNextAlphanumericCode(int stringLength)
        {
            var newCodeBuilder = new StringBuilder(stringLength);
            while (newCodeBuilder.Length < stringLength)
            {
                var guid = Guid.NewGuid();
                var checksum = Math.Abs(Checksum(guid.ToString()));
                var letterOrNumber = checksum % 2;

                if (letterOrNumber == 0)
                {
                    newCodeBuilder.Append(Convert.ToChar(65 + (checksum % 26)));
                }
                else
                {
                    newCodeBuilder.Append(Convert.ToChar(48 + (checksum % 10)));
                }
            }
            return newCodeBuilder.ToString();
        }
        private int Checksum(string dataToCalculate)
        {
            byte[] byteToCalculate = Encoding.ASCII.GetBytes(dataToCalculate);
            int checksum = 0;
            foreach (byte chData in byteToCalculate)
            {
                checksum += chData;
            }
            checksum &= 0xff;
            return checksum;
        }
    }
}
