<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use LdapRecord\Models\Model;

class User extends Model
{
    use HasFactory;
     /**
     * The attributes that are mapped to LDAP attributes.
     *
     * @var array
     */
    protected $attributes = [
        'name' => 'cn',
        'email' => 'mail',
        // ... Ajoutez d'autres attributs LDAP et colonnes du modèle ici ...
    ];
}
