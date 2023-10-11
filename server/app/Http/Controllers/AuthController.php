<?php

namespace App\Http\Controllers;

// import model

use App\Http\Resources\PostResource;
use App\Models\Admin;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    // public function register() {
    //     $validator = Validator::make(request()->all(),[
    //         'username' => 'required',
    //         'email' => 'required|email|unique:users',
    //         'password' => 'required'
    //     ]);

    //     if ($validator->fails()) {
    //         return response(new PostResource(false, 'registrasi gagal', $validator->errors()), 400);
    //     }

    //     $addUser = User::create(request()->all());
    //     if ($addUser) {
    //         return response()->json(['message' => 'Registrasi berhasil']);
    //     } else {
    //         return response()->json(['message' => 'Registrasi gagal']);
    //     }
    // }

    // public function login()
    // {
    //     $credentials = request(['email', 'password']);

    //     if (! $token = auth('api')->attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     // return $token;
    //     return $this->respondWithToken($token);
    // }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
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
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
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
