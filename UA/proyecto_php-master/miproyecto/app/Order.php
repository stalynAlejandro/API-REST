<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    public function users(){    //Relationship One to Many with User
        return $this->belongsTo('App\User');
    }

    public function products(){ //Relationship Many to Many with Oder
        return $this->belongsToMany('App\Order', 'OrdersProducts');
    }
}

