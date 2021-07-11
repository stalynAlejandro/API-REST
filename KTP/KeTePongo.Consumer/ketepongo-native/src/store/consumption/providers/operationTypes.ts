export interface IProviderRequestLinkDTO {
  tradeName: string | undefined,
  salesmanEmail: string,
  salesmanName: string | undefined,
  salesmanTelephone: string | undefined
}

export interface INewProviderDTO {
  TradeName: string | undefined,
  Salesman: ISalesmanDTO,
}

export interface ISalesmanDTO {
  SalesmanUserName: string | undefined,
  Email: string | undefined,
  Telephone: string | undefined,
}