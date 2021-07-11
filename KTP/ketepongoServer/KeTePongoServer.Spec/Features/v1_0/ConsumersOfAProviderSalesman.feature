Feature: ConsumersOfAProviderSalesman
       Consumers Of A Provider Salesman

@basic
Scenario: Getting consumers of a provider salesman
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail@pccom.es' Password:',Adios22' Name:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail')
	When 1_0 provider data is submitted (TradeName:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000000' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail@pccom.es' Password:',Adios22' Name:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000001' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail@pccom.es' Phone:'null')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created
	And 1_0 get access token for user (userName: 'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 ConsumersOfAProviderSalesman has one entry with (consumerTradename:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000001')
	And 1_0 stop using access token for all requests

Scenario: Validating a consumer of a provider salesman ends in badRequest because there is no erpClients matching
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingBad@pccom.es' Password:',Adios22' Name:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail')
	When 1_0 provider data is submitted (TradeName:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingBad' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000000' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingBad@pccom.es' Password:',Adios22' Name:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingBad' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000001' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingBad@pccom.es' Phone:'null')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingBad@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created
	And 1_0 get access token for user (userName: 'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingBad' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 Provider validates the consumer of a provider salesman with (consumerTradename:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingBad' erpId:'17')
	And 1_0 response is BadRequest
	And 1_0 stop using access token for all requests

Scenario: Validating a consumer of a provider salesman going ok
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk@pccom.es' Password:',Adios22' Name:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk')
	And 1_0 provider data is submitted (TradeName:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000000' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 get admin user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 a new OauthApp request (ClientId:'OauthAppTestConsumersOfAProviderSalesmanValidatingOk')
	And 1_0 response is Ok
	And 1_0 a link from OAuthApp to provider request (ClientId:'OauthAppTestConsumersOfAProviderSalesmanValidatingOk')
	Then 1_0 response is Ok
	And 1_0 get access token for user (userName: 'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 provider has now LinkedToERP true and catalog is private
	Then 1_0 get OAuthApp access token (ClientId:'OauthAppTestConsumersOfAProviderSalesmanValidatingOk')
	And 1_0 start using access token for all requests
	And 1_0 a new Provider LinkedToERP put ERPClientsPortfolio request
	| Address             | BussinessName    | Country | Email                            | ERPId | PostalCode | StateOrProvince | Telephone | Town     | TradeName        |
	| calle falsa 123     | La Majada        | España  | lamajada@lamajada.es             | 4     | 02005      | Valencia        | 000600600 | Valencia | La Majada        |
	| calle verdadera 123 | La Majada Quesos | España  | lamajadaquesos@lamajadaquesos.es | 5     | 01005      | Valencia        | 100600600 | Valencia | La Majada Quesos |
	| avenida falsa 123   | La Majada Tienda | España  | lamajadatienda@lamajadatienda.es | 6     | 00004      | Valencia        | 200600600 | Valencia | La Majada Tienda |
	Then 1_0 response is Ok 
	Then 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk@pccom.es' Password:',Adios22' Name:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmail')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 a provider catalog products request by Consumer Code
	And 1_0 response is Unauthorized
	Then 1_0 consumer request to link provider by email or phone (Email:'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk@pccom.es' Phone:'null')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created
	And 1_0 get access token for user (userName: 'provider.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 Provider validates the consumer of a provider salesman with (consumerTradename:'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk' erpId:'5')
	And 1_0 response is Ok
	And 1_0 get access token for user (userName: 'consumer.consumerOfAproviderSalesmanRequestToLinkByProviderByEmailValidatingOk' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 a provider catalog products request by Consumer Code
	And 1_0 response is Unauthorized
	And 1_0 a provider catalog products request by ProviderOID
	And 1_0 response is Ok