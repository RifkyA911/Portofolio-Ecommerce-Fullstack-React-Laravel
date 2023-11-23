<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Http\Response;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new PostResource(true, 'List Review', Review::all());
    }

    public function getByProduct($product_id)
    {
        if (count($reviews = Review::Where('product_id', $product_id)->get())) {
            return new PostResource(true, 'List Review Produk', $reviews);
        }
        return response(['status' => false, 'message' => 'Review Produk tidak ditemukan', 'data' => null], 404);
        // return new Response(new PostResource(false, 'Review Produk tidak ditemukan', null), 401);
    }

    public function showLimit($page, $perPage)
    {
        $page = (int) $page; // halaman
        $perPage = (int) $perPage; // jumlah data yang akan di kirim

        $length = Review::count();

        $offset = ($page - 1) * $perPage;

        $Reviews = Review::orderBy('updated_at', 'desc')
            ->skip($offset)
            ->take($perPage)
            ->get();

        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $Reviews);
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
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}
