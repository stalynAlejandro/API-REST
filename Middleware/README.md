# Middleware

Middleware functions are functions that have acces to the *request object(req)* the *response object(res)* and the next middleware function in the applications request response cicle. These functions are used to modify *req* and *res* objects for tasks like parsing request bodies, adding response headers, etc..

## Third Party Middleware

Most commonly used middleware.

### body-parser

This is used to parse the body of requests which have payloads attached to them. 

```
var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())
```
### cookie-parser

It parses cookie header and populate *req.cookies* with an object keyed by cookie names. 

```
var cookieParser = require('cookie-parser');
app.use(cookieParser())
```