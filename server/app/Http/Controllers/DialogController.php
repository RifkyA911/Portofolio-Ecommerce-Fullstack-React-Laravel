<?php

namespace App\Http\Controllers;

use App\Models\Dialog;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class DialogController extends Controller
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
        // return now();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dialog_number = '0' . time();
        // with product user
        if ($request->input('product_id') !== null) {
            $dialog_number = $request->input('product_id') . time();
        }
        
        $respon = PostResource::make(true, 'Membuat dialog baru', $dialog_number);
        if ($respon->resource = Dialog::create(['dialog_number' => $dialog_number, 'product_id' => $request->input('product_id')])) {
            return $respon;
        }
        return new PostResource(false, 'something went wrong :(', '', 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Dialog $dialog)
    {
        return "ahahahaha";
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dialog $dialog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dialog $dialog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dialog $dialog)
    {
        //
    }
}
