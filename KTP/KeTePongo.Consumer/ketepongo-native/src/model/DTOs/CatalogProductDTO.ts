export interface CatalogProductDTO {
    changeVersion: number | null;
    id: number;
    name: string;
    description: string;
    sectionIds: number[];
    allergenIds: number[];
    isVegan: boolean;
    pvp: number;
    displayOrder: number;
    isInConsumption: boolean;
    erpId:string;
    isMostConsumed:boolean;
    providerId:number;
    keTePongoProviderOID:number;
}

export interface NewCatalogProductDTO {
    name: string;
    description: string;
    sectionIds: number[];
    pvp: number;
    displayOrder: number;
    isHiddenInCarte:boolean;
}

export interface UpdateCatalogProductDTO {
    changeVersion: number | null;
    id: number;
    name: string;
    description: string;
    sectionIds: number[];
    pvp: number;
    displayOrder: number;
    isHiddenInCarte:boolean;
}

export interface AllergenDTO {
    changeVersion: number | null;
    id: number;
    name: string;
    iconCode: string;
}
