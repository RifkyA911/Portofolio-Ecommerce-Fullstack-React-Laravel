<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Shipment;
use App\Models\Order_item;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Input\Input;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return collection of posts as a resource
        return response(new PostResource(true, 'List Data Produk', $hasil = Order::all()))->header('Content-Length', strlen($hasil));
        // return new PostResource(true, 'List Data Produk', "/1/" . strtotime(now()));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function showLimit($page, $perPage, $sortBy = null, $sortOrder = "asc")
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int) $page; // halaman
        $perPage = (int) $perPage; // jumlah data yang akan dikirim

        $length = Order::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mendapatkan parameter 'status' dari URL sebagai array
        $statuses = request()->input('status', []);

        // Membuat query dasar
        $query = Order::query();

        // Menambahkan kondisi where berdasarkan parameter 'status'
        if (!empty($statuses)) {
            $query->whereIn('status', $statuses);
            $length = $query->count();
        }

        // Menambahkan pengurutan khusus untuk kolom 'status'
        if ($sortBy == "status") {
            $statusOrder = ['Pending', 'Awaiting Payment', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled', 'On Hold', 'Returned', 'Partially Shipped', 'Backordered', 'Failed'];
            $orderByExpression = "FIELD(status, '" . implode("', '", $statusOrder) . "')";
            $query->orderByRaw($orderByExpression . ' ' . $sortOrder);
        } else {
            // Menambahkan pengurutan jika disediakan
            if ($sortBy == "updated_at" || $sortBy == "deadline_payment") {
                $query->orderBy($sortBy, $sortOrder);
            }
        }

        // Mengeksekusi query dengan offset dan perPage yang sesuai
        $orders = $query->skip($offset)->take($perPage)->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length, 'status' => $statuses], $orders);
    }


    /**
     * Store a newly created resource in storage.
     * adding shipment tabel & order_item tabel
     * parameter order_item memakai JSON cth :
     * [{"product_id":"2","quantity":"7"},{"product_id":"7","quantity":"3","discount":"20"}]
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'order_item' => 'required',
            // for shipment
            'address' => 'required',
            'contact' => 'required',
            'courier' => 'required',
            'shipment_cost' => 'required',
            // 'total_price' => 'required',
        ]);

        if ($validator->fails()) { // jika validasi gagal
            // return response(false, 'validasi data eror', ['error' => $validator->errors(), 'old_input' => $request->all()], 400);
            return response(new PostResource(false, 'validasi data eror', ['error' => $validator->errors(), 'old_input' => $request->all()]), 400)->header('Content-Lenght', strlen(strval($request->all())));
            ;
        }

        $order_item = json_decode($request->input('order_item'), true);
        $order_id = Order::max('id') + 1;
        $shipment_id = Shipment::max('id') + 1;

        $product_id = [];
        $total_price = 0;
        foreach ($order_item as $item) {
            array_push($product_id, $item['product_id']);
            $item_price = Product::find($item['product_id'])->price * $item['quantity'];
            //##########insert tabel order_items#############
            $insertOrder_item = new Order_item;
            $insertOrder_item->order_id = $order_id;
            $insertOrder_item->product_id = $item['product_id'];
            $insertOrder_item->quantity = $item['quantity'];
            $insertOrder_item->sum_price = $item_price;
            if (isset($item['comment'])) {
                $insertOrder_item->comment = $item['comment'];
            }
            if (isset($item['discount'])) {
                $insertOrder_item->discount = $item['discount'];
                $item_price *= (100 - $item['discount']) / 100;
            }
            $insertOrder_item->save();
            $total_price += ceil($item_price);  // bulatkan keatas hehe :v
        }
        // return ['product_id' => $product_id, 'total_price' =>$total_price];
        // ########## insert Shipment ###########
        $parameterShipment = [
            'consignee' => User::find($request->input('user_id'))->username,
            'address' => $request->input('address'),
            'contact' => $request->input('contact'),
            'courier_service' => $request->input('courier'),
            'cost' => $request->input('shipment_cost'),
        ];
        if (!Shipment::create($parameterShipment)) {
            return response(new PostResource(false, 'Transaksi gagal, something wrong in shipment', ['old_input' => $request->all()]), 400)->header('Content-Lenght', strlen(strval($request->all())));
        }

        // ###### insert Order ######
        $parameterOrder = [
            'user_id' => $request->input('user_id'),
            'shipment_id' => $shipment_id,
            'no_invoice' => 'INV/' . explode("-", now())[0] . explode("-", now())[1] . "/" . $request->input('user_id') . "/$order_id",
            'total_price' => $total_price,
        ];
        if ($hasil = Order::create($parameterOrder)) {
            return response(new PostResource(true, 'Transaksi berhasil', $hasil), 201)->header('Content-Lenght', strlen($hasil));
        }
        return response(new PostResource(false, 'Transaksi gagal', ['old_input' => $request->all()]), 400)->header('Content-Lenght', strlen(strval($request->all())));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response(new PostResource(true, "data Transaksi berdasarkan id :", $hasil = Order::find($id)))->header('Content-Lenght', strlen($hasil));
        ;
    }

    public function showByUser($user_id, $tahap = null)
    {
        $pesan = "data Transaksi berdasarkan user tahap " . $tahap . " :";
        // parameter tahap berisi null atau status pesanan
        if ($tahap !== null) {
            $trans = Order::where([
                ['user_id', '=', $user_id],
                ['status', '=', $tahap]
            ])->get();
        } else {
            $trans = Order::where('user_id', '=', $user_id)->get();
            $pesan = "data Transaksi berdasarkan user :";
        }
        return response(new PostResource(true, $pesan, $trans))->header('Content-Lenght', strlen($trans));
    }

    public function showByAdmin($admin_id, $tahap = null)
    {
        $pesan = "data Transaksi berdasarkan admin tahap " . $tahap . " :";
        // parameter tahap berisi null atau status pesanan
        if ($tahap !== null) {
            $trans = Order::where([
                ['admin_id', '=', $admin_id],
                ['status', '=', $tahap]
            ])->get();
        } else {
            $trans = Order::where('admin_id', '=', $admin_id)->get();
            $pesan = "data Transaksi berdasarkan admin :";
        }
        return new PostResource(true, $pesan, $trans);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    // update comment by admin
    public function comment(Request $request)
    {
        $transaksi = Order::find($request->input('id'));
        if ($request->has('role_admin') && $request->has('admin_id')) {
            $transaksi->comment = $request->input('comment');
            return new PostResource(true, 'Comment berhasil diubah', $transaksi->update());
        } else {
            return response(new PostResource(false, 'Comment gagal diubah', 'forbidden action detected'), 403);
        }
    }


    // update status checkout - for user
    public function checkout(Request $request)
    {
        $id = $request->input('id');
        $user_id = $request->input('user_id');
        $transaksi = Order::find($id);
        if ($transaksi->user_id == $user_id) {
            $time = now();
            $transaksi->checked_out = $time;
            $transaksi->no_invoice = 'INV/' . explode("-", $time)[0] . explode("-", $time)[1] . "/$user_id/$id";
            $transaksi->payment = $request->input('payment');
            return new PostResource(true, 'Transaksi berhasil', $transaksi->update());
        } else {
            return response(new PostResource(false, 'Gagal check out, forbidden action detected', $request->all()), 403);
        }
    }
    // update status sent - for admin
    public function sent(Request $request)
    {
        $transaksi = Order::find($request->input('id'));
        if ($request->has('role_admin') && $request->has('admin_id') && ($transaksi->sent == null)) {
            $transaksi->sent = now();
            $transaksi->admin_id = $request->input('admin_id');
            return new PostResource(true, 'Status transaksi berhasil diubah', $transaksi->update());
        } else {
            return response(new PostResource(false, 'Status transaksi gagal diubah', 'forbidden action detected'), 403);
        }
    }
    // update status done - for user or automatically(?)
    public function done(Request $request)
    {
        $transaksi = Order::find($request->input('id'));
        // check if admin is same as Order's admin_id, or th user is same as Order's user_id
        if (($request->has('role_admin') && ($request->input('admin_id') == $transaksi->admin_id)) || ($transaksi->user_id == $request->input('user_id'))) {
            $transaksi->done = now();
            return new PostResource(true, 'Status transaksi berhasil diubah', $transaksi->update());
        } else {
            return response(new PostResource(false, 'Status transaksi gagal diubah', 'forbidden action detected'), 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
