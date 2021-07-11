Feature: ConsumerSendingOrders
       Consumer sending Orders

@basic
Scenario: Sending a new order for three not linked providers
Given 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' Password:',Adios22' Name:'provider.consumerRequestToLinkByProviderByEmail')
	And 1_0 provider data is submitted (TradeName:'Charcuval 1 SendingANewOrderForThreeNotLinkedProviders' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000000' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')

	And 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' Password:',Adios22' Name:'provider1.consumerRequestToLinkByProviderByEmail')
	And 1_0 provider data is submitted (TradeName:'Charcuval 2 SendingANewOrderForThreeNotLinkedProviders' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000000' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	And 1_0 a new user confirmed with (Type:'ProviderUser' UserEmail:'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' Password:',Adios22' Name:'provider2.consumerRequestToLinkByProviderByEmail')
	And 1_0 provider data is submitted (TradeName:'Charcuval 3 SendingANewOrderForThreeNotLinkedProviders' Address:'c\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'600000000' SanitaryMeasures:'Medida 1, Medida 2' Image:'(.*)')
	   And 1_0 a new consumer with (UserEmail:'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada SendingANewOrderForThreeNotLinkedProviders' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' SanityMeasures:'Lavado de manos' Image:'')
	   And 1_0 get user access token
	   And 1_0 response is Ok
	   And 1_0 start using access token for all requests
	   And 1_0 a new provider request with (TradeName:'Charcuval 1 SendingANewOrderForThreeNotLinkedProviders' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 response is Created
	   And 1_0 a new not linked consumer product request with (Name:'Sardinas 1' LocationIds:'' ProviderId:'1' Image:'')
	   And 1_0 response is Created
	   And 1_0 a new provider request with (TradeName:'Charcuval 2 SendingANewOrderForThreeNotLinkedProviders' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 response is Created
	   And 1_0 a new not linked consumer product request with (Name:'Sardinas 2' LocationIds:'' ProviderId:'2' Image:'')
	   And 1_0 response is Created
	   And 1_0 a new provider request with (TradeName:'Charcuval 3 SendingANewOrderForThreeNotLinkedProviders' OrderWeekDays:'Monday' SalesmanEmail:'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' SalesmanTelephone:'965477834')
	   And 1_0 response is Created
	   And 1_0 a new not linked consumer product request with (Name:'Sardinas 3' LocationIds:'' ProviderId:'3' Image:'')
	   And 1_0 response is Created
	   And 1_0 a new consumer SubOrder with (SubOrderId:'1' ProviderId:'1' Observation:'Traemelo a primera hora de la mañana' DeliveryDate:'')
	   And 1_0 response is Created
	   And 1_0 a new consumer order line with (SubOrderId:'1' ProductId:'1' Quantity:'2' Observation:'Lo más fresco que tengas')
	   And 1_0 response is Created
	   And 1_0 a new consumer SubOrder with (SubOrderId:'2' ProviderId:'2' Observation:'Traemelo a primera primera hora de la mañana' DeliveryDate:'')
	   And 1_0 response is Created
	   And 1_0 a new consumer order line with (SubOrderId:'2' ProductId:'2' Quantity:'5' Observation:'Lo más fresco que tengas si')
	   And 1_0 response is Created
	   And 1_0 a new consumer SubOrder with (SubOrderId:'3' ProviderId:'3' Observation:'Traemelo a primera primera primera hora de la mañana' DeliveryDate:'')
	   And 1_0 response is Created
	   And 1_0 a new consumer order line with (SubOrderId:'3' ProductId:'3' Quantity:'1' Observation:'Lo más fresco que tengas si o si')
	   And 1_0 response is Created
	   When 1_0 the new consumer order is requested
	   Then 1_0 response is Created (RegExp:'^{"oid":[1-9][0-9]*,"userName":"raulaliaga.SendingANewOrderForThreeNotLinkedProviders","consumerOID":[1-9][0-9]*,"utcDateTime":".*Z","hasErrors":false,"subOrders":\[{"subOrderId":1,"provider":{"id":1,"changeVersion":0,"keTePongoProviderOID":null,"tradeName":"Charcuval 1 SendingANewOrderForThreeNotLinkedProviders","salesman":{"salesmanUserName":null,"email":"raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es","telephone":"965477834"},"orderWeekDays":\[1\],"isPendingToApprove":true},"utcMinimumDeliveryDateTime":".*Z","observation":"Traemelo a primera hora de la mañana","wasProcessed":null,"providerOrderId":null,"wasEmailSentToProvider":null,"processingError":null,"orderLines":\[{"product":{"changeVersion":0,"id":1,"name":"Sardinas 1","imageUrl":"","locationIds":\[\],"providerId":1,"isMappedToProviderProduct":false,"providerProductId":null,"erpId":null,"keTePongoProviderOID":null,"isVegan":false,"allergenIds":\[\],"pvp":0.0,"description":null},"quantity":2,"observation":"Lo más fresco que tengas"}\],"isRemoved":false},{"subOrderId":2,"provider":{"id":2,"changeVersion":0,"keTePongoProviderOID":null,"tradeName":"Charcuval 2 SendingANewOrderForThreeNotLinkedProviders","salesman":{"salesmanUserName":null,"email":"raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es","telephone":"965477834"},"orderWeekDays":\[1\],"isPendingToApprove":true},"utcMinimumDeliveryDateTime":".*Z","observation":"Traemelo a primera primera hora de la mañana","wasProcessed":null,"providerOrderId":null,"wasEmailSentToProvider":null,"processingError":null,"orderLines":\[{"product":{"changeVersion":0,"id":2,"name":"Sardinas 2","imageUrl":"","locationIds":\[\],"providerId":2,"isMappedToProviderProduct":false,"providerProductId":null,"erpId":null,"keTePongoProviderOID":null,"isVegan":false,"allergenIds":\[\],"pvp":0.0,"description":null},"quantity":5,"observation":"Lo más fresco que tengas si"}\],"isRemoved":false},{"subOrderId":3,"provider":{"id":3,"changeVersion":0,"keTePongoProviderOID":null,"tradeName":"Charcuval 3 SendingANewOrderForThreeNotLinkedProviders","salesman":{"salesmanUserName":null,"email":"raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es","telephone":"965477834"},"orderWeekDays":\[1\],"isPendingToApprove":true},"utcMinimumDeliveryDateTime":".*Z","observation":"Traemelo a primera primera primera hora de la mañana","wasProcessed":null,"providerOrderId":null,"wasEmailSentToProvider":null,"processingError":null,"orderLines":\[{"product":{"changeVersion":0,"id":3,"name":"Sardinas 3","imageUrl":"","locationIds":\[\],"providerId":3,"isMappedToProviderProduct":false,"providerProductId":null,"erpId":null,"keTePongoProviderOID":null,"isVegan":false,"allergenIds":\[\],"pvp":0.0,"description":null},"quantity":1,"observation":"Lo más fresco que tengas si o si"}\],"isRemoved":false}\]}$')
	   
	   And 1_0 read last-0 email to 'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' with subject 'Nuevo pedido! Cliente: La Majada'
	   And 1_0 check for last-0 read email to 'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='body-main__providername']' points to inner text with value 'Estimado Charcuval 1 SendingANewOrderForThreeNotLinkedProviders'
	   And 1_0 check for last-0 read email to 'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-ref']' points to inner text with value '-'
	   And 1_0 check for last-0 read email to 'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-name']' points to inner text with value 'Sardinas 1'
	   And 1_0 check for last-0 read email to 'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-quantity']' points to inner text with value '2'
	   And 1_0 check for last-0 read email to 'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-observation']' points to inner text with value 'Lo más fresco que tengas'
	   And 1_0 check for last-0 read email to 'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='maincomments__paragraph']' points to inner text with value 'Traemelo a primera hora de la mañana'
	   
	   And 1_0 read last-0 email to 'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' with subject 'Nuevo pedido! Cliente: La Majada'
	   And 1_0 check for last-0 read email to 'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='body-main__providername']' points to inner text with value 'Estimado Charcuval 2 SendingANewOrderForThreeNotLinkedProviders'
	   And 1_0 check for last-0 read email to 'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-ref']' points to inner text with value '-'
	   And 1_0 check for last-0 read email to 'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-name']' points to inner text with value 'Sardinas 2'
	   And 1_0 check for last-0 read email to 'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-quantity']' points to inner text with value '5'
	   And 1_0 check for last-0 read email to 'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-observation']' points to inner text with value 'Lo más fresco que tengas si'
	   And 1_0 check for last-0 read email to 'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='maincomments__paragraph']' points to inner text with value 'Traemelo a primera primera hora de la mañana'

	   And 1_0 read last-0 email to 'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' with subject 'Nuevo pedido! Cliente: La Majada'
	   And 1_0 check for last-0 read email to 'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='body-main__providername']' points to inner text with value 'Estimado Charcuval 3 SendingANewOrderForThreeNotLinkedProviders'
	   And 1_0 check for last-0 read email to 'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-ref']' points to inner text with value '-'
	   And 1_0 check for last-0 read email to 'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-name']' points to inner text with value 'Sardinas 3'
	   And 1_0 check for last-0 read email to 'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-quantity']' points to inner text with value '1'
	   And 1_0 check for last-0 read email to 'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='products']//*[@class='products__info-observation']' points to inner text with value 'Lo más fresco que tengas si o si'
	   And 1_0 check for last-0 read email to 'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='maincomments__paragraph']' points to inner text with value 'Traemelo a primera primera primera hora de la mañana'

	   And 1_0 read last-0 email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' with subject 'KeTePongo - Detalles del pedido'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='body-main__header'])[1]//*[@class='header_title']' points to inner text with value 'Charcuval 1 SendingANewOrderForThreeNotLinkedProviders'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='body-main__header'])[1]//*[@id='salesEmail']' points to inner text with value 'raulaliaga1.SendingANewOrderForThreeNotLinkedProviders@pccom.es'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[1]//*[@class='products__info-ref']' points to inner text with value '-'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[1]//*[@class='products__info-name']' points to inner text with value 'Sardinas 1'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[1]//*[@class='products__info-quantity']' points to inner text with value '2'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[1]//*[@class='products__info-observation']' points to inner text with value 'Lo más fresco que tengas'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[1]//*[@class='maincomments__paragraph']' points to inner text with value 'Traemelo a primera hora de la mañana'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='body-main__header'])[2]//*[@class='header_title']' points to inner text with value 'Charcuval 2 SendingANewOrderForThreeNotLinkedProviders'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='body-main__header'])[2]//*[@id='salesEmail']' points to inner text with value 'raulaliaga2.SendingANewOrderForThreeNotLinkedProviders@pccom.es'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[2]//*[@class='products__info-ref']' points to inner text with value '-'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[2]//*[@class='products__info-name']' points to inner text with value 'Sardinas 2'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[2]//*[@class='products__info-quantity']' points to inner text with value '5'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[2]//*[@class='products__info-observation']' points to inner text with value 'Lo más fresco que tengas si'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[2]//*[@class='maincomments__paragraph']' points to inner text with value 'Traemelo a primera primera hora de la mañana'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='body-main__header'])[3]//*[@class='header_title']' points to inner text with value 'Charcuval 3 SendingANewOrderForThreeNotLinkedProviders'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='body-main__header'])[3]//*[@id='salesEmail']' points to inner text with value 'raulaliaga3.SendingANewOrderForThreeNotLinkedProviders@pccom.es'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[3]//*[@class='products__info-ref']' points to inner text with value '-'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[3]//*[@class='products__info-name']' points to inner text with value 'Sardinas 3'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[3]//*[@class='products__info-quantity']' points to inner text with value '1'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[3]//*[@class='products__info-observation']' points to inner text with value 'Lo más fresco que tengas si o si'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '(//*[@class='products'])[3]//*[@class='maincomments__paragraph']' points to inner text with value 'Traemelo a primera primera primera hora de la mañana'

	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='after-body_square']//*[@class='square-info__subtitle']' points to inner text with value 'La Majada SendingANewOrderForThreeNotLinkedProviders'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='after-body_square']//*[@id='consumerAddress']' points to inner text with value 'C\Bajovento 3'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='after-body_square']//*[@id='consumerPostal']' points to inner text with value '03203'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='after-body_square']//*[@id='consumerProvince']' points to inner text with value 'Alicante'
	   And 1_0 check for last-0 read email to 'raulaliaga.SendingANewOrderForThreeNotLinkedProviders@pccom.es' that xpath expression '//*[@class='after-body_square']//*[@id='consumerTown']' points to inner text with value 'Elche'

	   And 1_0 request last consumer order submitted and check last one is the same
	   And 1_0 request last 10 consumer orders submitted and check last one is the same