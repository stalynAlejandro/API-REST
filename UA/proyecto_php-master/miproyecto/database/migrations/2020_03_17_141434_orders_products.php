<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OrdersProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Schema::create('orders', function (Blueprint $table) {
        Schema::create('ordersproducts', function (Blueprint $table){
            $table->integer('id_order')->foreingkey()->references('orders');
            $table->integer('id_product')->foreingkey()->references('products');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
