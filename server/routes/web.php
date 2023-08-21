<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('percobaan', [
        'judul' => 'Home',
        'nama' => 'cikidaw',
        'phone' => '08123456789',
        'img' => 'bogeng.png'
    ]);
});

Route::get('/about', function (){
    return view('about', [
        'judul' => 'About',
        'nama' => 'dodi',
        'phone' => '08222222',
        'img' => 'altera_dance.gif'
    ]);
});
Route::get('/product', function () {
    $produk = [
        [
            'nama'=>'ayam',
            'harga'=>'10000'
        ],
        [
            'nama'=>'ikan',
            'harga'=>'9000'
        ],
        [
            'nama'=>'sepatu',
            'harga'=>'90000'
        ],
    ];
    return view('product',[
        'judul'=>'product',
        'product'=> $produk
    ]);
});
