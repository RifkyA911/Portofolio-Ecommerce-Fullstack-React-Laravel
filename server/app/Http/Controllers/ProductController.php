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
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required',
            "category" => 'required',
            "price" => 'required|numeric',
            "stock" => 'required|numeric'
        ]);
        // $validated = $request->validate([
        //     "email" => 'required|email|unique:users,email',
        //     "username" => 'required',
        //     "password" => 'required|min:6',
        // ]);
        if ($validator->fails()) {
            return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
        }
        $addItem = Product::create($validator->validated());
        return response(new PostResource(true, "Produk berhasil ditambahkan.", $addItem), 201);
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
            "name" => 'required',
            "category" => 'required',
            "price" => 'required|numeric',
            "stock" => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
        }
        $produk = Product::find($request->input('id'));
        $produk->name = $request->input('name');
        $produk->category = $request->input('category');
        $produk->price = $request->input('price');
        $produk->stock = $request->input('stock');
        $produk->discount = $request->input('discount');
        $produk->pict = $request->input('pict');
        $produk->description = $request->input('description');
        return new PostResource(true, "Produk ter-update.", $produk->update());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $id)
    {
        //
    }
}
