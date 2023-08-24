<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Ldap\User;
use App\Models\pasSequence;
use Illuminate\Http\Request;
use App\Models\Producteur;
use DB;
use LdapRecord\Container;
use LdapRecord\Models\Attributes\Password;
use LdapRecord\Query\Builder;

/* Ce controller permet la gestion du login, avec le choix du */

class LoginController extends Controller
{
    //get all first and second names from producteur
    public function getDataProducteur() {
        $producteurs = Producteur::orderBy('nom')
        ->get(['nom', 'login_w']);
        return response()->json($producteurs);
    }


    //get the is_pas and all comlumn of the user using his login_w

    public function getIdPas(Request $request){
        error_log("getIdPas");
        $rep = $request->get('request');
        error_log($rep);
        if (!empty($rep)) {
            $typeChaine = 'CHII';
            $tables = pasSequence::where('type_chaine', $typeChaine)
                        ->where('login', $rep)
                        ->whereNull('fin')
                        ->where('debut', '<=', now())
                        ->orderBy('id_pas')
                        ->get(['id_pas', 'debut', 'numeros_pas', 'id_sequence', 'nom_sequence', 'statut_sequence', 'id_acces', 'code_pli', 'nom_schema', 'numero_zone', 'nom_schema']);
            return response()->json($tables);
        } else {
            return response()->json(['error' => 'Empty request parameter']);
        }
    }
    // Configure the LDAP connection.
    public function listUsers()
    {
        $usersList = User::query()->where('objectclass', '*')->get();
        // Retourner le tableau des utilisateurs.
        return response()->json(['users' => $usersList]);
    }




    /////////////////////////////////////////////////
    // Permet la connexion
    public function authenticate(Request $request){

        $username = $request->input('username');
        $password = $request->input('password');
        $user = User::where('uid', '=', $username)->first();
        if($user){
            return response()->json(['success' => 'true']);
        }
        else{
            return response()->json(['success' => 'false', 'message' => 'Échec de l\'authentification']);
        }
    }


    public function getNom_schema_byIdPas(Request $request){
        error_log("getNom_schema_byIdPas");
        $rep = $request->get('request');
        error_log($rep);

        $pas = pasSequence::where('id_pas', $rep)->first();
        $nom_schema = $pas ? $pas->NOM_SCHEMA : null;

        return response()->json([$nom_schema]);
    }



}
