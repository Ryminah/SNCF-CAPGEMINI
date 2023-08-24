<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class BalKvb extends Model
{
    protected $table = 'bal_kvb';

    protected $primaryKey = 'gid';

    protected $fillable = [
        'id_objet',
        'imu',
        'nom',
        'pk_doc_app',
        'etat',
        'id_pas',
        'date_heure',
        'nom_schema',
        'type',
        'nom_groupe',
        'ordre',
        'geom'
    ];

    public $timestamps = false;
}
