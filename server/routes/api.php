<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Endpoint Admin
Route::get('/admins', [AdminsController::class, 'index']);
Route::get('/admins/{id}', [AdminsController::class, 'find']);
//  create admin
Route::post('/admins', [AdminsController::class, 'store']);
// update admin
Route::put('/admins', [AdminsController::class, 'update']);
// login for admin
Route::post('/admins/login', [AdminsController::class, 'login']);

// Endpoint User
// Route::get('/user', function(){
//     return [UserController::class, 'index'];
// });
Route::get('/user', [UserController::class, 'index']);
Route::get('/user/{id}', [UserController::class, 'show']);
// create user
Route::post('/user', [UserController::class, 'store']);
// update user
Route::put('/user', [UserController::class, 'update']);
// login user
Route::post('/login', [UserController::class, 'login']);

// Endpoint Product
Route::get('/produk', [ProductController::class, 'getAll']);
Route::get('/produk/{id}', [ProductController::class, 'getById']);
// create produk
Route::post('/produk', [ProductController::class, 'store']);
// update produk
Route::put('/produk', [ProductController::class, 'update']);

// Endpoint Cart/keranjang
Route::get('/carts/{user_id}', [CartController::class, 'showByUser']);
Route::get('/cart/{id}', [CartController::class, 'showById']);

// Endpoint Wishlist
Route::get('/wishlist/{user_id}', [WishlistController::class, 'showByUser']);

// Endpoint Transaction
Route::get('/transaction', [TransactionController::class, 'index']);
Route::get('/transaction/{id}', [TransactionController::class, 'show']);
// Endpoint tahap Transaction by user
// parameter tahap berisi null, checkedout, sent, atau done
// tahap = null -> user belum bayar/checkout (tiga kolom pada tabel berisi null)
// tahap = checkedout -> user sudah bayar/checkout tpi admin belum mengirim barang (kolom check_out sudah terisi tpi kolom sent dan done kosong)
// begitu seterusnya
// Route::get('/transaction/user/{user_id}', [TransactionController::class, 'showByUser']);
Route::get('/transaction/user/{user_id}/{tahap?}', [TransactionController::class, 'showByUser']);
// Endpoint tahap Transaction by admin
// ketentuan sama dengan endpoint user
Route::get('/transaction/admin/{adm_id}/{tahap?}', [TransactionController::class, 'showByAdmin']);