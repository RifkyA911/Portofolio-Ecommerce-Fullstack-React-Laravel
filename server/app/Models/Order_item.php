<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order_item extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $timestamps = false;
    // protected $with = ['product:name,price', 'order'];
    protected $with = ['product'];

    // relation
    public function product(): BelongsTo {
        return $this->belongsTo(Product::class)->select(['id','name']);
    }

    public function order(): BelongsTo {
        return $this->belongsTo(Order::class);
    }
}
