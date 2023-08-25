<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get all posts
        $admins = User::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data Admin', $admins);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => 'required|email|unique:users,email',
            "username" => 'required',
            "password" => 'required|min:6',
        ]);
        // $validated = $request->validate([
        //     "email" => 'required|email|unique:users,email',
        //     "username" => 'required',
        //     "password" => 'required|min:6',
        // ]);
        if ($validator->fails()) {
            return new PostResource(false, "validasi data error", $validator->errors());
        }
        $addUser = User::create($validator->validated());
        return new PostResource(true, "User berhasil ditambahkan.", $addUser);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new PostResource(true, "data admin :", User::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
