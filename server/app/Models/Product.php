<?php

namespace App\Models;


class Product 
{
    private static $produk = [
        [
            'nama'=>'ayam',
            'harga'=>'10000'
        ],
        [
            'nama'=>'ikan',
            'harga'=>'9000'
        ],
        [
            'nama'=>'sepatu',
            'harga'=>'90000'
        ],
    ];

    public static function All() {
        return collect(self::$produk);
    }
    public static function find($name) {
        $products = static::all();
        return $products->firstWhere('nama', $name);
    }
}
