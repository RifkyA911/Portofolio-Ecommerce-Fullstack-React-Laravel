<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Controllers\DialogController;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::select('messages.*', 'users.username as customer_name', 'users.pict as user_pict', 'admins.pict as admin_pict', 'admins.username as admin_name')
            ->leftJoin('users', 'messages.user_id', '=', 'users.id')
            ->leftJoin('admins', 'messages.admin_id', '=', 'admins.id')
            ->get();
        // return new PostResource(true, 'Daftar pesan', Message::all());
        return new PostResource(true, 'Daftar pesan', $messages);
    }

    public function showLimit($page, $perPage)
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int)$page; // halaman
        $perPage = (int)$perPage; // jumlah data yang akan di kirim

        $length = Message::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mengambil data Message dengan paginasi dan offset
        $messages = Message::select('messages.*', 'users.username as customer_name', 'users.pict as user_pict', 'admins.pict as admin_pict', 'admins.username as admin_name')
            ->leftJoin('users', 'messages.user_id', '=', 'users.id')
            ->leftJoin('admins', 'messages.admin_id', '=', 'admins.id')
            ->skip($offset)->take($perPage)->get();
        // $message = Message::skip($offset)->take($perPage)->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $messages);
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
    public function store(Request $request, DialogController $dialogController)
    {
        // if new conversation/dialog
        if (!$request->has('dialog_id')) {
            // call dialog function for create new dialog
            // then get the id
            $dialog = $dialogController->store($request);
            $dialog_id = $dialog->resource->id;
            // $dialog_id = 5;
            $data = array_merge($request->except('product_id'), ['dialog_id' => $dialog_id]);
        } else {
            $data = $request->except('product_id');
        }

        // return $data;
        if ($result = Message::create($data)) {
            return response(new PostResource(true, 'pesan berhasil dibuat', $result), 201);
        }
        return response(new PostResource(false, 'pesan gagal dibuat', ['old_input' => $request]), 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    public function getByDialog(Request $request)
    {
        $messages = Message::where('dialog_id', $request->input('dialog_id'))->get();
        return new PostResource(true, 'Daftar pesan', $messages);
    }

    public function getByUser(Request $request)
    {
        $messages = Message::where('user_id', $request->input('user_id'))->get('dialog_id')->unique('dialog_id');
        $dialog_ids = array_column(json_decode($messages), 'dialog_id');
        $result = Message::whereIn('dialog_id', $dialog_ids)->get()->unique('dialog_id');
        // return new PostResource(true, 'Daftar pesan', $result);
        return $result;
    }

    public function getByAdmin(Request $request)
    {
        $messages = Message::where('admin_id', $request->input('admin_id'))->get('dialog_id')->unique('dialog_id');
        $dialog_ids = array_column(json_decode($messages), 'dialog_id');
        $result = Message::whereIn('dialog_id', $dialog_ids)->get()->unique('dialog_id');
        // return new PostResource(true, 'Daftar pesan', $result);
        return $result;
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
