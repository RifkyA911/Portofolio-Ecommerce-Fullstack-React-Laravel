<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;


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
        //
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
    
    public function showByAdmin($adm_id, $tahap = null)
    {
        $pesan = "data Transaksi berdasarkan admin tahap ".$tahap." :";
        // parameter tahap berisi null, checkedout, sent, atau done
        if ($tahap == "checkedout") {
            $trans = Transaction::where([
                ['adm_id', '=', $adm_id],
                ['checked_out', '!=', null]
            ])->get();
        } elseif ($tahap == "sent") {
            $trans = Transaction::where([
                ['adm_id', '=', $adm_id],
                ['sent', '!=', null]
            ])->get();
        } elseif ($tahap == "done") {
            $trans = Transaction::where([
                ['adm_id', '=', $adm_id],
                ['done', '!=', null]
            ])->get();
        } else {
            $trans = Transaction::where('adm_id', '=', $adm_id)->get();
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
