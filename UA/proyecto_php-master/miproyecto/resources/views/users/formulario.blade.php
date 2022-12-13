
<form action="{{action('UserController@postForm')}}" method="POST">
    @csrf

    <input type="text" name="nombre" id="nombre">
    
    <button type="submit">Enviar</button>

</form>