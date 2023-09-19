<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class WishlistController extends Controller
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
        if ($hasil = Wishlist::create($request->all())) {
            return new PostResource(true, 'Berhasil ditambah ke Wishlist', $hasil);
        }
        return response(new PostResource(false, 'Gagal ditambah ke Wishlist', $request->all()), 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Wishlist $wishlist)
    {
        //
    }
    public function showByUser($uid)
    {
        return new PostResource(true, "Daftar wishlist", Wishlist::where('user_id', '=', $uid)->get());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wishlist $wishlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wishlist $wishlist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        if (Wishlist::find($request->input('id'))->delete()) {
            return new PostResource(true, "Item berhasil dihapus dari Wishlist", '');
        }
        return response(new PostResource(false, "Item gagal dihapus dari Wishlist", $request->all()), 400);
    }
}
