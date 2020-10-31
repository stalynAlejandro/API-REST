import Cliente from './servicios/ClienteAPI.js'
import Handlebars from 'handlebars'

var plantilla_lista = `
{{#each .}}
<li id="{{id}}" {{#comprado}}class="tachado"{{/comprado}}>
    {{nombre}}
    <button id="{{id}}"> x </button>
</li>
{{/each}}
`

document.addEventListener('DOMContentLoaded', async function () {
    try {
        var cli = new Cliente('http://localhost:3000/items')
        var datos = await cli.getItems()
        var lista = document.getElementById('lista')
        var plantilla_lista_compilada = Handlebars.compile(plantilla_lista)
        lista.innerHTML = plantilla_lista_compilada(datos)
    } catch (error) {
        console.log(error)
    }
})

document.getElementById('lista').addEventListener('click', async function (e) {
    var id = e.target.id
    var cli = new Cliente('http://localhost:3000/items')
    if (e.target.nodeName == 'LI') {
        if (e.target.classList.contains('tachado')) {
            var res = await cli.toggleItem(id, false)
            if (res) {
                e.target.classList.remove("tachado")
            }
        } else {
            e.target.classList.add("tachado")
            await cli.toggleItem(id, true)
        }
    }
    if(e.target.nodeName == "BUTTON"){
        console.log('BOTTON' + parseInt(id))
        var res = await cli.deleteItem(id)
        //Reload the page if succeded.
        if(res) document.location.reload(true)
    }
})

document.getElementById('submitButton').addEventListener('click', async function(e){

    var newItem = document.getElementById('newItem').value
    var cli = new Cliente('http://localhost:3000/items')
    var resp = cli.addItem(newItem)
    if(resp) document.location.reload(true)
})
