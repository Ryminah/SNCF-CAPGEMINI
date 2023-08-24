<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PotreeFiles extends Model
{
    protected $table = 'PotreeFiles';

    protected $primaryKey = 'id';

    protected $fillable = [
        'fileUrl',
        'fileName',
    ];

    public $timestamps = false;
}
