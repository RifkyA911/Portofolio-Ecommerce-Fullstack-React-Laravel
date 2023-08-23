<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminsController extends Controller
{
    public function index() {
        return view('daftar-admin',[
            'judul'=>'daftar admin',
            'admins'=> Admin::All()
        ]);
    }

    public function find($id) {
        return view('admin',[
            'judul'=>'admin',
            'admin'=> Admin::find($id)
        ]);
        // return [
        //     'judul'=>'admin',
        //     'admin'=> Admin::find($id)
        // ];
    }
}
