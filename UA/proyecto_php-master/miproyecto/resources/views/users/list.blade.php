<p>Lista de Usuarios: </p>

<?php 
    foreach( $users as $user ){
        
        echo "<a href=" . action('UserController@showProfile', $user->id) . "> $user->name </a><br>";

    }
?>

<!--

<a href="action('UserController@showProfile', 1)"> Usuario 1 </a>

<a href="action('UserController@showProfile', 2)"> Usuario 2 </a>

<a href="action('UserController@showProfile', 3)"> Usuario 3 </a>

--> 

