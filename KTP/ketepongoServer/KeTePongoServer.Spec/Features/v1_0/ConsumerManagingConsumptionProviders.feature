Feature: ConsumerManagingConsumptionProviders
       Consumer managing consumption providers

@basic
Scenario: Getting initial consumption data empty
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.GettingInitialConsumptionDataEmpty@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada GettingInitialConsumptionDataEmpty' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a consumption request
	   Then 1_0 response is Ok (Content:'{"changeVersion":0,"locations":[],"products":[],"providers":[]}')
@basic @ignore
Scenario: Adding a new provider not linked
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingANewProviderNotLinked@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewProviderNotLinked' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 response is Created
	   Then 1_0 a consumption request
	   And 1_0 response is Ok (Content:'{"changeVersion":1,"locations":[],"products":[],"providers":[{"id":1,"changeVersion":0,"keTePongoProviderOID":null,"tradeName":"Charcuval","salesman":{"salesmanUserName":null,"email":"raulaliaga@pccom.es"},"orderWeekDays":[1],"isPendingToApprove":true}]}')

@ignore # By the moment we allow duplicated names
Scenario: Adding a duplicated provider tradename
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingADuplicatedProviderTradename@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingADuplicatedProviderTradename' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga@pccom.es' SalesmanTelephone:'965477834')
	   When 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga@pccom.es' SalesmanTelephone:'313214')
	   And 1_0 response is BadRequest (MessageStartsWith:'{')
	   #And response is BadRequest (MessageStartsWith:'{"errors":{"Product.ProviderId":["The field ProviderId must be between 1 and 2147483647."]},"title":"One or more validation errors occurred.","status":400')
@basic @ignore
Scenario: Adding an empty provider tradename
	   Given 1_0 a new consumer with (UserEmail:'raulaliaga.AddingAnEmptyProviderTradename@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingAnEmptyProviderTradename' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new provider request with (TradeName:'' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 response is BadRequest (MessageStartsWith:'{')
	   #And response is BadRequest (MessageStartsWith:'{"errors":{"Product.ProviderId":["The field ProviderId must be between 1 and 2147483647."]},"title":"One or more validation errors occurred.","status":400')

@basic
Scenario: Updating a provider
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga@pccom.es' Password:',Adios22' Name:'provider.consumerRequestToLinkByProviderByEmail')
	   And 1_0 provider data is submitted (TradeName:'Charcuval' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000000' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 a new consumer with (UserEmail:'raulaliaga.UpdatingAProvider@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada UpdatingAProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 response is Created
	   And 1_0 update provider request with (Id:'1' TradeName:'Xarcuval' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 response is Ok
	   Then 1_0 a consumption request
	   And 1_0 response is Ok (Content:'{"changeVersion":2,"locations":[],"products":[],"providers":[{"id":1,"changeVersion":1,"keTePongoProviderOID":null,"tradeName":"Xarcuval","salesman":{"salesmanUserName":null,"email":"raulaliaga@pccom.es","telephone":"965477834"},"orderWeekDays":[1],"isPendingToApprove":true}]}')

@ignore
Scenario: Adding a new provider not linked with invalid data

@ignore
Scenario: Updating an existing provider not linked

@ignore
Scenario: Updating an existing provider not linked with invalid data

@ignore
Scenario: Updating a non existing provider
	   
@ignore
Scenario: Removing an existing provider not linked 

@ignore
Scenario: Removing a non existing provider

	   