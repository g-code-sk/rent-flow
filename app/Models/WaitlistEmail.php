<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class WaitlistEmail extends Model
{
    use HasUuids;

    public const UPDATED_AT = null;

    protected $table = 'waitlist_emails';

    protected $fillable = [
        'email',
        'consented_at',
    ];

    protected function casts(): array
    {
        return [
            'consented_at' => 'datetime',
        ];
    }
}
