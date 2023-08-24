<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataBase;
use App\Models\Project;

use DB;

class DataBaseContr extends Controller
{
    //get all the data base name
       public function getDataBase(){
            $DataBase = DataBase::all();
            return response()-> json($DataBase);
      }

    //GET layers of db by id
    public function getLayersDbGeo(Request $request){
        error_log("getLayersDbGeo");
        $request=$request->get('request');
        $layers=DataBase::select('couches')
                            ->find($request);
        // $sql2="SELECT couches from data_bases  where id=".$request;
        // $tables = DB::select( $sql2);
        return response()-> json([$layers]);
   }

    //je n'ai pas encore utilisé cette fonction
    //get name of DB BY id project
    public function getNameDBbyIdProject(Request $request){
        error_log("getNameDBbyIdProject");
        $request=$request->get('request');
        $sql2="select nom from data_bases where id=(select db_id from db_projects where id=".$request.")";
        $tables = DB::select( $sql2);
        return response()-> json($tables);
       }

    //save un nouveau enregistrement
    public function SaveNewStore(Request $request){
      error_log("SaveNeWStore");
      $request2=$request->get('request');
      error_log($request2);
      $project = json_decode($request2);

      $DataSName=$project->DataStoreName;
      error_log($DataSName);
      $lyrs=$project->layers;
      error_log(gettype($lyrs));

      $SousProcess=$project->SP;
      error_log(($SousProcess));

      $Vrs=$project->Version;
      error_log(($Vrs));


      $env=$project->envrnmt;
      error_log(($env));

      //convert array to string
      $strg=json_encode($lyrs);

      DataBase::create([
        'couches' => $strg,
        'nom' => $DataSName,
        'sp' => $SousProcess,
        'vrs' => $Vrs,
        'environnement' => $env,
    ]);
      // $sql2="INSERT INTO public.data_bases(couches, nom,sp,vrs,environnement)
      // VALUES("."'". $strg."'".','."'".$DataSName."'" .','."'". $SousProcess."'".','."'". $Vrs."'".','."'". $env."'".')';
      // error_log($sql2);
      // $tables = DB::select( $sql2);


    }

}
