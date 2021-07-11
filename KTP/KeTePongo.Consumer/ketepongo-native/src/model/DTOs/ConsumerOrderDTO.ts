import { ProviderDTO, ProductDTO } from "model/DTOs";

export class NewConsumerOrderDTO {
  subOrders: NewSubOrderDTO[];
}

export class NewSubOrderDTO {
  subOrderId: number;
  providerId: number;
  utcMinimumDeliveryDateTime: string | null;
  observation: string;
  orderLines: NewConsumerOrderLineDTO[];
}

export class NewConsumerOrderLineDTO {
  productId: number;
  quantity: number;
  observation: string;
}

export interface OrderLineDTO {
  product: ProductDTO;
  quantity: number;
  observation: string;
}

export interface SubOrderDTO {
  subOrderId: number;
  provider: ProviderDTO;
  utcMinimumDeliveryDateTime: string | null;
  observation: string;
  wasProcessed: boolean | null;
  providerOrderId: number | null;
  wasEmailSentToProvider: boolean | null;
  processingError: string;
  orderLines: OrderLineDTO[];
}

export interface ConsumerOrderDTO {
  id: number;
  userId: number;
  consumerOID: number;
  utcDateTime: string;
  hasErrors: boolean;
  subOrders: SubOrderDTO[];
}
