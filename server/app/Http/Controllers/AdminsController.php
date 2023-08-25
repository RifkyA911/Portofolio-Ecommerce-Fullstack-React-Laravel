<?php

namespace App\Http\Controllers;

// import model
use App\Models\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// import resource butuh satu setipa method post/get
use App\Http\Resources\PostResource;

class AdminsController extends Controller
{
    public function index()
    {
        //get all posts
        $admins = Admin::all();

        //return collection of posts as a resource
        return new PostResource(true, 'List Data Admin', $admins);
    }
    public function find($id) {
        return new PostResource(true, "data admin :", Admin::find($id));
    }
}
