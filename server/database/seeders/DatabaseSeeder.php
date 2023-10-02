<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use App\Models\Admin;
use App\Models\Cart;
use App\Models\Dialog;
use App\Models\Message;
use App\Models\Product;
use App\Models\Review;
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
            'username' => 'Superidol Admin 的笑容 都没你的甜 八月正午的阳光 都没你耀眼 热爱105°C的你 滴滴清纯的蒸馏水',
            'email' => 'super.duper@gmail.com',
            'password' => Hash::make('superadmin'),
            'role' => '0',
            'pict' => '78949689_p1.jpg'
        ]);
        Admin::create([
            'username' => 'Admin 1',
            'email' => 'admin.satu@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => '84719630_p1.jpg'
        ]);
        Admin::create([
            'username' => 'Admin 2',
            'email' => 'admin.dua@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => '77845097_p7.jpg'
        ]);
        Admin::create([
            'username' => 'Admin 3',
            'email' => 'admin.tiga@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => '77845097_p3.jpg'
        ]);
        Admin::create([
            'username' => 'Admin X',
            'email' => 'admin.X@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => '77845097_p0.jpg'
        ]);
        Admin::factory(100)->create();


        User::create([
            'username' => 'bogeng',
            'email' => 'bogeng@gmail.com',
            'password' => Hash::make('bogeng'),
            'address' => 'pluto',
            'verified' => null,
            'pict' => '78949689_p4.jpg',
        ]);
        User::factory(100)->create();

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
        Product::factory(100)->create();


        Transaction::create([
            'user_id' => '1',
            'admin_id' => '2',
            'products_id' => "{'product_id': '1', 'quantity':'3'}",
            'total_price' => 60000,
            'checked_out' => now(),
            'sent' => null,
            'done' => null
        ]);
        Transaction::create([
            'user_id' => '2',
            'admin_id' => '1',
            'products_id' => "{'product_id': '2', 'quantity':'15'}",
            'total_price' => 40000,
            'checked_out' => null,
            'sent' => null,
            'done' => null
        ]);
        Transaction::create([
            'user_id' => '1',
            'admin_id' => '2',
            'products_id' => "{'product_id': '6', 'quantity':'32'}",
            'total_price' => 60000,
            'checked_out' => now(),
            'sent' => null,
            'done' => null
        ]);
        Transaction::create([
            'user_id' => '2',
            'admin_id' => '1',
            'products_id' => "{'product_id': '7', 'quantity':'135'}",
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

        // message & dialog
        Dialog::create([
            'dialog_number' => '1' . time(),
            'product_id' => '1'
        ]);
        Dialog::create([
            'dialog_number' => '2' . time(),
            'product_id' => '2'
        ]);
        Dialog::create([
            'dialog_number' => '0' . time(),
            'product_id' => null
        ]);

        Message::create([
            'user_id' => null,
            'admin_id' => '1',
            'dialog_id' => '3',
            'message' => 'Bayar hutang woi'
        ]);
        Message::create([
            'user_id' => '1',
            'admin_id' => null,
            'dialog_id' => '3',
            'message' => 'gamao'
        ]);
        Message::create([
            'user_id' => '1',
            'admin_id' => null,
            'dialog_id' => '1',
            'message' => 'spek?'
        ]);
        Message::create([
            'user_id' => null,
            'admin_id' => '2',
            'dialog_id' => '1',
            'message' => 'spek matalu'
        ]);
        Message::create([
            'user_id' => '3',
            'admin_id' => null,
            'dialog_id' => '1',
            'message' => 'njer'
        ]);
        Message::create([
            'user_id' => '2',
            'admin_id' => null,
            'dialog_id' => '2',
            'message' => 'stok?'
        ]);

        Review::factory(7)->create();
    }
}
