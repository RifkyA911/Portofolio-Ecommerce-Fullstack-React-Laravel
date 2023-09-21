<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    // protected $fillable = ['email', 'username', 'password', 'address', 'verified', 'pict'];
    protected $guarded = ['id'];
    protected $casts = [
        'password' => 'hashed'
    ];

    // relation
    public function transaction() {
        return $this->hasMany(Transaction::class);
    }
    public function cart() {
        return $this->hasMany(Cart::class);
    }
    public function wishlist() {
        return $this->hasMany(Wishlist::class);
    }
    public function chat() {
        return $this->hasMany(Message::class);
    }
}
