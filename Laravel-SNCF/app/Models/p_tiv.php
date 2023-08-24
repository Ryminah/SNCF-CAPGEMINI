<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class p_tiv extends Model
{
    protected $table = 'p_tiv';
    protected $primaryKey = 'gid';
    public $timestamps = false;

    protected $fillable = [
        'id_objet',
        'id_sequence',
        'id_pas',
        'nom_voie',
        'imu_voie',
        'imu',
        'type',
        'ses_prl',
        'id_ndv1',
        'id_ndv2',
        'id_bre_nd1',
        'id_bre_nd2',
        'geom',
    ];

    protected $casts = [
        'geom' => 'geometry',
    ];
    use HasFactory;
}
