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
        $users = User::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data Admin', $users);
    }

    public function login(Request $request)
    {
        // inisiasi awal respon
        $respon = PostResource::make(false, 'login gagal', $request->except('auth_key'), 400);
        // validasi
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required",
            "auth_key" => "required",
        ]);
        if ($validator->fails()) {
            $respon->message = "validasi data error";
            $respon->resource = ['errors' => $validator->errors(), 'old_input' => $request->except('auth_key')];
            return $respon;
        }

        // auth_key = cikidaw
        if (!Hash::check($request->input('auth_key'), '$2y$10$eESkk5EgGHwBqUtGujWmkevQphwrPmkY3LH88Kpxw20p6VZ4kA9bi')) {
            $respon->code = 403;
            return $respon;
        }

        // cek email
        if ($user = User::firstWhere('email', $request->input('email'))) {
            // cek password
            if (!Hash::check($request->input('password'), $user->password)) {
                $respon->message = "Password salah";
                return $respon;
            } else {
                $respon->status = true;
                $respon->message = 'login berhasil';
                $respon->resource = $user->makeHidden(['password', 'created_at', 'updated_at']);
                $respon->code = 200;
                return $respon;
            }
        } else {
            $respon->message = 'Email salah';
            $respon->code = 401;
            return $respon;
        }
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
            return new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()], 400);
        }
        $addUser = User::create($request->all());
        return new PostResource(true, "User berhasil ditambahkan.", $addUser, 201);
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
        // initiate rule for validation
        $rule = [
            "email" => ['required', 'email', Rule::unique('users', 'email')->ignore($request->input('id'))],
            "username" => 'required',
            "password" => 'required|min:6'
        ];

        // if user issuing newPassword then add rule list
        if ($request->input("newPassword") !== null) {
            $rule = array_merge($rule, ["newPassword" => "min:6|confirmed"]);
        }
        $validator = Validator::make($request->all(), $rule);

        if ($validator->fails()) {
            return new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->except('id')], 400);
        }

        // cek password lama
        if (!Hash::check($request->input('password'), $updateUser->password)) {
            return new PostResource(false, "Password lama salah.", ['old_input' => $request->except('id')], 403);
        }

        // isi data baru
        $updateUser->email = $request->input('email');
        $updateUser->username = $request->input('username');
        if ($request->input('newPassword') !== null) {
            $updateUser->password = $request->input('password');
        } else {
            $updateUser->password = $request->input('password');
        }
        $updateUser->address = $request->input('address');
        // $updateUser->verified = $request->input('verified');
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
