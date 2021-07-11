using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OrchardCore.Data.Migration;
using OrchardCore.Environment.Shell;
using OrchardCore.Modules;
using YesSql;
using System;

namespace KeTePongo.Core.YesSqlCollections
{
    /// <summary>
    /// Represents a tenant event that will be registered to OrchardShell.Activated in order to run migrations automatically.
    /// </summary>
    public class AutomaticCollectionDataMigrations : ModularTenantEvents
    {
        private readonly ShellSettings _shellSettings;
        private readonly ILogger _logger;
        private readonly IStore _store;
        private readonly IServiceProvider _serviceProvider;
        private readonly Lazy<IEnumerable<IModuleCollections>> _moduleCollections;

        /// <summary>
        /// Creates a new instance of the <see cref="AutomaticDataMigrations"/>.
        /// </summary>
        /// <param name="serviceProvider">The <see cref="IServiceProvider"/>.</param>
        /// <param name="shellSettings">The <see cref="ShellSettings"/>.</param>
        /// <param name="logger">The <see cref="ILogger"/>.</param>
        public AutomaticCollectionDataMigrations(
            IServiceProvider serviceProvider,
            ShellSettings shellSettings,
            IStore store,
            ILogger<AutomaticDataMigrations> logger)
        {
            _serviceProvider = serviceProvider;
            _shellSettings = shellSettings;
            _moduleCollections = new Lazy<IEnumerable<IModuleCollections>>(() => serviceProvider.GetServices<IModuleCollections>());
            _store = store;
            _logger = logger;
        }

        public Lazy<IEnumerable<IModuleCollections>> ModuleCollections => _moduleCollections;

        /// <inheritdocs />
        public override Task ActivatingAsync()
        {
            if (_shellSettings.State != OrchardCore.Environment.Shell.Models.TenantState.Uninitialized)
            {
                _logger.LogDebug("Executing collection migrations");

                var names = _moduleCollections.Value.SelectMany(m => m.CollectionEntities).Select(c=>c.Name).ToList();
                names.ForEach((n) => _store.InitializeCollectionAsync(n));
            }

            return Task.CompletedTask;
        }
    }
}
