<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     * admin only
     */
    public function index(Request $request)
    {
        if (AuthController::check($request)==='admin') {
            return new PostResource(true, 'List Data Pembayaran', Payment::all());
        }
        return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
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
     * user only
     * parameter: order_id| transaction_id, amount, payment_method; status(auto fill 'waiting for confirmation')
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required',
            // for payment
            'transaction_id' => 'required',
            'amount' => 'required',
            'payment_method' => 'required',
        ]);

        if ($validator->fails()) { // jika validasi gagal
            return response(new PostResource(false, 'validasi data eror', ['error' => $validator->errors(), 'old_input' => $request->all()]), 400)->header('Content-Lenght', strlen(json_encode($request->all())));
        }

        $order = Order::find($request->input('order_id'));
        // cek order, jika order sudah dibatalkan maka payment akan ditolak
        if (!in_array($order->status, ['Pending', 'Awaiting Payment'])) {
            return response(new PostResource(false, 'Order tidak membutuhkan pembayaran, mohon periksa kembali status Order', ['old_input' => $request->all()]), 400)->header('Content-Lenght', strlen(json_encode($request->all())));
        }
        // cek jumlah pembayaran
        if ($order->total_price > $request->input('amount')) {
            return response(new PostResource(false, 'Jumlah pembayaran tidak cukup', ['old_input' => $request->all()]), 400)->header('Content-Lenght', strlen(json_encode($request->all())));
        }
        // ambil user_id dari token
        $user_id = json_decode(base64_decode(explode('.', $request->input('token'))[1]))->id;
        // return AuthController::check($request);
        if ((AuthController::check($request) === 'user') && ($order->user_id == $user_id)) {
            $insertPayment = new Payment($request->except('token'));
            $insertPayment->status = 'waiting';
            if($insertPayment->save()){
                $order->payment_id = $insertPayment->id;
                $order->update();
                return new PostResource(true, 'Pembayaran Berhasil ditambahkan', $order);
            }
        }
        return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment, Request $request)
    {
        if (AuthController::check($request)==='admin') {
            return response(new PostResource(true, 'List Data Pembayaran', $payment))->header('Content-Lenght', strlen(json_encode($payment)));
        }
        return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
    }
    /**
     * Display the specified resource.
     */
    public function showByStatus(Request $request)
    {
        if (AuthController::check($request)==='admin') {
            $payment = Payment::where('status','LIKE',$request->input('status'))->get();
            return response(new PostResource(true, 'List Data Pembayaran by status', $payment))->header('Content-Lenght', strlen(json_encode($payment)));
        }
        return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * admin only
     * only for changing the status
     * parameter token, status
     */
    public function update(Request $request, Payment $payment)
    {
        if (AuthController::check($request)==='admin') {
            $payment->status = $request->input('status');
            if ($payment->update()) {
                return response(new PostResource(true, 'berhasil mengubah status Pembayaran', $payment))->header('Content-Lenght', strlen(json_encode($payment)));
            }
            return response(new PostResource(false, 'Failed to update. something went wrong, sowwyy :(', null), 400);
        }
        return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
