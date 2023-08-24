<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// nous déclarons ici nos models
use app\Models\p_bus_ndv;
use app\Models\p_tiv;
use app\Models\User;
use Illuminate\Support\Facades\DB;

class AllTablesContr extends Controller
{
    //function pour récupérer le nom de toutes les tables ; you may run queries using the DB class.
    // postgres equivalent for SHOW TABLES is SELECT tablename FROM pg_catalog.pg_tables
    public function getAllTables(){
        error_log("Geting all tables");

        $requete1='SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname=';
        $requete2="public";
        $requete="'";
        $sql=$requete1. $requete.$requete2.$requete;
        $tables = DB::select( $sql);

        return $tables ;

    }


    public function postLayerData(Request $request){
    //echo("<script>console.log('PHP: " . $request->query("Request") . "');</script>");
       // $this->info("Your Message");
       //echo  $request->query("Request");

        error_log("HajarLaravel");
        error_log($request->get('request'));
        //on récupere le param request envoyé par le front
        $request2=$request->get('request');

        // Insérer toutes les données dans une table temporaire
        $sql1='SELECT * INTO TemporaryTable FROM  '.$request2;
        $tables1 = DB::select( $sql1);
        //déposez la colonne geom de la table temporaire
        $sql2=' ALTER TABLE TemporaryTable DROP COLUMN geom';
        $tables2 = DB::select( $sql2);
        //Extraire les données de la table temporaire
        $sql3='SELECT * FROM TemporaryTable LIMIT 2';
        $tables3 = DB::select( $sql3);
        //Chute de la table temporaire
        $sql4='DROP TABLE TemporaryTable';
        $tables4= DB::select( $sql4);


        //return response('', 200)
          //        ->header('Content-Type', 'plain/text');

          error_log(gettype($tables3));
        return $tables3;
    }


    public function postLayerData2(Request $request){

         $request=$request->get('request');
         error_log(gettype($request));
         error_log($request);
         $obj = json_decode($request);

         $Pid= $obj->ProjectID;
         error_log($Pid);
         $PN=$obj->ProjectName;
         error_log($PN);
         $Lname= $obj->LayerName;
         error_log($Lname);

         if ($PN =='SNCF'){
          $PN='public';
          }

        //Insérer toutes les données dans une table temporaire
         $sql1='SELECT * INTO TemporaryTableDATA FROM  '.$Lname;
         $tables1 = DB::select( $sql1);
         //déposez la colonne geom de la table temporaire
         $sql2=' ALTER TABLE TemporaryTableDATA DROP COLUMN geom';
         $tables2 = DB::select( $sql2);
         //Extraire les données de la table temporaire
         $sql3='SELECT * FROM TemporaryTableDATA LIMIT 2';
         $tables3 = DB::select( $sql3);
         //Chute de la table temporaire
         $sql4='DROP TABLE TemporaryTableDATA';
         $tables4= DB::select( $sql4);

         return $tables3;
        }
}
