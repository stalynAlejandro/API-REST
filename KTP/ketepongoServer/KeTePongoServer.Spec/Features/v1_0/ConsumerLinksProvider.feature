Feature: ConsumerLinksProvider
	Consumer links provider to get access to its catalog

@basic
Scenario: Consumer request to link provider by email
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.consumerRequestToLinkByProviderByEmail@pccom.es' Password:',Adios22' Name:'provider.consumerRequestToLinkByProviderByEmail')
	When 1_0 provider data is submitted (TradeName:'provider.consumerRequestToLinkByProviderByEmail' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerRequestToLinkByProviderByEmail@pccom.es' Password:',Adios22' Name:'consumer.consumerRequestToLinkByProviderByEmail')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerRequestToLinkByProviderByEmail' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'provider.consumerRequestToLinkByProviderByEmail@pccom.es' Phone:'null')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.consumerRequestToLinkByProviderByEmail@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created

@basic
Scenario: Consumer request to link provider by phone
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.consumerRequestToLinkProviderByPhone@pccom.es' Password:',Adios22' Name:'provider.consumerRequestToLinkProviderByPhone')
	When 1_0 provider data is submitted (TradeName:'provider.consumerRequestToLinkProviderByPhone' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	When 1_0 user requests to confirm his phone number (Telephone:'34600000002')
	Then 1_0 response is Accepted
	And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'34600000002') and the user was issued a valid two factor code using sms provider
	When 1_0 user confirms successfully his phone number (Telephone:'34600000002') with the two factor authentication code
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerRequestToLinkProviderByPhone@pccom.es' Password:',Adios22' Name:'consumer.consumerRequestToLinkProviderByPhone')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerRequestToLinkProviderByPhone' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'null' Phone:'34600000002')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.consumerRequestToLinkProviderByPhone@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created

@basic
Scenario: Consumer request to link provider by email and phone
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.firstConsumerRequestToLinkProviderByEmailAndPhone@pccom.es' Password:',Adios22' Name:'provider.firstConsumerRequestToLinkProviderByEmailAndPhone')
	When 1_0 provider data is submitted (TradeName:'provider.firstConsumerRequestToLinkProviderByEmailAndPhone' Address:'PruebaPhone' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.secondConsumerRequestToLinkProviderByEmailAndPhone@pccom.es' Password:',Adios22' Name:'consumer.secondConsumerRequestToLinkProviderByEmailAndPhone')
	When 1_0 consumer data is submitted (TradeName:'consumer.secondConsumerRequestToLinkProviderByEmailAndPhone' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'provider.firstConsumerRequestToLinkProviderByEmailAndPhone@pccom.es' Phone:'600000004')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.firstConsumerRequestToLinkProviderByEmailAndPhone@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created

@basic
Scenario: Consumer request to link provider two times and response is error
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.consumerRequestToLinkProviderTwoTimesAndResponseIsError@pccom.es' Password:',Adios22' Name:'provider.consumerRequestToLinkProviderTwoTimesAndResponseIsError')
	When 1_0 provider data is submitted (TradeName:'provider.consumerRequestToLinkProviderTwoTimesAndResponseIsError' Address:'c\ Bajovento 4' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	When 1_0 user requests to confirm his phone number (Telephone:'34600000015')
	Then 1_0 response is Accepted
	And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'34600000015') and the user was issued a valid two factor code using sms provider
	When 1_0 user confirms successfully his phone number (Telephone:'34600000015') with the two factor authentication code
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerRequestToLinkProviderTwoTimesAndResponseIsError@pccom.es' Password:',Adios22' Name:'consumer.consumerRequestToLinkProviderTwoTimesAndResponseIsError')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerRequestToLinkProviderTwoTimesAndResponseIsError' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'provider.consumerRequestToLinkProviderTwoTimesAndResponseIsError@pccom.es' Phone:'')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.consumerRequestToLinkProviderTwoTimesAndResponseIsError@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created
	And 1_0 response message contains (Message: '"salesman":{"salesmanUserName":null,"email":"provider.consumerRequestToLinkProviderTwoTimesAndResponseIsError@pccom.es","telephone":"34600000015"},"orderWeekDays":[],"isPendingToApprove":true}')	
	# Request to add the provider twice, this time with his phone
	Then 1_0 consumer request to link provider by email or phone (Email:'' Phone:'34600000015')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'provider.consumerRequestToLinkProviderTwoTimesAndResponseIsError@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is BadRequest
	And 1_0 response message contains (Message: 'No puedes añadir un proveedor dos veces')

@basic
Scenario: Consumer request provider info by email and no results were found
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.consumerRequestProviderInfoByEmailAndNoResultsWereFound@pccom.es' Password:',Adios22' Name:'provider.consumerRequestProviderInfoByEmailAndNoResultsWereFound')
	Then 1_0 response is Ok
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerRequestProviderInfoByEmailAndNoResultsWereFound@pccom.es' Password:',Adios22' Name:'consumer.consumerRequestProviderInfoByEmailAndNoResultsWereFound')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerRequestProviderInfoByEmailAndNoResultsWereFound' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'wrongProvider.consumerRequestProviderInfoByEmailAndNoResultsWereFound@pccom.es' Phone:'null')
	And 1_0 response is BadRequest
	And 1_0 response message contains (Message: 'No se encontró ningún proveedor.')

@basic
Scenario: Consumer request provider info by phone and no result were found
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.consumerRequestProviderInfoByPhoneAndNoResultsWereFound@pccom.es' Password:',Adios22' Name:'provider.consumerRequestProviderInfoByPhoneAndNoResultsWereFound')
	When 1_0 provider data is submitted (TradeName:'provider.consumerRequestProviderInfoByPhoneAndNoResultsWereFound' Address:'PruebaPhone' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerRequestProviderInfoByPhoneAndNoResultsWereFound@pccom.es' Password:',Adios22' Name:'consumer.consumerRequestProviderInfoByPhoneAndNoResultsWereFound')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerRequestProviderInfoByPhoneAndNoResultsWereFound' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'null' Phone:'600000009')
	And 1_0 response is BadRequest
	And 1_0 response message contains (Message: 'No se encontró ningún proveedor.')

@basic
Scenario: Consumer request provider info by email and phone and gets multiple providers
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.firstConsumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders@pccom.es' Password:',Adios22' Name:'provider.firstConsumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders')
	When 1_0 provider data is submitted (TradeName:'provider.firstConsumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders' Address:'provider1' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.secondConsumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders@pccom.es' Password:',Adios22' Name:'provider.secondConsumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders')
	When 1_0 provider data is submitted (TradeName:'provider.secondConsumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders' Address:'provider1' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	Then 1_0 response is Created
	
	When 1_0 user requests to confirm his phone number (Telephone:'34600000011')
	Then 1_0 response is Accepted
	And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'34600000011') and the user was issued a valid two factor code using sms provider
	When 1_0 user confirms successfully his phone number (Telephone:'34600000011') with the two factor authentication code
	
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders@pccom.es' Password:',Adios22' Name:'consumer.consumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'provider.firstConsumerRequestProviderInfoByEmailAndPhoneAndGetsMultipleProviders@pccom.es' Phone:'34600000011')
	And 1_0 response is BadRequest
	And 1_0 response message contains (Message: 'Se ha encontrado más de un proveedor de acuerdo a los parámetros de búsqueda proporcionados.')

@basic
Scenario: Consumer request provider info by a invalid email
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerRequestProviderInfoByInvalidEmail@pccom.es' Password:',Adios22' Name:'consumer.consumerRequestProviderInfoByInvalidEmail')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerRequestProviderInfoByInvalidEmail' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'consumer.consumerRequestProviderInfoByInvalidEmail.es' Phone:'600000012')
	And 1_0 response is BadRequest
	And 1_0 response message contains (Message: 'El campo de correo electrónico no es una dirección de correo electrónico válida')

@basic
Scenario: Consumer request provider info by a invalid telephone
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.consumerRequestProviderInfoByNotInvalidTelephone@pccom.es' Password:',Adios22' Name:'consumer.consumerRequestProviderInfoByNotInvalidTelephone')
	When 1_0 consumer data is submitted (TradeName:'consumer.consumerRequestProviderInfoByNotInvalidTelephone' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'consumer.consumerRequestProviderInfoByNotInvalidTelephone@pccom.es' Phone:'R00000012')
	And 1_0 response is BadRequest
	And 1_0 response message contains (Message: 'El campo teléfono no es un número de teléfono válido')

Scenario: Consumer can't search another consumer
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.firstConsumerCantSearchAnotherProvider@pccom.es' Password:',Adios22' Name:'consumer.firstConsumerCantSearchAnotherProvider')
	When 1_0 consumer data is submitted (TradeName:'consumer.firstConsumerCantSearchAnotherProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.secondConsumerCantSearchAnotherProvider@pccom.es' Password:',Adios22' Name:'consumer.secondConsumerCantSearchAnotherProvider')
	When 1_0 consumer data is submitted (TradeName:'consumer.secondConsumerCantSearchAnotherProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'consumer.firstConsumerCantSearchAnotherProvider@pccom.es' Phone:'null')
	And 1_0 response is BadRequest
	And 1_0 response message contains (Message: 'No se encontró ningún proveedor.')

Scenario: Consumer can search another consumer after being activated as provider
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.firstConsumerCanSearchAnotherConsumer@pccom.es' Password:',Adios22' Name:'consumer.firstConsumerCanSearchAnotherConsumer')
	When 1_0 consumer data is submitted (TradeName:'consumer.firstConsumerCanSearchAnotherConsumer' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	And 1_0 Activate Consumer as Provider
	And 1_0 stop using access token for all requests
	And 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'consumer.secondConsumerCanSearchAnotherProvider@pccom.es' Password:',Adios22' Name:'consumer.secondConsumerCanSearchAnotherProvider')
	And 1_0 consumer data is submitted (TradeName:'consumer.secondConsumerCanSearchAnotherProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 response is Created
	And 1_0 get user access token
	And 1_0 response is Ok
	And 1_0 start using access token for all requests
	Then 1_0 consumer request to link provider by email or phone (Email:'consumer.firstConsumerCanSearchAnotherConsumer@pccom.es' Phone:'null')
	And 1_0 response is Ok
	And 1_0 response message contains (Message: 'consumer.firstConsumerCanSearchAnotherConsumer@pccom.es')
	Then 1_0 request to link a new provider with given response
	And 1_0 response is Created