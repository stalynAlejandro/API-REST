Feature: ConsumerUserRegistration
       Consumer user registration scenarios

Scenario: New consumer user with an email invitation without refreshing token after consumer data submitted
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewConsumerUserWithAnEmailInvitationWithoutRefreshingTokenAfterConsumerDataSubmitted@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 consumer data is submitted (TradeName:'El Bar NewConsumerUserWithAnEmailInvitationWithoutRefreshingTokenAfterConsumerDataSubmitted' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is Created	
	   And 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gon.navarro.NewConsumerUserWithAnEmailInvitationWithoutRefreshingTokenAfterConsumerDataSubmitted@pccom.es    | Gon Navarro     |
	   | ConsumerUser | jersiovic.NewConsumerUserWithAnEmailInvitationWithoutRefreshingTokenAfterConsumerDataSubmitted@pccom.com     | Pepe            |
	   | ConsumerUser | gonzalogallego.NewConsumerUserWithAnEmailInvitationWithoutRefreshingTokenAfterConsumerDataSubmitted@pccom.es | Gonzalo Gallego |
	   Then 1_0 response is Unauthorized
	   
Scenario: New consumer user with an email invitation and cancel the linking
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewConsumerUserWithAnEmailInvitationAndCancelTheLinking@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 consumer data is submitted (TradeName:'El Bar NewConsumerUserWithAnEmailInvitationAndCancelTheLinking' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   And 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gon.navarro.NewConsumerUserWithAnEmailInvitationAndCancelTheLinking@pccom.es    | Gon Navarro     |
	   | ConsumerUser | jersiovic.NewConsumerUserWithAnEmailInvitationAndCancelTheLinking@pccom.com     | Pepe            |
	   | ConsumerUser | gonzalogallego.NewConsumerUserWithAnEmailInvitationAndCancelTheLinking@pccom.es | Gonzalo Gallego |
	   Then 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   And 1_0 invitation created contains valid consumerId
	   And 1_0 store last consumer user invitations
	   And 1_0 confirm user invitation to gonzalogallego.NewConsumerUserWithAnEmailInvitationAndCancelTheLinking@pccom.es request received at last-0 user email
	   And 1_0 complete consumer user registration (Password:'Pass123.')
	   And 1_0 response is Ok without Errors in the View
	   And 1_0 changes the consumer (button:'Cancelar')
	   And 1_0 response is Ok with title (title:'This user has been registered already. Please, go to the login page')

Scenario: New consumer user with an email invitation and link to the consumer
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewConsumerUserWithAnEmailInvitationAndLinkToTheConsumer@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 consumer data is submitted (TradeName:'El Bar NewConsumerUserWithAnEmailInvitationAndLinkToTheConsumer' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gon.navarro.NewConsumerUserWithAnEmailInvitationAndLinkToTheConsumer@pccom.es    | Gon Navarro     |
	   | ConsumerUser | jersiovic.NewConsumerUserWithAnEmailInvitationAndLinkToTheConsumer@pccom.com     | Pepe            |
	   | ConsumerUser | gonzalogallego.NewConsumerUserWithAnEmailInvitationAndLinkToTheConsumer@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid consumerId
	   And 1_0 store last consumer user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewConsumerUserWithAnEmailInvitationAndLinkToTheConsumer@pccom.es request received at last-0 user email
	   And 1_0 complete consumer user registration (Password:'Pass123.')
	   And 1_0 response is Ok with title (title:'WELCOME TO')
	   Then 1_0 changes the consumer (button:'Guardar')
	   And 1_0 response is Ok with title (title:'The registration has been completed, please go to the login page')

Scenario: New consumer user with an email invitation and fails because the password must have a minimum length of 6
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 consumer data is submitted (TradeName:'El Bar NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gon.navarro.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.es    | Gon Navarro     |
	   | ConsumerUser | jersiovic.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.com     | Pepe            |
	   | ConsumerUser | gonzalogallego.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid consumerId
	   And 1_0 store last consumer user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.es request received at last-0 user email
	   And 1_0 complete consumer user registration (Password:'passw')
	   And 1_0 response is Ok with Errors in the View

Scenario: New consumer user with an email invitation and fails because the password must contain symbols
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 consumer data is submitted (TradeName:'El Bar NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gon.navarro.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.es    | Gon Navarro     |
	   | ConsumerUser | jersiovic.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.com     | Pepe            |
	   | ConsumerUser | gonzalogallego.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid consumerId
	   And 1_0 store last consumer user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.es request received at last-0 user email
	   And 1_0 complete consumer user registration (Password:'password')
	   And 1_0 response is Ok with Errors in the View

Scenario: New consumer user with an email invitation and fails because the password must contain numbers
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 consumer data is submitted (TradeName:'El Bar NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gon.navarro.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.es    | Gon Navarro     |
	   | ConsumerUser | jersiovic.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.com     | Pepe            |
	   | ConsumerUser | gonzalogallego.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid consumerId
	   And 1_0 store last consumer user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.es request received at last-0 user email
	   And 1_0 complete consumer user registration (Password:'password.')
	   And 1_0 response is Ok with Errors in the View

Scenario: New consumer user with an email invitation and fails because the password must contain uppercase letters
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 consumer data is submitted (TradeName:'El Bar NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gon.navarro.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.es    | Gon Navarro     |
	   | ConsumerUser | jersiovic.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.com     | Pepe            |
	   | ConsumerUser | gonzalogallego.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid consumerId
	   And 1_0 store last consumer user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewConsumerUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.es request received at last-0 user email
	   And 1_0 complete consumer user registration (Password:'password.1')
	   And 1_0 response is Ok with Errors in the View

Scenario: User linked to a consumer that recieves an email invitation and wants to change the consumer wich the user was linked
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga.UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 consumer data is submitted (TradeName:'El Bar UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gonzalogallego.UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid consumerId
	   And 1_0 store last consumer user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked@pccom.es request received at last-0 user email
	   And 1_0 complete consumer user registration (Password:'Password.1')
	   And 1_0 response is Ok with title (title:'WELCOME TO El Bar')
 	   Then 1_0 changes the consumer (button:'Guardar')
	   And 1_0 response is Ok with title (title:'The registration has been completed, please go to the login page')
	   
	   Given 1_0 a new user confirmed with (Type:'ConsumerUser' UserEmail:'raulaliaga2.UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked@pccom.es' Password:',Adios22' Name:'Pepe')
	   And 1_0 consumer data is submitted (TradeName:'El Bar UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanitaryMeasures:'Medida 1, Medida 2' Image:'')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new consumer user invitation 
	   | Type         | Email                   | Name            |
	   | ConsumerUser | gonzalogallego.UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests	   
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid consumerId
	   And 1_0 store last consumer user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked@pccom.es request received at last-0 user email
	   And 1_0 response is Ok and shows LoginPage
	   When 1_0 user login with username and password (Password:'Password.1' UserName:'gonzalogallego.UserLinkedToAConsumerThatRecievesAnEmailInvitationAndWantsToChangeTheConsumerWichTheUserWasLinked')
	   And 1_0 changes the consumer (button:'Guardar')
	   Then 1_0 response is Ok with title (title:'The registration has been completed, please go to the login page')
