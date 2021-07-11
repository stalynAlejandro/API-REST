Feature: ConsumerManagingConsumptionLocations
       Consumer managing consumption locations

@basic
Scenario: Adding a new location
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.addingANewLocation@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewLocation' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new location request with (Name:'Barra')
	   And 1_0 response is Created
	   Then 1_0 a consumption request
	   And 1_0 response is Ok (Content:'{"changeVersion":1,"locations":[{"changeVersion":0,"id":1,"name":"Barra"}],"products":[],"providers":[]}')

@ignore # By the moment we allow duplicated names
Scenario: Adding a new location with duplicated name
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.addingANewLocationWithDuplicatedName@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewLocationWithDuplicatedName' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new location request with (Name:'Barra')
	   When 1_0 a new location request with (Name:'Barra')
	   And 1_0 response is Created
	   Then 1_0 a consumption request
	   And 1_0 response is BadRequest (MessageStartsWith:'{')
	   #And response is BadRequest (MessageStartsWith:'{"errors":{"Product.ProviderId":["The field ProviderId must be between 1 and 2147483647."]},"title":"One or more validation errors occurred.","status":400')

Scenario: Adding a new location with empty name
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.addingANewLocationWithEmptyName@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewLocationWithEmptyName' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new location request with (Name:'')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{')
	   #And response is BadRequest (MessageStartsWith:'{"errors":{"Product.ProviderId":["The field ProviderId must be between 1 and 2147483647."]},"title":"One or more validation errors occurred.","status":400')
@ignore
Scenario: Adding a new location with invalid characters

@basic
Scenario: Updating an existing location
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.updatingAnExistingLocation@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada UpdatingAnExistingLocation' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new location request with (Name:'Barra')
	   And 1_0 response is Created
	   When 1_0 an update location request with (Id:'1' Name:'Barra Alta')
	   Then 1_0 a consumption request
	   And 1_0 response is Ok (Content:'{"changeVersion":2,"locations":[{"changeVersion":1,"id":1,"name":"Barra Alta"}],"products":[],"providers":[]}')


@ignore
Scenario: Updating an existing location with invalid data

@ignore # By the moment we allow duplicated names
Scenario: Updating an existing location with duplicated name

@ignore
Scenario: Updating a non existing provider
	   
@ignore
Scenario: Removing an existing provider not linked 

@ignore
Scenario: Removing a non existing provider

	   