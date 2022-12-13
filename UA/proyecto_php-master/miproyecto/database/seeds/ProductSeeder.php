<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('products')->delete();

        $product = new Product();
        $product->name = "Plato_1";
        $product->description = "desc..1";
        $product->save();

        $product1 = new Product();
        $product1->name = "Plato_2";
        $product1->description = "des..2";
        $product1->save();

        $product2 = new Product();
        $product2->name = "Plato_3";
        $product2->description = "desc..3";
        $product2->save();

    }
}
