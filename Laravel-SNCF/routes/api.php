<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AllTablesContr;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DataBase;
use App\Http\Controllers\DataBaseContr;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('authenticate',[LoginController::class,'authenticate']);

// get all the names of DB
// premier parametre c'est le nom de l'api ; le deuxieme c'est le nom du controlleur ,le troisieme c'est le nom de la fonction
Route::get('TablesAll',[AllTablesContr::class,'getAllTables']);

// on récupere le choix de layers pour esuite envoyé la table
Route::post('LayerData2',[AllTablesContr::class,'postLayerData2']);

//récuperer tout les projet  pour les envoyerau front
Route::get('projects',[ProjectController::class,'getProject']);

//Ajouter un nouveau enregistrement dans la table project
Route::post('addproject',[ProjectController::class,'addProject']);


// on récupere data pour la création d'un nouveau projet
//Route::get('NewProject',[AllTablesContr::class,'addProject']);

//chercher un projet par son nom
Route::get('getProjectByName',[ProjectController::class,'getProjectByName']);



Route::get('list-users', [LoginController::class, 'listUsers']);


// get all the names of data bases
// premier parametre c'est le nom de l'api ; le deuxieme c'est le nom du controlleur ,le troisieme c'est le nom de la fonction
Route::get('DataBaseALL',[DataBaseContr::class,'getDataBase']);


//Ajouter un nouveau enregistrement dans la table db_projects
Route::post('addDBproject',[ProjectController::class,'addDBproject']);
//Supprimer un enregistrement dans la table db_projects

Route::delete('/removeProject/{id}',[ProjectController::class,'removeProject']);
//récuperer les couches d'un projet pas son ID
Route::post('getProjectByID',[ProjectController::class,'getProjectByID']);

//récuperer le nom de la
Route::post('getNameDbByIdProjet',[ProjectController::class,'getNameDbByIdProjet']);

//récuper les couches à partir de l'ID d'une DB projet geoserver
Route::post('getLayersDbGeo',[DataBaseContr::class,'getLayersDbGeo']);

//récuperer le nom du projet à partir de son id
Route::post('getProjectNameByID',[ProjectController::class,'getProjectNameByID']);

//GET the name o the data base by ID of project
Route::post('getNameDBbyIdProject',[DataBaseContr::class,'getNameDBbyIdProject']);



//get type of geometry by name layer
Route::post('GetTypeGeometryByLayerName',[ProjectController::class,'GetTypeGeometryByLayerName']);


//get  geometry by name layer name and id
Route::post('GetGeometryByLayerNameAndID',[ProjectController::class,'GetGeometryByLayerNameAndID']);

//Ajouter un nouveau enregistrement dans la table data_bases
Route::post('SaveNewStore',[DataBaseContr::class,'SaveNewStore']);

//Eenregister l'id du p_tiv crée (draw) en se basant sur son id : p_bus_ndv
Route::post('p_bus_ndv_id_voie',[ProjectController::class,'p_bus_ndv_id_voie']);

//function qui prend en parametre l'id d'une entité p_bus_ndv et
// qui nous donne en retour l'id de l'entité p_nav qui lui correspond
Route::post('p_bus_ndv_p_nav',[ProjectController::class,'p_bus_ndv_p_nav']);

// function qui prend deux id des nav , et cherche le tav qui start et end de ces points(nav)
Route::post('p_tav_from_2_navs',[ProjectController::class,'p_tav_from_2_navs']);


//function pour enregistrer un nouveau enregistrement dans la couche Pont à partie d'un Form

Route::post('Form_Pont_New_Ligne',[ProjectController::class,'Form_Pont_New_Ligne']);


//fonction qui retourne un boolen si la valeur (id_objet) existe dans la table
Route::post('Id_Object_Pont',[ProjectController::class,'Id_Object_Pont']);

//function pour enregistrer un nouveau enregistrement dans la couche sg_signal à partie d'un Form
Route::post('Form_Sg_SIGNAL_New_Ligne',[ProjectController::class,'Form_Sg_SIGNAL_New_Ligne']);

//get all first and second names from producteur
Route::post('getDataProducteur',[LoginController::class,'getDataProducteur'])
//->middleware('auth:sanctum')
;

 //get the is_pas of the user using his login_w
 Route::post('getIdPas',[LoginController::class,'getIdPas']);

//get the nom_schema from table PAS_SEQUENCE using the id_pas choosen by User
Route::post('getNom_schema_byIdPas',[LoginController::class,'getNom_schema_byIdPas']);


//Fuction pour enregistrer le style du projet
Route::post('SaveStyleProject',[ProjectController::class,'SaveStyleProject']);


//Recuperer le style d'un projet en fonction de id User et Nom projet
Route::post('getStyleProject',[ProjectController::class,'getStyleProject']);

//CMD
Route::post('cmd',[ProjectController::class,'cmd']);

//Récuperer Data de Potree
Route::get('GetPotreeData',[ProjectController::class,'GetPotreeData']);


//save Data de Potree
Route::post('SaveDataPotree',[ProjectController::class,'SaveDataPotree']);
