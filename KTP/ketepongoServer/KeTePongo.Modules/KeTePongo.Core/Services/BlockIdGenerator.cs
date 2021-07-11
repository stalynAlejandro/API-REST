﻿using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using YesSql;
using YesSql.Sql;

namespace KeTePongo.Core.Services
{
    internal class BlockIdGenerator
    {
        private object _synLock = new object();

        public readonly string _tableName;
        public readonly int MaxRetries = 20;

        private ISqlDialect _dialect;
        private IStore _store;

        private int _blockSize;
        private Dictionary<string, Range> _ranges = new Dictionary<string, Range>();
        private string _tablePrefix;

        private string SelectCommand;
        private string UpdateCommand;
        private string InsertCommand;

        public BlockIdGenerator(string tableName) : this(tableName, 20)
        {
            _tableName = tableName;
        }

        public BlockIdGenerator(string tableName, int blockSize)
        {
            _tableName = tableName;
            _blockSize = blockSize;
        }

        public async Task InitializeAsync(IStore store, ISchemaBuilder builder)
        {
            _dialect = SqlDialectFactory.For(store.Configuration.ConnectionFactory.DbConnectionType);
            _tablePrefix = store.Configuration.TablePrefix;
            _store = store;

            SelectCommand = "SELECT " + _dialect.QuoteForColumnName("nextval") + " FROM " + _dialect.QuoteForTableName(_tablePrefix + _tableName) + " WHERE " + _dialect.QuoteForTableName("dimension") + " = @dimension;";
            UpdateCommand = "UPDATE " + _dialect.QuoteForTableName(_tablePrefix + _tableName) + " SET " + _dialect.QuoteForColumnName("nextval") + "=@new WHERE " + _dialect.QuoteForColumnName("nextval") + " = @previous AND " + _dialect.QuoteForColumnName("dimension") + " = @dimension;";
            InsertCommand = "INSERT INTO " + _dialect.QuoteForTableName(_tablePrefix + _tableName) + " (" + _dialect.QuoteForColumnName("dimension") + ", " + _dialect.QuoteForColumnName("nextval") + ") VALUES(@dimension, @nextval);";

            using (var connection = store.Configuration.ConnectionFactory.CreateConnection())
            {
                await connection.OpenAsync();

                try
                {
                    using (var transaction = connection.BeginTransaction(store.Configuration.IsolationLevel))
                    {
                        var localBuilder = new SchemaBuilder(store.Configuration, transaction, false);

                        localBuilder.CreateTable(_tableName, table => table
                            .Column<string>("dimension", column => column.PrimaryKey().NotNull())
                            .Column<ulong>("nextval")
                            )
                            .AlterTable(_tableName, table => table
                                .CreateIndex($"IX_{_tableName} _Dimension", "dimension")
                            );

                        transaction.Commit();
                    }
                }
                catch
                {

                }
            }
        }

        public long GetNextId(string collection)
        {
            lock (_synLock)
            {
                if (!_ranges.TryGetValue(collection, out var range))
                {
                    InitializeCollection(_store.Configuration, collection);
                    _ranges.TryGetValue(collection, out range);
                    //throw new InvalidOperationException($"The collection '{collection}' was not initialized");
                }

                var nextId = range.Next();

                if (nextId > range.End)
                {
                    LeaseRange(range);
                    nextId = range.Next();
                }

                return nextId;
            }
        }

        private void LeaseRange(Range range)
        {
            var affectedRows = 0;
            long nextval = 0;
            var retries = 0;

            using (var connection = _store.Configuration.ConnectionFactory.CreateConnection())
            {
                connection.Open();

                do
                {
                    // Ensure we overwrite the value that has been read by this
                    // instance in case another client is trying to lease a range
                    // at the same time
                    using (var transaction = connection.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                    {
                        try
                        {
                            var selectCommand = connection.CreateCommand();
                            selectCommand.CommandText = SelectCommand;

                            var selectDimension = selectCommand.CreateParameter();
                            selectDimension.Value = range.Collection;
                            selectDimension.ParameterName = "@dimension";
                            selectCommand.Parameters.Add(selectDimension);

                            selectCommand.Transaction = transaction;

                            _store.Configuration.Logger.LogTrace(SelectCommand);
                            nextval = Convert.ToInt64(selectCommand.ExecuteScalar());

                            var updateCommand = connection.CreateCommand();
                            updateCommand.CommandText = UpdateCommand;

                            var updateDimension = updateCommand.CreateParameter();
                            updateDimension.Value = range.Collection;
                            updateDimension.ParameterName = "@dimension";
                            updateCommand.Parameters.Add(updateDimension);

                            var newValue = updateCommand.CreateParameter();
                            newValue.Value = nextval + _blockSize;
                            newValue.ParameterName = "@new";
                            updateCommand.Parameters.Add(newValue);

                            var previousValue = updateCommand.CreateParameter();
                            previousValue.Value = nextval;
                            previousValue.ParameterName = "@previous";
                            updateCommand.Parameters.Add(previousValue);

                            updateCommand.Transaction = transaction;

                            _store.Configuration.Logger.LogTrace(UpdateCommand);
                            affectedRows = updateCommand.ExecuteNonQuery();

                            transaction.Commit();
                        }
                        catch
                        {
                            affectedRows = 0;
                            transaction.Rollback();
                        }
                    }

                    if (retries++ > MaxRetries)
                    {
                        throw new Exception("Too many retries while trying to lease a range for: " + range.Collection);
                    }

                } while (affectedRows == 0);

                range.SetBlock(nextval, _blockSize);
            }
        }

        public void InitializeCollection(IConfiguration configuration, string collection)
        {
            if (_ranges.ContainsKey(collection))
            {
                return;
            }

            object nextval;

            using (var connection = configuration.ConnectionFactory.CreateConnection())
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction(configuration.IsolationLevel))
                {
                    // Does the record already exist?
                    var selectCommand = transaction.Connection.CreateCommand();
                    selectCommand.CommandText = SelectCommand;

                    var selectDimension = selectCommand.CreateParameter();
                    selectDimension.Value = collection;
                    selectDimension.ParameterName = "@dimension";
                    selectCommand.Parameters.Add(selectDimension);

                    selectCommand.Transaction = transaction;

                    _store.Configuration.Logger.LogTrace(SelectCommand);
                    nextval = selectCommand.ExecuteScalar();

                    transaction.Commit();
                }

                if (nextval == null)
                {
                    // Try to create a new record. If it fails, retry reading the record.
                    try
                    {
                        using (var transaction = connection.BeginTransaction(configuration.IsolationLevel))
                        {
                            nextval = 1;

                            // To prevent concurrency issues when creating this record (it must be unique)
                            // we generate a random collection name, then update it safely

                            var command = transaction.Connection.CreateCommand();
                            command.CommandText = InsertCommand;
                            command.Transaction = transaction;

                            var dimensionParameter = command.CreateParameter();
                            dimensionParameter.Value = collection;
                            dimensionParameter.ParameterName = "@dimension";
                            command.Parameters.Add(dimensionParameter);

                            var nextValParameter = command.CreateParameter();
                            nextValParameter.Value = 1;
                            nextValParameter.ParameterName = "@nextval";
                            command.Parameters.Add(nextValParameter);

                            _store.Configuration.Logger.LogTrace(InsertCommand);
                            command.ExecuteNonQuery();

                            transaction.Commit();
                        }
                    }
                    catch
                    {
                        InitializeCollection(configuration, collection);
                    }
                }

                _ranges[collection] = new Range(collection);
            }
        }

        private class Range
        {
            public Range(string collection)
            {
                Collection = collection;
                Cursor = 1;
            }

            public Range SetBlock(long start, int blockSize)
            {
                Start = start;
                End = Start + blockSize - 1;
                Cursor = 0;

                return this;
            }

            public long Next()
            {
                return Start + Cursor++;
            }

            public string Collection;
            public long Cursor;
            public long Start;
            public long End;
        }
    }
}
