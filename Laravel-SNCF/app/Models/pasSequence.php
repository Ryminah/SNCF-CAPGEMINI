<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class pasSequence extends Model
{
    protected $table = 'pas_sequence';
    protected $primaryKey = 'id_pas';
    public $timestamps = false;

    protected $fillable = [
        'debut',
        'fin',
        'numero_pas',
        'id_sequence',
        'type_chaine',
        'statut_sequence',
        'sp',
        'nom_sequence',
        'id_acces',
        'login',
        'id_pli',
        'code_pli',
        'desc_pli',
        'id_schema',
        'nom_schema',
        'numero_zone',
    ];
}
