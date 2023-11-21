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
}
