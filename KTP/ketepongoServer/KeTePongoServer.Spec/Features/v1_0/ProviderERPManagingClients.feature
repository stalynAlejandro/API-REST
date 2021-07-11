Feature: ProviderERPManagingClients
       Provider ERP managing clients

@basic
Scenario: Adding a new provider as ERP
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingANewProviderERP@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogProduct' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get admin user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new OauthApp request (ClientId:'OauthAppTestERPManagingClients')
	   And 1_0 response is Ok
	   And 1_0 a link from OAuthApp to provider request (ClientId:'OauthAppTestERPManagingClients')
	   Then 1_0 response is Ok 
	   And 1_0 get access token for user (userName: 'raulaliaga.AddingANewProviderERP' password: ',Adios22')
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 provider has now LinkedToERP true and catalog is private
	   When 1_0 get OAuthApp access token (ClientId:'OauthAppTestERPManagingClients')
	   And 1_0 start using access token for all requests
	   And 1_0 a new Provider LinkedToERP put ERPClientsPortfolio request
	    | Address             | BussinessName    | Country | Email                            | ERPId | PostalCode | StateOrProvince | Telephone | Town     | TradeName        |
	    | calle falsa 123     | La Majada        | España  | lamajada@lamajada.es             | 1     | 02005      | Valencia        | 000600600 | Valencia | La Majada        |
	    | calle verdadera 123 | La Majada Quesos | España  | lamajadaquesos@lamajadaquesos.es | 2     | 01005      | Valencia        | 100600600 | Valencia | La Majada Quesos |
	    | avenida falsa 123   | La Majada Tienda | España  | lamajadatienda@lamajadatienda.es | 3     | 00004      | Valencia        | 200600600 | Valencia | La Majada Tienda |
	   Then 1_0 response is Ok 
