# Intro NodeJs

Node es una plataforma de desarrollo para implementar aplicaciones web en el lado del servidor escritas en Js. En principio surgió como plataforma especialmente apropiada para aplicaciones asíncronas y en tiempo real.

```
//Cargamos el módulo http que implementa las funcionalidades de servidor web
var http = require('http');

//En Node creamos el propio sevidor HTTP
var server = http.createServer();

//Node está orientado a eventos. 
//El evento 'request' se dispara al recirbir una petición HTTP
//El segundo parámetro es el callback a ejecutar en respuesta al evento
server.on('request', function(){
	res.write('Hola soy Node.js');
	res.end();
})

//Nos ponemos a escuchar por el puerto 3000
server.listen(3000, function(){
	console.log('Servidor node.js en http://localhost:3000/');
})
```

Para escribir una aplicación web un poco más compleja necesitaríamos asociar diferentes rutas con diferentes funciones JS. Sin embargo el módulo `http` de Node no ofrece ninguna facilidad para implementar esto. Dentro del `server.on` tendríamos que ir chequeando la ruta dentro de bloques `if-else` para ejecutar el código apropiado. Como luego veremos, hay frameworks que facilitan mucho esta tarea. `ExpressJS`.

## Gestión de Paquetes

`Node` incluye un sistema de paquetes con gestión automática de dependencias al estilo de los usados en las distribuciones de linux. (como los .deb o .rpm)

En Node es habitual que las dependencias se instalen de modo local, en propio directorio del proyecto. De este modo evitamos problemas de versionado de dependencias, ya que cada proyecto usa directamente la versión que necesia. 

```
$npm install colors
```

El comando anterior crea un subdirectorio `node_modules` en el directorio actual, conteniendo el código del paquete `colors`. 

A partir de este momento ya podemos hacer uso del paquete con su correspondiente `require`. En el caso `colors`, por ejemplo:

```
var c = require('colors');

console.log(c.green('Saludos de Marte'))
```

Evidentemente cada paquete tiene su API así que habrá que consular la documentación para saber cómo usarlo.

Habitualmente cada paquete exporta un objeto a través del cual accedemos a su API. Ese objeto es devuelto por `require`. 

Como hemos visto, las dependencias del proyecto se suelen instalar en modo local (en el mismo directorio del proyecto). Los paquetes que incluyen herramientas en línea de comandos se suelen instalar en modo global (o sea, en un directorio global compartido por todos los proyectos).

## Metadatos del proyecto: el archivo `package.json`

 Cada proyecto debería tener en su directorio raíz un archivo llamado `package.json`. Gracias a este archivo podemos automatizar ciertas tareas como por ejemplo la ejecución del proyecto o la instalación en un solo paso de todas las dependencias. 

Cuando queramos instalar paquetes que se usen solo en el desarrollo (por ejemplo para testing) podemos instalarlos con `npm i <paqueta> --save-dev`. De este modo la referencia se añade al apartado `devDependencias` del `package.json`. Con un proyecto que nos hayamos bajado de otro sitio, si instalamos las dependencias con `npm i --production` no se instalarán las `devDependencias`, solo las de "producción".

## Uso y definición de módulos

En Node se establece una correspondencia uno a uno entre módulo y archivo. Cuando ponemos un nombre en el `require` se busca en un conjunto de directorios predefinidos un archivo con el mismo nombre literalmente o con la adición de la extensión `.js`. 

La búsquedad se hace de la siguiente manera:
- Se comprueba si es un módulo nativo de Node. 
- En caso contrario, se comprueba si se ha dado una trayectoria. require('/home/mi_modulos...')
- En caso contrario, se busca en la carpeta `node_modules`
- Si no se encuentra, se sube de nivel un directorio y se busca en la carpeta `node_modules`, hasta llegar a la raíz del sistema de archivos. 


## Definir módulos propios

La variable global `exports` representa el objeto exportado por el módulo. Le asignaremos propiedades que serán visibles en nuestro código. 

```
//Archivo "saludador.js"
var saludos = ['Hola', 'que tal']

exports.saludar = function(){
	var valor = Math.floor(Math.random() * saludos.length);
	return saludos[valor]
}

```

Ahora desde otro archivo podemos usar el módulo que hemos definido.

```
//Cuando ponemos un nombre, se añade automáticamente el .js
var sal = require('./saludador')
console.log(sal.saludar())
```
