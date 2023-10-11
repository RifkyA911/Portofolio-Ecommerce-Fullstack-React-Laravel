<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Admin extends Authenticatable implements JWTSubject
// class Admin extends Model
{
    // use HasFactory, Notifiable;
    use HasApiTokens, HasFactory, Notifiable;
    // protected $fillable = ['email', 'username', 'pw', 'role', 'pict'];
    protected $guarded = ['id'];
    protected $hidden = ['password'];
    protected $casts = [
        'password' => 'hashed'
    ];

    public function transaction(): HasMany {
        return $this->hasMany(Transaction::class);
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
