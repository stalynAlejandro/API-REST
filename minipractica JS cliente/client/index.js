import Cliente from './servicios/ClienteAPI.js'


document.addEventListener('DOMContentLoaded',async function(){
    var cli = new Cliente('http://localhost:3000')
    var datos = await cli.getItems()
    var lista = document.getElementById('lista')
    for(var i = 0; i < datos.length; i++){
        lista.innerHTML += '<li>' + datos[i].nombre + '</li>'
    }
})