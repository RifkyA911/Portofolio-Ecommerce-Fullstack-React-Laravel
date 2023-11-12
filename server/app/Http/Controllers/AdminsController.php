<?php

namespace App\Http\Controllers;

// import model
use App\Models\Admin;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\select;

class AdminsController extends Controller
{
    public function index()
    {
        //get all posts
        $admins = Admin::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data Admin', $admins);
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
        $searchTerm = $request->input('search'); // Ambil parameter pencarian dari input form

        // $admins = Product::where('name', 'like', '%' . $searchTerm . '%')
        //     ->orWhere('description', 'like', '%' . $searchTerm . '%')
        //     ->get();

        $admins = Admin::where(function ($query) use ($searchTerm) {
            $columns = Schema::getColumnListing('admins'); // Mengambil daftar nama kolom dari tabel admins
            foreach ($columns as $column) {
                $query->orWhere($column, 'like', '%' . $searchTerm . '%');
            }
        })->get();

        $length = $admins->count();

        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $admins);
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
        $SuperAdminKey = $request->input('superAuthorizationPassword');
        $minPrice = $request->input('minPrice');
        $maxPrice = $request->input('maxPrice');
        $categories = $request->input('selectedFilter');
        $getDateType = $request->input('date_type');
        $startDate = $request->input('date_start');
        $endDate = $request->input('date_end');

        if (!$SuperAdminKey == 'superAdmin') {
            return response(['message' => 'validasi kredensial data error', 'error' => 'bad request client :('], 400);
        }

        if (!is_array($categories)) {
            return response(['message' => 'categories field type of data are not array', 'error' => 'bad request client :(', 'failed payload' => $request], 400);
        }

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

        $products = Admin::where('price', '>=', $minPrice)
            ->where('price', '<=', $maxPrice)
            ->whereIn('category_id', $categories)
            ->whereBetween($dateType, [$startDate, $endDate])
            ->get();
        $length = $products->count();

        if (!$length) {
            return $this->notFound();
        }
        return new PostResource(true, ['Message' => 'Request Search Berhasil', 'length' => $length], $products);
    }

    public function login(Request $request)
    {
        // inisiasi awal respon
        // // validasi
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
        //     return response($respon, 404);
        // }

        $respon = PostResource::make(false, 'SUSpicious activity detected', $request->except('password'));
        // cek email
        if ($admin = Admin::firstWhere('email', $request->input('email'))) {
            // cek password
            if (!Hash::check($request->input('password'), $admin->password)) {
                $respon->message = "Password salah";
                return response($respon, 401);
            } else {
                $credentials = request(['email', 'password']);
                $token = auth('admin')->attempt($credentials);
                return $this->respondWithToken($token);
            }
        } else {
            $respon->message = 'Email salah';
            return response($respon, 401);
        }
    }

    public function me(Request $request)
    {
        return response()->json(auth('admin')->user());
        // }
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('admin')->refresh());
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function find($id)
    {
        return new PostResource(true, "data admin :", Admin::find($id));
    }

    public function store(Request $request)
    {
        // return response(new PostResource(false, "yoi", $request->input()), 200);
        if ($request->input('superAuthorizationPassword') === "superAdmin") {
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
                return response(new PostResource(false, "validasi data error", "Something went wrong with the DB :("), 403);
            }
        }
        return response(new PostResource(false, "Akun admin gagal ditambahkan, Akun anda tidak punya akses dalam pembuatan akun admin.", $request->input()), 403);
    }

    public function update(Request $request)
    {
        $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');

        $updateAdmin = Admin::find($request->input('adminsId'));
        // return $request;

        // initiate rule for validation
        // jika yang mengedit adalah superAdmin 
        $getSuperAuthorizationPassword === 'superAdmin'
            ?
            ($rule = [
                "email" => ['required', 'email', Rule::unique('admins', 'email')->ignore($request->input('adminsId'))],
                "username" => 'required',
            ])
            : ($rule = [
                "email" => ['required', 'email', Rule::unique('admins', 'email')->ignore($request->input('adminsId'))],
                "username" => 'required',
                "password" => 'required|min:6'
            ]);


        // if an Admin issuing newPassword then add rule list
        if ($request->input("newPassword") !== null) {
            $rule = array_merge($rule, ["newPassword" => "min:6|confirmed"]);
        }
        $validator = Validator::make($request->all(), $rule);

        if ($validator->fails()) {
            return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->except('id')]), 400);
        }

        // cek password lama
        // jika yang mengedit bukan superAdmin 
        if ($getSuperAuthorizationPassword !== 'superAdmin') {
            if (!Hash::check($request->input('password'), $updateAdmin->password)) {
                return response(new PostResource(false, "Password lama salah.", ['old_input' => $request->except('id')]), 401);
            }
            ;
        }

        $admin = Admin::find($request->input('adminsId'));
        $oldName = $admin->name; // current data in db
        $oldPict = $admin->pict; // current data in db
        // ~~~~~~ mutasi update variabel separator ~~~~~~
        $name = $request->input('name'); // incoming req
        $pict = $request->input('pict'); // incoming req

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

        // return $request;

        // isi data baru
        $updateAdmin->username = $request->input('username');
        $updateAdmin->email = $request->input('email');
        $updateAdmin->pict = $request->input('pict') ?? 'default.jpg';
        if ($request->input('newPassword') !== null) {
            $updateAdmin->password = $request->input('newPassword');
        } else {
            $updateAdmin->password = $request->input('password');
        }
        if ($updateAdmin->role == 1) { // jika admin role = admin
            $updateAdmin->role = $request->input('role');
        }
        return new PostResource(true, ["Message" => "product ter-update.", "modifedFileStatus" => $modifedFileStatus ?? null], $updateAdmin->update());
    }

    public function patch(Request $request)
    {
        $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');
        $adminsId = $request->input('adminsId');

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


    public function drop(Request $request)
    {
        $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');
        $adminsId = $request->input('adminsId');

        if ($getSuperAuthorizationPassword !== "superAdmin") {
            return response(new PostResource(false, "Authorization gagal, pengenalan kredensial tidak tepat, abort.", ['old_input' => $request->except('adminsId')]), 401);
        }

        if (is_array($adminsId)) {
            // Batch delete
            $deletedCount = Admin::whereIn('id', $adminsId)->delete();
            return new PostResource(true, "Berhasil menghapus " . $deletedCount . " admin dengan IDs: " . implode(', ', $adminsId), null);
        } elseif (is_numeric($adminsId)) {
            // Single delete
            $dropAdmin = Admin::find($adminsId);
            if (!$dropAdmin) {
                return response(new PostResource(false, "Admin tidak ditemukan.", ['old_input' => $request->except('adminsId')]), 401);
            }
            $deleted = $dropAdmin->delete();
            return new PostResource(true, "Berhasil menghapus admin " . $dropAdmin->username, $deleted);
        } else {
            // Invalid input
            return response(new PostResource(false, "Input adminsId tidak valid.", ['old_input' => $request->except('adminsId')]), 400);
        }
    }
    // return response(new PostResource(false, 'Masuk coy :v', $request->input(), 302));

    // Contoh metode controller Laravel untuk mengunggah gambar
    // public function uploadImage(Request $request)
    public function uploadImage($imageData, $product)
    {
        $imageName = 'product-' . time() . '-' . $product->id . '-' . Str::slug($product->name) . '.jpg';
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
