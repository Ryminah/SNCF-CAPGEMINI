<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataBase extends Model
{
    use HasFactory;
    protected $table = 'public.database';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'couches',
        'sp',
        'vrs',
        'environnement',
        'nom'
    ];
    public $timestamps = false;
    public function db_project()
    {
        return $this->hasOne('DbProject::class');
    }
}
