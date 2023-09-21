<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dialog extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $timestamps = false;

    // relation
    public function messages(): HasMany {
        return $this->hasMany(Message::class);
    }
    public function product(): BelongsTo {
        return $this->belongsTo(Product::class);
    }
}
