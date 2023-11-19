<?php

namespace App\Http\Controllers;

// import model
use App\Models\Admin;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use stdClass;

use function Laravel\Prompts\select;
use function PHPUnit\Framework\isEmpty;

class AdminsController extends Controller
{
    public function index()
    {
        //get all posts
        $admins = Admin::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data Admin', $admins);
    }

    // public function login(Request $request)
    // {

    //     // cek email
    //     if ($admin = Admin::firstWhere('email', $request->input('email'))) {
    //         // cek password
    //         if (!Hash::check($request->input('password'), $admin->password)) {
    //             return response(['message' => 'Password salah', $request->except('password')], 406);
    //         } else {
    //             $credentials = request(['email', 'password']);
    //             $token = auth('admin')->attempt($credentials);
    //             return $this->respondWithToken($token);
    //         }
    //     } else {
    //         return response(['message' => 'Email tidak ada', $request->except('email')], 406);
    //     }
    // }

    public function me(Request $request)
    {
        return response()->json(auth('admin')->user());
    }

    // public function logout()
    // {
    //     auth()->logout();

    //     return response()->json(['message' => 'Successfully logged out']);
    // }

    // public function refresh()
    // {
    //     return $this->respondWithToken(auth('admin')->refresh());
    // }

    public function find(Request $request, $id)
    {
        if (AuthController::check($request)) {
            return response(["message" => "Data admin " . $id . " :", "data" => Admin::find($id), 'result' => $this->me($request)], 200);
        }
        return response(['error' => 'Validasi gagal', 'message' => 'forbidden action detected', 'result' => $this->me($request)], 403);
    }

    private function notFound()
    {
        return response([
            'message' => [
                'Message' => 'No Data Found',
                'length' => 0,
            ],
            'data' => [
                array(
                    'id' => null,
                    'email' => null,
                    'username' => 'tidak ada',
                    'role' => null,
                    'authority' => null,
                    'phone' => null,
                    'pict' => 'not_found.jpg',
                )
            ]
        ], 200);
    }

    public function getImage($id)
    {
        $product = Admin::find($id);

        if (!$product) {
            return response()->json(['error' => 'ID tidak ditemukan'], 404);
        }

        $pict = $product->pict;
        $imagePath = public_path('img/product_images/' . $pict);

        if (file_exists($imagePath)) {
            return response()->file($imagePath);
        } else {
            return response()->json(['error' => 'File gambar tidak ditemukan'], 404);
        }
    }

    public function search(Request $request)
    {
        if (AuthController::check($request)) {
            $searchTerm = $request->input('search'); // Ambil parameter pencarian dari input form

            $admins = Admin::where(function ($query) use ($searchTerm) {
                $columns = Schema::getColumnListing('admins'); // Mengambil daftar nama kolom dari tabel admins
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', '%' . $searchTerm . '%');
                }
            })->get();

            $length = $admins->count();

            return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $admins);

        }
        return response(new PostResource(false, 'Validasi gagal', 'forbidden action detected'), 403);
    }


    public function showLimit($page, $perPage)
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int) $page; // halaman
        $perPage = (int) $perPage; // jumlah data yang akan di kirim

        $length = Admin::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mengambil data Admin dengan paginasi dan offset
        $admins = Admin::skip($offset)->take($perPage)->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $admins);
    }

    public function filter(Request $request) //////////////////////////////////////////////////
    {
        if (AuthController::check($request)) {
            $SuperAdminKey = $request->input('superAuthorizationPassword');
            $authorities = $request->input('selectedAuthorities');
            $roles = $request->input('selectedRoles') ?? [0, 1];
            $getDateType = $request->input('date_type');
            $startDate = $request->input('date_start');
            $endDate = $request->input('date_end');

            if (!$SuperAdminKey == 'superAdmin') {
                return response(['message' => 'validasi kredensial data error', 'error' => 'bad request client :('], 400);
            }

            if (!is_array($authorities) || !is_array($roles)) {
                return response(['message' => 'authorities or roles field type of data are not array', 'error' => 'bad request client :(', 'failed payload' => $request], 400);
            }

            // Mendefinisikan semua kunci dengan nilai false secara default
            $authorityObject = new stdClass();
            $defaultAuthorities = ["chat", "sort_warehouse", "alter_price"];
            foreach ($defaultAuthorities as $authority) {
                $authorityObject->$authority = false;
            }

            // Mengatur nilai true berdasarkan nilai yang ada dalam $authorities
            foreach ($authorities as $authority) {
                if (property_exists($authorityObject, $authority)) {
                    $authorityObject->$authority = true;
                }
            }

            // return response(['message' => 'coba liat', 'data' => $authorityObject, 'chat' => $authorityObject->chat], 404);

            $dateType = '';
            if ($getDateType) {
                if ($getDateType == 'created_at') {
                    $dateType = 'created_at';
                } else if ($getDateType == 'updated_at') {
                    $dateType = 'updated_at';
                } else {
                    return response(['message' => 'payload->date_type not match', 'error' => 'bad request client :('], 404);
                }
            } else {
                return response(['message' => 'payload->date_type null/error', 'error' => 'bad request client :('], 404);
            }

            $admins = Admin::
                where(function ($query) use ($authorityObject) {
                    foreach ($authorityObject as $authority) {
                        $query->orWhereJsonContains('authority', ['chat' => $authorityObject->chat, 'sort_warehouse' => $authorityObject->sort_warehouse, 'alter_price' => $authorityObject->alter_price]);
                    }
                })
                ->whereIn('role', $roles = !isset($roles) || (is_array($roles) && empty($roles)) ? [0, 1] : $roles)
                ->whereBetween($dateType, [$startDate, $endDate])
                ->get();
            $length = $admins->count();

            if (!$length) {
                return $this->notFound();
            }
            return new PostResource(true, ['Message' => 'Request Search Berhasil', 'length' => $length], $admins);

        }
        return response(new PostResource(false, 'Validasi gagal', 'forbidden action detected'), 403);
    }

    public function store(Request $request)
    {
        if (AuthController::check($request)) {
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

    public function update(Request $request)
    {
        if (AuthController::check($request)) {
            $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');

            $updateAdmin = Admin::find($request->input('id'));
            // return $request;

            // initiate rule for validation
            // jika yang mengedit adalah superAdmin 
            $getSuperAuthorizationPassword === 'superAdmin'
                ?
                ($rule = [
                    "email" => ['required', 'email', Rule::unique('admins', 'email')->ignore($request->input('id'))],
                    "username" => 'required',
                ])
                : ($rule = [
                    "email" => ['required', 'email', Rule::unique('admins', 'email')->ignore($request->input('id'))],
                    "username" => 'required',
                    "password" => 'required|min:6'
                ]);


            // if an Admin issuing newPassword then add rule list
            if ($request->input("newPassword") !== null) {
                $rule = array_merge($rule, ["newPassword" => "min:6|confirmed"]);
            }
            $validator = Validator::make($request->all(), $rule);

            if ($validator->fails()) {
                return response(['message' => "validasi data error", 'errors' => $validator->errors(), 'old_input' => $request->except('id')], 400);
            }

            // cek password lama
            // jika yang mengedit bukan superAdmin 
            if ($getSuperAuthorizationPassword !== 'superAdmin') {
                if (!Hash::check($request->input('password'), $updateAdmin->password)) {
                    return response(['message' => "Password lama salah.", 'old_input' => $request->except('id')], 401);
                }
                ;
            }

            $admin = Admin::find($request->input('id'));
            $oldName = $admin->name; // current data in db
            $oldPict = $admin->pict; // current data in db
            // ~~~~~~ mutasi update variabel separator ~~~~~~
            $name = $request->input('name'); // incoming req
            $pict = $request->input('pict'); // incoming req

            if ($oldPict !== $pict) {
                $wey = true;
            } else {
                $wey = false;
            }
            // if pict req is not null/noChange
            if ($pict !== "noChange") { // Test: Pass
                // if oldName!=name, replace property values in $admin object
                if ($oldName !== $name) {
                    $admin->update(['name' => $name]);
                }
                $newPictValue = $this->uploadImage($pict, $admin);
                $request->merge(['pict' => $newPictValue]);
                $oldFilePath = public_path('img/admin_avatar/' . $oldPict); // Ganti dengan jalur file lama
                if (file_exists($oldFilePath)) {
                    if ($oldPict !== 'default.jpg') { // prevent delete default.jpg
                        // Delete old existing pict file
                        if (unlink($oldFilePath)) {
                            $modifedFileStatus = true;
                        } else {
                            return response(["Failed to rename file", 'error', 404]);
                        }
                    }
                } else {
                    $modifedFileStatus = "Old Pict File is not exist";
                }
            } else { // Test: Pass
                $modifedFileStatus = false;
                $request->merge(['pict' => $admin->pict]);
            }

            // isi data baru
            $updateAdmin->username = $request->input('username');
            $updateAdmin->email = $request->input('email');
            $updateAdmin->pict = $request->input('pict');
            if ($request->input('newPassword') !== null) {
                $updateAdmin->password = $request->input('newPassword');
            } /*else {
        $updateAdmin->password = $request->input('password');
    } */
            if ($updateAdmin->role == 1) { // jika admin role = admin
                $updateAdmin->role = $request->input('role');
            }
            return response(["status" => $updateAdmin->update(), "message" => "product ter-update.", "modifedFileStatus" => $modifedFileStatus ?? null, "oldData" => $wey], 202);

        }
        return response(['error' => 'Validasi gagal', 'message' => 'forbidden action detected', 's' => $this->me($request)], 404);
    }

    public function patch(Request $request)
    {
        if (AuthController::check($request)) {
            $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');
            $adminsId = $request->input('id');

            $updateAdmin = Admin::find($adminsId);

            // Jika yang mengedit adalah superAdmin 
            if ($getSuperAuthorizationPassword === 'superAdmin') {
                // Ambil nilai 'authority' dari request, jika tidak ada, gunakan nilai default
                $authorityValue = $request->input('authority') ?? [
                    "chat" => false,
                    "sort_warehouse" => false,
                    "alter_price" => false
                ];

                // Menggunakan metode update untuk mengupdate data dengan nilai authority yang dinamis
                $updateAdmin->update(['authority' => $authorityValue]);

                return new PostResource(true, "User ter-update.", $updateAdmin);
            } else {
                return new PostResource(false, "SuperAuthorizationPassword salah.", null);
            }

        }
        return response(['error' => 'Validasi gagal', "message" => 'forbidden action detected'], 403);
    }


    public function drop(Request $request)
    {
        if (AuthController::check($request)) {
            $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');
            $adminsId = $request->input('id');

            if ($getSuperAuthorizationPassword !== "superAdmin") {
                return response(['message' => "Authorization gagal, pengenalan kredensial tidak tepat, abort.", 'old_input' => $request->except('id')], 401);
            }

            if (is_array($adminsId)) {
                // Batch delete
                $deletedCount = Admin::whereIn('id', $adminsId)->delete();
                return new PostResource(true, "Berhasil menghapus " . $deletedCount . " admin dengan IDs: " . implode(', ', $adminsId), null);
            } elseif (is_numeric($adminsId)) {
                // Single delete
                $dropAdmin = Admin::find($adminsId);
                if (!$dropAdmin) {
                    return response(['message' => "Admin tidak ditemukan.", 'old_input' => $request->except('id')], 401);
                }
                $deleted = $dropAdmin->delete();
                return new PostResource(true, "Berhasil menghapus admin " . $dropAdmin->username, $deleted);
            } else {
                // Invalid input
                return response(['message' => "Input adminsId tidak valid.", 'old_input' => $request->except('id')], 400);
            }

        }
        return response(['error' => 'Validasi gagal', "message" => 'forbidden action detected'], 403);

    }

    public function uploadImage($imageData, $admin)
    {
        $imageName = 'admin-' . time() . '-' . $admin->id . '-' . Str::slug($admin->name) . '.jpg';
        // jika input pict adalah base64
        if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $matches)) {
            $data = substr($imageData, strpos($imageData, ',') + 1);
            $data = base64_decode($data);
            $imagePath = public_path('img/admin_avatar/') . $imageName; // Tentukan lokasi penyimpanan lokal
            file_put_contents($imagePath, $data); // Simpan gambar secara lokal
            return $imageName;
        } else {
            return 'default.jpg';
        }
    }
}
