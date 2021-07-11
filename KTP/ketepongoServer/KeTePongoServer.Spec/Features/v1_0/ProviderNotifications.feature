Feature: ProviderNotifications
       Provider notifications scenarios

@basic
Scenario: User tries to access provider notifications without being provider
	Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.UserTriesToAccessProviderNotificationWithoutBeingProvider@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	Then 1_0 user tries to access provider notifications but it's unauthorized

@basic
Scenario: Consumer requests access to provider catalog notification sending signal, reading and deleting it from server
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'provider.ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'La Majada ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'96546785456' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created
	   When 1_0 provider provider.ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer connection to SignalR established
	   Given 1_0 a new consumer with (UserEmail:'consumer.ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token 
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 a new provider request with (TradeName:'La Majada ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer' SalesEmail:'' OrderWeekDays:'Monday' SalesmanEmail:'provider.ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 response is Created
	   Then 1_0 provider.ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer has received a SignalR notification
	   Given 1_0 a user with (Type:'ProviderUser' UserName:'provider.ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer' UserEmail:''provider.ConsumerRequestsAccessToProviderCatalogNotificationSendingSignalReadingAndDeletingItFromServer@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 get user access token 
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   Then 1_0 provider has 1 notifications pending to read
	   Then 1_0 provider had 1 notifications read and now has 0 pending to read
	   Then 1_0 provider has 0 notifications pending to read