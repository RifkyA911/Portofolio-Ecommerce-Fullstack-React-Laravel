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
        //
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
        } else{
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
