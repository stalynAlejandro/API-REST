using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.DomainServices;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeTePongo.ConsumerWebAPI.DomainServices.ConsumptionDocument
{
    public class LocationDomainService : DocumentEntityService<Consumption, Location>
    {
        IStringLocalizer S;

        public LocationDomainService(IStringLocalizer<LocationDomainService> localizer)
        {
            S = localizer;
        }

        override public IList<Location> GetAllEntitiesFromDocument(Consumption document)
        {
            return document.Locations;
        }
        protected override int GetAndIncrementEntityCounter(Consumption document)
        {
            return document.LocationsNextId++;
        }
        protected override Location AddEntityToDocument(Consumption document, Location entity)
        {
            document.Locations.Add(entity);
            return entity;
        }
        protected override bool RemoveEntityFromDocument(Consumption document, Location entity)
        {
            foreach (var product in document.Products)
            {
                product.ExtraDataForConsumer.LocationIds.Remove(entity.Id);
            }
            return document.Locations.Remove(entity);
        }
        public override bool ValidateEntity(Consumption document, Location entity, Action<string, string> addError)
        {
            if (!base.ValidateEntity(document, entity, addError))
            {
                return false;
            }
            if (!AnyRepeatedLocation(document))
            {
                addError($"{nameof(entity.Name)}", S["A location cannot be added twice"]);
                return false;
            }

            return true;
        }
        private bool AnyRepeatedLocation(Consumption document)
         {
            return GetAllEntitiesFromDocument(document).Count == GetAllEntitiesFromDocument(document).Select(a => a.Name).Distinct().Count();
        }
    }
}
 