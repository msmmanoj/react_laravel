<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::truncate();

        $products = [
            [
                "name" => "Oneplus nord",
                "cat_id" => 1,
                "price" => 25000
            ],
            [
                "name" => "Revlon Lipstick",
                "cat_id" => 2,
                "price" => 2100
            ],
            [
                "name" => "BlackBerry priv",
                "cat_id" => 1,
                "price" => 39000
            ],
            [
                "name" => "Lakme Lotion",
                "cat_id" => 2,
                "price" => 3000
            ],
            [
                "name" => "Samsung S21",
                "cat_id" => 3,
                "price" => 69000
            ],
        ];

        for ($i = 0; $i < 5; $i++) {
            Product::create([
                'name' => $products[$i]['name'],
                'cat_id' => $products[$i]['cat_id'],
                'price' => $products[$i]['price'],
            ]);
        }

    }
}
