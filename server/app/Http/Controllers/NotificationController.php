<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use stdClass;

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

    public function filter(Request $request) //////////////////////////////////////////////////
    {
        if (AuthController::check($request)) {
            $SuperAdminKey = $request->input('superAuthorizationPassword');
            $types = $request->input('types');
            $getDateType = $request->input('date_type');
            $startDate = $request->input('date_start');
            $endDate = $request->input('date_end');

            if (!$SuperAdminKey == 'superAdmin') {
                return response(['message' => 'validasi kredensial data error', 'error' => 'bad request client :('], 400);
            }

            if (!is_array($types)) {
                return response(['message' => 'types field type of data are not array', 'error' => 'bad request client :(', 'failed payload' => $request], 400);
            }

            // Mendefinisikan semua kunci dengan nilai false secara default
            $authorityObject = new stdClass();
            $defaultTypes = ['Chat', 'Order', 'Invoice', 'Review', 'Add', 'Update', 'Delete', 'Info'];
            foreach ($defaultTypes as $authority) {
                $authorityObject->$authority = false;
            }

            // Mengatur nilai true berdasarkan nilai yang ada dalam $types
            foreach ($types as $authority) {
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

            $admins = Notification::
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
        return response(['error' => 'Validasi gagal', "message" => 'forbidden action detected'], 403);

    }
}
