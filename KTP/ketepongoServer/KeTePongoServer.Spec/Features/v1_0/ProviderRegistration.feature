Feature: ProviderRegistration
       Provider registration scenarios

@basic
Scenario: New user providing provider data
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewUserProvidingProviderData@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderData' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created

@basic
Scenario: New user providing provider data and updating it
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewUserProvidingProviderDataAndUpdatingIt@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderDataAndUpdatingIt' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 update provider data (TradeName:'La Majada' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' ImageUrl:'' Image:'')
	   Then 1_0 response is Accepted
	   And 1_0 updated provider has same info submitted and is valid

#When we support guids for providing idempotence this test will check same post with same guid returns same provider 
@ignore
@basic 
Scenario: New user providing provider data on twice posts should return same provider
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewUserProvidingProviderDataOnTwicePostsShouldReturnSameProvider@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderDataOnTwicePostsShouldReturnSameProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is Created
	   And 1_0 backup provider received
	   Then 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderDataOnTwicePostsShouldReturnSameProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created
	   And 1_0 provider backup is equal to provider received

#When we support guids for providing idempotence this will check that same user repeating two posts with different guid should fail
@ignore 
Scenario: New user providing provider data on twice posts should fail
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewUserProvidingProviderDataOnTwicePostsShouldFail@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderDataOnTwicePostsShouldFail' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   When 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderDataOnTwicePostsShouldFail' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"":["El usuario ya tiene un comercio, no se pudo crear uno nuevo","status":400')	

Scenario: New user providing provider invalid data
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewUserProvidingProviderInvalidData@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"TradeName":["El campo Nombre Comercial es obligatorio."]}')
	   And 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderInvalidData' Address:'' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Address":["El campo Dirección es obligatorio."]}')
	   When 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderInvalidData' Address:'C\Bajovento 3' StateOrProvince:'' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"StateOrProvince":["El campo Estado o Provincia es obligatorio."]}')
	   When 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderInvalidData' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Town":["El campo Población es obligatorio."]}')
	   When 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderInvalidData' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"PostalCode":["El campo Código Postal es obligatorio."]},')
	   When 1_0 provider data is submitted (TradeName:'La Majada NewUserProvidingProviderInvalidData' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is Created

@ignore
Scenario: New user providing provider data and sending invitations to other users that accept invitation

@ignore
Scenario: Admin user updating provider data

@ignore
Scenario: Admin user updating provider with invalid data

@ignore
Scenario: Not admin user updating provider data
