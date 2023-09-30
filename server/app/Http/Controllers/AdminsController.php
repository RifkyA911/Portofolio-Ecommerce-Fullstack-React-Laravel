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

    public function showLimit($page, $perPage)
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int)$page; // halaman
        $perPage = (int)$perPage; // jumlah data yang akan di kirim

        $length = Admin::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mengambil data Admin dengan paginasi dan offset
        $admins = Admin::skip($offset)->take($perPage)->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $admins);
    }

    public function login(Request $request)
    {
        // inisiasi awal respon
        $respon = PostResource::make(false, 'SUSpicious activity detected', $request->except('auth_key'));
        // validasi
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required",
            "auth_key" => "required",
        ]);
        if ($validator->fails()) {
            $respon->message = "validasi data error";
            $respon->resource = ['errors' => $validator->errors(), 'old_input' => $request->except('auth_key')];
            return response($respon, 400);
        }

        // auth_key = cikidaw
        if (!Hash::check($request->input('auth_key'), '$2y$10$eESkk5EgGHwBqUtGujWmkevQphwrPmkY3LH88Kpxw20p6VZ4kA9bi')) {
            return response($respon, 404);
        }

        // cek email
        if ($admin = Admin::firstWhere('email', $request->input('email'))) {
            // cek password
            if (!Hash::check($request->input('password'), $admin->password)) {
                $respon->message = "Password salah";
                return response($respon, 401);
            } else {
                $respon->status = true;
                $respon->message = 'login berhasil';
                $respon->resource = $admin->makeHidden(['password', 'created_at', 'updated_at']);
                return response($respon, 200);
            }
        } else {
            $respon->message = 'Email salah';
            return response($respon, 401);
        }
    }

    public function find($id)
    {
        return new PostResource(true, "data admin :", Admin::find($id));
    }

    public function store(Request $request)
    {
        if ($request->input('role_admin') === "0") {
            $validator = Validator::make($request->all(), [
                "email" => 'required|email|unique:admins,email',
                "username" => 'required',
                "password" => 'required|min:6',
                "role" => "required|numeric"
            ]);

            if ($validator->fails()) {
                return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
            }

            if (Admin::create($request->except(['role_admin'])) !== false) {
                return new PostResource(true, "Admin berhasil ditambahkan.", $request->only(['email', 'username']));
            } else {
                return response(new PostResource(false, "validasi data error", "Something went wrong with the DB :("), 403);
            }
        }
        return response(new PostResource(false, "Akun admin gagal ditambahkan", "Akun anda tidak punya akses dalam pembuatan akun admin."), 403);
    }

    public function update(Request $request)
    {
        $updateAdmin = Admin::find($request->input('id'));
        // initiate rule for validation
        $rule = [
            "email" => ['required', 'email', Rule::unique('admins', 'email')->ignore($request->input('id'))],
            "username" => 'required',
            "password" => 'required|min:6'
        ];

        // if an Admin issuing newPassword then add rule list
        if ($request->input("newPassword") !== null) {
            $rule = array_merge($rule, ["newPassword" => "min:6|confirmed"]);
        }
        $validator = Validator::make($request->all(), $rule);

        if ($validator->fails()) {
            return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->except('id')]), 400);
        }

        // cek password lama
        if (!Hash::check($request->input('password'), $updateAdmin->password)) {
            return response(new PostResource(false, "Password lama salah.", ['old_input' => $request->except('id')]), 401);
        }

        // isi data baru
        $updateAdmin->username = $request->input('username');
        $updateAdmin->email = $request->input('email');
        if ($request->input('newPassword') !== null) {
            $updateAdmin->password = $request->input('newPassword');
        } else {
            $updateAdmin->password = $request->input('password');
        }
        // if ($updateAdmin->role == 0) {
        //     $updateAdmin->role = $request->input('role');
        // }
        $updateAdmin->pict = $request->input('pict');
        return new PostResource(true, "User ter-update.", $updateAdmin->update());
    }
}
