# Introducción a Express

Express es un framework web para Node que se caracteriza por ser bastante lijero y minimalista. No es tan sofisticado. No obstante con las funcionalidades que ofrece nos va a bastar para implementar APIsRest. 

- Routing: Una forma simple de asociar un método HTTP y una URL con el código a ejecutar. 

- Métodos más flexibles que el `write` de Node para generar los contenidos de la respuesta. 

Además Express integra un gran número de motores de plantilla, para aplicaciones web "clasicas" que devuelven HTML/CSS al cliente, en lugar de datos JSON. 


```
//Cargamos el módulo express
var expres = require('express')
var app = express()

//En express asociamos un método HTTP y una URL con un callback a ejecutar. 
app.get('*', function(){
    //Tenemos una serie de primitivas para devolver la respuesta HTTP. 
    resp.status(200); 
    resp.send('Hola soy Express');
})

//Este método delega en el server. listen "nativo" de Node.
app.listen(3000, function(){
    console.log("El servidor express está en el puerto 3000")
})
```

Guardar el código anterior en un archivo `hola_express.js` y crear un `package.json` en el mismo directorio con el siguiente contenido: 
```
{
    "name": "hola_express",
    "version": "1.0.0"
}
```

Ahora podemos instalar `express` en el proyecto y actualizar además automáticamente el `package.json` con 
```
npm i express 
```

Para ejecutar 
```
node hola_express.js
```

## Recarga el servidor automáticamente con `nodemon`

```
npm i -g nodemon
```

Y ahora hay que usar `nodemon` en lugar de `node` si queremos recarga automática de código. 

```
nodemon hola_express.js
```

## API REST Básicos con Express

### Routing 

El routing es el mapeo entre URL y funciones javascript a ejecutar. Vamos a ver las distintas formas en las que podemos hacer este mapeo. 

### Routing simple

La forma más simple de routing consiste en usar la llamada del API `app.Method(paht, [callback...], callback)`, donde `app` es una instancia de `express`, `METHOD` es el método HTTP(get, post, ...) `path` es la URL a mapear y `callback` es la función a ejecutar (como ya veremos, podrían especificarse varias).

```
var express = require('expres')
var app = express()

app.get('/', function(req, res){
    console.log('hola express');
})
```

En APIs REST es habitual tener partes fijas y variables en una URL. Por ejemplo algo com `/usuarios/pepe89`. En Express podemos denotar estas partes variables precediéndolas del carácter `:` . En el manejador de la URL su valor será accesible a través del objeto `params` de la petición (que también nos permite acceder a los parámetros HTTP). 

Por ejemplo

```
app.get('/usuario/:login', function(req, res){
    console.log('Se ha solicitado el usuario ' + req.params.login);
})
```

Los paths a mapear pueden ser literales o bien expresiones regulares. 

En aplicaciones REST es habitual realizar varias operaciones sobre el mismo recurso, con la misma URL y variando únicamente el método HTTP. En Express podemos encadenar todos los manejadores para la misma ruta. 

```
app.route('/libro')
    .get(function(req, res){
        console.log('Obtener un libro');
    })
    .post(function(req, res){
        console.log('Añadir un libro');
    })
    .put(function(req, res){
        console.log('Actualizar un libro');
    });
```


### Routing Modular

Conforme va creciendo el número de recursos y rutas en una aplicación REST se va haciendo más necesaria la posibilidad de dividir la aplicación en varios módulos. La clase `express.Router` puede usarse para crear manejadores de forma modular. Cada `router` es como una "mini-aplicación" independiente, que se puede "montar" en una determinada trayectoria. 

Por ejemplo, podemos definir un `router` como un módulo CommonJS de este modo:

```
//Archivo "usuarios.js"
//Mini-aplicación REST para gestionar usuarios

var express = require('express')
var router = express.Router()

router.get('/:login', function(req, res){
    console.log('Obtener el usuario con login ' + req.params.login);
});

router.post('/', function(req, res){
    console.log('Crear un usuario');
})

module.exports = router;
```

En la aplicación principal es donde montaríamos y usaríamos el router

```
var express = require('express')
var app = express()

//Cargamos el módulo CommonJS
var usuariosApp = require('./usuarios');

//Montamos la mini-aplicación en la trayectoria "/usuarios"
app.use('/usuarios', usuariosApp)
```

## Middleware

Un middleware es una función que asociamos a una o varias rutas y que se ejecutará en un determinado momento del ciclo petición-respuesta. Para una misma ruta podemos ejecutar varios middleware. 

Podemos escribir nosotros mismos el middleware, aunque para funcionalidades típicas existen muchas librerías de terceros, por ejemplo para leer las cookies o para parsear el cuerpo de la petición en formato JSON. 

En código, un middleware es una función que tiene tres parámetros: la petición, la respuesta y una función que sirve para ejecutar el siguiente middleware en la "cadena". Para vincular un middleware con la aplicación empleamos el método `use`.

```
//Middleware que hace un log del momento en que se ha hecho cada petición
app.use(function(req, res, next){
    console.log('Petición en : ', Date.now());

    //Llamamos a next para que se siga ejecutando el resto de middlewares
    //Si no hiciéramos esto, la respuesta se quedaría pendiente
})
```

En el ejemplo anterior hemos vinculado el middleware a la aplicación Express, pero también podríamos vincularlo a un router, o solo a la gestión de errores.

También podemos vincular un middleware únicamente a un método HTTP, pasándolo como segundo parámetro de `app.METODO`: 

```
app.get('/usuario/:id', function(req, res, next){
    console.log('GET sobre el usuario ' + req.params.id);
    next();
})
```
Es importante acordarse de llamar a `next()` si queremos que continúe ejecutandose la "cadena" de middlewares. En el ejemplo anterior, si en el primer middleware no hubiéramos llamado a `next()` el segundo no se llegaría a ejecutar nunca. 

En realidad en Express los manejadores de ruta también son middlewares. Hasta el momento, en todos los ejemplos hemos puesto manejadores con solo dos parámetros, por que en cada ruta solo ejecutábamos una operación, pero podríamos usar también `next` para modularizar los manejadores.

Si definimos varios middleware para la misma ruta, el orden de ejecución será el mismo que el de definición en el código. 

## Procesamiento de la petición. 

En aplicaciones REST vamos a necesitar la siguiente información de la petición:

- Partes variables de la URL
- Parámetros HTTP
- Cuerpo de la petición (para POST/PUT)

Los dos primeros ya hemos visto que son accesibles a través de la propiedad `params` del objeto petición. Para acceder al cuerpo de la petición podemos usar la propiedad `body`. Esta propiedad nos da el contenido en crudo como una cadena de caracteres. 

En REST es habitual que el cuerpo de una petición POST-PUT sea un objeto en formato JSON. El middleware denomindado `body-parser` transforma automáticamente el `body` en un objeto JS a partir del JSON. 

Este middleware no viene incluido automáticamente con Express. Hay que instalarlo 

```
npm i body-parser
```

Ahora podemos usarlo del siguinte modo
```
...
var bodyParser = require(body-parser);
//En este caso hemos vinculado el middleware con la applicación global
//También lo podríamos vincular a un router o a una URL

app.use(bodyParser.json());

app.post('/usuarios', function(req, res){
    //Por obra y gracia del body-parser, obtendremos automáticamente 
    //Un objeto JS a partir del JSON del cuerpo de la petición
    var nuevoUsuario = req.body;
    ...
})
```

El middleware `body-parser` puede parsear otros formatos además de JSON. Podríamos haber vinculado por ejemplo `bodyParser.urlencoded()`.

