using KeTePongo.Core.Interfaces;
using System;
using System.Collections;

namespace KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument
{
    public class Location : ILocalIdEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
