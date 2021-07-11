using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument
{
    public class Allergen : ILocalIdEntity, IChangeVersion
    {
        public static readonly Allergen[] KnownAllergens = {
                    new Allergen(1, "gluten","gluten"),
                    new Allergen(2, "crustaceos","crustaceos"),
                    new Allergen(3, "huevos","huevos"),
                    new Allergen(4, "pescado","pescado"),
                    new Allergen(5, "cacahuetes","cacahuetes"),
                    new Allergen(6, "soja","soja"),
                    new Allergen(7, "lacteos","lacteos"),
                    new Allergen(8, "frutos de cascara","frutoscascara"),
                    new Allergen(9, "apio","apio"),
                    new Allergen(10, "mostaza","mostaza"),
                    new Allergen(11, "granos de Sesamo","sesamo"),
                    new Allergen(12, "dioxido de azufre y sulfitos","sulfitos"),
                    new Allergen(13, "moluscos","moluscos"),
                    new Allergen(14, "altramuces","altramuces"),
            };
        public Allergen(int id, string name, string iconCode)
        {
            Id = id;
            Name = name;
            IconCode = iconCode;
        }
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string IconCode { get; set; }
    }
}
