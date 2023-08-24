<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pont extends Model
{
    use HasFactory;

    protected $table = 'pont';

    protected $fillable = [
        'id_objet',
        'imu',
        'nom',
        'pk_doc_app',
        'etat',
        'id_pas',
        'date_heure',
        'nom_schema',
        'longueur',
        'geom',
    ];

    protected $casts = [
        'geom' => 'geometry',
    ];
}
