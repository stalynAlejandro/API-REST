using Dapper;
using KeTePongo.Core.Interfaces;
using System;
using System.Threading.Tasks;
using YesSql;
using YesSql.Sql;

namespace KeTePongo.Core.Extensions
{
    public static class SessionExtensions
    {
        public static Task AddUniqueConstraintAsync(this ISchemaBuilder localSchemaBuilder, string tableName, string columnName)
        {
            return localSchemaBuilder.Connection.ExecuteScalarAsync($"ALTER TABLE {tableName} ADD CONSTRAINT UC_{tableName}_{columnName} UNIQUE({columnName})", null, localSchemaBuilder.Transaction);
        }
        public static async Task RemoveDefaultValueConstraintAsync(this ISchemaBuilder localSchemaBuilder, string tableName, string columnName)
        {
            var defaultConstraint = await localSchemaBuilder.Connection.ExecuteScalarAsync($"SELECT ConstraintName FROM(SELECT OBJECT_NAME(parent_object_id) AS TableName, name AS ConstraintName FROM sys.default_constraints)  constraints where constraints.TableName = '{tableName}' and constraints.ConstraintName like 'DF__%__{columnName}__%'", null, localSchemaBuilder.Transaction) as string;
            if (!String.IsNullOrWhiteSpace(defaultConstraint))
            {
                await localSchemaBuilder.Connection.ExecuteScalarAsync($"ALTER TABLE {tableName} DROP CONSTRAINT {defaultConstraint}", null, localSchemaBuilder.Transaction);
            }
        }

        public static void Delete<T>(this ISession session, int documentId) where T : IOIDEntity, new()
        {
            var entityToDelete = new T();
            entityToDelete.Id = documentId;
            session.Delete(entityToDelete);
        }
    }
}