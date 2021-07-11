import {SectionDTO, CatalogProductDTO, AllergenDTO} from ".";

export interface ProviderCatalogProductsDTO {
    changeVersion: number;
    sections: SectionDTO[];
    catalogProducts: CatalogProductDTO[];
    allergens: AllergenDTO[]
}

export enum IProviderIdentifierType {
  Guid ,
  Telephone
}
