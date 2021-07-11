Feature: ProviderUserRegistration
       Provider user registration scenarios

Scenario: New provider user with an email invitation without refreshing token after provider data submitted
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewProviderUserWithAnEmailInvitationWithoutRefreshingTokenAfterProviderDataSubmitted@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 provider data is submitted (TradeName:'Charcuval NewProviderUserWithAnEmailInvitationWithoutRefreshingTokenAfterProviderDataSubmitted' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is Created	
	   And 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gon.navarro.NewProviderUserWithAnEmailInvitationWithoutRefreshingTokenAfterProviderDataSubmitted@pccom.es    | Gon Navarro     |
	   | ProviderUser | jersiovic.NewProviderUserWithAnEmailInvitationWithoutRefreshingTokenAfterProviderDataSubmitted@pccom.com     | Pepe            |
	   | ProviderUser | gonzalogallego.NewProviderUserWithAnEmailInvitationWithoutRefreshingTokenAfterProviderDataSubmitted@pccom.es | Gonzalo Gallego |
	   Then 1_0 response is Unauthorized
	   
Scenario: New provider user with an email invitation and cancel the linking
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewProviderUserWithAnEmailInvitationAndCancelTheLinking@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 provider data is submitted (TradeName:'Charcuval NewProviderUserWithAnEmailInvitationAndCancelTheLinking' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   And 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gon.navarro.NewProviderUserWithAnEmailInvitationAndCancelTheLinking@pccom.es    | Gon Navarro     |
	   | ProviderUser | jersiovic.NewProviderUserWithAnEmailInvitationAndCancelTheLinking@pccom.com     | Pepe            |
	   | ProviderUser | gonzalogallego.NewProviderUserWithAnEmailInvitationAndCancelTheLinking@pccom.es | Gonzalo Gallego |
	   Then 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   And 1_0 invitation created contains valid providerId
	   And 1_0 store last provider user invitations
	   And 1_0 confirm user invitation to gonzalogallego.NewProviderUserWithAnEmailInvitationAndCancelTheLinking@pccom.es request received at last-0 user email
	   And 1_0 complete provider user registration (Password:'Pass123.')
	   And 1_0 response is Ok without Errors in the View
	   And 1_0 changes the provider (button:'Cancelar')
	   And 1_0 response is Ok with title (title:'This User has already been registered, please go to the login page')

Scenario: New provider user with an email invitation and link to the provider
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewProviderUserWithAnEmailInvitationAndLinkToTheProvider@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'Charcuval NewProviderUserWithAnEmailInvitationAndLinkToTheProvider' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gon.navarro.NewProviderUserWithAnEmailInvitationAndLinkToTheProvider@pccom.es    | Gon Navarro     |
	   | ProviderUser | jersiovic.NewProviderUserWithAnEmailInvitationAndLinkToTheProvider@pccom.com     | Pepe            |
	   | ProviderUser | gonzalogallego.NewProviderUserWithAnEmailInvitationAndLinkToTheProvider@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid providerId
	   And 1_0 store last provider user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewProviderUserWithAnEmailInvitationAndLinkToTheProvider@pccom.es request received at last-0 user email
	   And 1_0 complete provider user registration (Password:'Pass123.')
	   And 1_0 response is Ok with title (title:'WELCOME TO')
	   Then 1_0 changes the provider (button:'Guardar')
	   And 1_0 response is Ok with title (title:'The registration has been completed, please go to the login page')

Scenario: New provider user with an email invitation and fails because the password must have a minimum length of 6
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'Charcuval NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gon.navarro.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.es    | Gon Navarro     |
	   | ProviderUser | jersiovic.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.com     | Pepe            |
	   | ProviderUser | gonzalogallego.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid providerId
	   And 1_0 store last provider user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustHaveAMinimumLengthOf6@pccom.es request received at last-0 user email
	   And 1_0 complete provider user registration (Password:'passw')
	   And 1_0 response is Ok with Errors in the View

Scenario: New provider user with an email invitation and fails because the password must contain symbols
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'Charcuval NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gon.navarro.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.es    | Gon Navarro     |
	   | ProviderUser | jersiovic.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.com     | Pepe            |
	   | ProviderUser | gonzalogallego.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid providerId
	   And 1_0 store last provider user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainSymbols@pccom.es request received at last-0 user email
	   And 1_0 complete provider user registration (Password:'password')
	   And 1_0 response is Ok with Errors in the View

Scenario: New provider user with an email invitation and fails because the password must contain numbers
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'Charcuval NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gon.navarro.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.es    | Gon Navarro     |
	   | ProviderUser | jersiovic.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.com     | Pepe            |
	   | ProviderUser | gonzalogallego.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid providerId
	   And 1_0 store last provider user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainNumbers@pccom.es request received at last-0 user email
	   And 1_0 complete provider user registration (Password:'password.')
	   And 1_0 response is Ok with Errors in the View

Scenario: New provider user with an email invitation and fails because the password must contain uppercase letters
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'Charcuval NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gon.navarro.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.es    | Gon Navarro     |
	   | ProviderUser | jersiovic.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.com     | Pepe            |
	   | ProviderUser | gonzalogallego.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid providerId
	   And 1_0 store last provider user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.NewProviderUserWithAnEmailInvitationAndFailsBecauseThePasswordMustContainUppercaseLetters@pccom.es request received at last-0 user email
	   And 1_0 complete provider user registration (Password:'password.1')
	   And 1_0 response is Ok with Errors in the View

Scenario: User linked to a provider that recieves an email invitation and wants to change the provider which the user was linked
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga.UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   When 1_0 provider data is submitted (TradeName:'Charcuval UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'965459632' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gonzalogallego.UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid providerId
	   And 1_0 store last provider user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked@pccom.es request received at last-0 user email
	   And 1_0 complete provider user registration (Password:'Password.1')
	   And 1_0 response is Ok with title (title:'WELCOME TO')
 	   Then 1_0 changes the provider (button:'Guardar')
	   And 1_0 response is Ok with title (title:'The registration has been completed, please go to the login page')
	   
	   Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga2.UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked@pccom.es' Password:',Adios22' Name:'Pepe')
	   When 1_0 provider data is submitted (TradeName:'El Proveedor UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked' Address:'C\Bajovento 5' StateOrProvince:'Alicante' Town:'Alicante' PostalCode:'03540' Telephone:'965659965' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   Then 1_0 response is Created	
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   Given 1_0 send new provider user invitation 
	   | Type         | Email                   | Name            |
	   | ProviderUser | gonzalogallego.UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked@pccom.es | Gonzalo Gallego |
	   And 1_0 response is Created
	   And 1_0 stop using access token for all requests	   
	   And 1_0 reset client cookies
	   Then 1_0 invitation created contains valid providerId
	   And 1_0 store last provider user invitations
	   Then 1_0 confirm user invitation to gonzalogallego.UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked@pccom.es request received at last-0 user email
	   And 1_0 response is Ok and shows LoginPage
	   When 1_0 user login with username and password (Password:'Password.1' UserName:'gonzalogallego.UserLinkedToAProviderThatRecievesAnEmailInvitationAndWantsToChangeTheProviderWhichTheUserWasLinked')
	   And 1_0 changes the provider (button:'Guardar')
	   Then 1_0 response is Ok with title (title:'The registration has been completed, please go to the login page')




