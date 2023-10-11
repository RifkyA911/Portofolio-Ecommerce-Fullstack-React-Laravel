<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
    // protected $fillable = ['email', 'username', 'password', 'address', 'verified', 'pict'];
    protected $guarded = ['id'];
    protected $hidden = ['password'];
    protected $casts = [
        'password' => 'hashed'
    ];

    // relation
    public function transaction(): HasMany {
        return $this->hasMany(Transaction::class);
    }
    public function cart(): HasMany {
        return $this->hasMany(Cart::class);
    }
    public function wishlist(): HasMany {
        return $this->hasMany(Wishlist::class);
    }
    public function chat(): HasMany {
        return $this->hasMany(Message::class);
    }

    // JWT extend
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    
    public function getJWTCustomClaims()
    {
        return [];
    }
}
