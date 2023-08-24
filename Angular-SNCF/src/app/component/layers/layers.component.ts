import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, UntypedFormControl, Validators, FormBuilder, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import * as $ from 'jquery';


@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {
  layers: any;
  name: string | undefined;
  form: UntypedFormGroup;
  ProjectForm: any;
  ProjectFormGeo: any;
  ProjectFormDisplay: any;
  DisplayTableAttribute: any;
  Tab: string[] = [];
  TabData: string[] = [];
  jetest = 'hello';
  output = {};
  output2: any;
  outputDB: any;
  output3: any;
  projects: any;
  databases: any;
  layersProject: any;
  layersProject2: any;
  layersProjectGEO: any;
  databaseName: any;
  databaseName2: any;
  output5: any;
  output6: any;
  selector: any;
  selector2: any;
  submitted = false;
  submitted2 = false;
  FormModalSearch: any;
  FeatureGeometry: any;
  FeatureGeometrySend: any;
  projectData: any;
  outputDataProject: any;
  headers = new Headers({ 'Content-Type': 'application/json' });
  ProjectName: any;
  TabLayerName: string[] = [];
  TabProjectName: string[] = [];
  DataStore: any;
  TestNameDataStore = true;
  NewStorData: any;
  SousPr: any; Vrs: any;
  options_attr_layers: any;
  environnement: any;
  PotreeData: any;
  PotreeDB: any; PotreeSaveData: any;
  db_potree_to_send: any; PotreeDb_Send: any;
  URLfileLas: any;
  formeurl: any;
  couches: any;
  nom_projet: any;


  //ici on appel notre service : DataService
  constructor(private dataService: DataService, private route: Router, private fb: UntypedFormBuilder,
    private http: HttpClient, private formBuilder: FormBuilder) {


    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });

    //la création du FormGroup pour le modal de création d"un nouveau projet
    this.ProjectForm = new UntypedFormGroup({
      nameproject: new UntypedFormControl(''),
      LayersChosen: new UntypedFormControl(''),
    })

    //la création du FormGroup pour le modal de création d"un nouveau projet geoserver
    this.ProjectFormGeo = new UntypedFormGroup({
      namedatabase: new UntypedFormControl(''),
      nameprojectgeo: new UntypedFormControl(''),
      LayersGeo: new UntypedFormControl(''),
    })


    this.ProjectFormGeo = this.formBuilder.group(
      {
        namedatabase: ['', Validators.required],
        nameprojectgeo: ['', Validators.required],
        LayersGeo: ['', Validators.required],

      })

    //la création du FormGroup pour le from de l'affichage d'un projet
    this.ProjectFormDisplay = new UntypedFormGroup({
      nameProjectToDisplay2: new UntypedFormControl(''),
      namesLayer2: new UntypedFormControl('')
    })

    //Form modal ; search for feature by attribut

    this.DisplayTableAttribute = new FormGroup({
      Project: new FormControl(''),
      Layer: new FormControl(''),
    })

    //Form modal ;CREATE NEW STORE Geoserver
    this.DataStore = new FormGroup({
      DataStoreName: new FormControl(''),
      SP: new FormControl(''),
      Version: new FormControl(''),
      envrnmt: new FormControl(''),
    })

    this.DataStore = this.formBuilder.group(
      {
        DataStoreName: ['', Validators.required],
        SP: ['', Validators.required],
        Version: ['', Validators.required],
        envrnmt: ['', Validators.required],
      })


    //Display a data potree
    this.PotreeData = new FormGroup({
      NamePotree: new FormControl('')

    })

    //Save a data potree
    this.PotreeSaveData = new FormGroup({
      LasName: new FormControl(''),
      URLfile: new FormControl('')
    })

    this.formeurl = new FormGroup({
      urlLas: new FormControl('')
    })

  }


  //Fonction appelée lors de l'initialisation
  ngOnInit(): void {
    //nous appelons les fonction qui doivent etre lancé des le départ
    this.GetDataUser();

    this.GetNameLayers();
    this.GetNameProjects();
    this.GetNameDatabase();
    // this.GetDataPotree();
  }


  // récupérer  Data Potree

  GetDataPotree() {
    this.dataService.getPotreeData().subscribe(res => {
      console.log('getPotreeData');
      this.PotreeDB = res;
      console.log(this.PotreeDB);
    })
  }
  GetDataUser(){
    const couchesFromStorage = sessionStorage.getItem('couche');

    if (couchesFromStorage !== null) {
      this.couches = JSON.parse(couchesFromStorage);
    } else {
      // Gérer le cas où 'couche' est null (ou non défini) si nécessaire
      this.couches = []; // Par exemple, attribuer un tableau vide
    }
    this.nom_projet = sessionStorage.getItem('nom_projet')
    console.log("Couches =>", this.couches)
  }

  //--------------------------------------------------------------------------------------------//
  //--------------------------------------------------------------------------------------------//

  //on va creer une fonction pour recuperer les donnees de notre API
  GetNameLayers() {

    this.dataService.getData().subscribe(res => {
      //ici on a passé à la variable layers la reponce  res qui contient le tabelau des noms des couches
      this.layers = res;
    })
  }

  //--------------------------------------------------------------------------------------------//
  //--------------------------------------------Diplay layers---------------------------------------------//

  //la fonction de changement de l'evenement select layers
  onChangeLayer(event: any) {
    console.log(event.target.value);
    this.route.navigate(['CarteComponent'], { queryParams: { data: event.target.value } })

  }

  //The onCheckboxChange() method takes one argument, and this value referred to the checkbox value when a user clicked on it and the name of the lyr
  onCheckboxChange(event: any, name: any) {
    console.log('onCheckboxChange');

    const checkArray: UntypedFormArray = this.form.get('checkArray') as UntypedFormArray;
    console.log(name);
    if (event.target.checked) {
      checkArray.push(new UntypedFormControl(event.target.value));
      this.Tab.push(event.target.value);
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  Submit() {
    console.log('form submited');
    console.log(this.Tab);
    this.route.navigate(['CarteComponent'], { queryParams: { data: this.Tab } })

  }

  //--------------------------------------------------------------------------------------------//
  //-----------------------------------------display data- ---------------------------------------//

  onCheckboxChangeAttrib(event: any, name: any) {
    console.log('onCheckboxChange--2');
    const checkArray: UntypedFormArray = this.form.get('checkArray') as UntypedFormArray;
    console.log('tha layer name');
    console.log(name);
    this.name = name;
  }

  SubmitLyrAttrib() {
    console.log("hello " + this.name);
    //- this.route.navigate(['InfoLayerComponent'],{queryParams:{data:this.name}})
    //-il faut spc le type de retour
    this.http
      .get('http://127.0.0.1:8000/api/LayerData?request=' + this.name)
      .subscribe((response: object) => {
        console.log(response);
        console.log(typeof (response));
        //---------------------------------- passage de donneEs ----> InfoLayerComponent --------------------//
        this.dataService.sendData(response);
        //const json = JSON.stringify(response);
        //--je l'ai commenté juste pour le moment
        // this.route.navigate(['InfoLayerComponent'],{queryParams:{data:this.name}})

      });
  }

  onChooseLayer(event: any) {
    // console.log("create new project");
    // console.log(event.target.value);

    // this.route.navigate(['CarteComponent'], { queryParams: { data: event.target.value } })
  }

  //récupérer les données du formulaire de création d"un nouveau projet 'Modal' et les enregister dans la BD
  SubmitLayerChoise() {
    console.log("le Form du modal marche bien");
    console.log(this.ProjectForm.value.nameproject);
    console.log(this.ProjectForm.value.LayersChosen);
    console.log(typeof (this.ProjectForm.value.LayersChosen));

    //to send data to the back end
    this.output3 = "'" + this.ProjectForm.value.LayersChosen + "'";
    this.output = {
      "name": this.ProjectForm.value.nameproject,
      "layers": this.output3
    }
    this.output2 = JSON.stringify(this.output);

    this.http
      .post('http://127.0.0.1:8000/api/addproject?request=' + this.output2, null)
      .subscribe((response: object) => {
        console.log('done');
      });

  }

  // getter f to access form controls
  get g(): { [key: string]: AbstractControl } {
    return this.DataStore.controls;
  }

  //récupérer les données du formulaire de création d"un nouveau projet geoserver 'Modal' et les enregister dans la BD
  SubmitNewProject() {
    this.submitted = true;
    console.log("le Form du modal marche bien: alhamdolillah");
    console.log(this.ProjectFormGeo.value.namedatabase);
    console.log(this.ProjectFormGeo.value.nameprojectgeo);
    console.log(this.ProjectFormGeo.value.LayersGeo);
    console.log(typeof (this.ProjectFormGeo.value.LayersGeo));



    //to send data to the back end
    this.output = {
      "namedatabase": this.ProjectFormGeo.value.namedatabase,
      "nomprojet": this.ProjectFormGeo.value.nameprojectgeo,
      "layers": this.ProjectFormGeo.value.LayersGeo
    }
    this.outputDB = JSON.stringify(this.output);
    console.log(this.outputDB);

    this.http
      .post('http://127.0.0.1:8000/api/addDBproject?request=' + this.outputDB, null)
      .subscribe((response: object) => {
        console.log('done');
      });

  }

  // récupérer les noms de tous les projets
  GetNameProjects() {

    this.dataService.getProject().subscribe(res => {
      this.projects = res;

    })
  }

  // récupérer les noms des bases de données
  GetNameDatabase() {
    this.dataService.getDataBase().subscribe(res => {
      this.databases = res;

    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ProjectFormGeo.controls;
  }


  // récupérer le nom du projet choisie
  DisplayProject() {

    console.log("récupérer le nom du projet choisie");
    console.log(this.ProjectFormDisplay.value.nameProjectToDisplay);
    //on doit envoyer le projet
    this.http
      .get('http://127.0.0.1:8000/api/getProjectByName?request=' +
        this.ProjectFormDisplay.value.nameProjectToDisplay)
      .subscribe((response: Object) => {
        console.log("récupérer les couches ");
        console.log(response);
        console.log(typeof (response));
        //JE SUIS ici je dois trouver un moyen pour récupere les nons des couches commme json et non pas string
        this.dataService.sendProject(response);

      });

  }

  //récupérer le nom (id) du projet choisie puis l'envoyer au serveur pour récupérer les couches
  onOptionsSelected(event: any) {
    const valID = event.target.value;
    console.log(" je viens d'etre changer", valID)

    this.http
      .post('http://127.0.0.1:8000/api/getProjectByID?request=' + valID, null)
      .subscribe((response: object) => {
        this.layersProject = response;
        console.log(this.layersProject.layers);
        console.log(this.layersProject.info_db);

        //db base info : SousPr Vrs
        this.SousPr = (this.layersProject.info_db)[0].sp;
        this.Vrs = (this.layersProject.info_db)[0].vrs;
        this.environnement = (this.layersProject.info_db)[0].environnement;

        console.log(this.SousPr);
        console.log(this.Vrs);

        this.layersProject2 = JSON.parse((this.layersProject.layers)[0].couches);
        this.selector = (<HTMLInputElement>document.getElementById('selectorrr'))!;
        this.selector2 = (<HTMLInputElement>document.getElementById('ModalProject'))!;
        //pour vider le select
        this.selector.innerHTML = "";
        this.selector2.innerHTML = "";

        for (let key in this.layersProject2) {
          console.log(this.layersProject2[key])
          var newoption = document.createElement("option");
          newoption.text = this.layersProject2[key];
          this.selector.add(newoption);
        }

        for (let key in this.layersProject2) {
          console.log(this.layersProject2[key])
          var newoption = document.createElement("option");
          newoption.text = this.layersProject2[key];
          this.selector2.add(newoption);
        }

        //remplir le input du sous process et celui de la version
        (<HTMLInputElement>document.getElementById('s_p')).value = this.SousPr;
        (<HTMLInputElement>document.getElementById('v_r_s')).value = this.Vrs;
        (<HTMLInputElement>document.getElementById('environ')).value = this.environnement;

        //this.selector = (<HTMLInputElement>document.getElementById('selectorrr'))!;
        // var newoption = document.createElement("option");
        //newoption.text = "User1";
        //newoption.value == "1";
        //this.selector.add(newoption);
        console.log('done');

      });

  }

  // récupérer le nom du projet choisie et les couches puis les envoyer a cart compo pour les afficher sur map
  DisplayProject2() {

    console.log("récupérer le nom des couches choisie");
    console.log(this.ProjectFormDisplay.value.namesLayer2);
    console.log(this.ProjectFormDisplay.value.nameProjectToDisplay2);
    //je doid récuperer le nom de la base de données (entropot geoserver)
    const valIDprojet = this.ProjectFormDisplay.value.nameProjectToDisplay2;
    this.http
      .post('http://127.0.0.1:8000/api/getProjectNameByID?request=' + valIDprojet, null)
      .subscribe((response: object) => {
        console.log(response);
        this.databaseName = response;
        this.databaseName2 = this.databaseName[0].nom
        this.output5 = {
          "id_project": this.ProjectFormDisplay.value.nameProjectToDisplay2,
          "databaseName": this.databaseName2,
          "layers": this.ProjectFormDisplay.value.namesLayer2
        }
        console.log("this.output5", this.output5);
        this.dataService.sendDataBaseProject(this.output5);

      });

    console.log('done');
  }

  // creation d'un nouveau projet : Etape 1 : remplissage de select opntion de layers en fonction du projet choisi
  onDBSelected(event: any) {
    const valID = event.target.value;
    console.log(" je viens d'etre changer", valID)
    this.http
      .post('http://127.0.0.1:8000/api/getLayersDbGeo?request=' + valID, null)
      .subscribe((response: object) => {
        this.layersProject = response;
        console.log(this.layersProject[0].couches);
        console.log(JSON.parse(this.layersProject[0].couches))
        this.layersProjectGEO = JSON.parse(this.layersProject[0].couches);

      })
  }

  // la function qui prend récupere le nom de la couche choisie et retourn les attribut de cette couche  : SearchFeature
  SearchSelected() {
    console.log()
  }

  // la function qui prend comme parametre le nom du projet , la couche , l'attribut  , puis fait le zoom sur la couche
  SearchFeature() {

    console.log((<HTMLInputElement>document.getElementById('ModalProject')).value);
    console.log((<HTMLInputElement>document.getElementById('inputId')).value);
    var ModalProject = (<HTMLInputElement>document.getElementById('ModalProject')).value
    var inputId = (<HTMLInputElement>document.getElementById('inputId')).value

    var output = {
      "ProjectName": this.databaseName2,
      "ProjectLayer": ModalProject,
      "inputId": inputId,

    }
    var outputDB = JSON.stringify(output);

    this.http
      .post('http://127.0.0.1:8000/api/GetGeometryByLayerNameAndID?request=' + outputDB, null)
      .subscribe((response: object) => {
        console.log('data send');
        this.FeatureGeometry = response;
        this.FeatureGeometrySend = this.FeatureGeometry[0].st_asgeojson;
        console.log(this.FeatureGeometrySend);
        this.dataService.sendGeometryFeature(this.FeatureGeometrySend);
      })



  }

  //
  SelectedPojectDisplay(event: any) {
    let text = event.target.options[event.target.options.selectedIndex].text;
    console.log(text);
    this.ProjectName = text;

    const valID = event.target.value;
    console.log(" je viens d'etre changer", valID)

    this.http
      .post('http://127.0.0.1:8000/api/getProjectByID?request=' + valID, null)
      .subscribe((response: object) => {
        this.layersProject = response;

        this.layersProject2 = JSON.parse((this.layersProject.layers)[0].couches);
        //this.layersProject2 = JSON.parse(this.layersProject[0].couches);

        this.options_attr_layers = (<HTMLInputElement>document.getElementById('popupaltLayers'))!;
        //pour vider le select
        this.options_attr_layers.innerHTML = "";


        for (let key in this.layersProject2) {
          console.log(this.layersProject2[key])
          var newoption = document.createElement("option");
          newoption.text = this.layersProject2[key];
          this.options_attr_layers.add(newoption);
        }
        console.log('done');

      });

  }

  DisplayTableAttribute2() {
    console.log(this.DisplayTableAttribute.value);
    console.log(typeof (this.DisplayTableAttribute.value));
    var test1 = this.DisplayTableAttribute.value.Project;
    var test2 = this.DisplayTableAttribute.value.Layer;

    this.outputDataProject = {
      "ProjectName": this.ProjectName,
      "ProjectID": test1,
      "LayerName": test2,
    }

    this.projectData = JSON.stringify(this.outputDataProject);

    this.http
      .post('http://127.0.0.1:8000/api/LayerData2?request=' + this.projectData, null)
      .subscribe((response: object) => {
        console.log(response);
        this.dataService.sendData(response);
      })
  }

  // getter f to access form controls
  // get f(): { [key: string]: AbstractControl } {
  //   return this.FormLayerPtiv.controls;
  // }

  // add ayer to the json
  AddLayer() {
    var layer = (<HTMLInputElement>document.getElementById('LayerNewStore'))!.value;
    console.log(layer)
    this.TabLayerName.push(layer);
    (<HTMLInputElement>document.getElementById('LayerNewStore'))!.value = '';
    console.log(this.TabLayerName)
  }

  //save the nes Store Geoserver Created
  SaveNewStore() {

    console.log('DataStore', this.DataStore.value)
    this.TabProjectName = [];
    var name = (<HTMLInputElement>document.getElementById('NameNewStore'))!.value;

    for (let i in this.projects) {
      this.TabProjectName.push((this.projects)[i].nom);
    }
    console.log(name)
    console.log(this.TabProjectName)

    //je dois ajouter un test pour voir si le nom déja existe
    //TEST POUR VOIR SI LE NOM EXISTE DEJA

    if ((this.TabProjectName).includes(name)) {
      this.TestNameDataStore = false;
    }

    this.submitted2 = true;

    this.output6 = {
      "DataStoreName": this.DataStore.value.DataStoreName,
      "SP": this.DataStore.value.SP,
      "Version": this.DataStore.value.Version,
      "layers": this.TabLayerName,
      "envrnmt": this.DataStore.value.envrnmt
    }

    this.NewStorData = JSON.stringify(this.output6);
    console.log('alaaaaaaah')
    console.log(this.NewStorData)
    this.http
      .post('http://127.0.0.1:8000/api/SaveNewStore?request=' + this.NewStorData, null)
      .subscribe((response: object) => {
        console.log(response);

      })

    //je suis là je dois envoyer ça a laravel
  }


  //Display
  DisplayPotree() {
    //console.log(this.PotreeData.value)
    //console.log(this.PotreeData.NamePotree)
    var url = 'http://' + this.PotreeData.value.NamePotree;
    //console.log(url)
    window.location.href = url;
  }

  //Save Potree Data
  getfile(event: any) {
    console.log(event.target.files[0])
    this.URLfileLas = event.target.files[0]
    this.formeurl.patchValue({
      urlLas: this.URLfileLas
    })

    console.log(this.formeurl.value)
  }

  SavePotree() {
    // var input = document.getElementById("LasURL")! as HTMLInputElement | null;
    //var fReader = new FileReader();
    //const files = input?.files;
    //console.log(files);
    //fReader.readAsDataURL(input?.files[0]);
    console.log(this.PotreeSaveData.value.LasName)
    console.log(this.URLfileLas)



    const formData: any= new FormData();

    formData.append('file', this.formeurl.controls['urlLas'].value);

    //formData.append('file', this.formeurl.get('urlLas')?.value);
     //formData.append('name', this.PotreeSaveData.value.LasName);


    console.log(formData)

    // this.db_potree_to_send ={
    //   "nom":this.PotreeSaveData.value.LasName,
    //   "url": this.formeurl.value
    //}
    //
    //this.PotreeDb_Send = JSON.stringify(this.db_potree_to_send);


    const httpOptions={
      headers:new HttpHeaders({
        'Accept': 'application/json'
      })
    }

    this.http
     .post('http://127.0.0.1:8000/api/SaveDataPotree' , formData, httpOptions)
    .subscribe((response: object) => {
     console.log(response);

     })

     console.log('Done')

  }



}
