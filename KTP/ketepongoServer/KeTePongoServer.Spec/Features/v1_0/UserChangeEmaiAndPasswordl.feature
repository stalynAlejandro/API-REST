Feature: User ChangeEmail And Password
       User change email and password scenarios (common operations for consumer and provider users)

@basic
Scenario Outline: New user providing only email and password
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserProvidingOnlyEmailAndPassword.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests	   
	   And 1_0 confirm user email request with confirmation code received at last-0 user email
	   And 1_0 response is Ok

Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |


Scenario Outline: New user changing password
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserChangingPassword.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests	   
	   When 1_0 change user password (CurrentPassword:',Adios22' NewPassword:',Adios33' NewPasswordConfirmation:',Adios33')
	   Given 1_0 a user with (Type:'<UserType>' UserName:'raulaliaga.NewUserChangingPassword.<UserType>' UserEmail:'raulaliaga.NewUserChangingPassword.<UserType>@pccom.es' Password:',Adios33' Name:'Sergio Navarro')
	   And 1_0 get user access token
	   And 1_0 response is Ok

Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |


Scenario Outline: New user changing password with confirmation password wrong
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserChangingPasswordWithConfirmationPasswordWrong.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests	   
	   When 1_0 change user password (CurrentPassword:',Adios22' NewPassword:'121' NewPasswordConfirmation:'121')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Password":["Las contraseñas deben tener al menos 8 caracteres.","Las contraseñas deben tener al menos un símbolo.","Las contraseñas deben tener al menos un carácter minúscula ('a'-'z').","Las contraseñas deben tener al menos un carácter mayúscula ('A'-'Z')."]}')

Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |

Scenario Outline: New user changing password to a not secure one
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserChangingPasswordToANotSecureOne.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests	   
	   When 1_0 change user password (CurrentPassword:',Adios22' NewPassword:'121' NewPasswordConfirmation:',Adios33')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"NewPasswordConfirmation":["Las contraseñas no coinciden."]}')

Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |

@basic
Scenario Outline: New user providing only email and password and changing email 
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserProvidingOnlyEmailAndPasswordAndChangingEmail.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 confirm user email request with confirmation code received at last-0 user email
	   And 1_0 response is Ok
	   And 1_0 stop using access token for all requests
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   When 1_0 request an email address change (NewEmail:'raulaliaga2.NewUserProvidingOnlyEmailAndPasswordAndChangingEmail.<UserType>@pccom.es')
	   And 1_0 response is Accepted
	   Then 1_0 confirm email change request with confirmation code received at last-0 user email
	   And 1_0 response is Accepted
	   Then 1_0 check current user email is 'raulaliaga2.NewUserProvidingOnlyEmailAndPasswordAndChangingEmail.<UserType>@pccom.es'
Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |

@basic
Scenario Outline: New user providing changing email to same email
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserProvidingChangingEmailToSameEmail.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 confirm user email request with confirmation code received at last-0 user email
	   And 1_0 response is Ok
	   And 1_0 stop using access token for all requests
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 start using access token for all requests
	   When 1_0 request an email address change (NewEmail:'raulaliaga.NewUserProvidingChangingEmailToSameEmail.<UserType>@pccom.es')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"NewEmail":["Este email ya es el actual"]}')
Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |

@basic
Scenario Outline: New user providing changing email to another user email
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserProvidingChangingEmailToAnotherUserEmail.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 confirm user email request with confirmation code received at last-0 user email
	   And 1_0 response is Ok
	   And 1_0 stop using access token for all requests
	   And 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga2.NewUserProvidingChangingEmailToAnotherUserEmail.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 confirm user email request with confirmation code received at last-0 user email
	   And 1_0 response is Ok
	   And 1_0 stop using access token for all requests
	   And 1_0 a user with (Type:'<UserType>' UserName:'raulaliaga.NewUserProvidingChangingEmailToAnotherUserEmail.<UserType>' UserEmail:'raulaliaga.NewUserProvidingChangingEmailToAnotherUserEmail.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 get user access token
	   And 1_0 start using access token for all requests	
	   When 1_0 request an email address change (NewEmail:'raulaliaga2.NewUserProvidingChangingEmailToAnotherUserEmail.<UserType>@pccom.es')
	   Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"NewEmail":["Ya existe un usuario con este email"]}')

Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |

@ignore
Scenario Outline: Login with Admin user and perform action not allowed to admin user
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.LoginWithAdminUserAndPerformActionNotAllowedToAdminUser.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   Given 1_0 a user with (Type:'ProviderUser' UserName:'admin' UserEmail:'' Password:',Adios22' Name:'Sergio')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests	   
	   When 1_0 confirm user email request with confirmation code received at last-0 user email
	   Then 1_0 response is Unauthorized

Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |

@ignore
Scenario: New user requests password reset before confirming email

@ignore
Scenario: New user requests password reset after confirming email

@ignore
Scenario: New user with default orchard controllers should fail

@ignore
Scenario: Default orchard roles should not exist

@ignore
Scenario: Login with default orchard controllers should fail

@ignore
Scenario: After email validation old token should be revoked

@ignore
Scenario: Control throle rate of access to UserEmailChange post cause it can be used by an attacker to get all the useremail in the system




