using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YesSql.Indexes;

namespace KeTePongo.Core.YesSqlCollections
{
    public class YesSQLCollectionNameService
    {
        string[] _collectionNames;
        Dictionary<Type, string> _typeCollection = new Dictionary<Type, string>();
        Dictionary<string, string> _tableCollection = new Dictionary<string, string>();

        public YesSQLCollectionNameService(IEnumerable<IModuleCollections> moduleCollections)
        {
            foreach (var collection in moduleCollections.SelectMany(m => m.CollectionEntities))
            {
                collection.Types.ToList()
                    .ForEach(type =>
                    {
                        _typeCollection.Add(type, collection.Name);
                        _tableCollection.Add(type.Name, collection.Name);
                    });
            }
            _collectionNames = moduleCollections.SelectMany(m => m.CollectionEntities)
                .Select(e => e.Name).ToArray();
            
        }
        public string[] GetCollectionNames() => _collectionNames;
        public string GetCollectionNameForType<T>()
        {
            if(!_typeCollection.ContainsKey(typeof(T)))
            {
                return null;
            }
            return _typeCollection[typeof(T)];
        }
        public string GetCollectionNameForType(Type type)
        {
            if (!_typeCollection.ContainsKey(type))
            {
                return null;
            }
            return _typeCollection[type];
        }
        public string GetCollectionNameForTableName(string tableName)
        {
            if (!_tableCollection.ContainsKey(tableName))
            {
                return null;
            }
            return _tableCollection[tableName];
        }
    }
}
