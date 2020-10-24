# Diseño de APIs REST.

Condiciones:
- Cliente/Servidor
- Interfaz Uniforme
	- Identificación de los recursos
	- Representaciones estándar
	- Menasajes auto-descriptivos
	- Hypermedia as The Engine of The Application State
- Sin estado
- Cacheable
- Capas (proxys de modo transparente)
- Código "bajo de manda" (Opcional)

## REST bajo HTTP.

Las llamadas al API se implementan como peticiones HTTP, en las que:
- La URL representa el recurso. 
- Cada URL a la que podemos hacer llamadas es lo que se conoce como un **endpoint**. 
- El código de estado HTTP representa el resultado. 
- Como formato de intercambio de datos usaremos JSON.

## Autenticación con *tokens*

1. Cuando se hace *login* el servidor nos devuelve el token (valor idealmente único imposible de falsear).
2. Para cualquiera operación restringida debemos **enviar el token en la petición**.

### Json Web Token (JWT).

Es una cadena en formato JSON formada por 3 partes. 
- Cabecera: Indica el tipo de token y el algoritmo de firma. Se codifica en Base64. Ejemplo 

```
{
	"typ":"JWT",
	"alg":"HS256"
}

Indica que esto es JWT y se confirmará con HMAC SHA-256
```

- Payload: Lo que queremos almacenar en el token en formato JSON y codificado en Base64URL.

```
{
	"login":"adi"
}
```

- Firma: Se aplica un algoritmo de *hash* sobre la cabecera, el payload y una clave secreta que solo conoce el servidor y pasa a Base64URL.

### Comprobar si un JWT es auténtico.

- El servidor toma la cabecera y el payload (recordar que no están cifrados, solo en Base64) y la clave secreta, y vuelve a aplicar el *hash*. Si no coincide con la firma, el token no es válido. 

- En teoría no se puede generar un token si no se conoce la clave secreta y esta no se puede averiguar a partir de un token auténtico (el hash no es invertible).

- Recordar que, todo se transmite "en claro": Base64 es una codificaicón, no un cifrado. Por tanto normalmente habra que usar HTTPS si no se quiere que el payload sea legible. 

## Fecha de expiración.

- En el payload se suele incluir la fecha de expiración del token. En el estándar se especifica el uso de `exp` (con el núm. de segundos desde 1-1-1970). Si el token ya ha expirado el servidor debería devolver el status 401.

- De paso solucionamos el problema de que el mismo payload siempre genera el mismo JWT si no cambiamos el *secret*.


## Flujo de uso de JWT. 

- El cliente presenta las credenciales (normalemente **login + passwd**) al servidor y acambio obtiene un token JWT. En el estándar no se especifica en qué parte de la petición-respuesta colocar la información. Puede ser e.j en el cuerpo, en formato JSON. 

- En cada operación restringida hay que enviar el JWT. Se deberá hacer en la cebecera `Autorization`. Se pone la clave `Bearer` seguida del JWT. 
