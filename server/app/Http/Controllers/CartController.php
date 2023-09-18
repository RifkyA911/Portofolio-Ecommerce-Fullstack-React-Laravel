<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use \App\Http\Resources\PostResource;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!$request->has('count')) {
            $data = array_merge($request->all(), ['count' => '1']);
        } else {$data = $request->all();}
        // return $data;
        if ($respon = Cart::create($data)) {
            return new PostResource(true, 'Berhasil menambahkan ke keranjang', $respon, 201);
        } else {return new PostResource(false, 'Gagal menambahkan ke keranjang', $request, 400);}
    }

    /**
     * Display the specified resource.
     */
    public function showById($id)
    {
        //return collection of posts as a resource
        return new PostResource(true, "data Produk :", Cart::find($id));
    }
    public function showByUser($user_id)
    {
        //get all posts
        $cart_list = Cart::where('user_id', '=', $user_id)->get();

        //return collection of posts as a resource
        return new PostResource(true, "data Produk :", $cart_list);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $cart = Cart::find($request->input('id'));
        $cart->count = $request->input('count');
        return new PostResource(true, 'Berhasil terupdate', $cart->update());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        if (Cart::find($request->input('id'))->delete()) {
            return new PostResource(true, "Item berhasil dihapus dari keranjang", '');
        }
        return new PostResource(false, "Item gagal dihapus dari keranjang", $request->all(), 400);
    }
}
