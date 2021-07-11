Feature: ProviderManagingCatalogSections
       Provider managing catalog sections

@basic
Scenario: Adding a new catalog section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingANewCatalogSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   Then 1_0 a provider catalog products request
	   And 1_0 response is Ok
	   And 1_0 updated provider catalog products has same info submitted and is valid

@ignore # By the moment we allow duplicated names
Scenario: Adding a new catalog section with duplicated name
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingANewCatalogSectionWithDuplicatedName@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogSectionWithDuplicatedName' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   When 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'2' )
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Name":["El campo Nombre es obligatorio.","El campo Nombre debe tener una longitud máxima de 50"]},"title":"One or more validation errors occurred.","status":400')

Scenario: Adding a new catalog section with empty name
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingANewCatalogSectionWithEmptyName@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogSectionWithEmptyName' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new catalog section request with (Name:'' DisplayOrder:'1' )
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Name":["El campo Nombre es obligatorio.","El campo Nombre debe tener una longitud máxima de 50"]}')

@basic
Scenario: Update a catalog section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.UpdateACatalogSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada UpdateACatalogSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 update catalog section request with (Id:'1' Name:'Barra Larga' DisplayOrder:'1' )
	   Then 1_0 a provider catalog products request
	   And 1_0 updated provider catalog products has same info submitted and is valid

Scenario: Remove a catalog section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.RemoveACatalogSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada RemoveACatalogSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 remove a catalog section request with (Id:'1')
	   Then 1_0 response is Ok 
	   Then 1_0 a provider catalog products request
	   And 1_0 response is Ok
	   And 1_0 updated provider catalog products has same info submitted and is valid

@ignore
Scenario: Adding a new catalog section with invalid characters

@ignore
Scenario: Updating an existing catalog section

@ignore
Scenario: Updating an existing catalog section with invalid data

@ignore # By the moment we allow duplicated names
Scenario: Updating an existing catalog section with duplicated name

	   