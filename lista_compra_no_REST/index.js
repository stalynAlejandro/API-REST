var express = require("express")
var app = express()

var lista = new Map()


//listar todos los items
app.get("/listar", function(pet, resp){
    resp.status(200)
    var datos = Array.from(lista.values())
    resp.send(datos)
})

//obtener un item dado su id
//asumimos que el id está en un parámetro HTTP del mismo nombre
//es decir, habrá que hacer una petición a /obtener?id=XXX
app.get("/obtener", function(pet, resp){
    //los parámetros HTTP se obtienen como cadenas, convertirlo a entero
    var id = parseInt(pet.query.id)
    //si no es un número, error
    if (isNaN(id)) {
        resp.send({cod_error:13, mensaje:"El dato debe ser numérico"})
    }
    else {
        //obtenemos el item del Map
        var dato = lista.get(id)
        //si != undefined es que lo hemos encontrado, lo enviamos al cliente
        if (dato) {
            resp.send(dato)
        }
        else {
            resp.send({cod_error:14, mensaje:"El dato no existe"})
        }
    }
})

//poner en marcha el servidor
app.listen(3000, function(){
    lista.set(1, {id:1, nombre:"pan"})
    lista.set(2, {id:2, nombre:"patatas"})
    console.log("Servidor escuchando en el 3000...")
})