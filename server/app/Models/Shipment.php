<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Shipment extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // relation
    public function order(): HasOne {
        return $this->hasOne(Order::class);
    }
}
