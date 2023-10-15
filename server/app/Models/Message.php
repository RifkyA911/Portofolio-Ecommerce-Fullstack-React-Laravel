<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    // default eager loading
    protected $with = ['dialog'];

    // relation
    public function dialog(): BelongsTo {
        return $this->belongsTo(Dialog::class, 'dialog_id');
    }
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
    public function admin(): BelongsTo {
        return $this->belongsTo(Admin::class);
    }
}
