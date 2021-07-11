using KeTePongo.Core.Interfaces;
using System;
using System.Collections;

namespace KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument
{
    public class Section : ILocalIdEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public int DisplayOrder { get; set; }
        public string ERPId { get; set; }
    }
}
