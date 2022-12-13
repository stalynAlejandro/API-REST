<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Product::create([
            'name' => 'MacBook Pro',
            'slug' => 'macbook pro',
            'details' => '15 inch, 1TB SSD, 32GB RAM',
            'price' => 2400,
            'description' => 'descripción detallada',
        ]);   

        Product::create([
            'name' => 'Laptop 2',
            'slug' => 'laptop-2',
            'details' => '15 inch, 1TB SSD, 32GB RAM',
            'price' => 2400,
            'description' => 'descripción detallada',
        ]);   

        Product::create([
            'name' => 'Laptop 3',
            'slug' => 'laptop 3',
            'details' => '15 inch, 1TB SSD, 32GB RAM',
            'price' => 15999,
            'description' => 'descripción detallada',
        ]);   
    }
}
