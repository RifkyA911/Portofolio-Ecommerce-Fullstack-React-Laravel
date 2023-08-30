<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    // protected $fillable = ['email', 'username', 'pw', 'role', 'pict'];
    protected $guard = ['id'];
    protected $casts = [
        'password' => 'hashed'
    ];
}
