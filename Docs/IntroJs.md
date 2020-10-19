# Intro JavaScript

JavaScript nació en el lado del cliente, dentro del navegador, pero en los últimos años se ha trasladado también al lado del servidor. Aquí vamos a ver el "núcleo básico" del lenguaje, la parte común e independiente de en qué lado estemos. 

## Carácteristicas básicas del lenguaje

Es un lenguaje de próposito general. Originalmente se usaba para pequeñas tareas que requerían pocas líneas de código y que eran fáciles de copiar/pegar, pero en la actualidad se usa para escribir aplicaciones grandes. 

Es interpretado, no compilado. Los navegadores incluyen un itérprete JS. Al ser interpretado, los fuentes son directamente accesibles, aunque pueden ser poco legibles si están ofuscados o minificados. 

Hay que distinguir entre el núcleo del lenguaje y las librerías. Las librerias del navegador nos permiten modificar dinámicamente el HTML/CSS, comunicarnos con el servidor, dibujar en la pantalla... 

El núcleo del lenguaje está estandarizado en lo que se denomina ECMAScript. Las últimas versiones de la mayoría de navegadores implementan ES2015. 

Aunque JS nación en el navegador, desde hace unos años se usa también para escribir aplicaciones en el servidor (e incluso en el escritorio).  En el servidor, el entorno de ejecución es Node. 

## Variables y constantes

- No tienen tipo predefinido, el tipo puede cambiar dinámicamente. 

- No existen palabras claves en el lenguaje para definir tipos. Las variables se declaran simplemente con `var`

```
var a 
a = 1
a = "Hola"	//Cambiamos el tipo.
b = "OK"	//Podemos usar variables no declaradas.
```
Internamente se diferencian entre tipos primitivos (numéricos, booleanos, cadenas) y objetos (por ejemplo Date, RegExp, entre las "clases" predefinidas en JS, o los objetos que podemos definir nosotros)

```
typeof 3	//number
typeof 3.5 	//number
typeof "hola"	//string
typeof new Date()	//object
```

- El valor de una variable declarada pero no inicializada es una valor especial llamado `undefined`

```
var no_definada;
console.log(no_definida)	//undefined, declarada pero no inicializada
```

- *Modo Estricto*: considera errores ciertos comportamientos "toleradas" en JS, por ejemplo asignar un valor a una variable no declarada. 

```
'use strict'	//Activer modo estricto en todo el ámbito del script
b = 1 		// ERROR

```

A diferencia de C y derivados, el ámbito de las variables definidas con `var` no es el bloque {..} en que se definen, sino la función entera, o el ámbito global si están fuera de una función. 

Es como si el intérprete de JS moviera las declaraciones de variables al principio del código. Esto se conoce como hoisting. 

- En ES2015 se introdujo `let` como alternativa a `var` para declarar variables. `let` define una variable con ámbito de bloque {..} al estilo C. 

```
if(false){
  
  var pruebas = "hola"
  let resultado = "ok"

}else{

  console.log(pruebas)		// valor undefined
  console.log(resultado)	// ERROR en tiempo de ejcución, no esta definida en el bloque {..}
}
```

- Para definir constantes se utiliza `const`

## Operadores

- En su mayor parte son equivalentes a los de C. No se pueden redefinir. 

- En JS el operador de comparación "==" intenta conversión de tipos. Si queremos comprobar la igualdad estricta, usaremos `===`

```
1 == "1"	//true, por que "1" se convierte a 1
false == 0	//true, por que "0" se convierte a 0, y 0 es false
1 === true 	//false, son tipos distintos
```

Se recomienda usar `===` para comprobar si un valor es `undefined`. 


## Estructuras de control y manejo de errores. 

- Básicamente las mismas de siempre `for`, `while`...

- Los erros se gestionan con *excepciones* al estilo Java, `try-catch-finally`

```
//Ejemplos de uso de throw
//Podemos lanzar valores cadena, númericos, ...

throw "La cosa va mal";

throw 33;

//Podemos lanzar una instancia de cualquier objeto
var miExcepcion = {codigo:1, mensaje:"Error"}
throw miExcepcion

//Podemos usar el constructor estándar
throw new Error("La cosa va mal")

```

## Funciones 

- Se definen con la palabra clave `function`. La mayor diferencia es que los parámetros no tienen tipo declarado y tampoco se especifica el tipo de retorno.  Para devolver un valor se usa `return` en el cuerpo de la función.

```
function saludo(nombre){
	return 'Hola ' + nombre;
}

console.log(saludo('Pepe'))
console.log(saludo(42))
```

- Las funciones son de primera clase, pueden pasarse como parámetros, ser asignadas a variables y pueden ser devueltas por otra función. 

```
function suma(arg1, arg2){
	var res = arg1 + arg2;
	return res;
}

function operar(arg1, arg2, op){
	return op(arg1, arg2)
}

console.log(operar(2,2,suma))

```

- Funciones anónimas: no se les da un nombre, se definen para se asignadas a una variable

```
//Asociamos una función a un evento sobre un botón
//El botón estaría definido en Html
// <input type="button" id="boton" />

document.getElementBy('boton').onclick = function(){console.log("Hola")}
```

Uno de los usos más típicos de las funciones anónimas en JS es en la definición de callbacks. En el ejemplo anterior definimos un tipo especial de callback: Un manejador de evento, que el navegador ejecutará cuando se produzca un determinado evento sobre un objeto. 


- Funciones de flecha. Se definen por los carácteres `=>` en lugar de la palabra `function`. 

```
let suma = (val1, val2) => val1 + val2

let suma = (val1, val2) => {
	...
	return res
}


//La función equivalente 
let suma = function(val1, val2){
	return val1 + val2
}
```

Nótese que las funciones de flecha siempre son anónimas, por eso en el ejemplo hemos asignado la función a una variable. 

## Paso por valor vs. referencia

Como ocurre en Java, los tipos primitivos se pasan por valor y los objetos por referencia. Esto se aplica al paso de parámetros en funciones y a la asignación. 

```
var a, b
a = [5]		// Inicializamos un array 
a[0] = 1 	
b = a		// b referencia al array a, no es una copia
a[0] = 100 
console.log(b[0])	//100
```

## Programación orientada a objetos.

- Tanto los objetos como sus propiedades se pueden crear y modificar dinámicamente.

```
var persona;
persona = new Object();	//Objeto vacío, sin propiedades. También valdría hacer persona = {}
persona.nombre = "Homer Sipson"
persona.edad = 34
persona.casado = true
delete persona.edad	//A partir de ahora, persona.edad = undefined

//Las propiedades pueden ser funciones. Estaríamos definiendo un método.
persona.saludo() = function(){console.log("Hola, soy " + this.nombre}
persona.saludo()	//LLamamos al método
```

Cuando se elimina una propiedad de un objeto con `delete`, esta pasa a ser `undefined`. Esto ocurre en realidad con cualquier propiedad que no tenga un objeto, sea porque la hemos eliminado, sea por que nunca ha existido. Por ejemplo, `persona.altura` también será `undefined`.

- Para iterar por todas las propiedades de un objeto usamos `for...in`

```
for(propiedad in objeto)(
	console.log(objeto[propiedad])
)
```

- Podemos inicializar un objet usando *notación literal*: se ponen los campos del objeto como pares `propiedad:valor`, separados por comas. Todo ello delimitando por un par de llaves.

```
var persona = {
	nombre: "Homer Simpson",
	edad: 34,
	casado: true,
	saludo: function(){
		console.log("Hola, soy " + this.nombre)
	}

	//Se puede especificar arrays usando corchetes
	hijos: ["Bart", "Lisa", "Maggie"]

	//Un objeto puede contener a su vez otros objetos
	profesion:{
		puesto: "técnico nuclear",
		lugar: "central de Springfield"
	},

	//Si el nombre de una prop. contiene espacios o carácteres especiales, se pone entre comillas
	"nombre esposa":"Marge"
}
```
- El formato *JSON* muy usado en la actualidad tanto dentro como fuera de JS es lo mismo que el formato literal, pero no se admiten caracteres especiales en los nombres de las propiedades. 

En JSON existe una forma estándar de representar cadenas, entre booleanos, arrays y objetos genéricos, pero no fechas u otros objetos de la librería estándar como expresiones regulares. Tampoco se define cómo representar un valor `undefined`. 

## Prototipos 

- JS es el único lenguaje mainstream orientado a objetos que originalmente no incluía la idea de clase ni de herencia basada en clases, sino basada en *prototipos*.

- Cuando creamos un objeto podemos especificar cuál queremos que sea su *prototipo*. Si el objeto no tiene una propiedad, se buscará en el prototipo.

- Si la propiedad sigue sin encontrarse en el prototipo, se irá al prototipo del prototipo, y así sucesivamente hasta llegar a `Object.prototype`.

- Podemos ver esto como una forma de herencia en la que un objeto concreto hereda de otro, en lugar de una clase de otra. 


```
var original = {
	nombre: "original",
	saludar: function(){
		return "hola, qué tal"
	}
}

//El prototipo de "descendiente" es "original"
var descendiente = Object.create(original)

console.log(descendiente.nombre):	//"original"
console.log(descendiente.hasOwnProperty("nombre"))	//nos dice que la propiedad no está directamente en descendiente. 

original.nombre = "original_2"
console.log(descendiente.nombre)	//"original_2" el valor se comparte.

```

## Clases

- La herencia orientada a prototipos es ajena a la experiencia del 99% de los desarrolladores, acostumbrados a la herencia basada en clases de lenguajes como Java o C++. Tanto es así que en JS han surgido multitud de patrones de código e incluso librerías para poder definir y usar clases.

- Sin acudir a librerías externas, la forma más habitual de definir una clase en versiones anteriores a ES2015, consiste en definir una función con el nombre de la clase, usarla como constructor y asignarle propiedades al prototipo de esta función. 

- Finalmente en ES2015 se añadieron clases al lenguaje.

```
class Persona{
	constructor(nombre){
		this.nombre = nombre
	}

	saludar(){
		console.log("Hola soy " + this.nombre)
	}

	get miNombre(){
		return this.nombre
	}

	set miNombre(nuevoNombre){
		this.nombre = nuevoNombre
	}
}


let p = new Persona("Pepe")
p.saludar
p.miNombre = "DJ PePe"	// En realidad estamos llamando al setter
console.log(p.miNombre)	// En realidad estamos llamando al setter
```

- A diferencia de lenguajes como C, no hay modificadores de acceso `public`, `private`...

```
class StarWars extends Persona{
	constructro(nombre){
		super("Darth " + nombre)
	}

	saludar(){
		super.saludar()
		console.log("Yo soy tu padre")
	}
}
```

Como vemos con `super` podemos invocar el constructor o los métodos de la clase base. 

Si no definimos constructor en la clase heredada, el intérprete JS define automáticamente uno que llama al de la clase base. 

## Arrays

- Son colecciones dinámicas de objetos accesibles por posición, más que arrays al estilo C. 
 - Cada posición de un array puede ser de un tipo distinto
 - Al crear un array no es necesario especificar el tamaño. Se pueden añadir/eliminar elementos y el tamaño cambiará dinámicamente. 


[Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array)
























































































