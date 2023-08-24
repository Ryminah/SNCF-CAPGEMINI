<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PTav extends Model
{
    use HasFactory;

    protected $table = 'p_tav';
    protected $primaryKey = 'gid';
    public $timestamps = false;

    protected $fillable = [
        'id_objet',
        'id_pas',
        'geom',
    ];

    // protected $casts = [
    //     'geom' => 'geometry',
    // ];
}
