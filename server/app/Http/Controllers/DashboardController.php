<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
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

            // $productLength = Product::count();
            // $orderLength = Order::count();

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
                $date = $item->updated_at->format('m-d');
                if (!isset($productsByDate[$date])) {
                    $productsByDate[$date] = 0;
                }
                $productsByDate[$date] += $item->price;
            });

            // Inisialisasi array untuk menyimpan hasil per tanggal untuk pesanan
            $ordersByDate = [];
            $orders->each(function ($item) use (&$ordersByDate) {
                $date = $item->updated_at->format('m-d');
                if (!isset($ordersByDate[$date])) {
                    $ordersByDate[$date] = 0;
                }
                $ordersByDate[$date] += $item->total_price;
            });

            // Transform hasil produk ke dalam format yang diinginkan
            $productsResult = [];
            foreach ($productsByDate as $date => $totalX) {
                $productsResult[] = [
                    'x' => $date,
                    'y' => $totalX,
                ];
            }

            // Transform hasil pesanan ke dalam format yang diinginkan
            $ordersResult = [];
            foreach ($ordersByDate as $date => $totalX) {
                $ordersResult[] = [
                    'x' => $date,
                    'y' => $totalX,
                ];
            }

            return response()->json([
                'message' => 'berhasil fetching',
                'length' => ['products' => count($products), 'orders' => count($orders)],
                // 'data' => ['products' => $productsResult, 'orders' => $ordersResult],
                'data' => array(

                    'products' => [
                        'name' => "Products",
                        'data' => $productsResult,
                        'zIndex' => 0,
                    ],
                    'orders' => [
                        'name' => "Orders",
                        'data' => $ordersResult,
                        'zIndex' => 0,
                    ]

                )
            ]);

        } else if ($type == 'line') {
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
        }
        return response(['message' => 'no matched chart types', 'length' => 0, 'data' => []], 404);
    }
    public function getSummary($type, $sortOrder = "asc")
    {
        $thisYear = Carbon::now()->year;
        $thisMonth = Carbon::now()->month;
        // Mendapatkan nama bulan berdasarkan angka bulan Str::lower()
        $monthName = Carbon::create()->month($thisMonth)->format('F');
        $startDate = Carbon::now()->startOfMonth(); // Mulai dari tanggal 1 bulan ini
        $endDate = Carbon::now()->endOfMonth(); // Akhir dari bulan ini

        $sortBy = null;
        $productlength = Product::count();
        $orderlength = Order::count();

        if ($type == 'headers') {
            $income = Order::whereBetween('created_at', [$startDate, $endDate])->sum('total_price');
            $users = User::whereBetween('created_at', [$startDate, $endDate])->count();
            $sales = Order::with('items.product')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->get();

            $totalQuantity = 0;
            foreach ($sales as $order) {
                foreach ($order->items as $item) {
                    $totalQuantity += $item->quantity;
                }
            }

            return response()->json(
                [
                    'message' => 'berhasil fetching',
                    'length' => ['orders' => $orderlength, 'product' => $productlength],
                    'data' =>
                        [
                            $thisYear => [
                                $monthName => [
                                    [
                                        'name' => 'Income',
                                        'prefix' => '$',
                                        'value' => strval($income),
                                        'growth' => '4.20%', ////
                                        'period' => 'Since Last Month', /////
                                        'icon' => 'MdOutlineStoreMallDirectory',
                                        'color' => 'bg-gradient-to-r from-indigo-500 to-purple-500',
                                    ],
                                    [
                                        'name' => 'Sales',
                                        'prefix' => '$',
                                        'value' => strval($totalQuantity),
                                        'growth' => '-1.40%', ///// temp
                                        'period' => 'Since Last Month', /////
                                        'icon' => 'MdOutlineSell',
                                        'color' => 'bg-gradient-to-r from-blue-500 to-cyan-500',
                                    ],
                                    [
                                        'name' => 'Orders',
                                        'prefix' => '+', /////
                                        'value' => strval($orderlength), /////
                                        'growth' => '72%', ///
                                        'period' => 'Since Last Month', ////
                                        'icon' => 'MdOutlineShoppingCart',
                                        'color' => 'bg-gradient-to-r from-orange-400 from-[-40%] via-yellow-500 to-yellow-400 to-[100%]',
                                    ],
                                    [
                                        'name' => 'Users',
                                        'prefix' => '+', /////
                                        'value' => strval($users), /////
                                        'growth' => '20.20%', ////
                                        'period' => 'Since Last Month', ////
                                        'icon' => 'MdOutlineGroupAdd',
                                        'color' => 'bg-gradient-to-r from-green-500 to-lime-400',
                                    ],
                                ],
                            ]
                        ],
                ]
            );
        } else if ($type == 'quantity') {
            $sales = Order::with('items.product')->get();

            $ordersData = [];
            foreach ($sales as $order) {
                $totalQuantity = 0;
                foreach ($order->items as $item) {
                    $totalQuantity += $item->quantity;
                }

                $ordersData[] = [
                    'order_id' => $order->id,
                    'total_quantity' => $totalQuantity,
                ];
            }

            return response()->json(
                [
                    'message' => 'berhasil fetching',
                    'length' => ['orders' => $orderlength, 'product' => $productlength],
                    'data' => [
                        'sales-' . $monthName => $sales,
                        'order_data' => $ordersData,
                    ],
                ]
            );
        }
        return response(['message' => 'no matched chart types', 'length' => 0, 'data' => []], 404);
    }
}

