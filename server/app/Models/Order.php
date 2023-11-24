<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['admin', 'user', 'items'];

    // relation
    public function admin(): BelongsTo {
        return $this->belongsTo(Admin::class);
    }
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
    public function items(): HasMany {
        return $this->hasMany(Order_item::class);
    }
    public function shipment(): HasOne {
        return $this->hasOne(Shipment::class);
    }
    public function payment(): HasOne {
        return $this->hasOne(Payment::class);
    }
}
