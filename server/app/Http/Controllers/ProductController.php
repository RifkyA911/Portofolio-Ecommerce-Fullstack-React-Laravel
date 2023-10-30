<?php

namespace App\Http\Controllers;

use \App\Models\Product;
use \App\Models\Category;
use Illuminate\Http\Request;
use \App\Http\Resources\PostResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

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
            return new PostResource(true, ['Message' => 'Tidak ada Data', 'length' => $length], [array(
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
            )]);
        } else {
            return new PostResource(true, ['Message' => 'Request Search Berhasil', 'length' => $length], $products);
        }
    }
    public function filter(Request $request)
    {
        $minHarga = $request->input('minHarga');
        $maxHarga = $request->input('maxHarga');

        if(!$maxHarga){
            return response(['message' => 'validasi data error', 'error' => 'Something went wrong with the DB :('], 222);
        }

        $products = Product::where('price', '>=', $minHarga)->where('price', '<=', $maxHarga)->get();
        $length = $products->count();

        
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

        // Cari product berdasarkan ID yang diberikan
        $products = Product::whereIn('id', $ids)->get();

        return new PostResource(true, "Data products:", $products);
    }

    public function showLimit($page, $perPage)
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int)$page; // halaman
        $perPage = (int)$perPage; // jumlah data yang akan di kirim

        $length = Product::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mengambil data Admin dengan paginasi dan offset
        $products = Product::skip($offset)->take($perPage)->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $products);
    }

    public function store(Request $request)
    {
        // return response(new PostResource(false, "yoi", $request->input()), 200);
        if ($request->input('superAuthorizationPassword') === "superAdmin") {
            $pict = $request->input('pict');
            $name = $request->input('name');

            if ($pict) {
                // Ubah nilai $pict sesuai kebutuhan
                $newPictValue = $this->uploadImage($pict, $name);
                // Setel ulang nilai $pict dalam request
                $request->merge(['pict' => $newPictValue]);
            }

            $validator = Validator::make($request->all(), [
                "name" => 'required',
                "category_id" => 'required',
                "price" => 'required|numeric',
                "stock" => 'required|numeric'
                // TAMBAHKAN VALIDASI PICT
            ]);

            if ($validator->fails()) {
                return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
            }

            if (Product::create($request->except(['superAuthorizationPassword'])) !== false) {
                return new PostResource(true, ['message' => "Product berhasil ditambahkan.", 'status' => 201], $request->only(['name', 'category_id']));
            } else {
                return response(new PostResource(false, "validasi data error", "Something went wrong with the DB :("), 403);
            }
        }
        return response(new PostResource(false, "Data Product gagal ditambahkan, Akun anda tidak punya akses dalam pembuatan Product.", $request->input()), 403);
    }

    /**
     * Display the specified resource.
     */
    public function getById($id)
    {
        return new PostResource(true, "data Produk :", Product::find($id)->makeHidden('category_id'));
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
        ]);

        if ($validator->fails()) {
            return response(new PostResource(false, "validasi data error", ['errors' => $validator->errors(), 'old_input' => $request->all()]), 400);
        }
        $produk = Product::find($request->input('productId'));
        $produk->barcode = $request->input('barcode');
        $produk->name = $request->input('name');
        $produk->category_id = $request->input('category_id') ?? 'none';
        $produk->price = $request->input('price') ?? 0;
        $produk->stock = $request->input('stock') ?? 0;
        $produk->discount = $request->input('discount') ?? 0;
        $produk->pict = $request->input('pict');
        $produk->description = $request->input('description');
        return new PostResource(true, "Produk ter-update.", $produk->update());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function drop(Request $request)
    {
        $getSuperAuthorizationPassword = $request->input('superAuthorizationPassword');
        $productsId = $request->input('productsId');

        if ($getSuperAuthorizationPassword !== "superAdmin") {
            return response(new PostResource(false, "Authorization gagal, pengenalan kredensial tidak tepat, abort.", ['old_input' => $request->except('productsId')]), 401);
        }

        if (is_array($productsId)) {
            // Batch delete
            $deletedCount = Product::whereIn('id', $productsId)->delete();
            return new PostResource(true, "Berhasil menghapus " . $deletedCount . " admin dengan IDs: " . implode(', ', $productsId), null);
        } elseif (is_numeric($productsId)) {
            // Single delete
            $dropProduct = Product::find($productsId);
            if (!$dropProduct) {
                return response(new PostResource(false, "Product tidak ditemukan.", ['old_input' => $request->except('productsId')]), 401);
            }
            $deleted = $dropProduct->delete();
            return new PostResource(true, "Berhasil menghapus Product " . $dropProduct->name, $deleted);
        } else {
            // Invalid input
            return response(new PostResource(false, "Input productsId tidak valid.", ['old_input' => $request->except('productsId')]), 400);
        }
    }
    // return response(new PostResource(false, 'Masuk coy :v', $request->input(), 302));

    // Contoh metode controller Laravel untuk mengunggah gambar
    // public function uploadImage(Request $request)
    public function uploadImage($imageData, $name)
    {
        // $imageData = $request->input('pict'); // Data gambar hasil pemangkasan dari React
        // if (!$imageData) {
        //     return response(new PostResource(false, "Input Key dan Value Endpoint salah", 400));
        // }

        // jika input pict adalah base64
        if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $matches)) {
            $data = substr($imageData, strpos($imageData, ',') + 1);
            $data = base64_decode($data);
            $imageName = $name . '.jpg';
            $imagePath = public_path('img/') . $imageName; // Tentukan lokasi penyimpanan lokal
            ///////////////// tambahkan validasi file
            file_put_contents($imagePath, $data); // Simpan gambar secara lokal
            // return response(new PostResource(true, $imagePath, 200));
            return $imageName;
        } else {
            return 'default.jpg';
            // return response(new PostResource(false, ['message' => "Tidak dapat memproses input", 'data' => $imageData], 500));
        }
    }
}
