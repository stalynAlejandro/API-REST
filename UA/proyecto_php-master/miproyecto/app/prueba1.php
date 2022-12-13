<?php
namespace App;

use Illuminate\Support\Facades\Log;
use DateTime;
use DateInterval;


class prueba1  
{

    private $nombre = "David";

    function __constructor( $nombre = "stalyn"){


        Log::debug("Creating a new prueba1");
        $this->nombre = $nombre;

    }

    public function getNombre(){
        echo $this->nombre;
    }

    public function toString(){
        Log::debug("to string prueba1");
        echo "User: $this->nombre\n";
    }
}