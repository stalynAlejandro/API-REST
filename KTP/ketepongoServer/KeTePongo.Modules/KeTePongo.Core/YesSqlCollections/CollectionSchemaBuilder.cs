using System;
using System.Data.Common;
using YesSql;
using YesSql.Collections;
using YesSql.Sql;
using YesSql.Sql.Schema;

namespace KeTePongo.Core.YesSqlCollections
{
    public class CollectionSchemaBuilder : ISchemaBuilder
    {
        ISchemaBuilder _schemaBuilder;
        YesSQLCollectionNameService _yesSQLCollectionNameService;
        public CollectionSchemaBuilder(ISchemaBuilder schemaBuilder, YesSQLCollectionNameService yesSQLCollectionNameService)
        {
            _schemaBuilder = schemaBuilder;
            _yesSQLCollectionNameService = yesSQLCollectionNameService;
        }
        public string TablePrefix { get { return _schemaBuilder.TablePrefix; } }
        public ISqlDialect Dialect { get { return _schemaBuilder.Dialect; } }
        public DbConnection Connection { get { return _schemaBuilder.Connection; } }
        public DbTransaction Transaction { get { return _schemaBuilder.Transaction; } }

        public ISchemaBuilder AlterTable(string name, Action<IAlterTableCommand> table)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(name);
            if (collectionName == null)
            {
                return _schemaBuilder.AlterTable(name, table);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.AlterTable(name, table);
            }
        }
        public ISchemaBuilder CreateForeignKey(string name, string srcModule, string srcTable, string[] srcColumns, string destModule, string destTable, string[] destColumns)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName($"{srcModule}.{srcTable}");
            if (collectionName == null)
            {
                return _schemaBuilder.CreateForeignKey(name, srcModule, srcTable, srcColumns, destModule, destTable, destColumns);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.CreateForeignKey(name, srcModule, srcTable, srcColumns, destModule, destTable, destColumns);
            }
        }
        public ISchemaBuilder CreateForeignKey(string name, string srcModule, string srcTable, string[] srcColumns, string destTable, string[] destColumns)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName($"{srcModule}.{srcTable}");
            if (collectionName == null)
            {
                return _schemaBuilder.CreateForeignKey(name, srcModule, srcTable, srcColumns, destTable, destColumns);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.CreateForeignKey(name, srcModule, srcTable, srcColumns, destTable, destColumns);
            }
        }
        public ISchemaBuilder CreateForeignKey(string name, string srcTable, string[] srcColumns, string destModule, string destTable, string[] destColumns)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(srcTable);
            if (collectionName == null)
            {
                return _schemaBuilder.CreateForeignKey(name, srcTable, srcColumns, destModule, destTable, destColumns);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.CreateForeignKey(name, srcTable, srcColumns, destModule, destTable, destColumns);
            }
        }
        public ISchemaBuilder CreateForeignKey(string name, string srcTable, string[] srcColumns, string destTable, string[] destColumns)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(srcTable);
            if (collectionName == null)
            {
                return _schemaBuilder.CreateForeignKey(name, srcTable, srcColumns, destTable, destColumns);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.CreateForeignKey(name, srcTable, srcColumns, destTable, destColumns);
            }
        }
        public ISchemaBuilder CreateMapIndexTable(string name, Action<ICreateTableCommand> table)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(name);
            if (collectionName == null)
            {
                return _schemaBuilder.CreateMapIndexTable(name, table);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.CreateMapIndexTable(name, table);
            }
        }
        public ISchemaBuilder CreateReduceIndexTable(string name, Action<ICreateTableCommand> table)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(name);
            if (collectionName == null)
            {
                return _schemaBuilder.CreateReduceIndexTable(name, table);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.CreateReduceIndexTable(name, table);
            }
        }
        public ISchemaBuilder CreateTable(string name, Action<ICreateTableCommand> table)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(name);
            if (collectionName == null)
            {
                return _schemaBuilder.CreateTable(name, table);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.CreateTable(name, table);
            }
        }
        public ISchemaBuilder DropForeignKey(string srcTable, string name)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(srcTable);
            if (collectionName == null)
            {
                return _schemaBuilder.DropForeignKey(srcTable, name);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.DropForeignKey(srcTable, name);
            }
        }
        public ISchemaBuilder DropMapIndexTable(string name)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(name);
            if (collectionName == null)
            {
                return _schemaBuilder.DropMapIndexTable(name);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.DropMapIndexTable(name);
            }
        }
        public ISchemaBuilder DropReduceIndexTable(string name)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(name);
            if (collectionName == null)
            {
                return _schemaBuilder.DropReduceIndexTable(name);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.DropReduceIndexTable(name);
            }
        }
        public ISchemaBuilder DropTable(string name)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForTableName(name);
            if (collectionName == null)
            {
                return _schemaBuilder.DropTable(name);
            }
            using (new NamedCollection(collectionName))
            {
                return _schemaBuilder.DropTable(name);
            }
        }
    }
}
