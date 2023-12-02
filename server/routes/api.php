<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DialogController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\OrderController;
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

// JWT
Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    // user
    Route::post('register', [AuthController::class, 'register']);    // parameter email, username, password(min:6)
    Route::post('login', [AuthController::class, 'login']);
    // admin
    Route::post('admin/register', [AuthController::class, 'registerAdmin']);
    Route::post('admin/login', [AuthController::class, 'loginAdmin']);

    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('cek', [AuthController::class, 'check']);
});

// Endpoint Images for image's stuff
Route::controller(ImagesController::class)->group(function () {
    Route::post('image/{type}/{filename}', 'show'); // type = choose between product, admin, or user
});

// Endpoint Admin
Route::controller(AdminsController::class)->group(function () {
    Route::get('/admins', 'index');
    Route::get('/admin/{id}', 'find'); // parameter id
    Route::get('/admin/image/{id}', 'getImage'); // parameter id
    // table utility
    Route::get('/admins/paginate/{page}/{perPage}/{sortBy?}/{orderBy?}', 'showLimit');
    // Route::post('/admins/print', 'print'); // parameter id
    Route::post('/admins/filter', 'filter'); // parameter id
    Route::post('/admins/search', 'search'); // parameter name, category, price(numeric), stok(numeric)
    //  create admin
    Route::post('/admin/store', 'store'); //NEED TOKEN parameter role_admin == 0; data => email, username, password, role
    // update admin
    Route::put('/admin/update', 'update'); //NEED TOKEN parameter id, email, username, password, newPassword(optional, min=6), newPassword_confirmation(req and must same if newPassword exist)
    // Route::post('admin/login', 'login'); // parameter email, password
    // Route::post('admin/logout', 'logout');
    // Route::post('admin/refresh', 'refresh'); // parameter 'token' with value jwt token
    Route::post('admin/cek', 'me'); // uji coba, DELETE when deployed
    // patch admin
    Route::patch('/admin/authority', 'patch'); //NEED TOKEN parameter spasial
    // delete admin
    Route::delete('/admins/delete', 'drop'); //NEED TOKEN parameter id, email, username, password, newPassword(optional, min=6), newPassword_confirmation(req and must same if newPassword exist)
});

// Endpoint User
Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index');
    Route::get('/users/paginate/{page}/{perPage}/{sortBy?}/{orderBy?}', 'showLimit');
    Route::get('/user/{id}', 'show'); // parameter id
    // create user
    // Route::post('/user', 'store'); // parameter email, username, password(min:6)
    // update user
    Route::put('/user', 'update'); // parameter id, email, username, password, newPassword(optional, min=6), newPassword_confirmation(req and must same if newPassword exist)
    // optional : address, pict;
    // patch user
    Route::patch('/users', 'patch'); // parameter spasial
    // login user
    // Route::post('/login', 'login'); // parameter email, password, auth_key(isi = cikidaw)
    // Route::post('/logout', 'logout');
    // Route::post('user/refresh', 'refresh'); // parameter 'token' with value jwt token
    // Route::post('user/cek', 'me'); // uji coba, DELETE when deployed
});

// Endpoint Product
Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'getAll');
    Route::get('/product/{id}', 'getById'); // parameter id
    Route::get('/product/image/{id}', 'getImage'); // parameter id
    // table utility
    Route::get('/products/paginate/{page}/{perPage}/{sortBy?}/{orderBy?}', 'showLimit');
    Route::post('/products/print', 'print'); // parameter id
    Route::post('/products/filter', 'filter'); // parameter id
    Route::post('/products/search', 'search'); // parameter name, category, price(numeric), stok(numeric)
    // create product
    Route::post('/product/store', 'store'); // parameter name, category, price(numeric), stok(numeric)
    // update product
    Route::put('/products/update', 'update'); // parameter id, name, category, price(numeric), stok(numeric)
    // patch products
    Route::patch('/products', 'patch'); // parameter spasial
    // delete products
    Route::delete('/products/delete', 'drop'); // parameter superAdmin, id)
});

// Endpoint Categories
Route::controller(CategoriesController::class)->group(function () {
    Route::get('/categories', 'getAll');
    Route::get('/category/{id}', 'getById'); // parameter id
    // table utility
    Route::get('/categories/paginate/{page}/{perPage}', 'showLimit');
    Route::post('/categories/print', 'print'); // parameter id
    Route::post('/categories/search', 'search'); // parameter name, category, price(numeric), stok(numeric)
    // create category
    Route::post('/category/store', 'store'); // parameter name, category, price(numeric), stok(numeric)
    // update category
    Route::put('/categories', 'update'); // parameter id, name, category, price(numeric), stok(numeric)
    // patch categories
    Route::patch('/categories', 'patch'); // parameter spasial
    // delete categories
    Route::delete('/categories', 'drop'); // parameter superAdmin, id)
});

// Endpoint Cart/keranjang (user-only feature)
Route::controller(CartController::class)->group(function () {
    Route::get('/carts/{user_id}', 'showByUser'); // parameter user_id
    Route::get('/cart/{id}', 'showById'); // parameter id
    Route::post('/cart', 'store'); // parameter user_id, product_id, count(optional)
    Route::post('/cart/delete', 'destroy'); // parameter id
    Route::post('/cart/update', 'update'); // parameter id, count
    // patch cart
    Route::patch('/cart', 'patch'); // parameter spasial
});

// Endpoint Wishlist (user-only feature)
Route::controller(WishlistController::class)->group(function () {
    Route::get('/wishlist/{user_id}', 'showByUser'); // parameter user_id
    Route::post('/wishlist', 'store'); // parameter user_id, product_id
    Route::post('/wishlist/delete', 'destroy'); // parameter id
});

// Endpoint Order
Route::controller(OrderController::class)->group(function () {
    Route::get('/orders', 'index');
    Route::get('/orders/paginate/{page}/{perPage}/{sortBy?}/{orderBy?}/{where?}', 'showLimit');
    Route::get('/order/{id}', 'show'); // parameter id
    Route::get('/deadline', 'deadline_payment'); // parameter token
    Route::post('/order/buy', 'store'); // parameter user_id, order_item(in array/json form), address, contact, courier,shipment_cost. all required
    Route::post('/order/checkout', 'checkout'); // parameter id, user_id(same as trans' user), payment(pict proof of payment)
    Route::post('/order/sent', 'sent'); // parameter id, admin_id, role_admin
    Route::post('/order/done', 'done'); // parameter id. user_id OR (admin_id & role_admin)
    Route::post('/order/cancel', 'cancel'); // parameter id, admin_id, role_admin, comment
    // Endpoint tahap order by user
    // parameter tahap berisi null, checkedout, sent, atau done
    // tahap = null -> user belum bayar/checkout (tiga kolom pada tabel berisi null)
    // tahap = checkedout -> user sudah bayar/checkout tpi admin belum mengirim barang (kolom check_out sudah terisi tpi kolom sent dan done kosong)
    // begitu seterusnya
    // Route::get('/order/user/{user_id}', 'showByUser');
    Route::get('/order/user/{user_id}/{tahap?}', 'showByUser'); // parameter user_id, tahap(opional)
    // Endpoint tahap order by admin
    // ketentuan sama dengan endpoint user
    Route::get('/order/admin/{admin_id}/{tahap?}', 'showByAdmin'); // parameter admin_id, tahap(optional)
});

// Endpoint Review
Route::controller(ReviewController::class)->group(function () {
    Route::get('/reviews', 'index');
    Route::get('/review/{product_id}', 'getByProduct');
    Route::get('/reviews/paginate/{page}/{perPage}', 'showLimit');

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
    Route::get('/messages/paginate/{page}/{perPage}/{sortBy?}/{orderBy?}', 'showLimit');
    Route::post('/message/add', 'store');
    Route::post('/messages/getByUser', 'getByUser'); // return dialog and first message where user is involved
    // parameter : user_id
    Route::post('/messages/getByAdmin', 'getByAdmin'); // return dialog and first message where admin is involved
    // parameter : admin_id
    Route::post('/messages/getByDialog', 'getByDialog'); // return messages based on dialog_id
    // parameter : dialog_id
});

Route::controller(NotificationController::class)->group(function () {
    Route::get('/notifications/fetch', 'getAll');
    Route::get('/notifications/paginate/{page}/{perPage}', 'showLimit');
    Route::post('/notifications/filter', 'filter'); // parameter id
});
