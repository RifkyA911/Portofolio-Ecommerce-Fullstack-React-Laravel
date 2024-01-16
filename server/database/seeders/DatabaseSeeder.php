<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Cart;
use App\Models\User;
use App\Models\Admin;
use App\Models\Order;
use App\Models\Dialog;
use App\Models\Review;
use App\Models\Message;
use App\Models\Product;
use App\Models\Category;
use App\Models\Notification;
use App\Models\Shipment;
use App\Models\Wishlist;
use App\Models\Order_item;
use App\Models\Payment;
use App\Models\Shipment_log;
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
            'username' => 'Silver Wolf W11X',
            'email' => 'super.duper@gmail.com',
            'password' => Hash::make('superadmin'),
            'role' => '0',
            'pict' => 'default.jpg'
        ]);
        Admin::create([
            'username' => 'Admin 1',
            'email' => 'admin.satu@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => 'default.jpg'
        ]);
        Admin::create([
            'username' => 'Admin 2',
            'email' => 'admin.dua@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => 'default.jpg'
        ]);
        Admin::create([
            'username' => 'Admin 3',
            'email' => 'admin.tiga@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => 'default.jpg'
        ]);
        Admin::create([
            'username' => 'Admin X',
            'email' => 'admin.X@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            'pict' => 'default.jpg'
        ]);
        Admin::factory(25)->create();


        User::create([
            'username' => 'bogeng',
            'email' => 'bogeng@gmail.com',
            'password' => Hash::make('bogeng'),
            'address' => 'pluto',
            'verified' => null,
            'pict' => 'default.jpg',
        ]);
        User::factory(25)->create();

        Category::create(['name' => 'headware', 'type' => 'accessories']);
        Category::create(['name' => 'hat', 'type' => 'accessories']);
        Category::create(['name' => 'jumpsuits', 'type' => 'man suit']);
        Category::create(['name' => 'coat', 'type' => 'man suit']);
        Category::create(['name' => 'bulf', 'type' => 'woman suit']);
        Category::create(['name' => 'skirt', 'type' => 'woman suit']);
        Category::create(['name' => 'kerudung', 'type' => 'woman suit']);
        Category::create(['name' => 'boots', 'type' => 'shoes']);
        Category::create(['name' => 'sandals', 'type' => 'shoes']);
        Category::create(['name' => 'sneaker', 'type' => 'shoes']);
        // Category::factory(10)->create();

        Product::create([
            'barcode' => fake()->unique()->numerify('#############'),
            'name' => 'topi merah',
            'category_id' => 1,
            'price' => 20000,
            'stock' => 9,
            'discount' => null,
            'pict' => 'red_hat.jpg',
            'description' => fake()->sentence(20)
        ]);
        Product::create([
            'barcode' => fake()->unique()->numerify('#############'),
            'name' => 'kerudung hijau',
            'category_id' => 1,
            'price' => 40000,
            'stock' => 5,
            'discount' => null,
            'pict' => 'kerudung_hijau.jpg',
            'description' => fake()->sentence(16)
        ]);
        Product::create([
            'barcode' => fake()->unique()->numerify('#############'),
            'name' => 'topi biru',
            'category_id' => 1,
            'price' => 20000,
            'stock' => 7,
            'discount' => null,
            'pict' => 'topi_biru.jpg',
            'description' => fake()->sentence(9)
        ]);
        Product::factory(10)->create();


        Order::create([
            'user_id' => '1',
            'admin_id' => '2',
            'shipment_id' => 1,
            'payment_id' => 1,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/1/1',
            'total_price' => 80000,
            'status' => 'Pending',
        ]);
        Order::create([
            'user_id' => '2',
            'admin_id' => '1',
            'shipment_id' => 2,
            'payment_id' => null,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/2/2',
            'total_price' => 620000,
            'status' => 'Awaiting Payment',
        ]);
        Order::create([
            'user_id' => '1',
            'admin_id' => '3',
            'shipment_id' => null,
            'payment_id' => 3,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/1/3',
            'total_price' => 20000 + (Product::where('id', 6)->value('price') * 5) + (Product::where('id', 1)->value('price') * 3) + (Product::where('id', 2)->value('price') * 4),
            'status' => 'Awaiting Payment',
        ]);
        Order::create([
            'user_id' => '2',
            'admin_id' => 2,
            'shipment_id' => 9,
            'payment_id' => 2,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/2/4',
            'total_price' => 20000 + (Product::where('id', 7)->value('price') * 135),
            'status' => 'Processing',
        ]);
        Order::create([
            'user_id' => '3',
            'admin_id' => 3,
            'shipment_id' => 3,
            'payment_id' => 4,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/3/5',
            'total_price' => 20000 + (Product::where('id', 3)->value('price') * 6),
            'status' => 'Processing',
        ]);
        Order::create([
            'user_id' => '5',
            'admin_id' => 7,
            'shipment_id' => 5,
            'payment_id' => 5,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/5/6',
            'total_price' => 30000 + (Product::where('id', 4)->value('price') * 2) + Product::where('id', 1)->value('price'),
            'status' => 'Shipped',
        ]);
        Order::create([
            'user_id' => '3',
            'admin_id' => 2,
            'shipment_id' => 6,
            'payment_id' => 8,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/3/7',
            'total_price' => 20000 + (Product::where('id', 3)->value('price') * 25) + (Product::where('id', 5)->value('price') * 20) + (Product::where('id', 8)->value('price') * 30),
            'status' => 'Delivered',
        ]);
        Order::create([
            'user_id' => '1',
            'admin_id' => 3,
            'shipment_id' => 7,
            'payment_id' => 7,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/1/8',
            'total_price' => 30000 + (Product::where('id', 6)->value('price') * 3),
            'deadline_payment' => now()->addHours(3),
            'status' => 'Completed',
        ]);
        Order::create([
            'user_id' => '4',
            'admin_id' => 5,
            'shipment_id' => 8,
            'payment_id' => 6,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/4/9',
            'total_price' => 20000 + (Product::where('id', 3)->value('price') * 4) + (Product::where('id', 7)->value('price') * 3),
            'status' => 'Cancelled',
        ]);
        Order::create([
            'user_id' => '2',
            'admin_id' => 4,
            'shipment_id' => null,
            'payment_id' => 9,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . '/2/10',
            'total_price' => 20000 + (Product::where('id', 2)->value('price') * 2),
            'status' => 'Returned',
        ]);
        $orderFactory = Order::factory(5)->create();
        // foreach ($orderFactory as $order) {
        //     $order->no_invoice += strval($order->id);
        //     $order->update();
        // }

        // order_items
        Order_item::create([
            'order_id' => 1,
            'product_id' => 1,
            'quantity' => 3,
            'sum_price' => 60000,
        ]);
        Order_item::create([
            'order_id' => 2,
            'product_id' => 2,
            'quantity' => 15,
            'sum_price' => 600000,
        ]);

        Order_item::create([
            'order_id' => 3,
            'product_id' => 6,
            'quantity' => 5,
            'sum_price' => Product::where('id', 6)->value('price') * 5,
        ]);
        Order_item::create([
            'order_id' => 3,
            'product_id' => 1,
            'quantity' => 3,
            'sum_price' => Product::where('id', 1)->value('price') * 3,
        ]);
        Order_item::create([
            'order_id' => 3,
            'product_id' => 2,
            'quantity' => 4,
            'sum_price' => Product::where('id', 2)->value('price') * 4,
        ]);

        Order_item::create([
            'order_id' => 4,
            'product_id' => 7,
            'quantity' => 135,
            'sum_price' => Product::where('id', 7)->value('price') * 135,
        ]);

        Order_item::create([
            'order_id' => 5,
            'product_id' => 3,
            'quantity' => 6,
            'sum_price' => Product::where('id', 3)->value('price') * 6,
        ]);

        Order_item::create([
            'order_id' => 6,
            'product_id' => 4,
            'quantity' => 2,
            'sum_price' => (Product::where('id', 4)->value('price') * 2),
        ]);
        Order_item::create([
            'order_id' => 6,
            'product_id' => 1,
            'quantity' => 1,
            'sum_price' => Product::where('id', 1)->value('price'),
        ]);

        Order_item::create([
            'order_id' => 7,
            'product_id' => 3,
            'quantity' => 25,
            'sum_price' => Product::where('id', 3)->value('price') * 25,
        ]);
        Order_item::create([
            'order_id' => 7,
            'product_id' => 5,
            'quantity' => 20,
            'sum_price' => Product::where('id', 5)->value('price') * 20,
        ]);
        Order_item::create([
            'order_id' => 7,
            'product_id' => 8,
            'quantity' => 30,
            'sum_price' => Product::where('id', 8)->value('price') * 30,
        ]);

        Order_item::create([
            'order_id' => 8,
            'product_id' => 6,
            'quantity' => 3,
            'sum_price' => Product::where('id', 6)->value('price') * 3,
            'discount' => 10,
            'comment' => 'warna random'
        ]);

        Order_item::create([
            'order_id' => 9,
            'product_id' => 3,
            'quantity' => 4,
            'sum_price' => Product::where('id', 3)->value('price') * 4,
        ]);
        Order_item::create([
            'order_id' => 9,
            'product_id' => 7,
            'quantity' => 3,
            'sum_price' => Product::where('id', 7)->value('price') * 3,
        ]);

        Order_item::create([
            'order_id' => 10,
            'product_id' => 2,
            'quantity' => 2,
            'sum_price' => Product::where('id', 2)->value('price') * 2,
        ]);

        // shipment & shipment_log
        Shipment::create([
            'consignee' => User::where('id', 1)->value('username'),
            'address' => User::where('id', 1)->value('address'),
            'contact' => fake()->phoneNumber(),
            'tracking_number' => fake()->randomNumber(7),
            'courier_service' => 'SiHalu',
            'cost' => 20000,
            'status' => 'Delivered',
            'sent' => '2023-11-10 09:34:34',
            'done' => now(),
        ]);
        Shipment_log::create(['shipment_id' => 1]);
        Shipment::create([
            'consignee' => User::where('id', 2)->value('username'),
            'address' => User::where('id', 2)->value('address'),
            'contact' => fake()->phoneNumber(),
            'tracking_number' => fake()->randomNumber(7),
            'courier_service' => 'SiHalu',
            'cost' => 20000,
            'status' => 'Shipping',
            'sent' => '2023-11-13 09:34:34',
            'done' => null,
        ]);
        Shipment_log::create(['shipment_id' => 2]);
        Shipment::create([
            'consignee' => User::where('id', 3)->value('username'),
            'address' => User::where('id', 3)->value('address'),
            'contact' => fake()->phoneNumber(),
            'tracking_number' => fake()->randomNumber(7),
            'courier_service' => 'SiHalu',
            'cost' => 20000,
            'status' => 'Delivered',
            'sent' => '2023-11-14 09:34:34',
            'done' => now(),
        ]);
        Shipment_log::create(['shipment_id' => 3]);
        Shipment::create([
            'consignee' => User::where('id', 5)->value('username'),
            'address' => User::where('id', 5)->value('address'),
            'contact' => fake()->phoneNumber(),
            'tracking_number' => fake()->randomNumber(7),
            'courier_service' => 'Sicepat',
            'cost' => 30000,
            'status' => 'Delivered',
            'sent' => '2023-11-15 09:34:34',
            'done' => now(),
        ]);
        Shipment_log::create(['shipment_id' => 4]);
        Shipment::create([
            'consignee' => User::where('id', 3)->value('username'),
            'address' => User::where('id', 3)->value('address'),
            'contact' => fake()->phoneNumber(),
            'tracking_number' => fake()->randomNumber(7),
            'courier_service' => 'JNE',
            'cost' => 20000,
            'status' => 'Delivered',
            'sent' => '2023-11-14 11:44:34',
            'done' => now(),
        ]);
        Shipment_log::create(['shipment_id' => 5]);
        Shipment::create([
            'consignee' => User::where('id', 1)->value('username'),
            'address' => User::where('id', 1)->value('address'),
            'contact' => fake()->phoneNumber(),
            'tracking_number' => fake()->randomNumber(7),
            'courier_service' => 'FedEx',
            'cost' => 30000,
            'status' => 'Shipping',
            'sent' => '2023-11-20 16:44:34',
            'done' => null,
        ]);
        Shipment_log::create(['shipment_id' => 6]);
        Shipment::create([
            'consignee' => User::where('id', 4)->value('username'),
            'address' => User::where('id', 4)->value('address'),
            'contact' => fake()->phoneNumber(),
            'tracking_number' => fake()->randomNumber(7),
            'courier_service' => 'FedEx',
            'cost' => 20000,
            'status' => 'Shipping',
            'sent' => '2023-11-20 16:44:34',
            'done' => null,
        ]);
        Shipment_log::create(['shipment_id' => 7]);
        Shipment::create([
            'consignee' => User::where('id', 2)->value('username'),
            'address' => User::where('id', 2)->value('address'),
            'contact' => fake()->phoneNumber(),
            'tracking_number' => fake()->randomNumber(7),
            'courier_service' => 'FedEx',
            'cost' => 20000,
            'status' => 'Pending',
            'sent' => '2023-11-20 16:44:34',
            'done' => null,
        ]);
        Shipment_log::create(['shipment_id' => 8]);
        Shipment_log::factory(20)->create();

        Payment::create([
            'transaction_id' => "TF/" . fake()->regexify('[A-Za-z0-9]{9}'),
            'amount' => 80000,
            'payment_method' => 'virtual account BRI',
            'status' => 'success'
        ]);
        Payment::create([
            'transaction_id' => "GO/" . fake()->regexify('[A-Za-z0-9]{9}'),
            'amount' => 20000 + (Product::where('id', 7)->value('price') * 135),
            'payment_method' => 'Gopay',
            'status' => 'success'
        ]);
        Payment::create([
            'transaction_id' => "VA/" . fake()->regexify('[A-Za-z0-9]{9}'),
            'amount' => 20000 + (Product::where('id', 6)->value('price') * 5) + (Product::where('id', 1)->value('price') * 3) + (Product::where('id', 2)->value('price') * 4),
            'payment_method' => 'virtual account BCA',
            'status' => 'success'
        ]);
        Payment::create([
            'transaction_id' => "OVO/" . fake()->regexify('[A-Za-z0-9]{9}'),
            'amount' => 20000 + (Product::where('id', 3)->value('price') * 6),
            'payment_method' => 'OVO',
            'status' => 'success'
        ]);
        Payment::create([
            'transaction_id' => "VA/" . fake()->regexify('[A-Za-z0-9]{11}'),
            'amount' => 30000 + (Product::where('id', 4)->value('price') * 2) + Product::where('id', 1)->value('price'),
            'payment_method' => 'virtual account BCA',
            'status' => 'success'
        ]);
        Payment::create([
            'transaction_id' => "MND/" . fake()->regexify('[A-Za-z0-9]{11}'),
            'amount' => 20000 + (Product::where('id', 3)->value('price') * 4) + (Product::where('id', 7)->value('price') * 3),
            'payment_method' => 'virtual account Bank Mandiri',
            'status' => 'success'
        ]);
        Payment::create([
            'transaction_id' => "OVO/" . fake()->regexify('[A-Za-z0-9]{11}'),
            'amount' => 30000 + (Product::where('id', 6)->value('price') * 3),
            'payment_method' => 'OVO',
            'status' => 'success'
        ]);
        Payment::create([
            'transaction_id' => "GO/" . fake()->regexify('[A-Za-z0-9]{11}'),
            'amount' => 20000 + (Product::where('id', 3)->value('price') * 25) + (Product::where('id', 5)->value('price') * 20) + (Product::where('id', 8)->value('price') * 30),
            'payment_method' => 'Gopay',
            'status' => 'success'
        ]);
        Payment::create([
            'transaction_id' => "VA/" . fake()->regexify('[A-Za-z0-9]{11}'),
            'amount' => 20000 + (Product::where('id', 2)->value('price') * 2),
            'payment_method' => 'virtual account BCA',
            'status' => 'returned'
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
        Notification::factory(10)->create();
    }
}
