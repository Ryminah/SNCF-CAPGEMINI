<?php

namespace App\Ldap;

use LdapRecord\Models\Model;
use LdapRecord\Models\Concerns\CanAuthenticate;
use Illuminate\Contracts\Auth\Authenticatable;

class User extends Model implements Authenticatable
{
    use CanAuthenticate;
    /**
     * The object classes of the LDAP model.
     */
    public static array $objectClasses = [

    ];
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    //protected string $guidKey = 'uid';
}
