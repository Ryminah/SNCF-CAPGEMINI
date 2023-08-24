<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voie extends Model
{
    protected $table = 'voie';
    public $timestamps = false;
    protected $fillable = [
        'id_objet',
        'id_sequence',
        'id_pas',
        'nom_voie',
        'imu',
        'imu_ligne',
        'type',
        'numero',
        'etat',
        'geom',
    ];
    protected $geometryTypes = [
        'geom' => 'MultiLineStringZM',
    ];
}
