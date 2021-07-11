export interface ConsumerProviderDTO {
    changeVersion: number | null;
    id: number;
    keTePongoProviderId: number | null;
    tradeName: string;
    allowToAddNewCommerceProducts: boolean;
    salesman: SalesmanDTO;
    orderWeekDays: (DayOfWeek | null)[];
}

export interface SalesmanDTO {
    name: string;
    email: string;
    salesmanUserId: number | null;
    telephone: string;
}

export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
