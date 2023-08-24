<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SgLimvit extends Model
{
    protected $table = 'sg_limvit';
    protected $primaryKey = 'gid';
    public $timestamps = false;
    protected $fillable = [
        'id_objet',
        'imu',
        'nom',
        'pk_doc_app',
        'etat',
        'id_pas',
        'date_heure',
        'nom_schema',
        'sens',
        'position',
        'indication',
        'type',
        'equipe',
        'objet_refe',
        'nom_table_',
        'id_objet_r',
        'geom',
    ];
    protected $casts = [
        'geom' => 'geometry',
    ];
}
