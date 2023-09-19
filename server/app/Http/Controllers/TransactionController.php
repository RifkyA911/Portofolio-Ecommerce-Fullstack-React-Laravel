<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Input\Input;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return collection of posts as a resource
        return new PostResource(true, 'List Data Produk', Transaction::all());
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
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'products_id' => 'required',
            'total_price' => 'required',
        ]);

        if ($validator->fails()) {  // jika validasi gagal
            return response(new PostResource(false, 'validasi data eror', ['error' => $validator->errors(), 'old_input' => $request->all()]), 400);
        }

        if ($hasil = Transaction::create($request->all())) {
            return response(new PostResource(true, 'Transaksi berhasil', $hasil), 201);
        }
        return response(new PostResource(false, 'Transaksi gagal', ['old_input' => $request->all()]), 400);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new PostResource(true, "data Transaksi berdasarkan id :", Transaction::find($id));
    }

    public function showByUser($uid, $tahap = null)
    {
        $pesan = "data Transaksi berdasarkan user tahap ".$tahap." :";
        // parameter tahap berisi null, checkedout, sent, atau done
        if ($tahap == "checkedout") {
            $trans = Transaction::where([
                ['user_id', '=', $uid],
                ['checked_out', '!=', null]
                ])->get();
            } elseif ($tahap == "sent") {
                $trans = Transaction::where([
                ['user_id', '=', $uid],
                ['sent', '!=', null]
                ])->get();
            } elseif ($tahap == "done") {
            $trans = Transaction::where([
                ['user_id', '=', $uid],
                ['done', '!=', null]
                ])->get();
            } else {
                $trans = Transaction::where('user_id', '=', $uid)->get();
                $pesan = "data Transaksi berdasarkan user :";
            }
        return new PostResource(true, $pesan, $trans);
    }
    
    public function showByAdmin($admin_id, $tahap = null)
    {
        $pesan = "data Transaksi berdasarkan admin tahap ".$tahap." :";
        // parameter tahap berisi null, checkedout, sent, atau done
        if ($tahap == "checkedout") {
            $trans = Transaction::where([
                ['admin_id', '=', $admin_id],
                ['checked_out', '!=', null]
            ])->get();
        } elseif ($tahap == "sent") {
            $trans = Transaction::where([
                ['admin_id', '=', $admin_id],
                ['sent', '!=', null]
            ])->get();
        } elseif ($tahap == "done") {
            $trans = Transaction::where([
                ['admin_id', '=', $admin_id],
                ['done', '!=', null]
            ])->get();
        } else {
            $trans = Transaction::where('admin_id', '=', $admin_id)->get();
            $pesan = "data Transaksi berdasarkan admin :";
        }
        return new PostResource(true, $pesan, $trans);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    // update status checkout
    public function checkout(Request $request) {
        $transaksi = Transaction::find($request->input('id'));
        if ($transaksi->user_id == $request->input('user_id')) {
            $transaksi->checked_out = now();
            return new PostResource(true, 'Transaksi berhasil', $transaksi->update());
        } else {
            return response(new PostResource(false, 'Gagal check out, forbidden action detected', $request->all()), 403);
        }
    }
    // update status sent
    public function sent(Request $request) {
        $transaksi = Transaction::find($request->input('id'));
        if ($request->has('role_admin') && $request->has('admin_id') && ($transaksi->sent == null)) {
            $transaksi->sent = now();
            $transaksi->admin_id = $request->input('admin_id');
            return new PostResource(true, 'Status transaksi berhasil diubah', $transaksi->update());
        } else {
            return response(new PostResource(false, 'Status transaksi gagal diubah', 'forbidden action detected'), 403);
        }
    }
    // update status done
    public function done(Request $request) {
        $transaksi = Transaction::find($request->input('id'));
        // check if admin is same as transaction's admin_id, or th user is same as transaction's user_id
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
    public function destroy(Transaction $transaction)
    {
        //
    }
}
