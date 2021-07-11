Feature: CrossFeatures
	cross features

@basic
Scenario: Updating from ERP products used in consumer consumption
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.UpdatingFromERPProductsUsedInConsumerConsumption@pccom.es' Password:',Adios22' Name:'provider.UpdatingFromERPProductsUsedInConsumerConsumption')
	When 1_0 provider data is submitted (TradeName:'provider.UpdatingFromERPProductsUsedInConsumerConsumption' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000000' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.UpdatingFromERPProductsUsedInConsumerConsumption@pccom.es' Password:',Adios22' Name:'consumer.UpdatingFromERPProductsUsedInConsumerConsumption')
	When 1_0 consumer data is submitted (TradeName:'consumer.UpdatingFromERPProductsUsedInConsumerConsumption' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	Given 1_0 get admin user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 a new OauthApp request (ClientId:'OauthAppTestUpdatingFromERPProductsUsedInConsumerConsumption')
	And 1_0 response is Ok
	And 1_0 a link from OAuthApp to provider request (ClientId:'OauthAppTestUpdatingFromERPProductsUsedInConsumerConsumption')
	Then 1_0 response is Ok 
	Then 1_0 get OAuthApp access token (ClientId:'OauthAppTestUpdatingFromERPProductsUsedInConsumerConsumption')
	And 1_0 start using access token for all requests
	And 1_0 provider has now LinkedToERP true and catalog is private
	And 1_0 set Sections for Put
	    | ERPId | DisplayOrder | Name      |
	    | 1     | 1            | entrantes |
	    | 2     | 2            | primeros  |
	    | 3     | 3            | carnes    |
	    | 4     | 4            | postres   |
		And 1_0 Put ERPCatalogProducts
		 | IsHiddenInCarte | DisplayOrder | SectionERPIds | ERPId | PVP | AllergenIds | IsVegan | Description               | Name               |
		 | false            | 1            | 1             | 1     | 3   | 2           | true    | humus de garbanzo         | humus              |
		 | false           | 2            | 1             | 2     | 4   | 1           | false   | patatas con queso y bacon | patatas de la casa |
		 | false           | 3            | 3             | 3     | 20  |             | false   | chuleton de avila D.O     | chuleton de avila  |
	   Then 1_0 response is Ok 
	    And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted by ERP and is valid
	And 1_0 a new Provider LinkedToERP put ERPClientsPortfolio request
	| Address             | BussinessName    | Country | Email                            | ERPId | PostalCode | StateOrProvince | Telephone | Town     | TradeName        |
	| calle falsa 123     | La Majada        | España  | lamajada@lamajada.es             | 7     | 02005      | Valencia        | 000600600 | Valencia | La Majada        |
	| calle verdadera 123 | La Majada Quesos | España  | lamajadaquesos@lamajadaquesos.es | 8     | 01005      | Valencia        | 100600600 | Valencia | La Majada Quesos |
	| avenida falsa 123   | La Majada Tienda | España  | lamajadatienda@lamajadatienda.es | 9     | 00004      | Valencia        | 200600600 | Valencia | La Majada Tienda |
	Then 1_0 response is Ok 
	And 1_0 get access token for user (userName: 'consumer.UpdatingFromERPProductsUsedInConsumerConsumption' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'provider.UpdatingFromERPProductsUsedInConsumerConsumption@pccom.es' Phone:'null')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.UpdatingFromERPProductsUsedInConsumerConsumption@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created
	And 1_0 get access token for user (userName: 'provider.UpdatingFromERPProductsUsedInConsumerConsumption' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 Provider validates the consumer of a provider salesman with (consumerTradename:'consumer.UpdatingFromERPProductsUsedInConsumerConsumption' erpId:'8')
	And 1_0 response is Ok
	And 1_0 get access token for user (userName: 'consumer.UpdatingFromERPProductsUsedInConsumerConsumption' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 a new linked consumer product request with (Name:'chuleton de avila')
	And 1_0 a new linked consumer product request with (Name:'humus')
	And 1_0 a new linked consumer product request with (Name:'patatas de la casa')
	Then 1_0 a consumption request
	Then 1_0 consumption contains product (name:'chuleton de avila')
	Then 1_0 consumption contains product (name:'humus')
	Then 1_0 consumption contains product (name:'patatas de la casa')
	Then 1_0 get OAuthApp access token (ClientId:'OauthAppTestUpdatingFromERPProductsUsedInConsumerConsumption')
	And 1_0 start using access token for all requests
	And 1_0 Put MostConsumedCatalogProducts
	   | ERPIdConsumer | ERPIdProduct |
	   | 8             | 3            |
	   | 8             | 1            |
	And 1_0 set Sections for Put
	    | ERPId | DisplayOrder | Name      |
	    | 1     | 1            | entrantes |
	    | 2     | 2            | primeros  |
	    | 3     | 3            | carnes    |
	    | 4     | 4            | postres   |
	And 1_0 Put ERPCatalogProducts
		 | IsHiddenInCarte | DisplayOrder | SectionERPIds | ERPId | PVP | AllergenIds | IsVegan | Description               | Name               |
		 | false           | 2            | 1             | 2     | 5   | 1           | false   | patatas con queso y bacon | patatas de la casa |
		 | false           | 3            | 3             | 3     | 21  |             | false   | chuleton de avila D.O     | chuleton de avila  |
	And 1_0 get access token for user (userName: 'consumer.UpdatingFromERPProductsUsedInConsumerConsumption' password: ',Adios22')
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 a consumption request
	Then 1_0 consumption contains product (name:'chuleton de avila')
	Then 1_0 consumption contains product (name:'patatas de la casa')
	Then 1_0 consumption contains product but empty erpId and ProviderOID (name:'humus')
	Then 1_0 remove linked consumer product request with (name:'patatas de la casa')
	Then 1_0 a consumption request
	Then 1_0 consumption doesn't contain product (name:'patatas de la casa')
Then 1_0 get OAuthApp access token (ClientId:'OauthAppTestUpdatingFromERPProductsUsedInConsumerConsumption')
	And 1_0 start using access token for all requests
	And 1_0 Put MostConsumedCatalogProducts
	   | ERPIdConsumer | ERPIdProduct |
	   | 8             | 3            |
	   | 8             | 1            |
	   And 1_0 response is Ok (Content:'[{"erpIdConsumer":"8","erpIdProduct":"1"}]')
