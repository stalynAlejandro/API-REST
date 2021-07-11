using KeTePongo.Core.Interfaces;
using KeTePongo.Core.Services;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using YesSql;
using YesSql.Collections;
using YesSql.Indexes;

namespace KeTePongo.Core.YesSqlCollections
{
    public class CollectionSession : ISession, IDisposable
    {
        private readonly YesSQLCollectionNameService _yesSQLCollectionNameService;
        private readonly IIdForTypeGenerator _idForTypeGenerator;
        public CollectionSession(IIdForTypeGenerator idForTypeGenerator, ISession session, YesSQLCollectionNameService yesSQLCollectionNameService)
        {
            _idForTypeGenerator = idForTypeGenerator;
            Session = session;
            _yesSQLCollectionNameService = yesSQLCollectionNameService;
        }
        public ISession Session { get; }
        
        public IStore Store => Session.Store;

        public void Cancel()
        {
            Session.Cancel();
        }

        public async Task CommitAsync()
        {
            await Session.CommitAsync();
        }

        public void Delete(object item)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType(item.GetType());
            if (collectionName==null)
            {
                Session.Delete(item);
                return;
            }
            using (new NamedCollection(collectionName))
            {
                Session.Delete(item);
            }
        }

        public async Task<DbTransaction> DemandAsync()
        {
            return await Session.DemandAsync();
        }

        public void Detach(object item)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType(item.GetType());
            if (collectionName == null)
            {
                Session.Detach(item);
                return;
            }
            using (new NamedCollection(collectionName))
            {
                Session.Detach(item);
            }
        }

        public void Dispose()
        {
            Session.Dispose();
        }

        public IQuery<T> ExecuteQuery<T>(ICompiledQuery<T> compiledQuery) where T : class
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType<T>();
            if (collectionName == null)
            {
                return Session.ExecuteQuery(compiledQuery);
            }
            using (new NamedCollection(collectionName))
            {
                return Session.ExecuteQuery(compiledQuery);
            }
        }

        public async Task FlushAsync()
        {
            await Session.FlushAsync();
        }

        public async Task<IEnumerable<T>> GetAsync<T>(int[] ids) where T : class
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType<T>();
            if (collectionName == null)
            {
                return await Session.GetAsync<T>(ids);
            }
            using (new NamedCollection(collectionName))
            {
                return await Session.GetAsync<T>(ids);
            }
        }

        public bool Import(object item, int id)
        {
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType(item.GetType());
            if (collectionName == null)
            {
                return Session.Import(item, id);
            }
            using (new NamedCollection(collectionName))
            {
                return Session.Import(item, id);
            }
        }

        public IQuery Query()
        {
            return new CollectionQuery(Session.Query(), _yesSQLCollectionNameService);
        }

        public ISession RegisterIndexes(params IIndexProvider[] indexProviders)
        {
            foreach (var indexProvider in indexProviders)
            {
                var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType(indexProvider.ForType());
                if (collectionName == null)
                {
                    Session.RegisterIndexes(indexProviders);
                    continue;
                }
                using (new NamedCollection(collectionName))
                {
                    Session.RegisterIndexes(indexProviders);
                }
            }
            return Session;
        }

        public void Save(object obj, bool checkConcurrency = false)
        {
            var entity = obj as IOIDEntity;
            if (entity != null && entity.OID == 0)
            {
                entity.OID = _idForTypeGenerator.GenerateOIDForType(obj.GetType());
            }
            var collectionName = _yesSQLCollectionNameService.GetCollectionNameForType(obj.GetType());
            if (collectionName == null)
            {
                Session.Save(obj, checkConcurrency);
                return;
            }
            using (new NamedCollection(collectionName))
            {
                Session.Save(obj, checkConcurrency);
            }
        }
    }
}
