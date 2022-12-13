<p> Usuario: {{$user->name ?? 'default'}} </p>

<?php 


    foreach( $orders as $order ){
        
        echo "<p> Order: " . $order->id . " Price: ". $order->price ."</p><br>";

    }



?>