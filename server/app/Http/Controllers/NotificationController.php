<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getAll()
    {
        //get all posts
        $notificaitons = Notification::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data notificaitons', $notificaitons);
    }

    public function showLimit($page, $perPage)
    {
        // Mengonversi halaman dan perPage yang diterima menjadi integer
        $page = (int) $page; // halaman
        $perPage = (int) $perPage; // jumlah data yang akan di kirim

        $length = Notification::count();

        // Menghitung offset berdasarkan halaman yang diminta
        $offset = ($page - 1) * $perPage;

        // Mengambil data Notification dengan paginasi, offset, dan pengurutan berdasarkan updated_at terbaru
        $Notifications = Notification::orderBy('updated_at', 'desc')
            ->skip($offset)
            ->take($perPage)
            ->get();

        // Mengembalikan hasil dalam bentuk resource
        return new PostResource(true, ['Message' => 'Berhasil Melakukan Request Data', 'length' => $length], $Notifications);
    }

}
