using Dapper.Logging;
using Dapper.Logging.Configuration;
using Dapper.Logging.Hooks;
using Microsoft.Extensions.Logging;
using System;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using YesSql;


namespace KeTePongoServer.Extensions.DbAccess
{
    public class DapperConnectionWithSQLLoggerFactory : IConnectionFactory
    {
        private readonly IConnectionFactory _factory;
        private readonly ISqlHooks<Empty> _hooks;
        public DapperConnectionWithSQLLoggerFactory(ILogger<DapperConnectionWithSQLLoggerFactory> logger, IConnectionFactory factory)
        {
            _factory = factory;
            var config = new DbLoggingConfigurationBuilder();
            config.LogSensitiveData = true;
            _hooks = new LoggingHook<Empty>(logger, config.Build());
        }

        public Type DbConnectionType => _factory.DbConnectionType;

        public DbConnection CreateConnection() =>
            new SqlConnection(_factory.CreateConnection(), _hooks);
    }
    internal class Empty
    {
        public static readonly Empty Object = new Empty();
        public override string ToString() => "Empty";
    }

    internal class SqlConnection : DbConnection
    {
        private readonly DbConnection _connection;
        private readonly ISqlHooks<Empty> _hooks;
        private readonly Empty _context;

        public SqlConnection(DbConnection connection, ISqlHooks<Empty> hooks)
        {
            _connection = connection;
            _hooks = hooks;
            _context = new Empty();
        }

        public override void Close()
        {
            var sw = Stopwatch.StartNew();
            try
            {
                _connection.Close();
            }
            finally
            {
                _hooks.ConnectionClosed(this, _context, sw.ElapsedMilliseconds);
            }
        }

        public override void Open()
        {
            var sw = Stopwatch.StartNew();
            try
            {
                _connection.Open();
            }
            finally
            {
                _hooks.ConnectionOpened(this, _context, sw.ElapsedMilliseconds);
            }
        }

        public override async Task OpenAsync(CancellationToken cancellationToken)
        {
            var sw = Stopwatch.StartNew();
            try
            {
                await _connection.OpenAsync(cancellationToken);
            }
            finally
            {
                _hooks.ConnectionOpened(this, _context, sw.ElapsedMilliseconds);
            }
        }

        protected override DbCommand CreateDbCommand() =>
            new WrappedCommand<Empty>(_connection.CreateCommand(), this, _hooks, _context);

        //other members

        public override string ConnectionString
        {
            get => _connection.ConnectionString;
            set => _connection.ConnectionString = value;
        }

        public override int ConnectionTimeout => _connection.ConnectionTimeout;
        public override string Database => _connection.Database;
        public override string DataSource => _connection.DataSource;
        public override string ServerVersion => _connection.ServerVersion;
        public override ConnectionState State => _connection.State;
        public override void ChangeDatabase(string databaseName) => _connection.ChangeDatabase(databaseName);
        protected override DbTransaction BeginDbTransaction(IsolationLevel isolationLevel) => _connection.BeginTransaction(isolationLevel);
        protected override bool CanRaiseEvents => false;
        public override void EnlistTransaction(System.Transactions.Transaction transaction) => _connection.EnlistTransaction(transaction);
        public override DataTable GetSchema() => _connection.GetSchema();
        public override DataTable GetSchema(string collectionName) => _connection.GetSchema(collectionName);
        public override DataTable GetSchema(string collectionName, string[] restrictionValues) => _connection.GetSchema(collectionName, restrictionValues);

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                _connection?.Dispose();

            base.Dispose(disposing);
        }
    }
    internal class WrappedCommand<T> : DbCommand
    {
        private readonly DbCommand _command;
        private DbConnection _connection;
        private readonly ISqlHooks<T> _hooks;
        private readonly T _context;

        public WrappedCommand(
            DbCommand command,
            DbConnection connection,
            ISqlHooks<T> hooks,
            T context)
        {
            _command = command;
            _connection = connection;
            _hooks = hooks;
            _context = context;
        }

        protected override DbDataReader ExecuteDbDataReader(CommandBehavior behavior)
        {
            var sw = Stopwatch.StartNew();
            try
            {
                return _command.ExecuteReader(behavior);
            }
            finally
            {
                _hooks.CommandExecuted(this, _context, sw.ElapsedMilliseconds);
            }
        }

        protected override async Task<DbDataReader> ExecuteDbDataReaderAsync(
            CommandBehavior behavior, CancellationToken cancellationToken)
        {
            var sw = Stopwatch.StartNew();
            try
            {
                return await _command.ExecuteReaderAsync(behavior, cancellationToken);
            }
            finally
            {
                _hooks.CommandExecuted(this, _context, sw.ElapsedMilliseconds);
            }
        }

        public override int ExecuteNonQuery()
        {
            var sw = Stopwatch.StartNew();
            try
            {
                return _command.ExecuteNonQuery();
            }
            finally
            {
                _hooks.CommandExecuted(this, _context, sw.ElapsedMilliseconds);
            }
        }

        public override async Task<int> ExecuteNonQueryAsync(CancellationToken cancellationToken)
        {
            var sw = Stopwatch.StartNew();
            try
            {
                return await _command.ExecuteNonQueryAsync(cancellationToken);
            }
            finally
            {
                _hooks.CommandExecuted(this, _context, sw.ElapsedMilliseconds);
            }
        }

        public override object ExecuteScalar()
        {
            var sw = Stopwatch.StartNew();
            try
            {
                return _command.ExecuteScalar();
            }
            finally
            {
                _hooks.CommandExecuted(this, _context, sw.ElapsedMilliseconds);
            }
        }

        public override async Task<object> ExecuteScalarAsync(CancellationToken cancellationToken)
        {
            var sw = Stopwatch.StartNew();
            try
            {
                return await _command.ExecuteScalarAsync(cancellationToken);
            }
            finally
            {
                _hooks.CommandExecuted(this, _context, sw.ElapsedMilliseconds);
            }
        }

        //other members

        public override string CommandText
        {
            get => _command.CommandText;
            set => _command.CommandText = value;
        }

        public override int CommandTimeout
        {
            get => _command.CommandTimeout;
            set => _command.CommandTimeout = value;
        }

        public override CommandType CommandType
        {
            get => _command.CommandType;
            set => _command.CommandType = value;
        }

        protected override DbConnection DbConnection
        {
            get => _connection;
            set => _connection = value;
        }

        protected override DbTransaction DbTransaction
        {
            get => _command.Transaction;
            set => _command.Transaction = value;
        }

        public override bool DesignTimeVisible
        {
            get => _command.DesignTimeVisible;
            set => _command.DesignTimeVisible = value;
        }

        public override UpdateRowSource UpdatedRowSource
        {
            get => _command.UpdatedRowSource;
            set => _command.UpdatedRowSource = value;
        }

        protected override DbParameterCollection DbParameterCollection => _command.Parameters;
        public override void Cancel() => _command.Cancel();
        public override void Prepare() => _command.Prepare();
        protected override DbParameter CreateDbParameter() => _command.CreateParameter();

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                _command?.Dispose();

            base.Dispose(disposing);
        }
    }
    internal class LoggingHook<T> : ISqlHooks<T>
    {
        private readonly ILogger _logger;
        private readonly DbLoggingConfiguration _config;
        private readonly Func<DbConnection, object> _connectionProjector;

        public LoggingHook(ILogger logger, DbLoggingConfiguration config)
        {
            _logger = logger;
            _config = config;
            _connectionProjector = _config.ConnectionProjector ?? (_ => Empty.Object);
        }

        public void ConnectionOpened(DbConnection connection, T context, long elapsedMs) =>
            _logger.Log(
                _config.LogLevel,
                _config.OpenConnectionMessage,
                elapsedMs,
                context,
                _connectionProjector(connection));

        public void ConnectionClosed(DbConnection connection, T context, long elapsedMs) =>
            _logger.Log(
                _config.LogLevel,
                _config.CloseConnectionMessage,
                elapsedMs,
                context,
                _connectionProjector(connection));

        public void CommandExecuted(DbCommand command, T context, long elapsedMs) =>
            _logger.Log(
                _config.LogLevel,
                _config.ExecuteQueryMessage,
                command.CommandText,
                command.GetParameters(hideValues: !_config.LogSensitiveData),
                elapsedMs,
                context,
                _connectionProjector(command.Connection));
    }
}
