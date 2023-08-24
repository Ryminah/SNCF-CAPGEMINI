<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\DbProject;
use App\Models\DataBase;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Storage;
use app\vendor\pion\ChunkUpload\src\Receiver\FileReceiver;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    //get all the data
    public function getProject()
    {
        $projets = DbProject::all();
        return response()->json($projets);
    }


   
    //get the data of a new project Geoserver from the front end

     public function addDBproject(Request $request)
    {

        $project = json_decode($request->getContent());

        $db_id = $project->namedatabase;
        $nomprojet = $project->nom;
        $layers = json_encode($project->couches);
    
        // Insertion dans la base de données
        DbProject::create([
            'db_id' => $db_id,
            'couches' => $layers,
            'nom' => $nomprojet,
        ]);
    
        return response()->json(['message' => 'Projet ajouté avec succès'], 201);
        // DB::table('db_projects')->insert(
        //     array(
        //         'db_id' =>  $db_id,
        //         'couches' => $layers,
        //         'nom' => $nomprojet
        //     )
        // );

    }
  //supprimer un projet de la base de donnée
  public function removeProject($id){
    try{
        DbProject::find($id)->delete();
        return response()->json(['message' => 'Projet supprimé !'], 201);

    } catch(e){
        return response()->json(['message' => 'Projet non supprimé !']);
    }
  }
    //récuper les couches d'un projet par son nom
    public function getProjectByName(Request $request)
    {
        $request = $request->get('request');
        $projets = Project::select("layers")
                        ->where("name",$request);
        // $sql = "select layers from projects where name='" . $request . "'";
        // $req = DB::select($projets);
        //$name = DB::table('projects')->where('name', $request);
        // print_r($name);
        return  response()->json($projets);
        //return  $user;
    }

    public function getProjectByID(Request $request)
    {
        Log::info("getProjectByID");
        $request = $request->get('request');
        // $couches = DbProject::select("couches")->where("id","$request");
        $couches = DbProject::find($request);
        // $sql = "select couches from db_projects where id=$request";
        // $req = DB::select($sql);
        // Log::info($couches->toSql());

        // $database = DataBase::select('nom', 'sp', 'vrs', 'environnement')
        // ->where('id', function ($query) use ($request) {
        //     $query->select('db_id')
        //         ->from((new DbProject)->getTable())
        //         ->where('id', $request);
        // })
        // ->first();
        $database = DataBase::select('nom', 'sp', 'vrs', 'environnement')
                    ->where('id', function($query) use ($request) {
                        $query->select('db_id')
                              ->from('db_projects')
                              ->where('id', $request);
                    })
                    ->first();
        error_log($request);


        return response()->json(array(
            'layers' => [$couches],
            'info_db' => [$database],

        ));
    }

    //récuperer le nom de la base de donnees à partir de la table db_project via le cle etranger db_id
    public function getNameDbByIdProjet(Request $request)
    {
        error_log("getNameDbByIdProjet");
        $request = $request->get('request');
        error_log($request);

        $nom = DataBase::where('id', function ($query) use ($request) {
                $query->select('db_id')
                    ->from((new DbProject)->getTable())
                    ->where('id', $request);
            })
            ->value('nom');

        // $sql = "select nom from data_bases where id=(select db_id from db_projects where id=" . $request . ")";
        // error_log($sql);
        // $req = DB::select($sql);
        return  response()->json($nom);
    }


    //get project name by id
    public function getProjectNameByID(Request $request)
    {
        error_log("getProjectByID");
        $request = $request->get('request');
        error_log($request);
        $sql = "select nom from db_projects where id=$request";
        $req = DB::select($sql);
        return  response()->json($req);
    }

    //je n'ai pas encore utilisé cette fonction
    //get type of geometry by  the name layer and the data base (shema)
    public function GetTypeGeometryByLayerName(Request $request)
    {
        error_log("getProjectByID");
        $request = $request->get('request');
        error_log($request);
        $sql = 'select ST_GeometryType( geom ) from public.' . $request . ' ' . 'limit 1';
        $req = DB::select($sql);

        $sql2 = "SELECT column_name  FROM information_schema.columns  WHERE table_schema = 'public'
         AND table_name   ='" . $request . "'";
        $req2 = DB::select($sql2);

        $array = array(
            "0" => array(
                "ST_GeometryType" => $req,
                "column_name" => $req2,
            ),

        );

        return  response()->json($array);
    }

    //la function qui récupere la geometry d'un enregistrement by id
    public function GetGeometryByLayerNameAndID(Request $request)
    {
        error_log("GetGeometryByLayerNameAndID");
        $request = $request->get('request');
        error_log($request);
        $obj = json_decode($request);
        $DB =  $obj->ProjectName;
        $layer = $obj->ProjectLayer;
        $ID = $obj->inputId;
        error_log($DB);
        //$layer =$request.ProjectLayer;
        //$ID =$request.inputId;
        if ($DB == 'SNCF') {
            $DB = 'public';
        }
        $sql = 'select ST_AsGeoJSON(geom) from ' . $DB . '.' . $layer . ' ' . 'where id=' . $ID;
        error_log($sql);
        $req2 = DB::select($sql);

        return  response()->json($req2);
    }

    //Eenregister l'id du p_tiv crée (  draw) en se basant sur son id : p_bus_ndv
    //Cette function je l'ai pas encore utilisé
    public function p_bus_ndv_id_voie(Request $request)
    {

        error_log("p_bus_ndv_id_voie");
        $request = $request->get('request');
        $obj = json_decode($request);
        $idNdv1 =  $obj->id_ndv1;
        error_log($idNdv1);
        $idNdv2 =  $obj->id_ndv2;
        error_log($idNdv2);

        //on récupere le dernier enregistrement
        $sql = ' SELECT id
        FROM public.p_tiv
        ORDER BY id DESC
        LIMIT 1';
        $req2 = DB::select($sql);
        //convert array to string
        $strg = json_encode($req2);
        error_log($strg);
        $array1 = preg_split('/[:]/', $strg);
        $array2 = preg_split('/[}]/', $array1[1]);
        $id_p_tiv = $array2[0];
        error_log(gettype($strg));

        //JUST POUR TERTER
        $id_p_tiv = '6487';
        //id_ndv1 ===== voie_1
        $sq4 = 'select id_voie1 FROM public.p_bus_ndv  where fid=' . $id_p_tiv;
        $TEST_ID_NDV1 = DB::select($sq4);
        $json1 = json_encode($TEST_ID_NDV1);
        $array_id1 = preg_split('/[:]/', $json1);
        //Je suis là si la colone est nulle ; il trouve un prob au niveau de cette ligne
        $array2_id1 = preg_split('/[}]/', $array_id1[1]);
        $full_enmpy1 = $array2_id1[0];
        error_log($full_enmpy1);

        if ($full_enmpy1 == 'null') {
            $req_final_1 = 'UPDATE public.p_bus_ndv SET id_voie1 =' . $full_enmpy1 . 'where id=' . $idNdv1;
            $req_final_1_db = DB::select($req_final_1);
        } else {
            //id_ndv1 ===== voie_1
            $sq5 = 'select id_voie2 FROM public.p_bus_ndv  where fid=' . $id_p_tiv;
            $TEST_ID_NDV2_V2 = DB::select($sq5);
            $json1_V2 = json_encode($TEST_ID_NDV2_V2);
            $array_id1 = preg_split('/[:]/', $json1_V2);
            $array2_id1 = preg_split('/[}]/', $array_id1[1]);
            $full_enmpy1_V2 = $array2_id1[0];
            error_log($full_enmpy1_V2);
            $req_final_1 = 'UPDATE public.p_bus_ndv SET id_voie2 =' . $full_enmpy1_V2 . 'where id=' . $idNdv1;
            $req_final_1_db = DB::select($req_final_1);
        }

        //id_ndv1 ===== voie_2
        $sq4 = 'select id_voie1 FROM public.p_bus_ndv  where fid=' . $idNdv2;
        $TEST_ID_NDV2 = DB::select($sq4);
        $json2 = json_encode($TEST_ID_NDV1);
        $array_id2 = preg_split('/[:]/', $json2);
        $array2_id2 = preg_split('/[}]/', $array_id2[1]);
        $full_enmpy2 = $array2_id2[0];
        error_log($full_enmpy2);

        if ($full_enmpy2 == 'null') {
            $req_final_2 = 'UPDATE public.p_bus_ndv SET id_voie1 =' . $full_enmpy1 . 'where id=' . $idNdv2;
            $req_final_2_db = DB::select($req_final_2);
        } else {
            //id_ndv1 ===== voie_1
            $sq8 = 'select id_voie2 FROM public.p_bus_ndv  where fid=' . $idNdv2;
            $TEST_ID_NDV2_V2_V2 = DB::select($sq5);
            $json1_V2 = json_encode($TEST_ID_NDV2_V2_V2);
            $array_id1_2 = preg_split('/[:]/', $json1_V2);
            $array2_id1_2 = preg_split('/[}]/',  $array_id1_2[1]);
            $full_enmpy1_V2_V2 =  $array2_id1_2[0];
            error_log($full_enmpy1_V2_V2);
            $req_final_1 = 'UPDATE public.p_bus_ndv SET id_voie2 =' . $full_enmpy1_V2 . 'where id=' . $idNdv1;
            $req_final_1_db = DB::select($req_final_1);
        }
    }

    //function qui prend en parametre l'id d'une entité p_bus_ndv et
    // qui nous donne en retour l'id de l'entité p_nav qui lui correspond

    public function p_bus_ndv_p_nav(Request $request)
    {
        error_log("p_bus_ndv_p_nav");
        $request = $request->get('request');
        $sql = "select geom from p_bus_ndv where id=$request";
        $req = DB::select($sql);

        for ($i = 1; $i <= 4683; $i++) {
            $sql2 = "select geom from p_nav where id=$i";
            $req2 = DB::select($sql2);
            if ($req2 == $req) {
                return  response()->json($i);
                error_log($i);
                break;
            }
        }
    }

    // function qui prend deux id des P_bus_ndv , et cherche le tav qui start et end de ces points(nav)
    public function p_tav_from_2_navs(Request $request)
    {
        error_log("p_bus_ndv_p_nav");

        $request = $request->get('request');
        $obj = json_decode($request);

        $Schema_name = $obj->nom_schema;

        $ID_p_bus_ndv1 = $obj->p_bus_1;
        $ID_p_bus_ndv2 = $obj->p_bus_2;

        // Nous récupéroons  les ids des p_navs
        $demande1 = "select geom from p_bus_ndv where id=$ID_p_bus_ndv1";
        $req_demande1 = DB::select($demande1);
        for ($i = 1; $i <= 4683; $i++) {
            $sql2 = "select geom from p_nav where id=$i";
            $req2 = DB::select($sql2);
            if ($req2 == $req_demande1) {
                $ID_nav1 = $i;
                error_log($i);
                break;
            }
        }


        $demande2 = "select geom from p_bus_ndv where id=$ID_p_bus_ndv2";
        $req_demande2 = DB::select($demande2);
        for ($i = 1; $i <= 4683; $i++) {
            $sql2 = "select geom from p_nav where id=$i";
            $req2 = DB::select($sql2);
            if ($req2 == $req_demande2) {
                $ID_nav2 = $i;
                error_log($i);
                break;
            }
        }


        // Nous supprimons les tables temporaires qui exitent
        $drop1 = "DROP TABLE IF EXISTS public.TemporaryTable";
        $ex_drop1 = DB::select($drop1);

        $drop2 = "DROP TABLE IF EXISTS public.TemporaryTable2";
        $ex_drop2 = DB::select($drop2);

        $drop3 = "DROP TABLE IF EXISTS public.TemporaryTable3";
        $ex_drop3 = DB::select($drop3);

        // Nous récupéroons  le p_tav
        $sql1 = "SELECT st_buffer(p_nav.geom,0.1) as geom INTO public.TemporaryTable FROM p_nav where id=$ID_nav1";
        $req1 = DB::select($sql1);

        $sql2 = "SELECT st_buffer(p_nav.geom,0.1) as geom INTO public.TemporaryTable2 FROM p_nav where id=$ID_nav2";
        $req2 = DB::select($sql2);

        $sql3 = "create table public.TemporaryTable3 as (
        select p_tav.geom
        from TemporaryTable , p_tav ,TemporaryTable2
        where
        (St_intersects(ST_EndPoint(p_tav.geom),TemporaryTable2.geom) or St_intersects(ST_StartPoint(p_tav.geom),TemporaryTable2.geom))
        and
        (St_intersects(ST_EndPoint(p_tav.geom),TemporaryTable.geom) or St_intersects(ST_StartPoint(p_tav.geom),TemporaryTable.geom))
        )";
        $req3 = DB::select($sql3);

        // Nous cherchons le dernier enregitrement de geoserver de p_tav , pour inserer la geom
        $sql_final = "UPDATE  p_tiv
      SET geom=(select geom  from TemporaryTable3) ,  nom_schema=" . "'" . $Schema_name . "'" .
            "where id=(SELECT  id FROM public.p_tiv  ORDER BY id DESC  LIMIT 1)";
        error_log($sql_final);

        $req_final = DB::select($sql_final);

        return response()->json($req3);
    }

    //function pour enregistrer un nouveau enregistrement dans la couche Pont à partie d'un Form
    public function Form_Pont_New_Ligne(Request $request)
    {

        error_log("Form_Pont_New_Ligne");
        $request = $request->get('request');
        error_log($request);

        $obj = json_decode($request);


        $cord_pt1_x_send = $obj->cord_pt1_x;
        error_log($cord_pt1_x_send);
        $cord_pt1_y_send =  $obj->cord_pt1_y;
        error_log($cord_pt1_y_send);
        $cord_pt2_x_send =  $obj->cord_pt2_x;
        error_log($cord_pt2_x_send);
        $cord_pt2_y_send =  $obj->cord_pt2_y;
        error_log($cord_pt2_y_send);

        $date_heure_maj_send =  $obj->date_heure_maj;
        $id_objet_send = $obj->id_objet;
        $id_pas_send = $obj->id_pas;
        $etat_send = $obj->etat;
        $imu_send = $obj->imu;
        $nom_send = $obj->nom;
        $nom_schema_send = $obj->nom_schema;
        error_log($nom_schema_send);


        $sql2 = "INSERT INTO pont(geom,date_heure_maj,id_objet, id_pas,etat,imu,nom,nom_schema) VALUES(
      ST_SETSRID(ST_Collect(
      ST_MakePoint(" . $cord_pt1_x_send . "," . $cord_pt1_y_send . ',0),' .
            'ST_MakePoint(' . $cord_pt2_x_send . "," . $cord_pt2_y_send . ',0)), 2154)' . ',' .
            "'" . $date_heure_maj_send . "'" . ',' . $id_objet_send . ',' . $id_pas_send . ',' . "'" . $etat_send . "'" . ',' .
            "'" . $imu_send . "'" . ',' . "'" . $nom_send . "'" . ',' . "'" . $nom_schema_send . "'" . ')';
        error_log($sql2);

        $tables = DB::select($sql2);
    }

    //fonction qui retourne un boolen si la valeur (id_objet) existe dans la table
    public function Id_Object_Pont(Request $request)
    {
        error_log("Id_Object_Pont");
        $request = $request->get('request');
        error_log($request);
        $sql = "SELECT exists (SELECT 1 FROM  Pont  WHERE id_objet =$request LIMIT 1)";
        $req = DB::select($sql);
        return response()->json($req);
    }

    //function pour enregistrer un nouveau enregistrement dans la couche sg_signal à partie d'un Form
    public function Form_Sg_SIGNAL_New_Ligne(Request $request)
    {
        error_log("Form_Pont_New_Ligne");
        $request = $request->get('request');
        error_log($request);

        $obj = json_decode($request);

        $pas = $obj->id_pas;
        $schema = $obj->nom_schema;


        $cord_pt_x_send = $obj->cord_pt_x;
        error_log($cord_pt_x_send);
        $cord_pt_y_send =  $obj->cord_pt_y;
        error_log($cord_pt_y_send);


        $date_heure_maj_send =  $obj->date_heure_maj;
        $etat_send = $obj->etat;
        $imu_send = $obj->imu;
        $nom_send = $obj->nom;


        $sens_send = $obj->sens;
        $position_send = $obj->position;
        $type_send = $obj->type;

        $indication_send = $obj->indication;
        $equipe_send = $obj->equipe;


        error_log($nom_send);


        $sql2 = "INSERT INTO sg_signal(geom,date_heure_maj,etat,imu,nom,
    sens,position,type,indication,equipe,id_pas,nom_schema) VALUES(
      ST_SETSRID(
      ST_MakePoint(" . $cord_pt_x_send . "," . $cord_pt_y_send . ',0)' . ', 2154)' . ',' .
            "'" . $date_heure_maj_send . "'" . ',' . "'" . $etat_send . "'" . ',' .
            "'" . $imu_send . "'" . ',' . "'" . $nom_send . "'" . ',' . "'" . $sens_send . "'" . ',' . "'" . $position_send . "'" .
            ',' . "'" . $type_send . "'" . ',' . "'" . $indication_send . "'" . ',' . "'" .  $equipe_send . "'" . ','
            . "'" .  $pas . "'" . ','
            . "'" .  $schema . "'"
            . ')';

        error_log($sql2);
        $req = DB::select($sql2);

        error_log($sql2);
        return response()->json($req);
        //$tables = DB::select( $sql2);

    }


    //Fuction pour enregistrer dans DB le style du projet
    public function SaveStyleProject(Request $request)
    {
        error_log("SaveStyleProject");
        $request = $request->get('request');


        $obj = json_decode($request);

        $id_pas_user = $obj->id_pas_user;
        $projectName = $obj->projectName;
        $style = $obj->style;
        $style2 = json_encode($style);

        $sql1 = "select style from  public.StyleProject where projectName=" . "'" . "$projectName" . "'" .
            " and id_User=$id_pas_user";
        $req_sql1 = DB::select($sql1);
        error_log($sql1);

        error_log(sizeof($req_sql1));
        if (sizeof($req_sql1) == 0) {
            $sql2 = "insert into public.StyleProject(id_User,projectName,style) values(
            $id_pas_user, " . "'" .
                "$projectName" . "'" .
                ",'" .
                "$style2" . "'" . ")";

            $req = DB::select($sql2);
        } else {
            $sql2 = "update  public.StyleProject set style=" .
                "'" . "$style2" . "'" .
                "where projectName=" . "'" .
                "$projectName" . "'" .
                "and id_User= $id_pas_user";
            error_log($sql2);
            $req = DB::select($sql2);
        }


        return response()->json($req);
    }
  


    //Recuperer le style d'un projet en fonction de id User et Nom projet
    public function getStyleProject(Request $request)
    {
        error_log("SaveStyleProject");
        $request = $request->get('request');

        $obj = json_decode($request);

        $id_pas_user = $obj->id_pas_user;
        $projectName = $obj->projectName;

        $sql1 = "select style from  public.StyleProject where projectName=" . "'" . "$projectName" . "'" .
            " and id_User=$id_pas_user";
        $req_sql1 = DB::select($sql1);

        return response()->json($req_sql1);
    }


    //CMD
    public function cmd()
    {
        //&& to separate the comands.
        $output = shell_exec('cd C:\PotreeConverter_windows_x64 && PotreeConverter.exe C:\Users\jlanciau\OneDrive - Capgemini\Documents\GeoServer\Existant\Me_St_Mu_003882.las -o C:\Users\jlanciau\OneDrive - Capgemini\Documents\GeoServer\Existant\Potree --generate-page test --projection +proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
        error_log($output);
    }


    //Récuperer Data de Potree
    public function GetPotreeData()
    {
        $sql1 = "select * from  public.PotreeFiles ";
        $req_sql1 = DB::select($sql1);
        return response()->json($req_sql1);
    }

    //save Data de Potree
    public function SaveDataPotree(Request $request)
    {
        error_log("SaveDataPotree");
        // create the file receiver
        $receiver = new FileReceiver("file", $request, HandlerFactory::classFromRequest($request));

        // check if the upload is success, throw exception or return response you need
        if ($receiver->isUploaded()) {
        }
        // receive the file
        $save = $receiver->receive();

        // check if the upload has finished (in chunk mode it will send smaller files)
        if ($save->isFinished()) {
            // save the file and return any response you need, current example uses `move` function. If you are
            // not using move, you need to manually delete the file by unlink($save->getFile()->getPathname())
            return $this->saveFile($save->getFile());
        }

        // we are in chunk mode, lets send the current progress

        $handler = $save->handler();

        return response()->json([
            "done" => $handler->getPercentageDone(),
        ]);
    }
}
