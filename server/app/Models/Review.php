<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // relation
    public function product_id() {
        return $this->belongsTo(Product::class);
    }
    public function user_id() {
        return $this->belongsTo(User::class);
    }
}
