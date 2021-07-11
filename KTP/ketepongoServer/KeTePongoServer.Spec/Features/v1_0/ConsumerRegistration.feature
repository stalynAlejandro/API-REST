Feature: ConsumerRegistration
       Consumer registration scenarios

@basic
Scenario: New user providing consumer data
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewUserProvidingConsumerData@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerData' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created

@basic
Scenario: New user providing consumer data and updating it
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewUserProvidingConsumerDataAndUpdatingIt@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	And 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerDataAndUpdatingIt' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' Image:'')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	When 1_0 update consumer data (TradeName:'La Majada' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' ImageUrl:'' Image:'')
	Then 1_0 response is Accepted
	And 1_0 updated consumer has same info submitted and is valid

#When we support guids for providing idempotence this test will check same post with same guid returns same consumer
@ignore
@basic
Scenario: New user providing consumer data on twice posts should return same consumer
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewUserProvidingConsumerDataOnTwicePostsShouldReturnSameConsumer@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerDataOnTwicePostsShouldReturnSameConsumer' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 backup Consumer received
	Then 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerDataOnTwicePostsShouldReturnSameConsumer' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	And 1_0 consumer backup is equtal to Consumer received

#When we support guids for providing idempotence this will check that same user repeating two posts with different guid should fail
@ignore
Scenario: New user providing consumer data on twice posts should fail
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewUserProvidingConsumerDataOnTwicePostsShouldFail@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerDataOnTwicePostsShouldFail' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerDataOnTwicePostsShouldFail' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"":["El usuario ya tiene un comercio, no se pudo crear uno nuevo","status":400')

Scenario: New user providing consumer invalid data
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewUserProvidingConsumerInvalidData@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerInvalidData' Address:'' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Address":["El campo Dirección es obligatorio."]}')
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerInvalidData' Address:'C\Bajovento 3' StateOrProvince:'' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"StateOrProvince":["El campo Estado o Provincia es obligatorio."]}')
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerInvalidData' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Town":["El campo Población es obligatorio."]}')
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerInvalidData' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"PostalCode":["El campo Código Postal es obligatorio."]},')
	When 1_0 consumer data is submitted (TradeName:'La Majada NewUserProvidingConsumerInvalidData' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created

@ignore
Scenario: New user providing consumer data and sending invitations to other users that accept invitation

@ignore
Scenario: Admin user updating consumer data

@ignore
Scenario: Admin user updating consumer with invalid data

@ignore
Scenario: Not admin user updating consumer data

@basic
Scenario: New Consumer with ConsumerType Professional
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'newConsumerWithConsumerTypeProfessional@pccom.es' Password:',Adios22' Name:'newConsumerWithConsumerTypeProfessional')
	When 1_0 consumer data is submitted with consumerType (ConsumerType:'ProfessionalConsumer' TradeName:'newConsumerWithConsumerTypeProfessional' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	And 1_0 response message contains (Message: '"consumerType":0,"tradeName":"newConsumerWithConsumerTypeProfessional"')
@basic
Scenario: New Consumer with ConsumerType Individual
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'newConsumerWithConsumerTypeIndividual@pccom.es' Password:',Adios22' Name:'newConsumerWithConsumerTypeIndividual')
	When 1_0 consumer data is submitted with consumerType (ConsumerType:'IndividualConsumer' TradeName:'newConsumerWithConsumerTypeIndividual' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	And 1_0 response message contains (Message: '"consumerType":1,"tradeName":"newConsumerWithConsumerTypeIndividual"')