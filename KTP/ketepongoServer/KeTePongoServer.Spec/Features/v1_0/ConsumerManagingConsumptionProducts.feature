Feature: ConsumerManagingConsumptionProducts
       Consumer managing consumption products

@basic
Scenario: Adding catalog product of a new provider
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingCatalogProductOfANewProvider@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingCatalogProductOfANewProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliagaAddingCatalogProductOfANewProvider@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 a new location request with (Name:'Barra')
	   When 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'1' ProviderId:'1' Image:'')
	   And 1_0 response is Created
	   Then 1_0 a consumption request
	   And 1_0 response is Ok (Content:'{"changeVersion":3,"locations":[{"changeVersion":0,"id":1,"name":"Barra"}],"products":[{"changeVersion":0,"id":1,"name":"Sardinas","imageUrl":"","locationIds":[1],"providerId":1,"isMappedToProviderProduct":false,"providerProductId":null,"erpId":null,"keTePongoProviderOID":null,"isVegan":false,"allergenIds":[],"pvp":0.0,"description":null}],"providers":[{"id":1,"changeVersion":0,"keTePongoProviderOID":null,"tradeName":"Charcuval","salesman":{"salesmanUserName":null,"email":"raulaliagaAddingCatalogProductOfANewProvider@pccom.es","telephone":"965477834"},"orderWeekDays":[1],"isPendingToApprove":true}]}')

Scenario: Adding a new product with a not existing provider
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingANewProductWithANotExistingProvider@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewProductWithANotExistingProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new location request with (Name:'Barra')
	   When 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'1' ProviderId:'1' Image:'')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"ProviderId":["Un producto sólo puede ser asignado a proveedores existentes"]}')

Scenario: Adding a new product with a not existing location
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingANewProductWithANotExistingLocation@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewProductWithANotExistingLocation' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliagaNotExistingLocation@pccom.es' SalesmanTelephone:'965477834')
	   When 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'1' ProviderId:'1' Image:'')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"LocationIds":["Un producto sólo puede ser asignado a ubicaciones existentes"]}')

Scenario: Adding a new product with repeated locations
	   Given 1_0 a new consumer with (UserEmail:'sergio.navarro.AddingANewProductWithRepeatedlocations@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewProductWithRepeatedlocations' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliagaRepeatedLocation@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 a new location request with (Name:'Barra')
	   When 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'1,1' ProviderId:'1' Image:'')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"LocationIds":["Un producto no puede ser asignado a la misma ubicación múltiples veces"]}')

Scenario: Adding a new product without provider
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingANewProductWithoutProvider@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewProductWithoutProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'' ProviderId:'' Image:'')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Product.ProviderId":["El campo Id de proveedor debe estar entre 1 y 2147483647"]}')


Scenario: Adding a new product without locations
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingANewProductWithoutLocations@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewProductWithoutLocations' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliagaWithoutLocation@pccom.es' SalesmanTelephone:'965477834')
	   When 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'' ProviderId:'1' Image:'')
	   And 1_0 response is Created

@ignore # By the moment we allow duplicated names
Scenario: Adding an existing product with duplicated name
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingANewProductWithDuplicatedName@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewProductWithDuplicatedName' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliagaDuplicatedNames@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 a new location request with (Name:'Barra')
	   When 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'1' ProviderId:'1' Image:'')
	   When 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'1' ProviderId:'1' Image:'')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{')
	   #And response is BadRequest (MessageStartsWith:'{"errors":{"Product.ProviderId":["The field ProviderId must be between 1 and 2147483647."]},"title":"One or more validation errors occurred.","status":400')

Scenario: Adding an existing product with empty name
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingAnExistingProductWithEmptyName@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingAnExistingProductWithEmptyName' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliagaEmptyName@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 a new location request with (Name:'Barra')
	   When 1_0 a new not linked consumer product request with (Name:'' LocationIds:'1' ProviderId:'1' Image:'')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{')

Scenario: Updating existing product removing location
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.UpdatingExistingProductRemovingLocation@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada UpdatingExistingProductRemovingLocation' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliagaRemovingLocation@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 a new location request with (Name:'Barra')
	   And 1_0 a new not linked consumer product request with (Name:'Sardinas' LocationIds:'1' ProviderId:'1' Image:'')
	   And 1_0 response is Created
	   When 1_0 update consumer product request with (Id:'1' Name:'Sardinas' LocationIds:'1' Image:'')
	   And 1_0 response is Ok
	   Then 1_0 a consumption request
	   And 1_0 response is Ok (Content:'{"changeVersion":4,"locations":[{"changeVersion":0,"id":1,"name":"Barra"}],"products":[{"changeVersion":1,"id":1,"name":"Sardinas","imageUrl":"","locationIds":[1],"providerId":1,"isMappedToProviderProduct":false,"providerProductId":null,"erpId":null,"keTePongoProviderOID":null,"isVegan":false,"allergenIds":[],"pvp":0.0,"description":null}],"providers":[{"id":1,"changeVersion":0,"keTePongoProviderOID":null,"tradeName":"Charcuval","salesman":{"salesmanUserName":null,"email":"raulaliagaRemovingLocation@pccom.es","telephone":"965477834"},"orderWeekDays":[1],"isPendingToApprove":true}]}')

@ignore
Scenario: Adding a new product with invalid data

@ignore
Scenario: Updating an existing product removing provider

@ignore
Scenario: Updating an existing product with invalid data

@ignore
Scenario: Updating a non existing product
	   
@ignore
Scenario: Removing an existing product not linked 

@ignore
Scenario: Removing a non existing product

	   