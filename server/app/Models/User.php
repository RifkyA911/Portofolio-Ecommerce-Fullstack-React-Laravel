<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['email', 'username', 'password', 'address', 'verified', 'pict'];
    protected $casts = [
        'password' => 'hashed'
    ];
    // use HasFactory;
}
