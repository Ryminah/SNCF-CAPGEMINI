<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Producteur extends Model
{
    use HasFactory;

    protected $table = 'public.producteur';

    protected $primaryKey = 'id_producteur';

    protected $fillable = [
        'nom',
        'prenom',
        'mail',
        'dt_suppr',
        'role',
        'login_w',
        'actif',
        'password'
    ];

    protected $hidden = [
        'password',
    ];
    public $timestamps = false;
}
