<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    // protected $fillable = ['name', 'category', 'price', 'stock', 'discount', 'pict', 'description'];
    protected $guarded = ['id'];
    protected $with = ['category'];
    protected $fillable = ['viewed', /* kolom lainnya */];

    // relation
    public function review(): HasMany {
        return $this->hasMany(Review::class);
    }
    public function category(): BelongsTo {
        return $this->belongsTo(Category::class)->select(['id','name']);
    }
}
