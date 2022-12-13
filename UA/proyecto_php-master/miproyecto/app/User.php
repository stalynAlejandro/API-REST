<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //
    public function orders(){
        return $this->hasMany('App\Order');
    }

    public function getNombre(){
        return "stalyn";
    }
}
