<?php

namespace App\Http\Controllers;

use \App\Models\Product;
use Illuminate\Http\Request;
use \App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // public function index() {
    //     return view('product',[
    //         'judul'=>'product',
    //         'product'=> Product::All()
    //     ]);
    // }

    // public function show($name) {
    //     return view('detail-product',[
    //         'judul'=>'detail product',
    //         'product'=> Product::find($name)
    //     ]);
    // }
    /**
     * Display a listing of the resource.
     */
    public function getAll()
    {
        //get all posts
        $produk = Product::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data Produk', $produk);
    }
    public function showLimit($page, $perPage)
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int)$page; // halaman
        $perPage = (int)$perPage; // jumlah data yang akan di kirim

        $length = Product::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mengambil data Admin dengan paginasi dan offset
        $products = Product::skip($offset)->take($perPage)->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $products);
    }


    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         "name" => 'required',
    //         "category" => 'required',
    //         "price" => 'required|numeric',
    //         "stock" => 'required|numeric'
    //     ]);
    //     // $validated = $request->validate([
    //     //     "email" => 'required|email|unique:users,email',
    //     //     "username" => 'required',
    //     //     "password" => 'required|min:6',
    //     // ]);
    //     if ($validator->fails()) {
    //         return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
    //     }
    //     $addItem = Product::create($validator->validated());
    //     return response(new PostResource(true, "Produk berhasil ditambahkan.", $addItem), 201);
    // }

    public function store(Request $request)
    {
        // return response(new PostResource(false, "yoi", $request->input()), 200);
        if ($request->input('superAuthorizationPassword') === "superAdmin") {
            $validator = Validator::make($request->all(), [
                "name" => 'required',
                "category" => 'required',
                "price" => 'required|numeric',
                "stock" => 'required|numeric'
            ]);

            if ($validator->fails()) {
                return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
            }

            if (Product::create($request->except(['superAuthorizationPassword'])) !== false) {
                return new PostResource(true, ['message' => "Product berhasil ditambahkan.", 'status' => 201], $request->only(['name', 'category']));
            } else {
                return response(new PostResource(false, "validasi data error", "Something went wrong with the DB :("), 403);
            }
        }
        return response(new PostResource(false, "Data Product gagal ditambahkan, Akun anda tidak punya akses dalam pembuatan akun Product.", $request->input()), 403);
    }

    /**
     * Display the specified resource.
     */
    public function getById($id)
    {
        return new PostResource(true, "data Produk :", Product::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "barcode" => 'required',
            "name" => 'required',
            "category" => 'required',
            "price" => 'required|numeric',
            "stock" => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
        }
        $produk = Product::find($request->input('productId'));
        $produk->barcode = $request->input('barcode');
        $produk->name = $request->input('name');
        $produk->category = $request->input('category') ?? 'none';
        $produk->price = $request->input('price') ?? 0;
        $produk->stock = $request->input('stock') ?? 0;
        $produk->discount = $request->input('discount') ?? 0;
        $produk->pict = $request->input('pict');
        $produk->description = $request->input('description');
        return new PostResource(true, "Produk ter-update.", $produk->update());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function drop(Request $request)
    {
        $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');
        $productsId = $request->input('productsId');

        if ($getSuperAuthorizationPassword !== "superAdmin") {
            return response(new PostResource(false, "Authorization gagal, pengenalan kredensial tidak tepat, abort.", ['old_input' => $request->except('productsId')]), 401);
        }

        if (is_array($productsId)) {
            // Batch delete
            $deletedCount = Product::whereIn('id', $productsId)->delete();
            return new PostResource(true, "Berhasil menghapus " . $deletedCount . " admin dengan IDs: " . implode(', ', $productsId), null);
        } elseif (is_numeric($productsId)) {
            // Single delete
            $dropProduct = Product::find($productsId);
            if (!$dropProduct) {
                return response(new PostResource(false, "Product tidak ditemukan.", ['old_input' => $request->except('productsId')]), 401);
            }
            $deleted = $dropProduct->delete();
            return new PostResource(true, "Berhasil menghapus Product " . $dropProduct->name, $deleted);
        } else {
            // Invalid input
            return response(new PostResource(false, "Input productsId tidak valid.", ['old_input' => $request->except('productsId')]), 400);
        }
    }
    // return response(new PostResource(false, 'Masuk coy :v', $request->input(), 302));
}
