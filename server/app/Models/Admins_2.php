<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// extends Model
class Admins 
{
    // use HasFactory;
    private static $admins = [
        [
            'id'=>1,
            'username'=>'super duper admin',
            'email'=>'super.duper@gmail.com',
            'pw'=>'123456780',
            'role'=>"0",
            "pict"=>null
        ],
        [
            'id'=>2,
            'username'=>'admin 1',
            'email'=>'admin.satu@gmail.com',
            'pw'=>'adminsatu',
            'role'=>"1",
            "pict"=>null
        ]
    ];
    public static function All() {
        return collect(self::$admins);
    }
    public static function find($id) {
        $admins = static::all();
        return $admins->firstWhere('id', $id);
    }
}
