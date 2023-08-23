<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminsController;
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
Route::get('/product', [ProductController::class, 'index']);

Route::get('/product/{name}', [ProductController::class, 'show']);

Route::get('/admins', [AdminsController::class, 'index']);
Route::get('/admins/{id}', [AdminsController::class, 'find']);
