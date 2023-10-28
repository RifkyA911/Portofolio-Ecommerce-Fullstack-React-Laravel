<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function search(Request $request)
    {
        $searchTerm = $request->input('search'); // Ambil parameter pencarian dari input form

        $categories = Category::where(function ($query) use ($searchTerm) {
            $columns = Schema::getColumnListing('categories'); // Mengambil daftar nama kolom dari tabel categories
            foreach ($columns as $column) {
                $query->orWhere($column, 'like', '%' . $searchTerm . '%');
            }
        })->get();

        $length = $categories->count();

        if ($length == null || $length == 0 || $categories === null) {
            return new PostResource(true, ['Message' => 'Tidak ada Data', 'length' => $length], [array(
                'id' => null,
                'name' => 'tidak ada',
                'type' => null
            )]);
        } else {
            return new PostResource(true, ['Message' => 'Request Search Berhasil', 'length' => $length], $categories);
        }
    }

    public function getAll()
    {
        //get all posts
        $categories = Category::all();
        $length = $categories->count();

        //return collection of posts as a resource
        return new PostResource(true, ['Message' => 'Request Search Berhasil', 'length' => $length], $categories);
    }
    public function getById($id)
    {
        return new PostResource(true, "data categories :", Category::find($id));
    }
    public function print(Request $request)
    {
        // Ambil daftar ID dari request
        $ids = $request->input('ids');

        // Cari product berdasarkan ID yang diberikan
        $categories = Category::whereIn('id', $ids)->get();

        return new PostResource(true, "Data categories:", $categories);
    }

    public function showLimit($page, $perPage)
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int)$page; // halaman
        $perPage = (int)$perPage; // jumlah data yang akan di kirim

        $length = Category::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mengambil data Admin dengan paginasi dan offset
        $categories = Category::skip($offset)->take($perPage)->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
