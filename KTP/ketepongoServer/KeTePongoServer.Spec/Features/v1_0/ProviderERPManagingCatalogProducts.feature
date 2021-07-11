Feature: ProviderERPManagingCatalogProducts
       Provider ERP Managing CatalogProducts

@basic
Scenario: Adding a new provider as ERP
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.UpdatingERPProviderCatalogProducts@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada UpdatingERPProviderCatalogProducts' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get admin user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new OauthApp request (ClientId:'OauthAppTestERPManagingCatalogProducts')
	   And 1_0 response is Ok
	   And 1_0 a link from OAuthApp to provider request (ClientId:'OauthAppTestERPManagingCatalogProducts')
	   Then 1_0 response is Ok 
	   And 1_0 get access token for user (userName: 'raulaliaga.UpdatingERPProviderCatalogProducts' password: ',Adios22')
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 provider has now LinkedToERP true and catalog is private
	   When 1_0 get OAuthApp access token (ClientId:'OauthAppTestERPManagingCatalogProducts')
	   And 1_0 start using access token for all requests
	   And 1_0 set Sections for Put
	    | ERPId | DisplayOrder | Name      |
	    | 1     | 1            | entrantes |
	    | 2     | 2            | primeros  |
	    | 3     | 3            | carnes    |
	    | 4     | 4            | postres   |
		And 1_0 Put ERPCatalogProducts
		 | IsHiddenInCarte | DisplayOrder | SectionERPIds | ERPId | PVP | AllergenIds | IsVegan | Description               | Name               |
		 | true            | 1            | 1             | 1     | 3   | 2           | true    | humus de garbanzo         | humus              |
		 | false           | 2            | 1             | 2     | 4   | 1           | false   | patatas con queso y bacon | patatas de la casa |
		 | false           | 3            | 3             | 3     | 20  |             | false   | chuleton de avila D.O     | chuleton de avila  |
	   Then 1_0 response is Ok 
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted by ERP and is valid
	   And 1_0 set Sections for Put
	    | ERPId | DisplayOrder | Name      |
	    | 1     | 1            | entrantes |
	    | 2     | 2            | primeros  |
	    | 4     | 4            | postres   |
		And 1_0 Put ERPCatalogProducts
		 | IsHiddenInCarte | DisplayOrder | SectionERPIds | ERPId | PVP | AllergenIds | IsVegan | Description               | Name               |
		 | true            | 1            | 1             | 1     | 3   | 2           | true    | humus de garbanzo         | humus              |
		 | false           | 2            | 1             | 2     | 4   | 1           | false   | patatas con queso y bacon | patatas de la casa |
		 | false           | 3            | 2             | 3     | 20  |             | false   | chuleton de avila D.O     | chuleton de avila  |
	   Then 1_0 response is Ok 
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted by ERP and is valid