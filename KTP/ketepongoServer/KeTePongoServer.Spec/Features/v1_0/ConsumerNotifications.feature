Feature: ConsumerNotifications
       Consumer notifications scenarios

@basic
Scenario: User tries to access consumer notifications without being consumer
	Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.UserTriesToAccessConsumerNotificationWithoutBeingConsumer@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	Then 1_0 user tries to access consumer notifications but it's unauthorized