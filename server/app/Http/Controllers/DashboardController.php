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

            // Mendapatkan data produk
            $products = Product::orderBy('updated_at', 'desc')
                ->skip($offset)
                ->take($perPage)
                ->select('id', 'name', 'price', 'updated_at', /* kolom lainnya */)
                ->get();

            // Mendapatkan data pesanan
            $orders = Order::orderBy('updated_at', 'desc')
                ->skip($offset)
                ->take($perPage)
                ->select('id', 'no_invoice', 'total_price', 'updated_at', /* kolom lainnya */)
                ->get();

            // Inisialisasi array untuk menyimpan hasil per tanggal untuk produk
            $productsByDate = [];
            $products->each(function ($item) use (&$productsByDate) {
                $date = $item->updated_at->format('Y-m-d');
                if (!isset($productsByDate[$date])) {
                    $productsByDate[$date] = 0;
                }
                $productsByDate[$date] += $item->price;
            });

            // Inisialisasi array untuk menyimpan hasil per tanggal untuk pesanan
            $ordersByDate = [];
            $orders->each(function ($item) use (&$ordersByDate) {
                $date = $item->updated_at->format('Y-m-d');
                if (!isset($ordersByDate[$date])) {
                    $ordersByDate[$date] = 0;
                }
                $ordersByDate[$date] += $item->total_price;
            });

            // Transform hasil produk ke dalam format yang diinginkan
            $productsResult = [];
            foreach ($productsByDate as $date => $totalX) {
                $productsResult[] = [
                    'x' => $totalX,
                    'y' => $date,
                ];
            }

            // Transform hasil pesanan ke dalam format yang diinginkan
            $ordersResult = [];
            foreach ($ordersByDate as $date => $totalX) {
                $ordersResult[] = [
                    'x' => $totalX,
                    'y' => $date,
                ];
            }

            return response()->json([
                'message' => 'berhasil fetching',
                'length' => ['products' => count($products), 'orders' => count($orders)],
                'data' => ['products' => $productsResult, 'orders' => $ordersResult],
            ]);

        }
        return response(['message' => 'no matched chart types', 'length' => 0, 'data' => []], 404);
    }
}
