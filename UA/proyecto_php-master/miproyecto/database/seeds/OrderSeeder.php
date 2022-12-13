<?php

use App\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('orders')->delete();

        $order = new Order();
        $order->user = "Stalyn";
        $order->price = 10;
        $order->amount = 2;
        $order->save();

        $order = new Order();
        $order->user = "Stalyn";
        $order->price = 22.24;
        $order->amount = 1;
        $order->save();

        $order = new Order();
        $order->user = "Stalyn";
        $order->price = 12.24;
        $order->amount = 1;
        $order->save();

        $order = new Order();
        $order->user = "Coral";
        $order->price = 22;
        $order->amount = 3;
        $order->save();

        $order = new Order();
        $order->user = "Joselyn";
        $order->price = 5.99;
        $order->amount = 3;
        $order->save();

        $order = new Order();
        $order->user = "Joselyn";
        $order->price = 65.99;
        $order->amount = 5;
        $order->save();

    }
}
