<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    //to convert json to array 
    public $casts = [
        'layers' => 'array'
    ];

    //pour préciser les colonnes qu'on veut pas remplir
    public  $timestamps= false;
    public $layers= false;

    //pour préciser les colonnes à remplir 
    public $fillable=['name'];




}
