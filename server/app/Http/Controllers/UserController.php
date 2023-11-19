<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Hash;
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
        return new PostResource(true, 'List Data User', $users);
    }
    public function showLimit($page, $perPage)
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int)$page; // halaman
        $perPage = (int)$perPage; // jumlah data yang akan di kirim

        $length = User::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mengambil data Admin dengan paginasi dan offset
        $users = User::skip($offset)->take($perPage)->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $users);
    }
    public function login(Request $request)
    {
        // validasi
        // $validator = Validator::make($request->all(), [
        //     "email" => "required|email",
        //     "password" => "required",
        //     "auth_key" => "required",
        // ]);
        // if ($validator->fails()) {
        //     $respon->message = "validasi data error";
        //     $respon->resource = ['errors' => $validator->errors(), 'old_input' => $request->except('auth_key')];
        //     return response($respon, 400);
        // }

        // // auth_key = cikidaw
        // if (!Hash::check($request->input('auth_key'), '$2y$10$eESkk5EgGHwBqUtGujWmkevQphwrPmkY3LH88Kpxw20p6VZ4kA9bi')) {
        //     return response($respon, 403);
        // }

        // inisiasi awal respon
        $respon = PostResource::make(false, 'login gagal', $request->except('password'));
        // cek email
        if ($user = User::firstWhere('email', $request->input('email'))) {
            // cek password
            if (!Hash::check($request->input('password'), $user->password)) {
                $respon->message = "Password salah";
                return response($respon, 401);
            } else {
                $credentials = request(['email', 'password']);
                $token = auth()->attempt($credentials);
                return $this->respondWithToken($token);
            }
        } else {
            $respon->message = 'Email salah';
            return response($respon, 401);
        }
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    // public function logout()
    // {
    //     auth()->logout();

    //     return response()->json(['message' => 'Successfully logged out']);
    // }

    // public function refresh()
    // {
    //     return $this->respondWithToken(auth()->refresh());
    // }

    // protected function respondWithToken($token)
    // {
    //     return response()->json([
    //         'access_token' => $token,
    //         'token_type' => 'bearer',
    //         'expires_in' => auth()->factory()->getTTL() * 60
    //     ]);
    // }

    /**
     * Store a newly created resource in storage.
     * Registrasi/add user pindah ke authController
     */     
    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         "email" => 'required|email|unique:users,email',
    //         "username" => 'required',
    //         "password" => 'required|min:6',
    //     ]);
    //     // $validated = $request->validate([
    //     //     "email" => 'required|email|unique:users,email',
    //     //     "username" => 'required',
    //     //     "password" => 'required|min:6',
    //     // ]);
    //     if ($validator->fails()) {
    //         return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
    //     }
    //     $addUser = User::create($request->all());
    //     return response(new PostResource(true, "User berhasil ditambahkan.", $addUser), 201);
    // }

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
            return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->except('id')]), 400);
        }

        // cek password lama
        if (!Hash::check($request->input('password'), $updateUser->password)) {
            return response(new PostResource(false, "Password lama salah.", ['old_input' => $request->except('id')]), 403);
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
