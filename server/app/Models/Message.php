<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // relation
    public function dialog() {
        return $this->belongsTo(Dialog::class);
    }
}
