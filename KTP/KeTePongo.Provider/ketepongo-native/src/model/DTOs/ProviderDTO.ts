export interface ProviderDTO {
    oid: number;
    changeVersion: number;
    code: string;
    cif: string;
    businessName: string;
    tradeName: string;
    address: string;
    stateOrProvince: string;
    town: string;
    postalCode: number;
    imageUrl: string;
    sanitaryMeasures: string[];
    welcomeMessage:string;
    isLinkedToERP: boolean;
    isReceivingOrdersAllowed: boolean;
}
