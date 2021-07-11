Ling App Comercio:
https://www.figma.com/proto/gmUk696CQAND94q75e1YToGO/ketepongo-DES?node-id=177%3A3432&scaling=min-zoom
Link App Vendedor:
https://www.figma.com/proto/N7sNNqBMegaJUUKCuCd3uClH/App-Vendedor?node-id=8%3A1092&scaling=scale-down

Videos: \\192.168.5.7\descargas clientes\Desarrollo\Videos de Proceso\KeTePongo

App Comercio:
Objetivo que pueda cargar todos los datos necesarios para hacer pedidos de una vez 
Para el alta o modificaci�n de productos, proveedores y lugares conectar� con el server.
Al crear producto siempre debe elegir un proveedor existente o crear uno nuevo. Al crear un proveedor se mirar� si el correo de vendedor que el usuario provee corresponde con alguno de los emails de vendedores de alg�n proveedor existente.
Si es as� consideraremos al proveedor parcialmente mapeado con el comercio. Para que sea un mapeo completo el 
Proveedor debe de darnos para ese mapeo el idclienteajeno de ese cliente. Para esto hay dos formas: 
	� Al enviar el proveedor los mappings de Productos a partir de la estad�stica del cliente de Distrib, el proveedor nos enviar� los emails que tiene en su ERP del cliente junto a s� idclienteajeno.
	Si alguno de esos mails coincide con alguno de los mails de usuario del cliente, podremos asignar el idclienteajeno al mapeo del comercio.
	� Al a�adir nuevos usuarios del comercio con nuevos mails o al modificar alg�n mail de estos usuarios, se volver� a intentar completar el mapping como en el pto anterior.
	� Al enviar el proveedor en sus mappings una lista de emails del cliente diferente a la enviada anteriormente tb se intentar� de nuevo el matching del primer punto.
	� Todos los mapeos de cliente pendientes de completar pq falte un idcliente ajeno pero q tengan ya un proveedor registrado asignado aparecer�n en la app del Vendedor asociado al mail que puso el cliente como clientes pendientes de mapear. Para que sea el propio usuario vendedor el que provea el idcliente ajeno.

Mapeo de Productos
Al dar de alta de productos en la app de comercio funcionar� de forma diferente si es un de un proveedor registrado o no. Si es registrado la app de cliente conectar� al m�dulo de provedor pidi�ndole los productos del proveedor, y est� mostrar� aquellos que a�n no tenga enlazados al cliente para que elija uno a partir del cual crear un producto y dejar enlazado al producto del proveedor. Se necesita por tanto un controller que permita al Proveedor un env�o de productos.
En el caso de se un producto de un proveedor no registrado el restaurante a�ade el producto sin enlazar y con los datos del producto que el considere sin partir de los que provee un proveedor.
Para todo esto hay unos eventos en el modulo comercio que el m�dulo de proveedor escucha y que va anotando en el lado servidor los mapping a productos ptes de completar o completos que van quedando.

El proveedor a partir de los productos m�s consumidos enviar� todas las noches los mappings para todos sus clientes de manera que para aquellos mappings de productos q no existieran se lanzar� un evento que escuchar� el m�dulo de comercio para a�adir el producto a los productos del cliente. Esto si el cliente tiene marcado que el proveedor puede a�adirle productos que tengan un proveedor. Por otro lado los productos que haya a�adido el cliente por su cuenta cuando el proveedor no estaba enlazado, tb se registrar�n como mappings incompletos. Para que cuando el proveedor se enlace los enlace con sus productos.
De hecho no le vamos a dejar enviar mappings nuevos al proveedor mientras tenga productos ptes de enlazar.



App Vendedor
Tratamos de evitar al m�ximo el trasiego de info, enviando de una vez datos de clientes y cat�logo de productos. Habiendo s�lo trasiego para leer pedidos y para mapear productos o clientes.

Ambos m�dulos se deben programar preparados para que puedan correr en instancias separadas de Orchard. Reemplazando la comunicaci�n a trav�s del bus de eventos por colas de azure, que tareas en background iran consumiendo y ejecutando. Para ello tenemos que hacer que cada m�dulo almacene los datos que necesita sin depender de llamadas al otro m�dulo. Pudiendo para ello servirse de eventos del otro m�dulo para alimentar sus datos.
Por ahora la �nica excepci�n a esto est� siendo el acceso a datos de usuario, que ambas instancias comparten el almacenamiento de Orchard. Llegado el momento haremos lo necesario para q tb esto este separado, pero de momento por simplificar lo mantenemos junto.
Para hacer esto movemos todos los datos y eventos que expone un m�dulo para que el otro m�dulolo use a un m�dulo .Abstractions teniendo ConsumerWebAPI.Abstractions y ProviderWebAPI.Abstractions.
Me he quedado a medias de renombrar la clases que usan los eventos con el sufijo DTO y de a�adirles annotations de validaci�n, para que por sistema cada handler de eventos primero de todo valide los datos que le llegan como par�metros y para que cuando transforme dichos datos a un DTO propio del m�dulo tb valide contra los annotations de ese DTO antes de llamar al AppService que corresponda.
El motivo es homogenizar el c�digo para que ya sea a trav�s de un controller o a trav�s de un handler de eventos siempre se validen los annotations que se pasan a un appservice ya q no podemos fiarnos de lo que venga de fuera del m�dulo y no andemos con dudas de si habr� sido validado o no. As� adem�s m�s adelante manejaremos el tema del versionado tanto de datos de controller como de eventos (q cuando trabajemos con cola de eventos de azure har� falta al poder actualizar cada m�dulo por su cuenta).

Pedidos
Los pedidos enviados por la app de comercio son multiproveedor y se meten en el m�dulo de comercio incorpor�ndole la info que el m�dulo tiene de los proveedores y los productos del pedido. As� el pedido es autocontenido, aunque el producto o el proveedor sea eliminado se podr� abrir el pedido y saber que productos y proveedores  llevaba.
El m�dulo de Comercio lanzar� un evento (que ya existe pero a�n no llama) tras guardar y enviar el mail al comercio con el pedido.
El m�dulo de Proveedor escucha este evento y crea un pedido diferente por proveedor diferente en el pedido y env�a el correo a los proveedores.
En este punto me he quedado parado pq necesito informaci�n del Comercio y el Proveedor para el mail. Del comercio de momento no tengo informaci�n almacenada en el m�dulo del proveedor, s�lo los datos del mapping. Para solucionar esto tendr�a que almacenar info del comercio escuchando un evento del cliente q informe de altas, bajas y modificaciones.
Este almacenamiento deber�a tener tanto la info provista por el comercio como la que proveer� el proveedor a trav�s de la web API (puede que el cliente diga que su bar se llama de una manera y nos de un tel�fono, pero el proveedor tenga una forma de llamarlo distinta, por eso almacenamos ambos. Adem�s mientras un comercio no est� enlazado o este parcialmente enlazado s�lo sabremos la info q nos dio el comercio.
El problema es q necesitamos esta info almacenada por un lado en registros separados por comercio para por ejemplo localizarla r�pidamente al enviar un email de pedido pero tb agrupada por proveedor para el momento de la carga de la app de vendedor q le enviamos todos sus datos juntos. A priori yo mantendr�a dos tipos de documentos uno con el comercioy otro con todos los comercios del proveedor indicando al vendedor al que pertenecen, de manera que para devolver a la app de vendedor sus comercios cargar�a dicho documento y eliminar�a antes de enviarle nada aquellos que no sean para ese vendedor.

Productos del proveedor
El proveedor nos manda todos los dias mediante un put a la webapi todos sus productos y nosotros nos dedicamos a ver las diferencias para provocar los eventos que actualcen los mapeos y consumptions que corresponda.

Tema a tener en cuenta:
De momento para obtener los emails de usuarios de un comercio o de vendedores de un proveedor filtramos por aquellos con emails confirmados, sin embargo esto no es garant�a de nada. Podr�amos encontrarnos que un proveedor o un comercio ponen como suyos un email de un empleado de la competencia. Y ese usuario se da de alta pero no acepta ser empleado de esa empresa y pte de que su empresa lo a�ada como empleado siyo. Deber�n por tanto ser almacenados los emails de empleados que un comercio o proveedor que est�n ptes de ser a�adidos en un lugar diferente a donde anotamos a que proveedor o comercio pertenece un usuario. De manera que no contemplemos en ning�n otro sitio como usuarios del proveedor o comercio aquellos que a�n han confirmado su pertenencia a dicho proveedor o comercio.

Problemas a la vista:
Un c�digo �nico para todos los pedidos me parece soluci�n con patas cortas. 
Como veis tener un documento con todos los pedidos de un cliente en un mes.... esto adem�s mejorar�a la carga de la aplicaci�n pq de una s�ls lectura a bd cargaremos m�s datos. El paginado para pedir datos ser�a por mes (una p�gina de tama�o 5 ser�an los siguientes 5 meses con datos.