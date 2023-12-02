<?php

namespace App\Http\Controllers;

// import model

use stdClass;
use App\Models\User;
use App\Models\Admin;

use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api')->only('registerAdmin');
    // }

    public function register(Request $request) {
        // $validator = Validator::make(request()->all(),[
        //     'username' => 'required',
        //     'email' => 'required|email|unique:users',
        //     'password' => 'required'
        // ]);

        // if ($validator->fails()) {
        //     return response(new PostResource(false, 'registrasi gagal', $validator->errors()), 400);
        // }

        // $addUser = User::create(request()->all());
        // if ($addUser) {
        //     return response()->json(['message' => 'Registrasi berhasil']);
        // } else {
        //     return response()->json(['message' => 'Registrasi gagal']);
        // }

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
            return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
        }
        $addUser = User::create($request->all());
        return response(new PostResource(true, "User berhasil ditambahkan.", $addUser), 201);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // return $token;
        return $this->respondWithToken($token);
    }

    public function loginAdmin(Request $request)
    {
        // cek email
        if ($admin = Admin::firstWhere('email', $request->input('email'))) {
            // cek password
            if (!Hash::check($request->input('password'), $admin->password)) {
                return response(['message' => 'Password salah', $request->except('password')], 406);
            } else {
                $credentials = request(['email', 'password']);
                $token = auth('admin')->attempt($credentials);
                return $this->respondWithToken($token);
            }
        } else {
            return response(['message' => 'Email tidak ada', $request->except('email')], 406);
        }
    }

    public function registerAdmin(Request $request)
    {
        if ($this->check($request)) {
            // return 'yay';
            if ($request->input('superAuthorizationPassword') === "superAdmin") {
                $admin = new stdClass(); // membuat objek php baru
                $admin->id = Admin::max('id') + 1; // mencari nilai id tertinggi lalu ditambah 1 untuk unique
                $admin->name = $request->input('username');

                $pict = $request->input('pict');

                if ($pict) { // Test: Pass
                    $newPictValue = $this->uploadImage($pict, $admin);
                    // if ($oldName === $name) {
                    //     $modifedFileStatus = 'not changed';
                    // }
                    $request->merge(['pict' => $newPictValue]);
                } else {
                    $request->merge(['pict' => 'default.jpg']);
                }

                $validator = Validator::make($request->all(), [
                    "email" => 'required|email|unique:admins,email',
                    "username" => 'required',
                    "password" => 'required|min:6',
                    "role" => "required|numeric"
                ]);

                if ($validator->fails()) {
                    return response(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()], 400);
                }

                if (Admin::create($request->except(['superAuthorizationPassword'])) !== false) {
                    return new PostResource(true, "Admin berhasil ditambahkan.", $request->only(['email', 'username']));
                } else {
                    return response(['message' => 'validasi data error', 'error' => 'create()'], 406);
                }
            }
            return response(['message' => 'Akun admin gagal ditambahkan, Akun anda tidak punya akses dalam pembuatan akun admin.', 'error' => $request->input()], 406);
        }
        return response(new PostResource(false, 'Validasi gagal', 'forbidden action detected'), 403);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    static function check(Request $request)
    {
        // return auth('admin')->user();
        if (strlen(strval(auth('admin')->user())) > 5) {
            return 'admin';
        } elseif (strlen(strval(auth()->user())) > 5) {
            return 'user';
        } return false;
        // return response()->json(auth('admin')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $cookie = cookie('access_token', $token, config('auth.ttl'), null, null, false, true);
        // Return JSON response with access token
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ])->withCookie($cookie);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    // public function guard()
    // {
    //     return Auth::guard();
    // }
}
