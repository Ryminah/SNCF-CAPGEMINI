<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class p_bus_ndv extends Model
{
    protected $table = 'p_bus_ndv';

    protected $primaryKey = 'gid';

    protected $fillable = [
        'id_objet',
        'id_sequence',
        'id_pas',
        'imu',
        'type',
        'pk_min_spk',
        'pk_max_spk',
        'nom_ze_lze',
        'numero',
        'id_voie1',
        'id_voie2',
        'nom',
        'geom',
    ];
    use HasFactory;
    public $timestamps = false;

    protected $casts = [
        'geom' => 'geometry',
    ];
}
