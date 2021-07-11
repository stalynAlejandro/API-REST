
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using Swashbuckle.AspNetCore.Filters;
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Models.Examples
{
    public class CatalogProductsExampleProvider : IExamplesProvider<IList<NewCatalogProductDTO>>
    {
        private enum Sections { StarterDishes = 1, MainDishes = 2, Beverages = 3, Desserts = 4 }

        public IList<NewCatalogProductDTO> GetExamples() => new List<NewCatalogProductDTO>() {
               new NewCatalogProductDTO() {
                    Name = "Pollo campero frito",
                    Description = "Pollo del campo sazonado",
                    SectionIds = new List<int>() { (int)Sections.MainDishes } ,
                    DisplayOrder = 0,
                    IsHiddenInCarte = false,
                    AllergenIds = new List<int>(){ 1,2,3 },
                    PVP = 7m
                },
              new NewCatalogProductDTO() {
                  Name = "Pollo al ast con especias",
                  Description = "Pollo al ast con especias",
                  IsVegan= false,
                  SectionIds = new List<int>() { (int)Sections.MainDishes } ,
                  DisplayOrder = 1,
                  IsHiddenInCarte = false,
                  AllergenIds =  new List<int>{2,5 },
                  PVP = 5m
                },
               new NewCatalogProductDTO(){
                  Name= "Entrecot asturiano",
                  Description = "Entrecot super delicioso con patatas y salsita",
                  IsVegan= false,
                  SectionIds = new List<int>() { (int)Sections.MainDishes } ,
                  DisplayOrder = 2,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>(),
                  PVP= 15m
                },
              new NewCatalogProductDTO(){
                  Name = "Pizza cuatro quesos",
                  Description= "Pizzas cuatro quesos pero con quesos caros y buenos",
                  IsVegan= false,
                  SectionIds = new List<int>() { (int)Sections.MainDishes } ,
                  DisplayOrder = 3,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{ 8,9 },
                  PVP= 17
                },
               new NewCatalogProductDTO(){
                  Name= "Sopa de pueblo",
                  Description= "Tipica sopa con cuatro cosas",
                  IsVegan= false,
                  SectionIds = new List<int>() { (int)Sections.MainDishes } ,
                  DisplayOrder = 4,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{ 7,6,8},
                  PVP= 8
                },
               new NewCatalogProductDTO(){
                  Name= "Pollo teriyaki con salsa increible",
                  Description= "Pollo teriyaki con un curri que está de muerte y arroz",
                  IsVegan= false,
                  SectionIds = new List<int>() { (int)Sections.MainDishes } ,
                  DisplayOrder = 5,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{ 5,4 },
                  PVP= 10
                },
            new NewCatalogProductDTO(){
                  Name= "Pinchito de mongolia picante",
                  Description= "Para cuando quieres ir a pinchar yendo a un buen restaurante",
                  IsVegan= false,
                  SectionIds = new List<int>() { (int)Sections.StarterDishes } ,
                  DisplayOrder = 6,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>(2),
                  PVP= 10
                },
              new NewCatalogProductDTO(){
                  Name= "Nachos con guacamole",
                  Description= "Nachos con salsa y nachos de bolsa",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.StarterDishes } ,
                  DisplayOrder = 7,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>(1),
                  PVP= 8
                },
             new NewCatalogProductDTO(){
                  Name= "Patatas bravas",
                  Description= "Unas patatas bravas en pequeña ración",
                  IsVegan= false,
                  SectionIds = new List<int>() { (int)Sections.StarterDishes } ,
                  DisplayOrder = 8,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{3,10},
                  PVP= 4
                }
             ,
             new NewCatalogProductDTO()
             {
                 Name="Plato especial de la casa para 4 personas",
                 Description = "el sabor es la sensación más importante que se debe transmitir. Utilizar los cinco sabores primarios para cada plato, desde aperitivos hasta postres, puedes tentar a los clientes con el plato que más se adecue a sus gustos. Utilizar el nombre de ingredientes notables, como ajos o cebollas, también puede ayudar a proporcionar una idea del sabor general"
                 , IsVegan = true,
                 SectionIds = new List<int>() { (int)Sections.MainDishes } ,
                 DisplayOrder = 9,
                 IsHiddenInCarte = false,
                 AllergenIds= new List<int>{3,10},
                 PVP = 90
             },
             new NewCatalogProductDTO(){
                  Name= "Vino",
                  Description= "Vinod e la tierra",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.Beverages } ,
                  DisplayOrder = 10,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{3,10},
                  PVP= 24
                }
             ,
             new NewCatalogProductDTO(){
                  Name= "Agua",
                  Description= "Agua fresca vegan-friendly",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.Beverages } ,
                  DisplayOrder = 11,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{},
                  PVP= 1
                }
             ,
             new NewCatalogProductDTO(){
                  Name= "Cerveza",
                  Description= "Cerveza de marca propia",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.Beverages } ,
                  DisplayOrder = 12,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{10,11,12,13,14},
                  PVP= 4
                },
            new NewCatalogProductDTO(){
                  Name= "Volcan de chocolate",
                  Description= "Volcan de chocolate suizo",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.Desserts } ,
                  DisplayOrder = 13,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{ 7},
                  PVP= 7
                },
             new NewCatalogProductDTO(){
                  Name= "Flan",
                  Description= "Flan de huevo con chocolate y nata",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.Desserts } ,
                  DisplayOrder = 14,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{5},
                  PVP= 9
                },
            new NewCatalogProductDTO(){
                  Name= "Profiteroles",
                  Description= "Ración de profiteroles con nata",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.Desserts } ,
                  DisplayOrder = 15,
                  IsHiddenInCarte = false,
                  AllergenIds= new List<int>{4},
                  PVP= 12
                },
             new NewCatalogProductDTO(){
                  Name= "Gambas al ajillo",
                  Description= "Gambas al vapor, al ajillo con especias",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.MainDishes } ,
                  DisplayOrder = 16,
                  IsHiddenInCarte = true,
                  AllergenIds= new List<int>{2,4},
                  PVP= 18.7m,

                },
                new NewCatalogProductDTO(){
                  Name= "Guiso de pescado",
                  Description= "Un guiso de pescado tradicional. Especialidad de la casa con pescado autoctono.",
                  IsVegan= true,
                  SectionIds = new List<int>() { (int)Sections.StarterDishes } ,
                  DisplayOrder = 17,
                  IsHiddenInCarte = true,
                  AllergenIds= new List<int>{2,4, 13},
                  PVP= 17m,
                },
            };
    }
}
