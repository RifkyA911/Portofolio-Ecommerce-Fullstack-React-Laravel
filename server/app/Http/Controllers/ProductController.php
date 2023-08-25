<?php

namespace App\Http\Controllers;

use \App\Models\Product;
use Illuminate\Http\Request;
use \App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index() {
        return view('product',[
            'judul'=>'product',
            'product'=> Product::All()
        ]);
    }

    public function show($name) {
        return view('detail-product',[
            'judul'=>'detail product',
            'product'=> Product::find($name)
        ]);
    }
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
            return new PostResource(false, "validasi data error", $validator->errors());
        }
        $addItem = Product::create($validator->validated());
        return new PostResource(true, "User berhasil ditambahkan.", $addItem);
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
    public function update(Request $request, Product $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $id)
    {
        //
    }
}
