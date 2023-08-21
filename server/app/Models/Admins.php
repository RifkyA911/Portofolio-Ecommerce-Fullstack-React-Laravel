<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Casts\Attribute;

class Admins extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'email',
        'pw',
        'role',
        'pict'
    ];
}
