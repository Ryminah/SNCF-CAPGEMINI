<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DbProject extends Model
{
    use HasFactory;

    protected $table = "public.db_projects";
    protected $fillable = [
        'id',
        'db_id',
        'couches',
        'nom',

    ];
    public $timestamps = false; // Désactive les horodatages

    public function database()
    {
        return $this->belongsTo('DataBase::class');
    }

     public function db_project()
    {
        return $this->hasMany(DbProject::class);
    }
}
