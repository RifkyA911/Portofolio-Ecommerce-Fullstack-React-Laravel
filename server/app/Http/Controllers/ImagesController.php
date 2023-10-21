<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return response()->download(public_path() . "/img/admin_avatar/" . $request->input('image'));
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
    public function show(string $type, string $filename)
    {
        $path = 'img/product_images/';
        if ($type == 'admin') {
            $path = 'img/admin_avatar/';
        } elseif ($type == 'user') {
            $path = 'img/user_avatar/';
        }

        if (file_exists(public_path($path . $filename))) {
            return response()->download(public_path($path . $filename));
        } else {
            return response()->download(public_path($path . 'default.jpg'));
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
