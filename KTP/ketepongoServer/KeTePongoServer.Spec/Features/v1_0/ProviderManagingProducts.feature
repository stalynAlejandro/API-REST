Feature: ProviderManagingProducts
       Provider managing products
	   
@basic @ignore
Scenario: Adding a new set of catalog product with one product 
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	And 1_0 provider data is submitted (TradeName:'Charcuval' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' )
	And 1_0 response is Created	
	And 1_0 get access token from refresh token to get updated claims
	And 1_0 start using access token for all requests
	And 1_0 I have a catalog product with (ERPId: 'A0001' Name:'Sardinillas')
	And 1_0 the catalog product-0 has format (Id:1, Name:'Unidades')
	And 1_0 the catalog product-0 has format (Id:2, Name:'Cajas (2 uds)')
	When 1_0 a new update of catalog products request
	And 1_0 response is Ok
	Then 1_0 a product catalogs request
	And 1_0 updated product catalog has same info submitted and is valid

@ignore
Scenario: Updating an existing set with a new product
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	And 1_0 provider data is submitted (TradeName:'Charcuval' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' )
	And 1_0 response is Created	
	And 1_0 get access token from refresh token to get updated claims
	And 1_0 start using access token for all requests
	And 1_0 I have a catalog product with (ERPId: 'A0001' Name:'Sardinillas')
	And 1_0 the catalog product-0 has format (Id:1, Name:'Unidades')
	And 1_0 the catalog product-0 has format (Id:2, Name:'Cajas (2 uds)')
	And 1_0 a new update of catalog products request
	And 1_0 response is Ok
	And 1_0 a product catalogs request
	And 1_0 updated product catalog has same info submitted and is valid
	When 1_0 I have a catalog product with (ERPId: 'A0002' Name:'Sardinillas 2')
	And 1_0 the catalog product-1 has format (Id:3, Name:'Unidades')
	And 1_0 the catalog product-1 has format (Id:1, Name:'Cajas (5 uds)')
	And 1_0 a new update of catalog products request
	And 1_0 response is Ok
	Then 1_0 a product catalogs request
	And 1_0 updated product catalog has same info submitted and is valid

	@ignore
	Scenario: Updating a product adding a new format
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	And 1_0 provider data is submitted (TradeName:'Charcuval' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' )
	And 1_0 response is Created	
	And 1_0 get access token from refresh token to get updated claims
	And 1_0 start using access token for all requests
	And 1_0 I have a catalog product with (ERPId: 'A0001' Name:'Sardinillas')
	And 1_0 the catalog product-0 has format (Id:1, Name:'Unidades')
	And 1_0 the catalog product-0 has format (Id:2, Name:'Cajas (2 uds)')
	And 1_0 a new update of catalog products request
	And 1_0 response is Ok
	And 1_0 a product catalogs request
	And 1_0 updated product catalog has same info submitted and is valid
	And 1_0 the catalog product-0 has format (Id:3, Name:'Unidades')
	And 1_0 a new update of catalog products request
	And 1_0 response is Ok
	Then 1_0 a product catalogs request
	And 1_0 updated product catalog has same info submitted and is valid

	@ignore
	Scenario: Updating a product adding a new format with repeated Id

	@ignore
	Scenario: Updating a product changing name

	@ignore
	Scenario: Removing a product 

	@ignore
	Scenario: Removing a product and adding a product

	@ignore
	Scenario: Updating a product adding a new format with a non confirmed user
