<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dialog extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $timestamps = false;

    // relation
    public function message() {
        return $this->hasMany(Message::class);
    }
    public function product() {
        return $this->belongsTo(Product::class);
    }
}
