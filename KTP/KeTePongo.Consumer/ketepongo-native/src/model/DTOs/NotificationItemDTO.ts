export enum NotificationCategory{
    General,
    AccessToCatalogConsumerRequest,
    UnsubscribedFromCatalog,
    RemovedProduct,
    AccessToCatalogConsumerAccepted 
}
export interface NotificationItemDTO {
    id: number;
    title: string;
    description: string;
    utcDateTime: string;
    category: NotificationCategory;
    isRead: boolean;
    utcDateTimeWhenRead: number | undefined;
}