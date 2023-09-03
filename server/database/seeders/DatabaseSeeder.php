<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use App\Models\Admin;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\Wishlist;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Admin::create([
            'username' => 'super duper admin',
            'email' => 'super.duper@gmail.com',
            'password' => Hash::make('superadmin'),
            'role' => '0',
            'pict' => 'superadmin.png' 
        ]);
        Admin::create([
            'username' => 'admin 1',
            'email' => 'admin.satu@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => 'admin1.png'
        ]);
        Admin::factory(5)->create();

        
        User::create([
            'username' => 'bogeng',
            'email' => 'bogeng@gmail.com',
            'password' => Hash::make('bogeng'),
            'address' => 'pluto',
            'verified' => null,
            'pict' => null,
        ]);
        User::factory(10)->create();

        Product::create([
            'name' => 'topi merah',
            'category' => 'topi',
            'price' => 20000,
            'stock' => 9,
            'discount' => null,
            'pict' => null,
            'description' => null
        ]);
        Product::create([
            'name' => 'kerudung hijau',
            'category' => 'kerudung',
            'price' => 40000,
            'stock' => 5,
            'discount' => null,
            'pict' => null,
            'description' => fake()->sentence(16)
        ]);
        Product::create([
            'name' => 'topi biru',
            'category' => 'topi',
            'price' => 20000,
            'stock' => 7,
            'discount' => null,
            'pict' => null,
            'description' => fake()->sentence(9)
        ]);


        Transaction::create([
            'user_id' => '1',
            'admin_id' => '2',
            'products_id' => "['1'=>'3']",
            'total_price' => 60000,
            'checked_out' => now(),
            'sent' => null,
            'done' => null
        ]);
        Transaction::create([
            'user_id' => '2',
            'admin_id' => '1',
            'products_id' => "['2'=>'1']",
            'total_price' => 40000,
            'checked_out' => null,
            'sent' => null,
            'done' => null
        ]);

        Cart::create([
            'user_id' => 1,
            'product_id' => 1,
            'count' => 3
        ]);
        Cart::create([
            'user_id' => 1,
            'product_id' => 2,
            'count' => 1
        ]);

        Wishlist::create([
            'user_id' => 1,
            'product_id' => 2
        ]);
        Wishlist::factory(5)->create();
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
