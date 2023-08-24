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
        //
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
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
