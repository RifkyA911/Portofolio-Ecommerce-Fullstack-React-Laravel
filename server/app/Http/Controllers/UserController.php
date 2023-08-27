<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
// use Validator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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
            return new PostResource(false, "validasi data error", ['errors'=>$validator->errors(), 'old_input'=>$request->all()]);
        }
        $addUser = User::create($request->all());
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
    public function update(Request $request)
    {
        $updateUser = User::find($request->input('id'));
        $validator = Validator::make($request->all(), [
            "email" => ['required', 'email', Rule::unique('users', 'email')->ignore($request->input('id'))],
            "username" => 'required',
            "password" => 'required|min:6',
            "new-password" => 'min:6|confirmed'
        ]);
        
        if ($validator->fails()) {
            return new PostResource(false, "validasi data error", ['errors'=>$validator->errors(), 'old_input'=>$request->except('id')]);
        }
                        
        // cek password lama
        if (!Hash::check($request->input('password'), $updateUser->password)) {
            return new PostResource(false, "Password lama salah.", ['old_input'=>$request->except('id')]);
        }

        // isi data baru
        $updateUser->email = $request->input('email');
        $updateUser->username = $request->input('username');
        if ($request->input('new-password') !== null) {
            $updateUser->password = $request->input('password');
        } else {
            $updateUser->password = $request->input('password');
        }
        $updateUser->address = $request->input('address');
        $updateUser->verified = $request->input('verified');
        $updateUser->pict = $request->input('pict');
        return new PostResource(true, "User ter-update.", $updateUser->update());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
