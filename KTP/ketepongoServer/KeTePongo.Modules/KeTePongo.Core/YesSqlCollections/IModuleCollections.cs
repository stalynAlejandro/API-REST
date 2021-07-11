using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.Core.YesSqlCollections
{
    public interface IModuleCollections
    {
        CollectionEntities[] CollectionEntities { get; }

    }
    public class CollectionEntities
    {
        public CollectionEntities(string name, params Type[] types)
        {
            Name = name;
            Types = types;
        }
        
        public string Name { get; }
        public Type[] Types { get; }
    }
}
