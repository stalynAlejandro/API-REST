Feature: UserRegistration
       User registration scenarios (common operations for consumer and provider users

@basic
Scenario Outline: New user providing only email and password and refreshing access token
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserProvidingOnlyEmailAndPasswordAndRefreshingToken.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 user username is 'raulaliaga.NewUserProvidingOnlyEmailAndPasswordAndRefreshingToken.<UserType>'
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests	   
	   When 1_0 confirm user email request with confirmation code received at last-0 user email
	   Then 1_0 response is Ok
	   And 1_0 stop using access token for all requests
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |

@basic
Scenario Outline: Updating user name
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.UpdatingUserName.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 user in response is valid
	   And 1_0 user username is 'raulaliaga.UpdatingUserName.<UserType>'
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests	   
	   And 1_0 confirm user email request with confirmation code received at last-0 user email
	   And 1_0 response is Ok
	   And 1_0 stop using access token for all requests
	   And 1_0 get access token from refresh token to get updated claims
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   When 1_0 Updating username (NewName:'Sergio Navarro 2')
	   Then 1_0 response is Accepted
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

Scenario Outline: New user requesting another confirmation code after confirm first one
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserRequestingAnotherConfirmationCodeAfterConfirmFirstOne.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 response is Created
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 confirm user email request with confirmation code received at last-0 user email
	   Then 1_0 response is Ok
	   And 1_0 a new user confirmation code request
	   Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"":["El email ha sido confirmado"]}')
Examples: 
| UserType |
| ConsumerUser    |
| ProviderUser    |

Scenario Outline: New user requesting another confirmation code without access token
	   Given 1_0 a new user request without username (Type:'<UserType>' UserEmail:'raulaliaga.NewUserRequestingAnotherConfirmationCodeWithoutAccessToken.<UserType>@pccom.es' Password:',Adios22' Name:'Sergio Navarro')
	   And 1_0 response is Created
	   And 1_0 confirm user email request with confirmation code received at last-0 user email
	   Then 1_0 response is Unauthorized
	   Examples: 
| UserType |
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




