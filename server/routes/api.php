<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\DialogController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\TransactionController;
use App\Models\Message;

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
Route::controller(AdminsController::class)->group(function () {
    Route::get('/admins', 'index');
    Route::get('/admins/paginate/{page}/{perPage}', 'showLimit');
    Route::get('/admin/{id}', 'find');     // parameter id
    //  create admin
    Route::post('/admins', 'store');    // parameter role_admin == 0; data => email, username, password, role
    // update admin
    Route::put('/admins', 'update');    // parameter id, email, username, password, newPassword(optional, min=6), newPassword_confirmation(req and must same if newPassword exist)
    // patch admin
    Route::patch('/admins', 'patch');    // parameter spasial
    // delete admin
    Route::delete('/admins', 'drop');    // parameter id, email, username, password, newPassword(optional, min=6), newPassword_confirmation(req and must same if newPassword exist)
    // login for admin
    Route::post('/admins/login', 'login'); // parameter email, password, auth_key(isi = cikidaw)
});

// Endpoint User
Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index');
    Route::get('/users/paginate/{page}/{perPage}', 'showLimit');
    Route::get('/user/{id}', 'show');   // parameter id
    // create user
    Route::post('/user', 'store');  // parameter email, username, password(min:6)
    // update user
    Route::put('/user', 'update');  // parameter id, email, username, password, newPassword(optional, min=6), newPassword_confirmation(req and must same if newPassword exist)
    // optional : address, pict;
    // patch user
    Route::patch('/users', 'patch');    // parameter spasial
    // login user
    Route::post('/login', 'login'); // parameter email, password, auth_key(isi = cikidaw)
});

// Endpoint Product
Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'getAll');
    Route::get('/products/paginate/{page}/{perPage}', 'showLimit');
    Route::get('/product/{id}', 'getById'); // parameter id
    // create product
    Route::post('/product', 'store');   // parameter name, category, price(numeric), stok(numeric)
    // optional : discount, pict, description
    // update product
    Route::put('/product', 'update');   // parameter id, name, category, price(numeric), stok(numeric)
    // optional : discount, pict, description
    // patch products
    Route::patch('/products', 'patch');    // parameter spasial
});

// Endpoint Cart/keranjang (user-only feature)
Route::controller(CartController::class)->group(function () {
    Route::get('/carts/{user_id}', 'showByUser');   // parameter user_id
    Route::get('/cart/{id}', 'showById');   // parameter id
    Route::post('/cart', 'store');     // parameter user_id, product_id, count(optional)
    Route::post('/cart/delete', 'destroy');    // parameter id
    Route::post('/cart/update', 'update');     // parameter id, count
    // patch cart
    Route::patch('/cart', 'patch');    // parameter spasial
});

// Endpoint Wishlist (user-only feature)
Route::controller(WishlistController::class)->group(function () {
    Route::get('/wishlist/{user_id}', 'showByUser');    // parameter user_id
    Route::post('/wishlist', 'store');     // parameter user_id, product_id
    Route::post('/wishlist/delete', 'destroy');    // parameter id
});

// Endpoint Transaction
Route::controller(TransactionController::class)->group(function () {
    Route::get('/transactions', 'index');
    Route::get('/transactions/paginate/{page}/{perPage}', 'showLimit');
    Route::get('/transaction/{id}', 'show');    // parameter id
    Route::post('/transaction/buy', 'store');   // parameter user_id, products_id(in array/json form), total_price. all required
    Route::post('/transaction/checkout', 'checkout');   // parameter id, user_id(same as trans' user)
    Route::post('/transaction/sent', 'sent');       // parameter id, admin_id, role_admin
    Route::post('/transaction/done', 'done');       // parameter id. user_id OR (admin_id & role_admin)
    // Endpoint tahap Transaction by user
    // parameter tahap berisi null, checkedout, sent, atau done
    // tahap = null -> user belum bayar/checkout (tiga kolom pada tabel berisi null)
    // tahap = checkedout -> user sudah bayar/checkout tpi admin belum mengirim barang (kolom check_out sudah terisi tpi kolom sent dan done kosong)
    // begitu seterusnya
    // Route::get('/transaction/user/{user_id}', 'showByUser');
    Route::get('/transaction/user/{user_id}/{tahap?}', 'showByUser'); // parameter user_id, tahap(opional)
    // Endpoint tahap Transaction by admin
    // ketentuan sama dengan endpoint user
    Route::get('/transaction/admin/{admin_id}/{tahap?}', 'showByAdmin'); // parameter admin_id, tahap(optional)
});

// Endpoint Review
Route::controller(ReviewController::class)->group(function () {
    Route::get('/reviews', 'index');
    Route::get('/review/{product_id}', 'getByProduct');
});

// Endpoint Dialog
// create new, with or without product id
// automatically called when start new dialog via message endpoint
Route::post('/dialog/new', [DialogController::class, 'store']);

// Endpoint Message
// create new message
// parameter for add massage :
// user_id & admin_id (fill one of these only, let the other null)
// dialog_id (can be null if starting new dialog)
// message (can't be null)
// pict (can be null)
// product_id (can be null if sending direct message to admin)
Route::controller(MessageController::class)->group(function () {
    Route::get('/messages', 'index');
    Route::get('/messages/paginate/{page}/{perPage}', 'showLimit');
    Route::post('/message/add', 'store');
    Route::post('/messages/getByUser', 'getByUser'); // return dialog and first message where user is involved
    // parameter : user_id
    Route::post('/messages/getByAdmin', 'getByAdmin'); // return dialog and first message where admin is involved
    // parameter : admin_id
    Route::post('/messages/getByDialog', 'getByDialog');    // return messages based on dialog_id
    // parameter : dialog_id
});
