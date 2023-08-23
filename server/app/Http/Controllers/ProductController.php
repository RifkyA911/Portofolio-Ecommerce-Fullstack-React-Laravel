<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Product;

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
}
