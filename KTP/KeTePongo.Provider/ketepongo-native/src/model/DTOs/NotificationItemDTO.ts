export enum NotificationCategory{
    General,
    AccessToCatalogConsumerRequest
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