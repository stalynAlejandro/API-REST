Feature: UserPhone
       User phone scenarios

@basic
Scenario Outline: User request to confirm his phone number
Given 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.UserRequestToConfirmHisPhoneNumber.<UserType>' UserEmail:'pescadosbahia.UserRequestToConfirmHisPhoneNumber.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'<Telephone>')
    Then 1_0 response is Accepted
    And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'<Telephone>') and the user was issued a valid two factor code using sms provider
    When 1_0 user confirms successfully his phone number (Telephone:'<Telephone>') with the two factor authentication code
    And 1_0 user has a phone number (Telephone:'<Telephone>') assigned and his phone is confirmed and user can be retrieved using his phone number
Examples: 
| UserType     | Telephone   |
| ConsumerUser | 34608731005 |
| ProviderUser | 34608731006 |


@basic
Scenario Outline: User request to confirm his phone number but introduces a wrong authentication code 
Given 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.UserRequestToConfirmHisPhoneNumberButIntroducesAWrongAuthenticationCode.<UserType>' UserEmail:'pescadosbahia.UserRequestToConfirmHisPhoneNumberButIntroducesAWrongAuthenticationCode.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'<Telephone>')
    Then 1_0 response is Accepted
    And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'<Telephone>') and the user was issued a valid two factor code using sms provider
    When 1_0 user fails to confirms successfully his phone number (Telephone:'<Telephone>') with a wrong two factor authentication code
    Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Code":["Código no válido"]}')
Examples: 
| UserType     | Telephone   |
| ConsumerUser | 34608731022 |
| ProviderUser | 34608731023 |


@basic
Scenario Outline: User request to confirm his phone number but the phone is already verified on another user 
Given 1_0 a new user request with (Type:'<UserType>' UserName:'saav.UserRequestToConfirmHisPhoneNumberButThePhoneIsAlreadyVerifiedOnAnotherUser.<UserType>' UserEmail:'saav.UserRequestToConfirmHisPhoneNumberButThePhoneIsAlreadyVerifiedOnAnotherUser.<UserType>@g.com' Password:',Adios22' Name:'saav')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'<Telephone>')
    Then 1_0 response is Accepted
    And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'<Telephone>') and the user was issued a valid two factor code using sms provider
    When 1_0 user confirms successfully his phone number (Telephone:'<Telephone>') with the two factor authentication code
    Then 1_0 response is Accepted
    Then 1_0 a new user request with (Type:'<UserType>' UserName:'saav2.UserRequestToConfirmHisPhoneNumberButThePhoneIsAlreadyVerifiedOnAnotherUser.<UserType>' UserEmail:'saav2.UserRequestToConfirmHisPhoneNumberButThePhoneIsAlreadyVerifiedOnAnotherUser.<UserType>@g.com' Password:',Adios22' Name:'saav2')
    Given 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'<Telephone>')
    Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"telephone":["Este número ya ha sido verificado por otro usuario"]}')
Examples: 
| UserType     | Telephone |
| ConsumerUser | 34608731041    |
| ProviderUser | 34608731042    |


@basic
Scenario Outline: User request to confirm a phone that has been already verified in his account
Given 1_0 a new user request with (Type:'<UserType>' UserName:'saav.UserRequestToConfirmAPhoneThatHasBeenAlreadyVerifiedInHisAccount.<UserType>' UserEmail:'saav.UserRequestToConfirmAPhoneThatHasBeenAlreadyVerifiedInHisAccount.<UserType>@g.com' Password:',Adios22' Name:'saav')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'<Telephone>')
    Then 1_0 response is Accepted
    And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'<Telephone>') and the user was issued a valid two factor code using sms provider
    When 1_0 user confirms successfully his phone number (Telephone:'<Telephone>') with the two factor authentication code
    When 1_0 user requests to confirm his phone number (Telephone:'<Telephone>')
    Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"telephone":["Ya has verificado este número en tu cuenta"]}')
Examples: 
| UserType     | Telephone |
| ConsumerUser | 34608731063    |
| ProviderUser | 34608731064    |


@basic
Scenario Outline: User request to confirm a phone and request SMS two times
Given 1_0 a new user request with (Type:'<UserType>' UserName:'saav.UserRequestToConfirmAPhoneAndRequestSmsTwoTimes.<UserType>' UserEmail:'saav.UserRequestToConfirmAPhoneAndRequestSmsTwoTimes.<UserType>@g.com' Password:',Adios22' Name:'saav')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'<Telephone>')
    Then 1_0 response is Accepted
    And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'<Telephone>') and the user was issued a valid two factor code using sms provider
    When 1_0 user requests to confirm his phone number (Telephone:'<Telephone>')
    Then 1_0 response is Accepted
    And 1_0 a confirm phone sms was sent successfully to the user phone number by second time (Telephone:'<Telephone>') and the user was issued a valid two factor code using sms provider
    When 1_0 user confirms successfully his phone number (Telephone:'<Telephone>') with the two factor authentication code
    And 1_0 user has a phone number (Telephone:'<Telephone>') assigned and his phone is confirmed and user can be retrieved using his phone number
    Then 1_0 check current NewPhoneRequested is null
Examples: 
| UserType     | Telephone |
| ConsumerUser | 34608731081    |
| ProviderUser | 34608731082    |



@basic
Scenario Outline: User request to confirm a phone and request SMS. But the SMS is not send. And user sends a code. 
Given 1_0 a new user request with (Type:'<UserType>' UserName:'saav.UserRequestToConfirmAPhoneAndRequestSmsButTheSmsIsNotSendAndUserSendsACode.<UserType>' UserEmail:'saav.UserRequestToConfirmAPhoneAndRequestSmsButTheSmsIsNotSendAndUserSendsACode.<UserType>@g.com' Password:',Adios22' Name:'saav')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'34608731102')
    Then 1_0 response is Accepted
    When 1_0 user fails to confirms successfully his phone number (Telephone:'34608731102') with a wrong two factor authentication code
    Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"Code":["Código no válido"]}')
Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |


@basic
Scenario Outline: User has a verified phone number and wants to change it for another 
Given 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.UserHasAVerifiedPhoneNumberAndWantsToChangeItForAnother.<UserType>' UserEmail:'pescadosbahia.UserHasAVerifiedPhoneNumberAndWantsToChangeItForAnother.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'<FirstTelephone>')
    Then 1_0 response is Accepted
    And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'<FirstTelephone>') and the user was issued a valid two factor code using sms provider
    When 1_0 user confirms successfully his phone number (Telephone:'<FirstTelephone>') with the two factor authentication code
    Then 1_0 response is Accepted
    And 1_0 user has a phone number (Telephone:'<FirstTelephone>') assigned and his phone is confirmed and user can be retrieved using his phone number
    When 1_0 user requests to confirm his phone number (Telephone:'<SecondTelephone>')
    Then 1_0 response is Accepted
    And 1_0 a confirm phone sms was sent successfully to the user phone number (Telephone:'<SecondTelephone>') and the user was issued a valid two factor code using sms provider
    When 1_0 user confirms successfully his phone number (Telephone:'<SecondTelephone>') with the two factor authentication code
    And 1_0 user has a phone number (Telephone:'<SecondTelephone>') assigned and his phone is confirmed and user can be retrieved using his phone number
Examples: 
| UserType     | FirstTelephone | SecondTelephone |
| ConsumerUser | 34608731118    | 34608731120     |
| ProviderUser | 34608731119    | 34608731121     |


@basic
Scenario Outline: User request confirmation with invalid phone number
Given 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.UserRequestConfirmationWithInvalidPhoneNumber.<UserType>' UserEmail:'pescadosbahia.UserRequestConfirmationWithInvalidPhoneNumber.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'60873163434')
    Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"telephone":["El número de teléfono debe tener un prefijo válido"]}')
    When 1_0 user requests to confirm his phone number (Telephone:'3460873163')
    Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"telephone":["El número de teléfono no es válido"]}')
Examples: 
| UserType     | 
| ConsumerUser |
| ProviderUser |


@basic
Scenario Outline: Request from landline number
Given 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.RequestFromLandlineNumber.<UserType>' UserEmail:'pescadosbahia.RequestFromLandlineNumber.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    When 1_0 user requests to confirm his phone number (Telephone:'34902123123')
    Then 1_0 response is BadRequest (MessageStartsWith:'{"errors":{"telephone":["El número de teléfono no puede ser un número fijo"]}')
Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |


@ignore
Scenario: SMS credentials not valid. Sends SMS but API_KEY is not authorized
    And 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.SmsCredentialsNotValidSendsSmsButApiKeyIsNotAuthorized.<UserType>' UserEmail:'pescadosbahia.SmsCredentialsNotValidSendsSmsButApiKeyIsNotAuthorized.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    Then 1_0 user requests to confirm his phone number MockUp the API with UNAUTHORIZED settings (Telephone:'34608731171')
    Then 1_0 response is BadRequest and external API sends message (MessageStartsWith:'{"errors":{"SMS":["La API KEY es invalida, comprueba que has puesto la API KEY correcta o mira si tu cuenta esta bloqueada."]}')
    Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |

@ignore
Scenario: SmsUp is out of founds
    And 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.SmsUpIsOutOfFounds<UserType>' UserEmail:'pescadosbahia.SmsUpIsOutOfFounds.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    Then 1_0 user requests to confirm his phone number MockUp the API without FOUNDS (Telephone:'34608731184')
    Then 1_0 response is BadRequest and external API sends message (MessageStartsWith:'{"errors":{"SMS":["La cuenta está sin fondos para procesar esta respuesta, añade credito a la cuenta y prueba de nuevo"]}')
Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |


@ignore
Scenario: SmsUp with BadParams
    And 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.SmsUpWithBadparams.<UserType>' UserEmail:'pescadosbahia.SmsUpWithBadparams.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    Then 1_0 user requests to confirm his phone number MockUp the API with BAD_PARAMS (Telephone:'34608731198')
    Then 1_0 response is BadRequest and external API sends message (MessageStartsWith:'{"errors":{"SMS":["Uno o más parámetros son incorrectos"]}')
Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |


@ignore
Scenario: SmsUp with invalid destination
    And 1_0 a new user request with (Type:'<UserType>' UserName:'pescadosbahia.SmsUpWithInvalidDestination.<UserType>' UserEmail:'pescadosbahia.SmsUpWithInvalidDestination.<UserType>@mail.com' Password:',Adios22' Name:'PescadosBahia')
    And 1_0 get user access token
    And 1_0 response is Ok
    And 1_0 start using access token for all requests
    Then 1_0 user requests to confirm his phone number MockUp the API with INVALID_DESTINATION (Telephone:'34608731212')
    Then 1_0 response is BadRequest and external API sends message (MessageStartsWith:'{"errors":{"SMS":["El servicio no pudo procesar el destino del sms. El número debe estar en formato MSISDN. Ej: 34612345678"]}')
Examples: 
| UserType	|
| ConsumerUser    |
| ProviderUser    |


@ignore 
Scenario Outline: Test MaxFailAccesAttemps && DefaultLockOutTimeSpan
