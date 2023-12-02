<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use stdClass;

class DashboardController extends Controller
{
    public function getCharts($type, $sortOrder = "asc")
    {
        $sortBy = null;

        if ($type == 'bars') {
            // Mengonversi halaman dan perPage yang diterima menjadi integer
            $page = (int) 1; // halaman
            $perPage = (int) 5; // jumlah data yang akan di kirim

            $length = Product::count();
            // Menghitung offset berdasarkan halaman yang diminta
            $offset = ($page - 1) * $perPage;

            if ($sortBy) {
                $products = Product::orderBy($sortBy, $sortOrder)->skip($offset)->take($perPage)->get();
            }

            $products = Product::orderBy('viewed', 'desc')->skip($offset)->take($perPage)
                ->select('id', 'name', 'viewed', /* kolom lainnya */)
                ->get();

            $products->transform(function ($item) {
                return [
                    // 'id' => $item->id,
                    'x' => $item->name,
                    'y' => $item->viewed,
                    // Kolom lainnya
                ];
            });

            return response()->json(['message' => 'berhasil fetching', 'length' => $length, 'data' => $products]);
        } else if ($type == 'area') {
            // Mengonversi halaman dan perPage yang diterima menjadi integer
            $page = (int) 1; // halaman
            $perPage = (int) 30; // jumlah data yang akan di kirim

            // $data = new stdClass(); // membuat objek php baru

            $productLength = Product::count();
            $orderLength = Order::count();
            // $length = Order::count();

            // Menghitung offset berdasarkan halaman yang diminta
            $offset = ($page - 1) * $perPage;

            if ($sortBy) {
                $products = Product::orderBy($sortBy, $sortOrder)->skip($offset)->take($perPage)->get();
            }

            $products = Product::orderBy('updated_at', 'desc')->skip($offset)->take($perPage)
                ->select('id', 'name', 'price', 'updated_at', /* kolom lainnya */)
                ->get();

            $products->transform(function ($item) {
                return [
                    // 'id' => $item->id,
                    'x' => $item->price,
                    'y' => $item->updated_at,
                    // Kolom lainnya
                ];
            });

            return response()->json(['message' => 'berhasil fetching', 'length' => ['product' => $productLength, 'order' => $orderLength], 'data' => $products]);
        }
        return response(['message' => 'no matched chart types', 'length' => 0, 'data' => []], 404);
    }
}
