<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shipment_log extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // relation
    public function shipment() : BelongsTo {
        return $this->belongsTo(Shipment::class);
    }
}
