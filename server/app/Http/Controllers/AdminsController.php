<?php

namespace App\Http\Controllers;

// import model
use App\Models\Admin;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

// import resource butuh satu setipa method post/get
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminsController extends Controller
{
    public function index()
    {
        //get all posts
        $admins = Admin::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data Admin', $admins);
    }

    public function find($id) {
        return new PostResource(true, "data admin :", Admin::find($id));
    }

    public function store(Request $request){
        if ($request->input('role_admin') === "0") {
            $validator = Validator::make($request->all(), [
                "email" => 'required|email|unique:admins,email',
                "username" => 'required',
                "pw" => 'required|min:6',
                "role"=> "required|numeric"
            ]);

            if ($validator->fails()) {
                return new PostResource(false, "validasi data error", ['errors'=>$validator->errors(), 'old_input'=>$request->all()]);
            }
            
            if (Admin::create($request->except(['role_admin'])) !== false) {
                return new PostResource(true, "Admin berhasil ditambahkan.", $request->only(['email', 'username']));
            } else {
                return new PostResource(false, "validasi data error", "Something went wrong with the DB :(");
            }
        }
        return new PostResource(false, "Akun admin gagal ditambahkan", "Akun anda tidak punya akses dalam pembuatan akun admin.");
    }

    public function update(Request $request){
             
        $validator = Validator::make($request->all(), [
            "email" => ['required', 'email', Rule::unique('admins', 'email')->ignore($request->input('id'))],
            "username" => 'required',
            "pw" => 'required|min:6',
            "newPw" => 'min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return new PostResource(false, "validasi data error", ['errors'=>$validator->errors(), 'old_input'=>$request->except('id')]);
        }

        $updateAdmin = Admin::find($request->input('id'));

        // cek password lama
        if (!Hash::check($request->input('pw'), $updateAdmin->pw)) {
            return new PostResource(false, "Password lama salah.", ['old_input'=>$request->except('id')]);
        }

        // isi data baru
        $updateAdmin->username = $request->input('username');
        $updateAdmin->email = $request->input('email');
        if ($request->input('newPw') !== null) {
            $updateAdmin->pw = $request->input('newPw');
        } else {
            $updateAdmin->pw = $request->input('pw');
        }
        // if ($updateAdmin->role == 0) {
        //     $updateAdmin->role = $request->input('role');
        // }
        $updateAdmin->pict = $request->input('pict');
        return new PostResource(true, "User ter-update.", $updateAdmin->update());
    }
}
