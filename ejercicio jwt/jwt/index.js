var express = require('express')
var app = express()
var bp = require('body-parser');
const Knex = require('knex');
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())

var knex = require("knex")({
    client: 'sqlite3',
    connection: {
        filename: "./db.sqlite"
    }
});

var jwt = require('jwt-simple')
var secret = 'xxx'

app.post('/login', function (req, resp) {
    console.log(req.body)
    var datos = req.body
    //un SELECT, devuelve un array con las filas
    var res = knex("usuarios").where({ login: datos.login, password: datos.password })
    //si no hay datos, el array estará vacío
    console.log(res.length)
    if (res.length > 0) {
        //TODO: cambiar esto por código que genere y envíe un JWT 
        var token = jwt.code(password, secret)
        resp.send({ mensaje: "OK", token: token })
    }
    else {
        resp.send(401).end()
    }
})

//Middleware: lo pondremos ANTES de procesar la petición
function chequeaJWT(pet, resp, next) {
    var tokenOK = false

    var cabecera = pet.header('Authorization')
    console.log(cabecera)
    //Parte el string por el espacio. Si está, devolverá un array de 2
    //la 2ª pos será lo que hay detrás de "Bearer"
    var campos = cabecera.split(' ')
    if (campos.length > 1 && cabecera.startsWith('Bearer')) {
        var token = campos[1]
        //TODO: con jwt-simple decodificar el token. 
        //si tiene éxito poner tokenOK=true 

        tokenOK = true;
    }

    console.log(tokenOK)

    if (tokenOK) {
        //Al llamar a next, el middleware "deja pasar" a la petición
        //llamando al siguiente middleware
        next()
    } else {
        resp.status(403)
        resp.send({ mensaje: "no tienes permisos" })
    }
}


app.get('/protegido1', chequeaJWT, function (pet, resp) {
    resp.send({ dato: "recurso  protegido 1" })
})

app.get('/protegido1', chequeaJWT, function (pet, resp) {
    resp.send({ dato: "recurso protegido 2" })
})

var listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor en el puerto ${listener.address().port}`);
});