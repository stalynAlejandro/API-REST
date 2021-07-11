Feature: ProviderManagingCatalogProducts
       Provider managing catalog products

@basic
Scenario: Adding a new catalog product
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingANewCatalogProduct@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogProduct' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid

Scenario: Bulk adding new catalog products and a section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.BulkAddingNewCatalogProductsAndASection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada BulkAddingNewCatalogProductsAndASection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section for adding in a bulk operation (Name:'Barra' DisplayOrder:'1' )
	   When 1_0 a new provider catalog products for adding in a bulk operation (Name:'Barra' SectionIds:'' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 request a provider catalog products bulk operation
	   And 1_0 response is Created
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid

@basic
Scenario: Adding a catalog product with an existing section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingACatalogProductWithAnExistingSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingACatalogProductWithAnExistingSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid

@basic
Scenario: Adding a hidden catalog product with an existing section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingAHiddenCatalogProductWithAnExistingSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingAHiddenCatalogProductWithAnExistingSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok	   
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'true')
	   And 1_0 response is Created
	   And 1_0 a provider catalog products request
	   And 1_0 response is Ok 
	   Then 1_0 updated provider catalog products has same info submitted and is valid
	   And 1_0 stop using access token for all requests
	   And 1_0 get client access token by consumer app
	   And 1_0 response is Ok	   
	   And 1_0 start using access token for all requests
	   And 1_0 a provider catalog products request by Consumer Code
	   And 1_0 response is Ok
	   And 1_0 updated provider catalog products has same info submitted but not those hidden
@basic
Scenario: Updating a catalog product with an existing section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.UpdatingACatalogProductWithAnExistingSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada UpdatingACatalogProductWithAnExistingSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 a new catalog product request with (Name:'Ole' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   When 1_0 update a catalog product request with (Id:'1' Name:'OleTu' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   Then 1_0 response is Ok 
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid
@basic
Scenario: Bulk updating a catalog product and its section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.BulkUpdatingACatalogProductAndItsSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada BulkUpdatingACatalogProductAndItsSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 a new catalog product request with (Name:'Ole' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   When 1_0 update catalog section for adding in a bulk operation (Id:'1' Name:'Barra Larga' DisplayOrder:'1' )
	   And 1_0 an updated provider catalog products for adding in a bulk operation (Id:'1' Name:'OleTu' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 request a provider catalog products bulk operation
	   And 1_0 response is Created 
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid
@basic
Scenario: Bulk updating only order of catalog product and its section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.BulkUpdatingOnlyOrderOfCatalogProductAndItsSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada BulkUpdatingOnlyOrderOfCatalogProductAndItsSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 a new catalog product request with (Name:'Ole' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   When 1_0 update catalog section for adding in a bulk operation (Id:'1' Name:'null' DisplayOrder:'5' )
	   And 1_0 an updated provider catalog products for adding in a bulk operation (Id:'1' Name:'null' SectionIds:'null' AllergenIds:'null' IsVegan:'null' Description:'null' PVP:'null' DisplayOrder:'3' IsHiddenInCarte:'null')
	   And 1_0 request a provider catalog products bulk operation
	   And 1_0 response is Created 
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid

Scenario: Bulk updating a non existing product
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.BulkUpdatingANonExistingProduct@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada BulkUpdatingANonExistingProduct' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 a new catalog product request with (Name:'Ole' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   And 1_0 backup state of provider catalog products
	   When 1_0 update catalog section for adding in a bulk operation (Id:'1' Name:'null' DisplayOrder:'5' )
	   And 1_0 an updated provider catalog products for adding in a bulk operation (Id:'10' Name:'null' SectionIds:'null' AllergenIds:'null' IsVegan:'null' Description:'null' PVP:'null' DisplayOrder:'3' IsHiddenInCarte:'null')
	   And 1_0 request a provider catalog products bulk operation
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Id":["Data was not found"]}')
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info the backup


@basic
Scenario: Updating a catalog product to hidden 
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.UpdatingACatalogProductToHidden@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada UpdatingACatalogProductToHidden' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 a new catalog product request with (Name:'Ole' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   When 1_0 update a catalog product request with (Id:'1' Name:'OleTu' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'true')
	   Then 1_0 response is Ok 
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid	   
	   And 1_0 stop using access token for all requests
	   And 1_0 get client access token by consumer app
	   And 1_0 start using access token for all requests
	   And 1_0 a provider catalog products request by Consumer Code
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted but not those hidden

@basic
Scenario: Remove a catalog product
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.RemoveACatalogProduct@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada RemoveACatalogProduct' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   When 1_0 remove a catalog product request with (Id:'1')
	   Then 1_0 response is Ok 
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid

Scenario: Adding a new catalog product with a not existing section
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingANewCatalogProductWithANotExistingSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogProductWithANotExistingSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"SectionIds":["A product can only be assigned to existing sections"]}')

Scenario: Adding a new catalog product with repeated section
	   Given 1_0 a new provider with (UserEmail:'sergio.navarro.AddingANewCatalogProductWithRepeatedSection@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogProductWithRepeatedSection' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new catalog section request with (Name:'Barra' DisplayOrder:'1' )
	   And 1_0 response is Created
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'1,1' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"SectionIds":["Un producto no puede ser asignado a la misma sección múltiples veces"]}')

Scenario: Adding a new catalog product without sections
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.AddingANewCatalogProductWithoutSections@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogProductWithoutSections' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   And 1_0 a provider catalog products request
	   Then 1_0 response is Ok 
	   And 1_0 updated provider catalog products has same info submitted and is valid

@ignore # By the moment we allow duplicated names
Scenario: Updating an existing product with duplicated name
	   Given 1_0 a new provider with (UserEmail:'raulaliaga.UpdatingAnExistingProductWithDuplicatedName@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada UpdatingAnExistingProductWithDuplicatedName' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesana' PVP:'20,5' DisplayOrder:'0' IsHiddenInCarte:'false')
	   And 1_0 response is Created
	   When 1_0 a new catalog product request with (Name:'Barra' SectionIds:'' AllergenIds:'' IsVegan:'False' Description:'Barra de pan artesanisima' PVP:'21' DisplayOrder:'0' IsHiddenInCarte:'false')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Product.ProviderId":["The field ProviderId must be between 1 and 2147483647."]},"title":"One or more validation errors occurred.","status":400')

@ignore
Scenario: Adding a new product with invalid characters

@ignore
Scenario: Updating an existing product with invalid characters

@ignore
Scenario: Updating a non existing product
	   
@ignore
Scenario: Removing a non existing product

