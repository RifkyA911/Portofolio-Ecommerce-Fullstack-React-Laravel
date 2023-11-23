<?php

namespace App\Http\Controllers;

use \App\Models\Product;
use \App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use \App\Http\Resources\PostResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use stdClass;

class ProductController extends Controller
{
    // public function index() {
    //     return view('product',[
    //         'judul'=>'product',
    //         'product'=> Product::All()
    //     ]);
    // }

    // public function show($name) {
    //     return view('detail-product',[
    //         'judul'=>'detail product',
    //         'product'=> Product::find($name)
    //     ]);
    // }
    /**
     * Display a listing of the resource.
     */

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
                    'barcode' => null,
                    'name' => 'tidak ada',
                    'category_id' => null,
                    'price' => null,
                    'stock' => null,
                    'discount' => null,
                    'pict' => 'not_found.jpg',
                    'description' => null,
                    'admin_id' => null,
                    'created_at' => null,
                    'updated_at' => null,
                    'category' =>
                        array(
                            'id' => null,
                            'name' => null,
                            'type' => null,
                        ),
                )
            ]
        ], 200);
    }

    public function getImage($id)
    {
        $product = Product::find($id);

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

        // $products = Product::where('name', 'like', '%' . $searchTerm . '%')
        //     ->orWhere('description', 'like', '%' . $searchTerm . '%')
        //     ->get();

        $products = Product::where(function ($query) use ($searchTerm) {
            $columns = Schema::getColumnListing('products'); // Mengambil daftar nama kolom dari tabel products
            foreach ($columns as $column) {
                $query->orWhere($column, 'like', '%' . $searchTerm . '%');
            }
        })->get();

        $length = $products->count();

        if ($length == null || $length == 0 || $products === null) {
            return new PostResource(true, ['Message' => 'Tidak ada Data', 'length' => $length], [
                array(
                    'id' => null,
                    'barcode' => null,
                    'name' => 'tidak ada',
                    'category_id' => null,
                    'price' => null,
                    'stock' => null,
                    'discount' => null,
                    'pict' => 'not_found.jpg',
                    'description' => null,
                    'admin_id' => null,
                    'created_at' => null,
                    'updated_at' => null,
                    'category' =>
                        array(
                            'id' => null,
                            'name' => null,
                            'type' => null,
                        ),
                )
            ]);
        } else {
            return new PostResource(true, ['Message' => 'Request Search Berhasil', 'length' => $length], $products);
        }
    }
    public function filter(Request $request)
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

        $products = Product::where('price', '>=', $minPrice)
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

    public function getAll()
    {
        //get all posts
        $produk = Product::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data Produk', $produk->makeHidden('category_id'));
    }

    public function print(Request $request)
    {
        // Ambil daftar ID dari request
        $ids = $request->input('ids');

        // Cari product berdasarkan array [] ID yang diberikan
        $products = Product::whereIn('id', $ids)->get();

        return new PostResource(true, "Data products:", $products);
    }

    public function showLimit($page, $perPage, $sortBy = null, $sortOrder = "asc")
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int) $page; // halaman
        $perPage = (int) $perPage; // jumlah data yang akan di kirim

        $length = Product::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        if ($sortBy == "updated_at") {
            $products = Product::orderBy('updated_at', $sortOrder)->skip($offset)->take($perPage)->get();
        } else {
            $products = Product::skip($offset)->take($perPage)->get();
        }

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $products);
    }

    public function store(Request $request)
    {
        if ($request->input('superAuthorizationPassword') === "superAdmin") {
            $product = new stdClass(); // membuat objek php baru
            $product->id = Product::max('id') + 1; // mencari nilai id tertinggi lalu ditambah 1 untuk unique
            $product->name = $request->input('name');

            $pict = $request->input('pict');

            if ($pict) { // Test: Pass
                $newPictValue = $this->uploadImage($pict, $product);
                // if ($oldName === $name) {
                //     $modifedFileStatus = 'not changed';
                // }
                $request->merge(['pict' => $newPictValue]);
            } else {
                $request->merge(['pict' => 'default.jpg']);
            }

            $validator = Validator::make($request->all(), [
                "name" => 'required',
                "category_id" => 'required',
                "price" => 'required|numeric',
                "stock" => 'required|numeric'
                ///////////////// tambahkan validasi file pict base64/string 'noChange'
            ]);

            if ($validator->fails()) {
                return response(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()], 400);
            }

            if (Product::create($request->except(['superAuthorizationPassword'])) !== false) {
                return new PostResource(true, ['message' => "Product berhasil ditambahkan.", 'status' => 201,], $request->only(['name', 'category_id']));
            } else {
                return response(false, "validasi data error", ['errors' => 'gagal create product', 'old_input' => $request->all()], 400);
            }
        }
        return response(false, "Data Product gagal ditambahkan, Akun anda tidak punya akses dalam pembuatan Product.", ['payload' => $request->input()], 403);
    }

    /**
     * Display the specified resource.
     */
    public function getById($id)
    {
        // return new PostResource(true, "data Produk :", Product::find($id)->makeHidden('category_id'));
        return new PostResource(true, "data Produk :", Product::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "barcode" => 'required',
            "name" => 'required',
            "category_id" => 'required',
            "price" => 'required|numeric',
            "stock" => 'required|numeric'
            ///////////////// tambahkan validasi file pict base64/string 'noChange'
        ]);
        if ($validator->fails()) {
            return response(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()], 400);
        }

        $product = Product::find($request->input('id'));
        $oldName = $product->name; // current data in db
        $oldPict = $product->pict; // current data in db
        // ~~~~~~ mutasi update variabel separator ~~~~~~
        $name = $request->input('name'); // incoming req
        $pict = $request->input('pict'); // incoming req

        // if pict req is not null/noChange
        if ($pict !== "noChange") { // Test: Pass
            // if oldName!=name, replace property values in $product object
            if ($oldName !== $name) {
                $product->update(['name' => $name]);
            }
            $newPictValue = $this->uploadImage($pict, $product);
            $request->merge(['pict' => $newPictValue]);
            $oldFilePath = public_path('img/product_images/' . $oldPict); // Ganti dengan jalur file lama
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
            $request->merge(['pict' => $product->pict]);
        }

        // update var $product
        if ($product) {
            $product->barcode = $request->input('barcode');
            $product->name = $request->input('name');
            $product->category_id = $request->input('category_id') ?? 'none';
            $product->price = $request->input('price') ?? 0;
            $product->stock = $request->input('stock') ?? 0;
            $product->discount = $request->input('discount') ?? 0;
            $product->pict = $request->input('pict') ?? 'default.jpg';
            $product->description = $request->input('description');
            return new PostResource(true, ["Message" => "product ter-update.", "modifedFileStatus" => $modifedFileStatus ?? null], $product->update());
        } else {
            return response(["validasi data error", 'error', 400]);

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function drop(Request $request)
    {
        $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');
        $productsId = $request->input('id');

        if ($getSuperAuthorizationPassword !== "superAdmin") {
            return response(false, "Authorization gagal, pengenalan kredensial tidak tepat, abort.", ['old_input' => $request->except('id')], 401);
        }

        if (is_array($productsId)) {
            // Batch delete
            $deletedCount = Product::whereIn('id', $productsId)->delete();
            return new PostResource(true, "Berhasil menghapus " . $deletedCount . " admin dengan IDs: " . implode(', ', $productsId), null);
        } elseif (is_numeric($productsId)) {
            // Single delete
            $dropProduct = Product::find($productsId);
            if (!$dropProduct) {
                return response(false, "Product tidak ditemukan.", ['old_input' => $request->except('id')], 401);
            }
            $deleted = $dropProduct->delete();
            return new PostResource(true, "Berhasil menghapus Product " . $dropProduct->name, $deleted);
        } else {
            // Invalid input
            return response(false, "Input productsId tidak valid.", ['old_input' => $request->except('id')], 400);
        }
    }

    // public function uploadImage(Request $request)
    public function uploadImage($imageData, $product)
    {
        $imageName = 'product-' . time() . '-' . $product->id . '-' . Str::slug($product->name) . '.jpg';
        // jika input pict adalah base64
        if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $matches)) {
            $data = substr($imageData, strpos($imageData, ',') + 1);
            $data = base64_decode($data);
            $imagePath = public_path('img/product_images/') . $imageName; // Tentukan lokasi penyimpanan lokal
            file_put_contents($imagePath, $data); // Simpan gambar secara lokal
            return $imageName;
        } else {
            return 'default.jpg';
        }
    }
}
