<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    // protected $fillable = ['email', 'username', 'pw', 'role', 'pict'];
    protected $guarded = ['id'];
    protected $casts = [
        'password' => 'hashed'
    ];

    public function transaction() {
        return $this->hasMany(Transaction::class);
    }
    public function chat() {
        return $this->hasMany(Message::class);
    }
}
