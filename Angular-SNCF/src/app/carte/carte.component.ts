import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import Vector from 'ol/layer/Vector';
import vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
//import VectorLayer from 'ol/source/Vector';
import { bbox, bbox as bboxStrategy } from 'ol/loadingstrategy';
import BaseLayer from 'ol/layer/Base';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import Select from 'ol/interaction/Select';
import { singleClick } from 'ol/events/condition';
import Overlay from 'ol/Overlay';
import PopupFeatur from 'ol-ext/overlay/PopupFeature';
import { Circle, Icon } from 'ol/style';
import { Control } from 'ol/control';
import { FullScreen, ScaleLine } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import { Draw, Modify } from 'ol/interaction';
import { getArea, getLength } from 'ol/sphere';
import { Geometry, LineString, Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
import FontSymbol from "ol-ext/style/FontSymbol";

import { GeometryFunction } from 'ol/style/Style';
import { Group } from 'ol/layer';
import LayerSwitcher from 'ol-layerswitcher';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import XYZ from 'ol/source/XYZ';
import select from 'ol/interaction/Select.js';
import Snap from 'ol/interaction/Snap';
import { getCenter } from 'ol/extent';
import { DomSanitizer } from '@angular/platform-browser';
import GML3 from 'ol/format/GML3';
import * as proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { PtivComponent } from 'src/app/component/ptiv/ptiv.component';
import { ModalModule } from 'ng-modal-lib';
//import { exit } from 'process';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Feature } from 'ol';

import { transformExtent } from 'ol/proj';
import Projection from 'ol/proj/Projection';



import Legend from 'ol-ext/legend/Legend';
import LegendCont from 'ol-ext/control/Legend';
import { urlValidator } from 'src/app/validators/Validate_Form';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';



@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})

export class CarteComponent implements OnInit {
  test: any;
  private layers = {}
  private attributes: any
  private title: any
  TableLayer: any;
  layerChoosen: any;
  layerChoosen2: any;
  layerChoosen3: any;
  layerChoosenFinal: any;
  select2: any;
  featureInfo = {};
  public map!: Map;
  public highlightStyle: any;
  public modify: any;
  public vectorGeoserver: any;
  public myFeature: any;
  public featureOverlay: any;
  public content1: any;
  content: any; content2: any; closer2: any; feature: any; overlay: any; draw_add: any; snap_edit: any; btn: any; overlay2: any; container2: any;
  showNameButton = false;
  hajar: any;
  dataProject: any;
  DB_name: any;
  layers_project: any;
  param: any;
  layerOfMap: any[] = [];
  selector: any;
  valLayer: any;
  ProjectNameGeo: any;
  layerProject: any;
  typefetaure: any;
  typefetaure2: any;
  attributeFetaure: any;
  centroid: any;
  ShowHid = false;
  visible_p_bus_ndv = false;
  visible_p_tiv = false;
  id_p_bus_ndv_1: any;
  id_p_bus_ndv_2: any;
  isEnabled = false;
  source_mod: any;
  FormLayerPtiv: any; FormLayerPont: any;
  postData: any;
  postData1_TEST: any;
  // for verefy if the form is submitted
  submitted = false;
  FormModalSearch: any;
  FeatureGeometry: any; FormModalStyleLayer: any;
  FeatureGeometrySend: any;
  layerZoom: any;
  selector2: any;
  legend1: any;
  legend2: any;
  public legendCtrl: any;
  formLegendSP3: any; formLegendSP4: any; FormLayerSgSignal: any;

  cord_pt1_x: any; cord_pt1_y: any; cord_pt2_x: any; cord_pt2_y: any; cord_pt_x: any; cord_pt_y: any;

  id_pas_user: any; Data_login: any; nom_schema: any;

  keyLegend: any;
  legendTab1: any;
  legendTab2: any;

  Style_layer_P_bus_ndv: any;
  Style_layer_P_tiv: any;

  Style_layer_Pont: any;
  Style_layer_Signal: any;
  Style_layer_Limvit: any;

  getStyleProject: any;


  constructor(private dataService: DataService, private route: ActivatedRoute, private sanitized: DomSanitizer, private route2: Router,
    private http: HttpClient, private formBuilder: FormBuilder
    // public modalService: NgbModal
  ) {

    // Form control : P_TIV
    this.FormLayerPtiv = new FormGroup({
      id_pas: new FormControl(''),
      fid: new FormControl(''),
      id_objet: new FormControl(''),
      imu: new FormControl(''),
      type: new FormControl(''),
      sens_principal: new FormControl(''),
      etat: new FormControl(''),
      date_heure_maj: new FormControl(''),
      nom_schema: new FormControl(''),
      id_ndv1: new FormControl(''),
      id_ndv2: new FormControl(''),

    })

    //ValidatorS FROM : P_TIV
    this.FormLayerPtiv = this.formBuilder.group(
      {
        id_pas: ['', Validators.required],
        fid: ['', Validators.required],
        imu: ['', Validators.required],
        id_objet: ['', Validators.required],
        type: ['', Validators.required],
        etat: ['', Validators.required],
        sens_principal: ['', Validators.required],
        date_heure_maj: ['', Validators.required],
        nom_schema: ['', Validators.required],
        id_ndv1: ['', Validators.required],
        id_ndv2: ['', Validators.required]

      })


    // Form control : Pont
    this.FormLayerPont = new FormGroup({

      id_objet: new FormControl(''),
      imu: new FormControl(''),
      nom: new FormControl(''),
      etat: new FormControl(''),
      id_pas: new FormControl(''),
      date_heure_maj: new FormControl(''),
      nom_schema: new FormControl(''),
      cord_pt1_x: new FormControl(''),
      cord_pt1_y: new FormControl(''),
      cord_pt2_x: new FormControl(''),
      cord_pt2_y: new FormControl(''),
    })

    //ValidatorS FROM : Pont {

    this.FormLayerPont = this.formBuilder.group(
      {
        id_objet: ['', Validators.required,],
        imu: ['', Validators.required],
        nom: ['', Validators.required],
        etat: ['', Validators.required],
        id_pas: ['', Validators.required],
        date_heure_maj: ['', Validators.required],
        nom_schema: ['', Validators.required],
        cord_pt1_x: ['', Validators.required],
        cord_pt1_y: ['', Validators.required],
        cord_pt2_x: ['', Validators.required],
        cord_pt2_y: ['', Validators.required]
      })


    //Form modal ; search for feature by attribut
    this.FormModalSearch = new FormGroup({
      layer: new FormControl(''),
      inputId: new FormControl(''),
    })

    // Form modal  : SgSignal
    this.FormLayerSgSignal = new FormGroup({

      nom_schema: new FormControl(''),
      id_pas: new FormControl(''),

      nom: new FormControl(''),
      imu: new FormControl(''),
      date_heure_maj: new FormControl(''),
      etat: new FormControl(''),
      sens: new FormControl(''),
      position: new FormControl(''),
      type: new FormControl(''),
      indication: new FormControl(''),
      equipe: new FormControl(''),
      cord_pt_x: new FormControl(''),
      cord_pt_y: new FormControl(''),
    })

    //ValidatorS FROM : sg_signal {

    this.FormLayerSgSignal = this.formBuilder.group(
      {
        nom_schema: ['', Validators.required],
        id_pas: ['', Validators.required],

        imu: ['', Validators.required],
        nom: ['', Validators.required],
        etat: ['', Validators.required],
        date_heure_maj: ['', Validators.required],
        cord_pt_x: ['', Validators.required],
        cord_pt_y: ['', Validators.required],
        sens: ['', Validators.required],
        position: ['', Validators.required],
        type: ['', Validators.required],
        indication: ['', Validators.required],
        equipe: ['', Validators.required],

      })

    //// Form modal  : Style Layer
    this.FormModalStyleLayer = this.formBuilder.group({
      LayerToStyle: new FormControl(''),
      ColorToStyle: new FormControl(''),
      StyleForme: new FormControl(''),
      StyleSize: new FormControl(''),
      ColorToStyleFill: new FormControl(''),
    })

  }

  
  ngOnInit(): void {
    this.initializeMap();

    // this.AddprojectToMap();
  }

  ngAfterViewInit(): void{
    this.displayproject();

  }
  initializeMap() {

    //__________________________________________________________________________________________//
    //____________________________Get the id_pas of the user from login comp__________________//
    // this.dataService.data6.subscribe(response => {
    //   this.Data_login = response;
    //   // this.id_pas_user = this.Data_login.id_pas;
    //   //this.nom_schema = this.Data_login.nom_schema;

    //   var data1 = sessionStorage.getItem('dataUser')!;
    //   var data2 = JSON.parse(data1)
    //   this.id_pas_user = data2.id_pas
    //   this.nom_schema = data2.nom_schema
    //   console.log(this.id_pas_user);
    //   console.log(this.nom_schema);


    // })

    document.getElementById('popup')!.hidden = true;
    //______________________________________LAYER SWITCHER_________________________________________//
    //__________________________________________________________________________________________//

    const worldImagery = new TileLayer({
      type: 'base',
      visible: false,
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 19
      })
    } as BaseLayerOptions);

    const osm = new TileLayer({
      title: 'OSM',
      type: 'base',
      visible: true,
      source: new SourceOSM()
    } as BaseLayerOptions);

    const watercolor = new TileLayer({
      title: 'Water color',
      type: 'base',
      visible: false,
      source: new SourceStamen({
        layer: 'watercolor'
      })
    } as BaseLayerOptions);

    const baseMaps = new Group({
      title: 'Base maps',
      layers: [osm, watercolor, worldImagery]
    } as GroupLayerOptions);

    //---map parameters
    this.map = new Map({
      layers: [baseMaps],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 1
      }),

    });

    // Add control inside the map

    var ctrl = new LayerSwitcher({
      // mouseover: true
    });
   // this.map.addControl(ctrl);



    //Full screen
    var full_sc = new FullScreen({
      label: 'F'
    });
    // this.map.addControl(full_sc);


    // Control

    this.map.addControl(new ScaleLine());


    // highlightStyle for select feature
    this.highlightStyle = new Style({
      fill: new Fill({
        color: 'rgba(255,255,255,0.4)',
      }),
      stroke: new Stroke({
        color: '#3399CC',
        width: 3,
      }),
      image: new Circle({
        radius: 10,
        fill: new Fill({
          color: '#33cc66'
        })
      })
    });

    this.featureOverlay = new Vector({
      source: new vector(),
      map: this.map,
      style: this.highlightStyle
    });



    //recuper les nom des couches sur la carte

    this.map.getLayers().forEach((layer) => {
      if (layer.get('name') != undefined) {
        this.layerOfMap.push(layer.get('name'));
      }
    });

    //______________________________________QGIS-Server_________________________________________//
    //___________________________________________________________________________________________//

    // WFS WITH QGIS-Server
    // var URL2 = '/qgis/cgi-bin/qgis_mapserv.fcgi.exe?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=p_tiv&map=C:/OSGeo4W/apps/qgis/bin/Sncf.qgz&outputFormat=application/json';
    // var vectorQgisServer = new Vector({
    //   source: new vector({
    //     format: new GeoJSON(),
    //     url: URL2
    //   }),
    // });
    //this.map.addLayer(vectorQgisServer);


    //______________________________________Geoserver___________________________________________//
    //__________________________________________________________________________________________//
    //var URL = "/wfsGeoserv/geoserver/SNCF/ows?service=wfs&version=1.0.0&request=getfeature&typename=SNCF:p_bus_ndv&PROPERTYNAME=id_pas&CQL_FILTER=id_pas=&outputFormat=application/json&srsname=EPSG:3857";
    //  var URL = '/wfsGeoserv/geoserver/SNCF/ows?service=wfs&version=1.0.0&request=getfeature&typename=SNCF:p_bus_ndv&CQL_FILTER=id_pas=' + "'" + '1444' + "'" + '&outputFormat=application/json&srsname=EPSG:3857';
    // //console.log(URL);
    // // WFS WITH GEOSERVER
    // this.vectorGeoserver = new Vector({
    //   source: new vector({
    //     format: new GeoJSON(),
    //     url: URL
    //   }),
    // });
    // this.vectorGeoserver.set('name', 'vectorGeoserver');
    // // console.log( this.vectorGeoserver);
    // this.map.addLayer(this.vectorGeoserver);

    // //SNCF WMS Geoserver --- it's working
    // var wmsLayerGeoserver = new TileLayer({
    //   source: new TileWMS({
    //     url: 'http://localhost:8080/geoserver/SNCF/wms',
    //     params: {
    //       'FORMAT': 'image/png',
    //       'VERSION': '1.1.1',
    //       tiled: true,
    //       "STYLES": '',
    //       "LAYERS": 'SNCF:p_bus_ndv',
    //       "exceptions": 'application/vnd.ogc.se_inimage',
    //       tilesOrigin: 884078.625 + "," + 6728643.5
    //     }
    //   })
    // });
    //map.addLayer(wmsLayerGeoserver);
    //__________________________________________________________________________________________//
    //__________________________________________________________________________________________//
    //SNCF WMS --- it's working
    // var wmsLayer = new TileLayer({
    //   source: new TileWMS({
    //     url: 'http://localhost:8001/cgi-bin/qgis_mapserv.fcgi.exe?C:/OSGeo4W/apps/qgis/bin/Sncf.qgz&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=10208324,949379,13572097,2661355&SRS=EPSG:3857&WIDTH=665&HEIGHT=551&LAYERS=p_bus_ndv,p_tiv&FORMAT=image/jpeg',
    //     serverType: 'qgis',
    //     params: { 'LAYERS': 'p_tiv,p_bus_ndv' },
    //   })
    // });

    // //SNCF WFS
    // const fill = new Fill({
    //   color: 'rgb(139, 0, 0)',
    // });
    // const stroke = new Stroke({
    //   color: 'rgb(139, 0, 0)',
    //   width: 1.25,
    // });
    // const styles = [
    //   new Style({
    //     image: new Circle({
    //       fill: fill,
    //       stroke: stroke,
    //       radius: 2,
    //     }),
    //     fill: fill,
    //     stroke: stroke,
    //   }),
    // ];

    // var vectorLayer = new Vector({
    //   source: new vector({
    //     format: new GeoJSON(),
    //     url: '/qgis/cgi-bin/qgis_mapserv.fcgi.exe?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=p_bus_ndv,p_tiv&map=C:/OSGeo4W/apps/qgis/bin/Sncf.qgz&outputFormat=application/json'
    //   })
    // });

    //map.addLayer(vectorLayer);
    //map.addLayer(wmsLayer);

    //------------------passage de donnes de layer component -> carte component------------------//
    //-------------------------------------------------------------------------------------------//

    // this.route.queryParams.subscribe((params: any) => {
    //   // console.log('carte comp');
    //   // console.log(params.data);
    //   //console.log((params.data).length);
    //   var and = ",";
    //   var layers = "";
    //   var add = ""
    //   if ((params.data).length == 1) {
    //     layers = (params.data)[0];
    //   }
    //   else {
    //     Array.from(params.data).forEach(element => {
    //       add = element + and
    //       layers = layers + add
    //     });
    //   }
    //   params.data

    //   // console.log(layers);

    //   var URL = '/qgis/cgi-bin/qgis_mapserv.fcgi.exe?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=' + params.data + '&map=C:/OSGeo4W/apps/qgis/bin/Sncf.qgz&outputFormat=application/json';
    //   //var URL = '/qgis/cgi-bin/qgis_mapserv.fcgi.exe?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=p_bus_ndv,p_tiv&map=C:/OSGeo4W/apps/qgis/bin/Sncf.qgz&outputFormat=application/json'
    //   var vectorLayerChoice = new Vector({
    //     source: new vector({
    //       format: new GeoJSON(),
    //       url: URL
    //     }),
    //     style: styles

    //   });
    //   vectorLayerChoice.set('name', 'vectorLayerChoice');
    //   this.map.addLayer(vectorLayerChoice);
    // })


    // cette partie marche bien
    /*
    var URL = '/qgis/cgi-bin/qgis_mapserv.fcgi.exe?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=p_bus_ndv,p_tiv&map=C:/OSGeo4W/apps/qgis/bin/Sncf.qgz&outputFormat=application/json'
    alert('hello');
    var vectorLayerChoice = new Vector({
      source: new vector({
        format: new GeoJSON(),
        url: URL
      })
    });
    map.addLayer(vectorLayerChoice);

    */

    //-------------------------------------------------------------------------------------
    //----------------------------------------POPUP---------------------------------------------
    var style_selected = new Style({ //style to be added on selected layer
      fill: new Fill({
        color: '#5fba6a38'
      }),
      stroke: new Stroke({
        color: 'red',
        width: 3,
      })
    });
    // Select  interaction
    /*
    var select = new Select({
      style: style_selected,
      hitTolerance: 5,
      multi: true,
      condition: singleClick,
      filter: function (feature, layer) {
        //je suis là , je dois récuperer  le nom de la couche


        console.log(feature.getProperties());
        //console.info(layer);
        return true;
      }
    });
    this.map.addInteraction(select);


    // Select control
    var popup = new PopupFeatur({
      popupClass: 'default anim',
      select: select,
      canFix: true,
      template: {
        title:
          // 'nom',   // only display the name
          function (f) {
            console.log('POPUP');
            //je dois tester ici aussi si je peux récupérérer la liste des colums
            console.log(f['values_']);
            console.log(Object.keys(f['values_']).length);
            return f.get('id_pas');
          },
        attributes: // [ 'region', 'arrond', 'cantons', 'communes', 'pop' ]
        {
          'id_pas': { title: 'id_pas' },
          'nom_schema': { title: 'nom_schema' },
          'id_ndv1': { title: 'id_ndv1' },
          'id_objet': { title: 'id_objet' },
          'nom_voie': { title: 'nom_voie' },
          'imu_voie ': { title: 'imu_voie' },
        }
      }
    });
    this.map.addOverlay(popup);

    */

    //-------------------------------------------------------------------------------------
    //-----------------------Function to display the project choosen -----------------------


    // this.dataService.data2.subscribe(response => {
    //   // console.log("i'm here to get the project ");
    //   this.TableLayer = response
    //   this.layerChoosen = this.TableLayer[0].layers;
    //   this.layerChoosen2 = this.layerChoosen.replace("'", '');
    //   this.layerChoosen3 = this.layerChoosen2.slice(0, -1);
    //   //cette ligne découpe une chaine de caract et donne un tab comme resultat
    //   //this.layerChoosenFinal=this.layerChoosen3.split([","]);
    //   // console.log(this.layerChoosen3);

    //   var URL2 = '/qgis/cgi-bin/qgis_mapserv.fcgi.exe?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=' + this.layerChoosen3 + '&map=C:/OSGeo4W/apps/qgis/bin/Sncf.qgz&outputFormat=application/json';
    //   var vectorProject = new Vector({
    //     source: new vector({
    //       format: new GeoJSON(),
    //       url: URL2
    //     }),
    //   });
    //   vectorProject.set('name', 'vectorProject');
    //   this.map.addLayer(vectorProject);
    // });




    //-------------------------------------Control pour vider la  vider la carte ---------------------------------//
    //-----------------------------------------------------------------------------------------------------------//


    const DeleteButton = document.createElement('button');
    DeleteButton.innerHTML = 'X';
    DeleteButton.className = 'myButton';
    DeleteButton.id = "DeleteButton";


    const deleteElement = document.createElement('div');
    deleteElement.className = 'ol-control';
    deleteElement.id = "divDeleteButton";
    deleteElement.style.cssText = ' margin-top: 65px !important;margin-left: 9px !important;';

    deleteElement.appendChild(DeleteButton);

    var deleteControl = new Control({
      element: deleteElement
    })

    //action du control créer
    DeleteButton.addEventListener("click", () => {

      DeleteButton.classList.toggle('clicked');

      console.log("control works");
      // console.log();

      var layersToRemove: any[] = [];
      this.map.getLayers().forEach(function (layer) {
        console.log(layer.get('name'))
        if (layer.get('name') != undefined) {
          layersToRemove.push(layer);
        }
      });

      var len = layersToRemove.length;
      for (var i = 0; i < len; i++) {

        this.map.removeLayer(layersToRemove[i]);
      }

    })

    this.map.addControl(deleteControl);


    //-------------------------------------Control modifier une entité : NE MARCHE PAS . J'AI PAS BESOIN DE CE CONTROLEUR ---------------------------------//
    //-----------------------------------------------------------------------------------------------------------//

    const ModifyButton2 = document.createElement('button');
    ModifyButton2.innerHTML = 'v';
    ModifyButton2.className = 'myButton2';
    ModifyButton2.id = "DeleteButto2n";

    const ModifyElement2 = document.createElement('div');
    ModifyElement2.className = 'ol-control';
    ModifyElement2.id = "divDeleteButton";
    ModifyElement2.style.cssText = ' margin-top: 95px !important;margin-left: 9px !important;';

    ModifyElement2.appendChild(ModifyButton2);

    var ModifyControl2 = new Control({
      element: ModifyElement2
    })

    //action du control créer
    ModifyButton2.addEventListener("click", () => {
      ModifyButton2.style.cssText = 'background-color: rgb(19, 148, 49)!important;';

      // console.log("the control to modify");

      var select2 = new Select({
        hitTolerance: 5,
        multi: true,
        condition: singleClick,
        filter: function (feature, layer) {
          //je suis là , je dois récuperer  le nom de la couche
          const test = "hajar";
          const featureInfo = feature.getProperties();
          console.info("feature.getProperties()");
          //  console.log(feature.getProperties());
          //console.info(layer);
          return true;
        }
      });
      this.map.addInteraction(select2)

    })

    //this.map.addControl(ModifyControl2);
    //----------------------------------------------------------------- //
    function EntiteInfo() {
      //  console.log('the buttom is working')
    }

    /*
    function EntiteInfo(){
      console.log('EntiteInfo working');
    }
    */


    //----------------------------------------------------------------- //
    // ----------------------------length and Area mesurement----------- //
    const typeSelect = document.getElementById('type')!;
    const showSegments = document.getElementById('segments')!;
    const clearPrevious = document.getElementById('clear')!;

    const style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
      }),
    });

    const labelStyle = new Style({
      text: new Text({
        font: '14px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        padding: [3, 3, 3, 3],
        textBaseline: 'bottom',
        offsetY: -15,
      }),
      image: new RegularShape({
        radius: 8,
        points: 3,
        angle: Math.PI,
        displacement: [0, 10],
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
      }),
    });

    const tipStyle = new Style({
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)',
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15,
      }),
    });

    const modifyStyle = new Style({
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)',
        }),
      }),
      text: new Text({
        text: 'Drag to modify',
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15,
      }),
    });

    const segmentStyle = new Style({
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)',
        }),
        padding: [2, 2, 2, 2],
        textBaseline: 'bottom',
        offsetY: -12,
      }),
      image: new RegularShape({
        radius: 6,
        points: 3,
        angle: Math.PI,
        displacement: [0, 8],
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)',
        }),
      }),
    });



    const segmentStyles = [segmentStyle];

    const formatLength = function (line: any) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' km';
      } else {
        output = Math.round(length * 100) / 100 + ' m';
      }
      return output;
    };

    const formatArea = function (polygon: any) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
      } else {
        output = Math.round(area * 100) / 100 + ' m\xB2';
      }
      return output;
    };


    const source = new VectorSource();

    const modify = new Modify({ source: source, style: modifyStyle });

    let tipPoint: string | Geometry | GeometryFunction;

    function styleFunction(feature: any, segments: any, drawType: any, tip: any) {
      const styles = [style];
      const geometry = feature.getGeometry();
      const type = geometry.getType();
      let point, label, line;
      if (!drawType || drawType === type) {
        if (type === 'Polygon') {
          point = geometry.getInteriorPoint();
          label = formatArea(geometry);
          line = new LineString(geometry.getCoordinates()[0]);
        } else if (type === 'LineString') {
          point = new Point(geometry.getLastCoordinate());
          label = formatLength(geometry);
          line = geometry;
        }
      }
      if (segments && line) {
        let count = 0;
        line.forEachSegment(function (a: any, b: any) {
          const segment = new LineString([a, b]);
          const label = formatLength(segment);
          if (segmentStyles.length - 1 < count) {
            segmentStyles.push(segmentStyle.clone());
          }
          const segmentPoint = new Point(segment.getCoordinateAt(0.5));
          segmentStyles[count].setGeometry(segmentPoint);
          segmentStyles[count].getText().setText(label);
          styles.push(segmentStyles[count]);
          count++;
        });
      }
      if (label) {
        labelStyle.setGeometry(point);
        labelStyle.getText().setText(label);
        styles.push(labelStyle);
      }
      if (
        tip &&
        type === 'Point' &&
        !modify.getOverlay().getSource().getFeatures().length
      ) {
        tipPoint = geometry;
        tipStyle.getText().setText(tip);
        styles.push(tipStyle);
      }
      return styles;
    }

    const idleTip = 'Click to start measuring';
    let tip = idleTip;
    const drawType = (<HTMLInputElement>document.getElementById('type')).value;
    const vector2 = new VectorLayer({
      source: source,
      style: function (feature) {
        return styleFunction(feature, (<HTMLInputElement>document.getElementById('segments')).checked, drawType, tip);
      },
    });

    this.map.addInteraction(modify);
    let draw: any; // global so we can remove it later

    const addInteraction = () => {
      type TdrawType = 'Polygon' | 'Circle' | 'LineString' | 'LinearRing' | 'Point' | 'MultiLineString' | 'MultiPoint'
      | 'MultiPolygon'
      const drawType = (<HTMLInputElement>document.getElementById('type')).value as TdrawType;
      const activeTip =
        'Click to continue drawing the ' +
        (drawType === 'Polygon' ? 'polygon' : 'line');
      const idleTip = 'Click to start measuring';
      let tip = idleTip;
      draw = new Draw({
        source: source,
        type: drawType,
        style: function (feature) {
          return styleFunction(feature, (<HTMLInputElement>document.getElementById('segments')).checked, drawType, tip);
        },
      });
      draw.on('drawstart', function () {
        if ((<HTMLInputElement>document.getElementById('clear')).checked) {
          source.clear();
        }
        modify.setActive(false);
        tip = activeTip;
      });
      draw.on('drawend', function (this: any) {
        modifyStyle.setGeometry(tipPoint);
        modify.setActive(true);
        this.map.once('pointermove', function () {
          //????????????????????????????????????????????????? nulll c'est moi qui la ajouter
          modifyStyle.setGeometry('null');
        });
        tip = idleTip;
      });
      modify.setActive(true);
      this.map.addInteraction(draw);
    }

    typeSelect.onchange = () => {
      this.map.removeInteraction(draw);
      addInteraction();
    };

    addInteraction();
    showSegments.onchange = function () {
      vector2.changed();
      draw.getOverlay().changed();
    };

    //


    //-----------Function to display the project choosen --------------------
    /*
   AddprojectToMap() {

     this.dataService.data2.subscribe(response => {
       console.log("i'm here to get the project ");
       this.TableLayer = response
       this.layerChoosen = this.TableLayer[0].layers;
       this.layerChoosen2 = this.layerChoosen.replace("'", '');
       this.layerChoosen3 = this.layerChoosen2.slice(0, -1);
       //cette ligne découpe une chaine de caract et donne un tab comme resultat
       //this.layerChoosenFinal=this.layerChoosen3.split([","]);
       console.log(this.layerChoosen3);

       var URL2 = '/qgis/cgi-bin/qgis_mapserv.fcgi.exe?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=' + this.layerChoosen3 + '&map=C:/OSGeo4W/apps/qgis/bin/Sncf.qgz&outputFormat=application/json';
       var vectorProject = new Vector({
         source: new vector({
           format: new GeoJSON(),
           url: URL2
         }),
       });

       // map.addLayer(vectorProject);


     });
   }

   */


  }

  //la fonction  qui récupère le nom du projet sur geoserver et les couches choisies par le User , afin d'afficher ces couches sur la carte
  displayproject() {

      console.log("ici")
      //  console.log('les donnnes passe bien entre les 2 comp / BEFORE');
      // pour supprimer les couches qui existe déja sur la carte
      var layersToRemove: any[] = [];
      // this.map.removeLayer(this.vectorGeoserver);
      //this.map.getLayers().forEach(function (layer) {

      //  if (layer.get('name') != undefined ) {
      //  console.log('layer to remove',layer.get('name'));
      //  layersToRemove.push(layer);
      // }
      // });

      // var len = layersToRemove.length;
      // for (var i = 0; i < len; i++) {
      //   this.map.removeLayer(layersToRemove[i]);
      // }

      // this.dataProject = response;
      this.DB_name = sessionStorage.getItem('nom_projet')
      this.layers_project = sessionStorage.getItem('couche');
      // console.log('name', this.dataProject.databaseName);
      // console.log('layers', this.dataProject.layers);
      // console.log('id_project', this.dataProject.id_project);

      //nom du projet geoserver
      this.ProjectNameGeo = this.DB_name;
      //les couches de ce projet
      // this.layerProject = this.dataProject.layers

      // var and = ",";
      // var layers = "";
      // var add = ""
      // if ((this.layers_project).length == 1) {
      //   layers = (this.layers_project)[0];
      // }
      // else {
      //   Array.from(this.layers_project).forEach(element => {
      //     add = element + and
      //     layers = layers + add
      //   });
      // }

      // if ((this.layers_project).length == 1) {
      //   this.param = this.DB_name + ":" + layers.replace(/[\[\]"']/g, '');
      // } else {
      //   this.param = this.DB_name + ":" + layers.slice(0, -1);
      // }

      const parametres = this.layers_project.replace(/[\[\]"']/g, '')
      console.log("Les params ici !!!!!!!!!!!!", parametres)


      var style_base = new Style({
        //for the point
        image: new Circle({
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 1.0)',
            width: 5
          }),
          radius: 3
        }),

      })

      var style_b_tiv = new Style({
        //for the polyline
        stroke: new Stroke({
          width: 6,
          color: [237, 212, 0, 0.8],
        }),
      })

      var style_bus_ndv = new Style({
        //for the point
        image: new Circle({
          stroke: new Stroke({
            color: 'rgba(255, 99, 71, 1.0)',
            width: 5
          }),
          radius: 3
        }),

      })

      var style_sg_signal = new Style({
        //for the point
        image: new Circle({
          stroke: new Stroke({
            color: 'rgba(255, 165, 0, 1.0)',
            width: 5
          }),
          radius: 3
        }),

      })

      var style_sg_lim_vitesse = new Style({
        //for the point
        image: new Circle({
          stroke: new Stroke({
            color: 'rgba(255, 0, 0, 1.0)',
            width: 5
          }),
          radius: 3
        }),

      })

      var style_pont = new Style({
        //for the point
        image: new Circle({
          stroke: new Stroke({
            color: 'rgba(60, 60, 60, 1.0)',
            width: 5
          }),
          radius: 3
        }),

      })


      var URL = '/wfsGeoserv/geoserver/' + this.DB_name + '/ows?service=WFS&version=1.1.0,&request=GetFeature&typeName=' + parametres + '&outputFormat=application/json&srsname=EPSG:3857';
      // var URL = '/wfsGeoserv/geoserver/' + this.dataProject.databaseName + '/ows?service=WFS&version=1.1.0,&request=GetFeature&typeName=' + this.param + '&CQL_FILTER=id_pas='+"'"+ this.id_pas_user+"'"+'&outputFormat=application/json&srsname=EPSG:3857';

      //  console.log(URL);
      this.vectorGeoserver = new Vector({
        source: new vector({
          format: new GeoJSON(),
          url: URL,
        }),
        style: function (feature, resolution) {
          var id_f = feature.getId();
          var nom_spl = (<string>id_f).split(".");
          var nom = nom_spl[0];
          if (nom == 'p_bus_ndv') {
            return style_bus_ndv;
          }
          if (nom == 'p_tiv') {
            return style_b_tiv;
          }

          if (nom == 'sg_signal') {
            return style_sg_signal;
          }

          if (nom == 'sg_limvit') {
            return style_sg_lim_vitesse;
          }

          if (nom == 'pont') {
            return style_pont;
          }


          return style_base;
        },
      });
      this.vectorGeoserver.set('name', 'vectorGeoserver');
      this.map.addLayer(this.vectorGeoserver);
      // Pour zoomer sur la couche vectorGeoserver
      setTimeout(() => {
        var layerExtent = this.vectorGeoserver.getSource().getExtent();
        // console.log("layerExtent", layerExtent)
        if (layerExtent) {
          this.map.getView().fit(layerExtent);
        }
      }, 2000);


      // Remplir le select avec les noms des couches
      // this.selector = (<HTMLInputElement>document.getElementById('LayerCarte'))!;
      // this.selector2 = (<HTMLInputElement>document.getElementById('LayerCarteStyle'))!;
      // //pour vider le select
      // this.selector.innerHTML = "";
      // this.selector2.innerHTML = "";

      // for (let key in this.layers_project) {
      //   // console.log(this.layers_project[key])
      //   var newoption = document.createElement("option");
      //   newoption.text = this.layers_project[key];
      //   newoption.value = this.layers_project[key];
      //   this.selector.add(newoption);
      // }

      // //remplissage de select option de change style layer
      // for (let key in this.layers_project) {
      //   // console.log(this.layers_project[key])
      //   var newoption = document.createElement("option");
      //   newoption.text = this.layers_project[key];
      //   newoption.value = this.layers_project[key];
      //   this.selector2.add(newoption);
      // }




      // Afficher le legende

      // Define a new legend
      this.map.removeControl(this.legendCtrl);

      this.legend1 = new Legend({
        title: 'Legend',
        margin: 5
      });

      this.legendCtrl = new LegendCont({
        legend: this.legend1,
        collapsed: false
      });
      this.map.addControl(this.legendCtrl);

      this.formLegendSP3 = { P_BUS_NDV: 4, P_TIV: 4 };
      this.formLegendSP4 = { SG_LIMVIT: 4, SG_SIGNAL: 4, PONT: 4 };

      //_________________________SP4_________________________//

      if (this.ProjectNameGeo == 'SP4') {
        for (var i in this.formLegendSP4) {
          console.log(this.formLegendSP4[i])
          if (i == 'SG_LIMVIT') {
            this.legend1.addItem({
              title: i,
              typeGeom: 'Point',
              style: style_sg_lim_vitesse
            });
          }
          if (i == 'SG_SIGNAL') {
            this.legend1.addItem({
              title: i,
              typeGeom: 'Point',
              style: style_sg_signal
            });
          }
          if (i == 'PONT') {
            this.legend1.addItem({
              title: i,
              typeGeom: 'Point',
              style: style_pont
            });
          }

        }
      }
      //_________________________SP3_________________________//
      else if (this.ProjectNameGeo == 'SNCF') {
        for (var i in this.formLegendSP3) {
          console.log(this.formLegendSP3[i])
          if (i == 'P_BUS_NDV') {
            this.legend1.addItem({
              title: i,
              typeGeom: 'Point',
              style: style_bus_ndv
            });
          }
          if (i == 'P_TIV') {
            this.legend1.addItem({
              title: i,
              typeGeom: 'LineString',
              style: style_b_tiv
            });
          }
        }
      }




      /*

      setTimeout(() => {
        var features = this.vectorGeoserver.getSource().getFeatures()
      for (let i = 0; i < features.length; i++) {
        var id_f = features[i].getId();
        var nom_spl = (<string>id_f).split(".");
        var typegeom=features[i].getGeometry().getType()
        var nom = nom_spl[0];

       if(nom=='p_bus_ndv'){
        this.legend1.addItem({
          title: nom,
          typeGeom: typegeom,
          style: style_bus_ndv
        });
        break ;
       }

      }
      }, 4000);

      */

  }

  EntiteInfo() {
    //console.log('the button is working ', this.test)
  }

  toggle_editing() {


    var color = document.getElementById("toggle_editing")!.style.backgroundColor;
    console.log('the  ', color);



    if (color == 'rgb(239, 239, 239)') {
      // console.log('first if ');
      // document.getElementById("get_info")!.style.backgroundColor = "rgb(239, 239, 239)";
      document.getElementById("toggle_editing")!.style.backgroundColor = "coral";
      document.getElementById("select_feature")!.style.backgroundColor = "rgb(239, 239, 239)";
      document.getElementById("create_feature")!.style.backgroundColor = "rgb(239, 239, 239)";
      document.getElementById("modify_feature")!.style.backgroundColor = "rgb(239, 239, 239)";

      const btn1 = document.getElementById('select_feature') as HTMLButtonElement;
      btn1.disabled = false;

      const btn2 = document.getElementById('create_feature') as HTMLButtonElement;
      btn2.disabled = false;

      const btn3 = document.getElementById('modify_feature') as HTMLButtonElement;
      btn3.disabled = false;

      const btn4 = document.getElementById('delete_feature') as HTMLButtonElement;
      btn4.disabled = false;

      //const btn5 = document.getElementById('get_info') as HTMLButtonElement;
      // btn5.disabled = true;

      //this.map.un('singleclick', getinfo);
      //overlay.setPosition(undefined);
      //closer.blur();

    }

    else if (color != 'rgb(239, 239, 239)') {
      console.log('second if ');
      document.getElementById("toggle_editing")!.style.backgroundColor = 'rgb(239, 239, 239)';
      document.getElementById("toggle_editing")!.style.backgroundColor = 'rgb(239, 239, 239)';
      document.getElementById("select_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
      document.getElementById("create_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
      document.getElementById("modify_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';


      const btn1 = document.getElementById('select_feature') as HTMLButtonElement;
      btn1.disabled = true;

      const btn2 = document.getElementById('create_feature') as HTMLButtonElement;
      btn2.disabled = true;

      const btn3 = document.getElementById('modify_feature') as HTMLButtonElement;
      btn3.disabled = true;

      const btn4 = document.getElementById('delete_feature') as HTMLButtonElement;
      btn4.disabled = true;

      //const btn5 = document.getElementById('get_info') as HTMLButtonElement;
      //btn5.disabled = false;

      /*
      if (this.modify) {
        this.map.removeInteraction(this.modify);
      }
      if (draw_add) {
        this. map.removeInteraction(draw_add);
      }
      if (snap_edit) {
        this.map.removeInteraction(snap_edit);
      }

      this.map.un('click', highlight);
      this.map.un('click', highlight_mod_attributes);
      overlay.setPosition(undefined);
      closer.blur();
      */

    }
  }


  create_feature() {

    document.getElementById('popup')!.hidden = false;
    //("this.featureOverlay.getSource().getFeatures()", this.featureOverlay.getSource().getFeatures())
    var container = document.getElementById('popup')!;
    var content = document.getElementById('popup-content')!;
    var closer = document.getElementById('popup-closer')!;
    closer.blur();

    if (this.modify) {
      this.map.removeInteraction(this.modify);
    }
    if (this.snap_edit) {
      this.map.removeInteraction(this.snap_edit);
    }


    var overlay = new Overlay({
      element: container,
    });
    this.map.addOverlay(overlay);
    overlay.setPosition(undefined);


    document.getElementById("create_feature")!.style.backgroundColor = "coral";
    document.getElementById("modify_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
    document.getElementById("select_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
    // vectorGeoserver :geojson

    var source_mod = this.vectorGeoserver.getSource();
    //console.log("source_mod ", source_mod)
    this.draw_add = new Draw({
      source: source_mod,
      type: 'Point',
      stopClick: true
    });
    this.map.addInteraction(this.draw_add);
    //var source_g = geojson.getSource();
    this.snap_edit = new Snap({
      source: source_mod
    });
    this.map.addInteraction(this.snap_edit);

    //to display the popup

    this.draw_add.on('drawend',
      function (this: any, e: any) {
        this.myFeature = e.feature;
        // console.log('this.myFeature', this.myFeature.getGeometry());
        //i'm here : je dois verifier le epsg de myFeature pour savoir s'il s'agit de EPSG:3857 ou bien EPSG:2154*
        //var coordTEST = [766421.4938770037, 6250807.7062081555];
        // console.log('CORD transformed', this.myFeature.getGeometry().transform('EPSG:3857', 'EPSG:2154'));
        // 766421.4938770037, 6250807.7062081555, 766421.4938
        if (this.myFeature) {

          var geometry = this.myFeature.getGeometry();
          var coord = geometry.getCoordinates();
          var extent = geometry.getExtent();
          var centroid = getCenter(extent);
          // console.log('centroid', centroid)
          //alert(centroid);
          //var coordinate = e.coordinate;
          source_mod.addFeature(this.myFeature);
          //overlays.getLayers().push(featureOverlay);

          this.content1 = '<label class="form-label" for="nom">nom:</label><input class="form-control" type="text" id="nom" name="nom" value=' + this.myFeature.get('nom') + '><br><br>';
          this.content1 += ' <button type="button" class="btn btn-success" onclick="save_created()" id ="save_created">Save </button>';
          this.content1 += ' <button class="btn btn-danger"type="button" onclick="cancel_created()" id ="cancel_created">Delete</button>';
          content.innerHTML = this.content1;

          //---------------------------cancel_created()---------------------------//
          //on doit créer l'emenet pui ajouter addEventListener
          var cancel = document.getElementById("cancel_created")!;
          cancel.addEventListener('click', (event: any) => {
            //do logic featureOverlay
            // console.log('i cancel_created');
            // var src = this.featureOverlay.getSource();
            // src.clear();
            //src.removeFeature(this.myFeature)
            source_mod.removeFeature(this.myFeature);
            overlay.setPosition(undefined);
            closer.blur();
          }, false);

          // console.log('this.overlay', overlay)
          overlay.setPosition(centroid);

          //---------------------------save_created()---------------------------//
          var save = document.getElementById("save_created")!;

          save.addEventListener('click', (event: any) => {
            //do logic featureOverlay here
            //console.log('i saved feature');
            var name = (<HTMLInputElement>document.getElementById('nom')!).value;

            //---------
            var geometryy = this.myFeature.getGeometry();
            //----- transoformation des coord d'un point
            const proj44 = (proj4 as any).default;
            proj44.defs([
              ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
              ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
            ]);
            var src = 'EPSG:3857';
            var dest = 'EPSG:2154';
            register(proj44)

            var trans = geometryy.transform(src, dest);
            var coord2 = trans.getCoordinates();
            // console.log("coord2", coord2);
            //console.log("coord2", coord2[0]);
            // console.log("coord2", coord2[1]);

            // la création d'un nouveau GML pour contruire la requette et l'envoyer au serveur
            // le format retourné ne correspond pas à ce que je cherche
            var format = new GML3({
              featureType: 'p_bus_ndv',
              srsName: 'http://www.opengis.net/gml/srs/epsg.xml#3857',
              featureNS: "http://localhost:8080/SNCF",
              hasZ: true
            });

            // console.log('format', format);
            //---------writeFeatures
            // console.log('type of GML ', format.getType());

            var gml3 = format.writeGeometryNode(geometryy, {
              featureProjection: 'urn:ogc:def:crs:EPSG::3857',
              dataProjection: 'urn:ogc:def:crs:EPSG::3857'
            })
            // console.log('gml3', gml3);

            var testGML1 = '<geom xmlns="http://www.opengis.net/gml"><Point srsName="http://www.opengis.net/gml/srs/epsg.xml#3857"><pos srsDimension="3">530018.1755976982 6196141.179951921 0</pos></Point></geom>';
            //je dois trouver un moyen pour convertir les coordonées du centroid
            var testGML2 = '<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#2154">\n' +
              '<gml:coordinates  decimal="." cs="," ts=" ">' + coord2[0] + ',' + coord2[1] + ',' + '0' + '</gml:coordinates>\n' +
              '</gml:Point>';
            // console.log('gml3', gml3)

            //--------- Préparation de notre requette ---------
            //Je suis là , si je teste avec une autre couche  dand le shema topp ça marche mais avec la mienne ne marche pas ,
            //il arrive pas à la trouvé
            var postData1 =
              '<wfs:Transaction service="WFS" version="1.1.0,"\n' +
              'xmlns:SNCF="projet/SNCF"\n' +
              'xmlns:ogc="http://www.opengis.net/ogc"\n' +
              'xmlns:wfs="http://www.opengis.net/wfs"\n' +
              'xmlns:gml="http://www.opengis.net/gml"\n' +
              'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
              'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0,/WFS-transaction.xsd http://www.openplans.org/SNCF http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=SNCF:p_bus_ndv">\n' +
              '<wfs:Insert>\n' +
              '<SNCF:p_bus_ndv>\n' +
              '<SNCF:geom>\n' +

              testGML2 + '\n' +

              '</SNCF:geom>\n' +

              '<SNCF:nom>\n' + name + '\n' + '</SNCF:nom>\n' +
              '</SNCF:p_bus_ndv>\n' +
              '</wfs:Insert>\n' +
              '</wfs:Transaction>\n';




            var postdata2 = '<wfs:Transaction service="WFS" version="1.1.0"\n' +
              'xmlns:SNCF="projet/SNCF"\n' +
              'xmlns:ogc="http://www.opengis.net/ogc"\n' +
              'xmlns:wfs="http://www.opengis.net/wfs"\n' +
              'xmlns:gml="http://www.opengis.net/gml"\n' +
              'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
              'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0,/WFS-transaction.xsd http://www.openplans.org/SNCF	http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=SNCF:p_bus_ndv">\n' +
              '<wfs:Insert >\n' +
              '<SNCF:p_bus_ndv>\n' +
              '<SNCF:geom>\n' +
              '<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#2154">\n' +
              '<gml:coordinates  decimal="." cs="," ts=" "> 1163469.29965452,6458824.258482767,0</gml:coordinates>\n' +
              '</gml:Point>\n' +
              '</SNCF:geom>\n' +

              '<SNCF:nom>\n' +
              'hsini\n' +
              '</SNCF:nom>\n' +
              '</SNCF:p_bus_ndv>\n' +
              '</wfs:Insert>\n' +
              '</wfs:Transaction>\n';



            //---------  requette POST à notre serveur
            var req1 = new XMLHttpRequest();
            req1.open("POST", '/GeoservHTTP/wfs', false);
            req1.setRequestHeader('Content-type', 'text/xml');

            req1.onreadystatechange = function () {
              // 4 means done
              if (req1.readyState != 4) return;
              if (req1.status != 200 && req1.status != 304) {
                alert('HTTP error here' + req1.status);
                return;
              }
              // alert(req1.responseText);
              //  Ext.MessageBox.alert('Status', 'changes saved successfully');
            }

            if (req1.readyState == 4) return;
            req1.send(postData1);
            // console.log('finitos', req1.responseText)
            alert(req1.responseText);

            alert('Feature saved successfully');
            this.vectorGeoserver.getSource().refresh();
            overlay.setPosition(undefined);
            closer.blur();
            this.featureOverlay.getSource().clear();
            //console.log('finitos')

          }, false);


          //layerSwitcher.renderPanel();
          //	map.updateSize();

        }
        // alert(state_name+''+pupulation);

        // alert('karan');
        //var features = geojson.getSource().getFeatures();
        //var length = features.length;
        // alert(length);

      }, this);



    // console.log("this.vectorGeoserver.getSource().on()", this.vectorGeoserver.getSource());
    this.vectorGeoserver.getSource().on('addfeature', function (this: any) {
      // //var features = this.vectorGeoserver.getSource().getFeatures();
      // alert(features);
      // var length = features.length;
    });


  }

  //la fonction qui prend en parametre le nom de la couche et retourn le type de GEOM
  gettypefeature(nomfeature: any) {
    this.http
      .post('http://127.0.0.1:8000/api/GetTypeGeometryByLayerName?request=' + nomfeature, null)
      .subscribe((response: object) => {
        this.typefetaure = response;
        console.log('type feature from back end');

      })
    setTimeout(() => {
      console.log('3iiw')
      console.log((this.typefetaure[0].st_geometrytype).slice(3));
      this.typefetaure2 = (this.typefetaure[0].st_geometrytype).slice(3)
    }, 4000);

    console.log(this.typefetaure2)

  }

  create_feature2() {

    var closer2 = document.getElementById('popup-closer')!;
    closer2.blur()

    console.log(this.typefetaure2);
    document.getElementById('popup')!.hidden = false;
    console.log("this.featureOverlay.getSource().getFeatures()", this.featureOverlay.getSource().getFeatures());
    var container = document.getElementById('popup')!;
    var content = document.getElementById('popup-content')!;
    var closer = document.getElementById('popup-closer')!;
    closer.blur();

    if (this.modify) {
      this.map.removeInteraction(this.modify);
    }
    if (this.snap_edit) {
      this.map.removeInteraction(this.snap_edit);
    }


    this.overlay2 = new Overlay({
      element: this.container2,
    });

    this.map.addOverlay(this.overlay2);

    this.overlay2.setPosition(undefined);


    document.getElementById("create_feature")!.style.backgroundColor = "coral";
    document.getElementById("modify_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
    document.getElementById("select_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
    // vectorGeoserver :geojson

    var source_mod = this.vectorGeoserver.getSource();
    console.log("source_mod ", source_mod)
    this.draw_add = new Draw({
      source: source_mod,
      type: this.typefetaure2,
      stopClick: true
    });
    this.map.addInteraction(this.draw_add);

    //var source_g = geojson.getSource();
    this.snap_edit = new Snap({
      source: source_mod
    });
    this.map.addInteraction(this.snap_edit);

    //to display the popup

    this.draw_add.on('drawend',
      (e: any) => {
        this.myFeature = e.feature;
        this.content2 = document.getElementById('popup-content')!;
        this.container2 = document.getElementById('popup')!;

        if (this.myFeature) {

          var geometry = this.myFeature.getGeometry();
          var coord = geometry.getCoordinates();
          var extent = geometry.getExtent();
          this.centroid = getCenter(extent);
          console.log('centroid', this.centroid)
          source_mod.addFeature(this.myFeature);

          //------------------------- Popup---------------------
          console.log("Popup");
          console.log(this.ProjectNameGeo);
          console.log((this.attributeFetaure).length);
          var content3;
          //je remplie mon content1;
          this.content2.innerHTML = ' ';
          content3 = '';
          var content4 = '';
          for (let i = 2; i < (this.attributeFetaure).length; i++) {
            var val = (this.attributeFetaure)[i].column_name
            content3 = '<label class="form-label" for="nom">';
            content3 = (content3.concat(val));
            content3 = (content3.concat(' &nbsp;:   &nbsp;    </label>'));
            content3 = (content3.concat('<input id='));
            content3 = (content3.concat(val));
            content3 = (content3.concat('><br>'));
            console.log(content3);
            this.content2.innerHTML += content3;
          }

          //L'ajout du button save and delete
          content4 = ' <button type="button" class="btn btn-success" onclick="save_created()" id = "save_created">Save </button>&nbsp &nbsp';
          var content5 = ('<button class="btn btn-danger"type="button" onclick="cancel_created()" id = "cancel_created">Cancel</button>');
          this.content2.innerHTML += content4;
          this.content2.innerHTML += content5;
          console.log(this.centroid)
          this.overlay2.setPosition(this.centroid);
          this.map.updateSize();

          //---------------------------cancel_created()-- not working -------------------------//
          //on doit créer l'emenet pui ajouter addEventListener
          var cancel = document.getElementById("cancel_created")!;
          cancel.addEventListener('click', (event: any) => {
            //do logic featureOverlay
            console.log('i cancel_created');
            this.featureOverlay.getSource().clear();
            source_mod.removeFeature(this.myFeature);
            this.overlay2.setPosition(undefined);
            closer.blur();
          }, false);

          this.overlay2.setPosition(this.centroid);

          //---------------------------cancel_created()---------------------------//
          //on doit créer l'emenet pui ajouter addEventListener
          var save = document.getElementById("save_created")!;
          save.addEventListener('click', (event: any) => {
            //do logic featureOverlay
            console.log('i cancel_created');
            // var src = this.featureOverlay.getSource();
            // src.clear();
            //src.removeFeature(this.myFeature)
            source_mod.removeFeature(this.myFeature);
            this.overlay2.setPosition(undefined);
            closer.blur();
          }, false);

          this.overlay2.setPosition(this.centroid);

          //---------------------------save_created()---------------------------//
          var save = document.getElementById("save_created")!;
          save.addEventListener('click', (event: any) => {
            console.log('i saved feature');
            var geometryy = this.myFeature.getGeometry();
            //----- transoformation des coord d'un point
            const proj44 = (proj4 as any).default;
            proj44.defs([
              ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
              ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
            ]);
            var src = 'EPSG:3857';
            var dest = 'EPSG:2154';
            register(proj44)

            var trans = geometryy.transform(src, dest);
            // coord2 : coordTransform
            var coordTransform = trans.getCoordinates();
            //prépartion du GML
            var gmlFormat = '<gml:' + this.typefetaure2 + '\t' + 'srsName="http://www.opengis.net/gml/srs/epsg.xml#2154">\n' + '<gml:coordinates  decimal="." cs="," ts=" ">'
            for (let i = 0; i < (coordTransform).length; i++) {

              gmlFormat = (gmlFormat.concat(coordTransform[i]));
              if (i != (((coordTransform).length) - 1)) {
                gmlFormat = (gmlFormat.concat(','));
              }
            }
            if (this.typefetaure2 == "Point") {
              gmlFormat = (gmlFormat.concat(','));
              gmlFormat = (gmlFormat.concat('0'));
            }

            gmlFormat = (gmlFormat.concat('</gml:coordinates>\n'));
            gmlFormat = (gmlFormat.concat('</gml:' + this.typefetaure2 + '>'));
            console.log('reate gmlFormat', gmlFormat);

            //----- ----- create request to send it to geoserver ----- ----- ;
            var postData =
              '<wfs:Transaction service="WFS" version="1.1.0"\n' +
              'xmlns:' + this.ProjectNameGeo + '="projet/' + this.ProjectNameGeo + '"\n' +
              'xmlns:ogc="http://www.opengis.net/ogc"\n' +
              'xmlns:wfs="http://www.opengis.net/wfs"\n' +
              'xmlns:gml="http://www.opengis.net/gml"\n' +
              'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
              'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0,/WFS-transaction.xsd http://www.openplans.org/' + this.ProjectNameGeo + '\t' + 'http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=' + this.ProjectNameGeo + ':' + this.valLayer + '">' + '\n' +
              '<wfs:Insert >' + '\n' +
              '<' + this.ProjectNameGeo + ':' + this.valLayer + '>' + '\n' +
              '<' + this.ProjectNameGeo + ':' + 'geom' + '>' + '\n' +
              gmlFormat + '\n' +
              '</' + this.ProjectNameGeo + ':' + 'geom' + '>' + '\n';

            var postData2 = '';
            // for (let i = 2; i < (this.attributeFetaure).length; i++) {

            // var val = (<HTMLInputElement>document.getElementById((this.attributeFetaure)[i].column_name)!).value;
            //  console.log(val)

            //  var rqt = '<' + this.ProjectNameGeo + ':' + (this.attributeFetaure)[i].column_name + '>' + val +
            //   '</' + this.ProjectNameGeo + ':' + (this.attributeFetaure)[i].column_name + '>';
            // postData2 = (postData2.concat(rqt));

            //}

            var val = (<HTMLInputElement>document.getElementById('nom')!).value;
            console.log(val)

            var rqt = '<' + this.ProjectNameGeo + ':' + 'nom' + '>' + '\n' + val + '\n' +
              '</' + this.ProjectNameGeo + ':' + 'nom' + '>' + '\n';
            postData2 = (postData2.concat(rqt));



            postData = (postData.concat(postData2));
            var postData3 = '</' + this.ProjectNameGeo + ':' + this.valLayer + '>' + '\n' +
              '</wfs:Insert>' + '\n' +
              '</wfs:Transaction>'

            postData = (postData.concat(postData3));
            console.log(postData);

            //---------  requette POST à notre serveur
            var req1 = new XMLHttpRequest();
            req1.open("POST", '/GeoservHTTP/wfs', false);
            req1.setRequestHeader('Content-type', 'text/xml');

            req1.onreadystatechange = function () {
              // 4 means done
              if (req1.readyState != 4) return;
              if (req1.status != 200 && req1.status != 304) {
                alert('HTTP error here' + req1.status);
                return;
              }
              // alert(req1.responseText);
              //  Ext.MessageBox.alert('Status', 'changes saved successfully');
            }

            if (req1.readyState == 4) return;
            req1.send(postData);
            console.log('finitos', req1.responseText)
            // alert(req1.responseText);

            alert('Feature saved successfully');
            //refresh layer and delete popup

            this.vectorGeoserver.getSource().refresh();
            this.featureOverlay.getSource().clear();
            this.overlay2.setPosition(undefined);
            closer.blur();


            console.log('finitos')
          })
        }

        //to remove mousse draw
        this.map.removeInteraction(this.draw_add)

      }, this);


    console.log("this.vectorGeoserver.getSource().on()", this.vectorGeoserver.getSource());
    this.vectorGeoserver.getSource().on('addfeature', function (this: any) {

    });




  }

  modify_feature() {
    var closer2 = document.getElementById('popup-closer')!;
    closer2.blur()

    document.getElementById("create_feature")!.style.backgroundColor = "rgb(239, 239, 239)";
    document.getElementById("modify_feature")!.style.backgroundColor = 'coral';
    document.getElementById("select_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';

    if (this.modify) {
      this.map.removeInteraction(this.modify);
    }
    if (this.snap_edit) {
      this.map.removeInteraction(this.snap_edit);
    }

    var source_mod = this.vectorGeoserver.getSource();
    var modify = new Modify({
      source: source_mod
    });
    this.map.addInteraction(modify);

    var source_g = this.vectorGeoserver.getSource();
    var snap_edit = new Snap({
      source: source_g
    });
    this.map.addInteraction(snap_edit);
    // this.map.on('click', this.highlight_mod_attributes);
    this.map.on('click', (evt) => {

      this.container2 = document.getElementById('popup')!;
      this.content2 = document.getElementById('popup-content')!;

      this.overlay2 = new Overlay({
        element: this.container2,
      });

      // console.log("show overlay", this.overlay2)
      this.map.addOverlay(this.overlay2);

      if (this.featureOverlay) {
        this.featureOverlay.getSource().clear();
        this.map.removeLayer(this.featureOverlay);
      }

      //if (geojson) {geojson.getSource().re;fresh();}
      var tabDataFeature: any[] = [];
      var feature = evt.map.forEachFeatureAtPixel(evt.pixel,
        (feature: any, layer: any) => {
          console.log('feat_mod', feature.getGeometry().getCoordinates());
          document.getElementById('popup')!.hidden = false;

          if (feature) {
            var coordinate = evt.coordinate;

            //alert(coordinate);
            // this.featureOverlay.getSource().addFeature(feature);
            //overlays.getLayers().push(featureOverlay);
            var content1;
            content1 = '<label class="form-label" for="nom">type:</label><input  class="form-control" type="text" id="nom" name="name_house" value=' + feature.get("nom") + '><br><br>';
            // content1 += '<label for="area">imu</label><input type="text" id="imu" name="area" value=' + feature.get("imu") + '><br><br>';
            content1 += ' <button type="button" class="btn btn-success" onclick="save_mod_features()" id = "save_mod_features">Save </button>';
            content1 += ' <button class="btn btn-danger"type="button" onclick="cancel_mod_features()" id = "cancel_mod_features">Cancel</button>';

            //  alert(feature.getId());
            console.log("")
            this.content2.innerHTML = content1;
            this.overlay2.setPosition(coordinate);
            this.map.updateSize();

            //---------------------------cancel_modification()---------------------------//
            //on doit créer l'emenet pui ajouter addEventListener
            var cancel = document.getElementById("cancel_mod_features")!;
            cancel.addEventListener('click', (event: any) => {
              //do logic featureOverlay
              console.log('i cancel_mod_features');
              this.featureOverlay.getSource().clear();
              this.overlay2.setPosition(undefined);
              closer2.blur();
            }, false);

            //--------------------------- save_mod_features()---------------------------//
            var saved = document.getElementById("save_mod_features")!;
            saved.addEventListener('click', (event: any) => {
              //do logic featureOverlay
              console.log('i save_mod_features');
              var nom = (<HTMLInputElement>document.getElementById('nom')!).value;
              console.log("feature.getId();", feature.getId())
              console.log("feature.getId();", feature.getGeometry())
              var fid_feat_mod = feature.getId();
              var geometryy = feature.getGeometry();

              //----- transoformation des coord d'un point

              const proj44 = (proj4 as any).default;
              proj44.defs([
                ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
                ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
              ]);
              var src = 'EPSG:3857';
              var dest = 'EPSG:2154';
              register(proj44)
              var trans = geometryy.transform(src, dest);
              var coordTransform = trans.getCoordinates();

              var gmlFormat = '<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#2154">\n' +
                '<gml:coordinates  decimal="." cs="," ts=" ">' + coordTransform[0] + ',' + coordTransform[1] + ',' + coordTransform[2] + '</gml:coordinates>\n' +
                '</gml:Point>';

              console.log('gml3', gmlFormat)

              //----- create request to send it to geoserver
              var postData =
                '<wfs:Transaction service="WFS" version="1.1.0"\n' +
                'xmlns:SNCF="projet/sncf"\n' +
                'xmlns:ogc="http://www.opengis.net/ogc"\n' +
                'xmlns:wfs="http://www.opengis.net/wfs"\n' +
                'xmlns:gml="http://www.opengis.net/gml"\n' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
                'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0,/WFS-transaction.xsd http://www.openplans.org/SNCF http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=SNCF:p_bus_ndv">\n' +
                '<wfs:Update typeName="SNCF:p_bus_ndv">\n' +

                '<wfs:Property>\n' +
                '<wfs:Name>geom</wfs:Name>\n' +
                '<wfs:Value>\n' + gmlFormat + '\n' + '</wfs:Value>\n' +
                '</wfs:Property>\n' +

                '<wfs:Property>\n' +
                '<wfs:Name>nom </wfs:Name>\n' +
                '<wfs:Value>\n' + nom + '\n' + '</wfs:Value>\n' +
                '</wfs:Property>\n' +


                '<ogc:Filter>\n' +
                '<ogc:FeatureId fid="' + fid_feat_mod + '"/>\n' +
                '</ogc:Filter>\n' +

                '</wfs:Update>\n' +
                '</wfs:Transaction>\n';


              console.log("postData", postData);

              var req = new XMLHttpRequest();
              req.open("POST", '/GeoservHTTP/wfs', false);
              req.setRequestHeader('Content-type', 'text/xml');
              req.onreadystatechange = function () {
                if (req.readyState != 4) return;
                if (req.status != 200 && req.status != 304) {
                  alert('HTTP error ' + req.status);
                  return;
                }

                console.log('HTTP error ', req.responseText);
                //alert(req.responseText);
              }

              if (req.readyState == 4) return;
              //console.log(postData)
              req.send(postData);
              alert('Feature updated successfully');

              //refresh layer and delete popup
              this.vectorGeoserver.getSource().refresh();
              this.featureOverlay.getSource().clear();
              this.overlay2.setPosition(undefined);
              closer2.blur();
              console.log('finitos')
            }, false);

          }
        });



    });
  }

  select_feature() {
    var closer2 = document.getElementById('popup-closer')!;
    closer2.blur()

    var style = new Style({
      //for the point
      image: new Circle({
        stroke: new Stroke({
          color: 'rgba(60, 179, 113, 1.0)',
          width: 5
        }),
        radius: 3
      }),
      //for the polyline
      stroke: new Stroke({
        width: 6,
        color: [60, 179, 113, 0.8],
      }),
    })


    //pour afficher le popup avec les infoormation attributaire
    document.getElementById("delete_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
    document.getElementById("create_feature")!.style.backgroundColor = "rgb(239, 239, 239)";
    document.getElementById("modify_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
    document.getElementById("select_feature")!.style.backgroundColor = 'coral';

    this.map.on('click', (evt) => {
      document.getElementById('popup')!.hidden = false;
      this.container2 = document.getElementById('popup')!;
      this.content2 = document.getElementById('popup-content')!;

      this.overlay2 = new Overlay({
        element: this.container2,
      });

      //console.log("show overlay", this.overlay2)
      this.map.addOverlay(this.overlay2);

      if (this.featureOverlay) {
        this.featureOverlay.getSource().clear();
        this.map.removeLayer(this.featureOverlay);
      }
      var tabDataFeature: any[] = [];
      var feature = evt.map.forEachFeatureAtPixel(evt.pixel,
        (feature: any, layer: any) => {
          console.log('feat_mod', feature.getGeometry().getCoordinates());
          if (feature) {
            feature.setStyle(style);

            console.log(' feature.get("nom");', feature.getId())

            console.log('feature.getKeys()', feature.getKeys())
            var coordinate = evt.coordinate;
            var content1;
            var content3;
            //je remplie mon content1;
            this.content2.innerHTML = ' ';
            content3 = '';
            for (let i = 1; i < (feature.getKeys()).length; i++) {
              var val = (feature.getKeys())[i]
              //content1 = document.createElement("Label");
              //content1.className = 'form-label';
              //this.content2.innerHTML  += val;
              //this.content2.innerHTML  +=':';
              // this.content2.innerHTML  +=feature.get(val)
              // this.content2.innerHTML  +='<br>';
              content3 = '<label class="form-label" for="nom">';
              content3 = (content3.concat(val));
              content3 = (content3.concat(' &nbsp;:   &nbsp;    </label>'));
              content3 = (content3.concat('<input type="text" value='));
              content3 = (content3.concat(feature.get(val)));
              content3 = (content3.concat('><br><br>'));
              console.log(content3)
              this.content2.innerHTML += content3;
            }

            content1 = '<label class="form-label" for="nom">type:</label><input  class="form-control" type="text" id="nom" name="name_house" value=' + feature.get("nom") + '><br><br>';

            this.overlay2.setPosition(coordinate);
            this.map.updateSize();

            // Fin if
          }
        });


      //this.map.on('click'
    });


  }

  modify_feature2() {

    //console.log( this.ProjectNameGeo)
    //console.log(this.valLayer)
    var closer2 = document.getElementById('popup-closer')!;
    closer2.blur()

    var style = new Style({
      //for the point
      image: new Circle({
        stroke: new Stroke({
          color: 'rgba(60, 179, 113, 1.0)',
          width: 5
        }),
        radius: 3
      }),
      //for the polyline
      stroke: new Stroke({
        width: 6,
        color: [60, 179, 113, 0.8],
      }),
    })


    document.getElementById("create_feature")!.style.backgroundColor = "rgb(239, 239, 239)";
    document.getElementById("modify_feature")!.style.backgroundColor = 'coral';
    document.getElementById("select_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';

    if (this.modify) {
      this.map.removeInteraction(this.modify);
    }
    if (this.snap_edit) {
      this.map.removeInteraction(this.snap_edit);
    }

    var source_mod = this.vectorGeoserver.getSource();
    var modify = new Modify({
      source: source_mod
    });
    this.map.addInteraction(modify);

    var source_g = this.vectorGeoserver.getSource();
    var snap_edit = new Snap({
      source: source_g
    });
    this.map.addInteraction(snap_edit);
    // this.map.on('click', this.highlight_mod_attributes);
    this.map.on('click', (evt) => {
      document.getElementById('popup')!.hidden = false;
      this.container2 = document.getElementById('popup')!;
      this.content2 = document.getElementById('popup-content')!;

      this.overlay2 = new Overlay({
        element: this.container2,
      });

      // console.log("show overlay", this.overlay2)
      this.map.addOverlay(this.overlay2);

      if (this.featureOverlay) {
        this.featureOverlay.getSource().clear();
        this.map.removeLayer(this.featureOverlay);
      }

      //if (geojson) {geojson.getSource().re;fresh();}
      var tabDataFeature: any[] = [];
      var feature = evt.map.forEachFeatureAtPixel(evt.pixel,
        (feature: any, layer: any) => {
          document.getElementById('popup')!.hidden = false;

          if (feature) {


            feature.setStyle(style);
           
            var featureType = feature.getGeometry().getType()
            var coordinate = evt.coordinate;
            var content1;
            var content3;
            //je remplie mon content1;
            this.content2.innerHTML = ' ';
            content3 = '';
            var content4 = '';
            for (let i = 1; i < (feature.getKeys()).length; i++) {
              var val = (feature.getKeys())[i]
              content3 = '<label class="form-label" for="nom">';
              content3 = (content3.concat(val));
              content3 = (content3.concat(' &nbsp;:   &nbsp;    </label>'));
              content3 = (content3.concat('<input id='));
              content3 = (content3.concat(val));
              content3 = (content3.concat('<input type="text" value='));
              content3 = (content3.concat(feature.get(val)));
              content3 = (content3.concat('><br>'));
              this.content2.innerHTML += content3;
            }

            //L'ajout du button save and delete
            content4 = ' <button type="button" class="btn btn-success" onclick="save_mod_features()" id = "save_mod_features">Save </button>&nbsp &nbsp';
            var content5 = ('<button class="btn btn-danger"type="button" onclick="cancel_mod_features()" id = "cancel_mod_features">Cancel</button>');
            this.content2.innerHTML += content4;
            this.content2.innerHTML += content5;
            this.overlay2.setPosition(coordinate);
            this.map.updateSize();


            //---------------------------cancel_modification()---------------------------//
            //on doit créer l'emenet pui ajouter addEventListener
            var cancel = document.getElementById("cancel_mod_features")!;
            cancel.addEventListener('click', (event: any) => {
              //do logic featureOverlay
              console.log('i cancel_mod_features');
              this.featureOverlay.getSource().clear();
              this.overlay2.setPosition(undefined);
              closer2.blur();
            }, false);

            //--------------------------- save_mod_features()---------------------------//
            var saved = document.getElementById("save_mod_features")!;
            saved.addEventListener('click', (event: any) => {
              //do logic featureOverlay
              console.log('i save_mod_features');

              //var nom = (<HTMLInputElement>document.getElementById('nom')!).value;
              var nom = 'hheheh'
              var fid_feat_mod = feature.getId();
              var geometryy = feature.getGeometry();

              //----- transoformation des coord d'un point

              const proj44 = (proj4 as any).default;
              proj44.defs([
                ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
                ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
              ]);
              var src = 'EPSG:3857';
              var dest = 'EPSG:2154';
              register(proj44)
              var trans = geometryy.transform(src, dest);
              var coordTransform = trans.getCoordinates();

              //HAJAR ; je suis ici , je dois remplacer Point par type de geom de la couche ; cette info je peux l'avoir avec ST-GeometryType
              //construction de notre GML et son remplissage avec les coordonnes
              var gmlFormat = '<gml:' + featureType + '\t' + 'srsName="http://www.opengis.net/gml/srs/epsg.xml#2154">\n' + '<gml:coordinates  decimal="." cs="," ts=" ">'
              for (let i = 0; i < (coordTransform).length; i++) {

                gmlFormat = (gmlFormat.concat(coordTransform[i]));
                if (i != (((coordTransform).length) - 1)) {
                  gmlFormat = (gmlFormat.concat(','));
                }
              }
              gmlFormat = (gmlFormat.concat('</gml:coordinates>\n'));
              gmlFormat = (gmlFormat.concat('</gml:' + featureType + '>'));
              console.log(gmlFormat);



              //----- create request to send it to geoserver ;
              var postData =
                '<wfs:Transaction service="WFS" version="1.1.0"\n' +
                'xmlns:' + this.ProjectNameGeo + '="projet/' + this.ProjectNameGeo + '"\n' +
                'xmlns:ogc="http://www.opengis.net/ogc"\n' +
                'xmlns:wfs="http://www.opengis.net/wfs"\n' +
                'xmlns:gml="http://www.opengis.net/gml"\n' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
                'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0,/WFS-transaction.xsd http://www.openplans.org/' + this.ProjectNameGeo + '\t' + 'http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=' + this.ProjectNameGeo + ':' + this.valLayer + '">' + '\n' +
                '<wfs:Update typeName="' + this.ProjectNameGeo + ':' + this.valLayer + '">' + '\n';

              var postData2 =
                '<wfs:Property>\n' +
                '<wfs:Name>geom</wfs:Name>\n' +
                '<wfs:Value>\n' + gmlFormat + '\n' + '</wfs:Value>\n' +
                '</wfs:Property>\n';

              var postData = (postData.concat(postData2));

              var AttFormat = "";
              //  for (let i = 1; i < 4; i++) {
              var val = (feature.getKeys())[8];
              AttFormat = (AttFormat.concat('<wfs:Property>\n'));
              var nomAtt = '<wfs:Name>' + val + '</wfs:Name>\n' + '<wfs:Value>\n' + feature.get(val) + '\n' + '</wfs:Value>\n' + '</wfs:Property>\n';
              AttFormat = (AttFormat.concat(nomAtt));
              // }
              postData = (postData.concat(AttFormat));

              var id_Filter = '<ogc:Filter>\n' + '<ogc:FeatureId fid="' + fid_feat_mod + '"/>\n' + '</ogc:Filter>\n' + '</wfs:Update>\n' + '</wfs:Transaction>\n';

              postData = (postData.concat(id_Filter));

              console.log(postData)


              var req = new XMLHttpRequest();
              req.open("POST", '/GeoservHTTP/wfs', false);
              req.setRequestHeader('Content-type', 'text/xml');
              req.onreadystatechange = function () {
                if (req.readyState != 4) return;
                if (req.status != 200 && req.status != 304) {
                  alert('HTTP error ' + req.status);
                  return;
                }

                console.log('HTTP error ', req.responseText);
                //alert(req.responseText);
              }

              if (req.readyState == 4) return;
              alert(req.responseText);
              req.send(postData);
              alert('Feature updated successfully');

              //refresh layer and delete popup
              this.vectorGeoserver.getSource().refresh();
              this.featureOverlay.getSource().clear();
              this.overlay2.setPosition(undefined);
              closer2.blur();
              console.log('finitos')
            }, false);

          }

        });



    });
  }

  save_created() {
  }

  highlight(evt: any) {

    if (this.featureOverlay) {
      this.featureOverlay.getSource().clear();
      this.map.removeLayer(this.featureOverlay);
    }
    this.feature = this.map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
        return feature;
      });

    if (this.feature) {

      var geometry = this.feature.getGeometry();
      var coord = geometry.getCoordinates();
      var coordinate = evt.coordinate;

      this.featureOverlay.getSource().addFeature(this.feature);
      //overlays.getLayers().push(featureOverlay);

      var content1 = '<h3>' + this.feature.get('fid') + '</h3>';
      content1 += '<h5>' + this.feature.get('id_objet') + '</h5>';

      //  alert(feature.getId());
      this.content.innerHTML = content1;
      this.overlay.setPosition(coordinate);


      //alert(feature.get('gid'));

      //  alert(feature.get('gid'));

      this.map.updateSize();
    }

    // grid1.getSelectionModel().selectRow(grid1.getStore().find("id", feature.getId()));


  }

  popupcloser() {
    document.getElementById('popup')!.hidden = true;
    console.log("i desapeared")

  }



  getinfo(evt: any) {

  }


  delete_feature() {

    document.getElementById("delete_feature")!.style.backgroundColor = 'coral';
    document.getElementById("create_feature")!.style.backgroundColor = "rgb(239, 239, 239)";
    document.getElementById("modify_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
    document.getElementById("select_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';

    this.map.on('click', (evt) => {

      evt.map.forEachFeatureAtPixel(evt.pixel,
        (feature: any, layer: any) => {

          if (feature) {

            var del_feat = this.featureOverlay.getSource().getFeatures();
            var fid_del_feat = feature.getId();
            console.log('fid_feat_mod', fid_del_feat);
            var alerte = confirm('Are you sure you want to delete the selected feature?');
            console.log('alerte', alerte);
            if (alerte == true) {
              // Save it!
              if (fid_del_feat == undefined) {
                console.log('first if ');
                this.featureOverlay.getSource().removeFeature(del_feat);
                this.vectorGeoserver.getSource().removeFeature(feature);
              }
              else if (fid_del_feat != undefined) {

                //on supprime le feature de la couche
                console.log('second if ');
                this.vectorGeoserver.getSource().removeFeature(feature);
                var feat1 = this.featureOverlay.getSource().getFeatureById(fid_del_feat);
                this.featureOverlay.getSource().removeFeature(feat1);
                //on prépare la rqt à envoyer au serveur
                var postData_del =
                  '<wfs:Transaction service="WFS" version="1..0"\n' +
                  'xmlns:cdf="http://www.opengis.net/cite/data"\n' +
                  'xmlns:ogc="http://www.opengis.net/ogc"\n' +
                  'xmlns:wfs="http://www.opengis.net/wfs"\n' +
                  'xmlns:SNCF="projet/SNCF">\n' +
                  '<wfs:Delete typeName="SNCF:p_bus_ndv">\n' +
                  '<ogc:Filter>\n' +
                  '<ogc:FeatureId fid="' + fid_del_feat + '"/>\n' +
                  '</ogc:Filter>\n' +
                  '</wfs:Delete>\n' +
                  '</wfs:Transaction>\n';

                console.log(postData_del)
                var req_del = new XMLHttpRequest();
                req_del.open("POST", '/GeoservHTTP/wfs', false);
                req_del.setRequestHeader('Content-type', 'text/xml');
                req_del.onreadystatechange = function () {
                  if (req_del.readyState != 4) return;
                  if (req_del.status != 200 && req_del.status != 304) {
                    console.log('erreur')
                    alert('HTTP error ' + req_del.status);
                    return;
                  }

                  console.log(req_del.responseText)
                  alert(req_del.responseText);
                }
                console.log("req_del.responseText", req_del.responseText)
                if (req_del.readyState == 4) return;
                console.log(req_del.responseText)
                alert(req_del.responseText);
                req_del.send(postData_del);

                alert('Feature deleted Successfully');

              }
            }
            else if (alerte == false) {
              // Do nothing!
              this.vectorGeoserver.getSource().refresh();

            }


          }

        })

      //this.map.on('click'
    });

  }

  delete_feature2() {

    document.getElementById("delete_feature")!.style.backgroundColor = 'coral';
    document.getElementById("create_feature")!.style.backgroundColor = "rgb(239, 239, 239)";
    document.getElementById("modify_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';
    document.getElementById("select_feature")!.style.backgroundColor = 'rgb(239, 239, 239)';

    this.map.on('click', (evt) => {

      evt.map.forEachFeatureAtPixel(evt.pixel,
        (feature: any, layer: any) => {

          if (feature) {

            var del_feat = this.featureOverlay.getSource().getFeatures();
            var fid_del_feat = feature.getId();
            console.log('fid_feat_mod', fid_del_feat);
            var alerte = confirm('Are you sure you want to delete the selected feature?');
            if (alerte == true) {
              // Save it!
              if (fid_del_feat == undefined) {
                console.log('first if ');
                this.featureOverlay.getSource().removeFeature(del_feat);
                this.vectorGeoserver.getSource().removeFeature(feature);
              }
              else if (fid_del_feat != undefined) {

                //on supprime le feature de la couche
                console.log('second if ');
                this.vectorGeoserver.getSource().removeFeature(feature);
                var feat1 = this.featureOverlay.getSource().getFeatureById(fid_del_feat);
                this.featureOverlay.getSource().removeFeature(feat1);
                //on prépare la rqt à envoyer au serveur
                var postData_del =
                  '<wfs:Transaction service="WFS" version="1.1.0"\n' +
                  'xmlns:cdf="http://www.opengis.net/cite/data"\n' +
                  'xmlns:ogc="http://www.opengis.net/ogc"\n' +
                  'xmlns:wfs="http://www.opengis.net/wfs"\n' +
                  'xmlns:' + this.ProjectNameGeo + '="projet/' + this.ProjectNameGeo + '">\n' +
                  '<wfs:Delete typeName="' + this.ProjectNameGeo + ':' + this.valLayer + '">' + '\n' +
                  '<ogc:Filter>\n' +
                  '<ogc:FeatureId fid="' + fid_del_feat + '"/>\n' +
                  '</ogc:Filter>\n' +
                  '</wfs:Delete>\n' +
                  '</wfs:Transaction>\n';

                console.log(postData_del)
                var req_del = new XMLHttpRequest();
                req_del.open("POST", '/GeoservHTTP/wfs', false);
                req_del.setRequestHeader('Content-type', 'text/xml');
                req_del.onreadystatechange = function () {
                  if (req_del.readyState != 4) return;
                  if (req_del.status != 200 && req_del.status != 304) {
                    console.log('erreur')
                    alert('HTTP error ' + req_del.status);
                    return;
                  }
                  console.log('req_del.responseText', req_del.responseText)
                  // alert(req_del.responseText);
                }
                if (req_del.readyState == 4) return;
                console.log('req_del.responseText', req_del.responseText)
                //alert(req_del.responseText);
                req_del.send(postData_del);

                alert('Feature deleted Successfully');

              }
            }
            else if (alerte == false) {
              // Do nothing!
              this.vectorGeoserver.getSource().refresh();

            }


          }

        })

      //this.map.on('click'
    });

  }
  //récuper le nom de la couche choisie par User to edit

  onLayerSelected(event: any) {
    this.valLayer = event.target.value;
    console.log("carte layer here", this.valLayer)
    console.log("ProjectNameGeo here", this.ProjectNameGeo)

    this.http
      .post('http://127.0.0.1:8000/api/GetTypeGeometryByLayerName?request=' + this.valLayer, null)
      .subscribe((response: object) => {
        this.typefetaure = response;
        console.log(this.typefetaure)
        this.typefetaure2 = (this.typefetaure[0].ST_GeometryType[0].st_geometrytype).slice(3);
        this.attributeFetaure = this.typefetaure[0].column_name;

        //  console.log('type feature from back end');
        // console.log(this.typefetaure2);
        // //console.log(this.attributeFetaure);
        // console.log((this.attributeFetaure).length);

      })
    //Envoyer le nom de la couche à
    //rendre le bouton du form visible
    var projName = " ";
    projName = this.ProjectNameGeo;
    var id = projName + "_" + this.valLayer
    console.log("id", id)


    if (projName = "SNCF") {
      if (id == 'SNCF_p_bus_ndv') {
        document.getElementById("SNCF_p_tiv")!.style.visibility = 'hidden';
        document.getElementById("SP4_pont")!.style.visibility = 'hidden';
        document.getElementById("SP4_sg_signal")!.style.visibility = 'hidden';

      } else (id == 'SNCF_p_tiv')
      {
        document.getElementById("SNCF_p_bus_ndv")!.style.visibility = 'hidden';
        document.getElementById("SP4_pont")!.style.visibility = 'hidden';
        document.getElementById("SP4_sg_signal")!.style.visibility = 'hidden';
      }
    } else if (projName == "SP4") {
      if (id == 'SP4_pont') {
        document.getElementById("SNCF_p_bus_ndv")!.style.visibility = 'hidden';
        document.getElementById("SNCF_p_tiv")!.style.visibility = 'hidden';
        document.getElementById("SP4_sg_signal")!.style.visibility = 'hidden';

      } else (id == 'SP4_sg_signal')
      {
        document.getElementById("SNCF_p_bus_ndv")!.style.visibility = 'hidden';
        document.getElementById("SNCF_p_tiv")!.style.visibility = 'hidden';
        document.getElementById("SP4_pont")!.style.visibility = 'hidden';
      }
    }

    var id = document.getElementById(id)!.style.visibility = 'visible';

    // $("#simpleModal").modal('show');
    // (<any>$('#myModal')).modal('show');


  }


  // getter f to access form controls
  get f(): { [key: string]: AbstractControl } {
    return this.FormLayerPtiv.controls;
  }

  //fonction qui récupere id de p_bus_ndv_1 choisi
  p_bus_ndv_1() {
    console.log('FUNCTION p_bus_ndv_1');
    var style = new Style({
      //for the point
      image: new Circle({
        stroke: new Stroke({
          color: 'rgba(60, 179, 113, 1.0)',
          width: 5
        }),
        radius: 3
      }),
      //for the polyline
      stroke: new Stroke({
        width: 6,
        color: [60, 179, 113, 0.8],
      }),
    })

    this.map.on('click', (evt) => {

      if (this.featureOverlay) {
        this.featureOverlay.getSource().clear();
        this.map.removeLayer(this.featureOverlay);
      }

      var feature = evt.map.forEachFeatureAtPixel(evt.pixel,
        (feature: any, layer: any) => {
          if (feature) {
            feature.setStyle(style);
            var id = feature.getId()
            var split = id.split(".")
            this.id_p_bus_ndv_1 = split[1];
            console.log('FUCTION 1: :this.id_p_bus_ndv', this.id_p_bus_ndv_1)
          }
        });

      var input = document.getElementById('input_p_bus_ndv_1') as HTMLInputElement | null;

      if (input!.value == "") {
        console.log('test if', input!.value!)
        this.FormLayerPtiv.patchValue({ id_ndv1: this.id_p_bus_ndv_1 });
      }


      //this.map.on('click'
    });

    this.FormLayerPtiv.patchValue({ nom_schema: this.nom_schema });
    this.FormLayerPtiv.patchValue({ id_pas: this.id_pas_user });

  }

  //fonction qui récupere id de p_bus_ndv_2 choisi

  p_bus_ndv_2(event: any) {
    this.isEnabled = true;

    var style = new Style({
      //for the point
      image: new Circle({
        stroke: new Stroke({
          color: 'rgba(60, 179, 113, 1.0)',
          width: 5
        }),
        radius: 3
      }),
      //for the polyline
      stroke: new Stroke({
        width: 6,
        color: [60, 179, 113, 0.8],
      }),
    })

    console.log('FUNCTION p_bus_ndv_2');
    console.log('before', event)
    event.stopPropagation();
    console.log('after', event)
    console.log(event)

    var style = new Style({
      //for the point
      image: new Circle({
        stroke: new Stroke({
          color: 'rgba(60, 179, 113, 1.0)',
          width: 5
        }),
        radius: 3
      }),
      //for the polyline
      stroke: new Stroke({
        width: 6,
        color: [60, 179, 113, 0.8],
      }),
    })

    this.map.on('click', (evt) => {

      var feature = evt.map.forEachFeatureAtPixel(evt.pixel,
        (feature: any, layer: any) => {
          if (feature) {
            feature.setStyle(style);
            var id = feature.getId()
            var split = id.split(".")
            this.id_p_bus_ndv_2 = split[1];
            console.log(' FUCTION 2: this.id_p_bus_ndv', this.id_p_bus_ndv_2)

          }
        });


      //this.map.on('click'
      this.isEnabled = true;
      this.FormLayerPtiv.patchValue({ id_ndv2: this.id_p_bus_ndv_2 });
      //document.getElementById('input_p_bus_ndv_2')!.setAttribute('value', this.id_p_bus_ndv_2);

    });
    return "finitos2";
  }

  //la function qui permet à l'utilisateur de dessiner
  Draw_p_bus_ndv() {

    if (this.modify) {
      this.map.removeInteraction(this.modify);
    }
    if (this.snap_edit) {
      this.map.removeInteraction(this.snap_edit);
    }

    this.source_mod = this.vectorGeoserver.getSource();

    console.log("source_mod ", this.source_mod)
    this.draw_add = new Draw({
      source: this.source_mod,
      type: 'LineString',
      stopClick: true
    });
    this.map.addInteraction(this.draw_add);
    //var source_g = geojson.getSource();
    this.snap_edit = new Snap({
      source: this.source_mod
    });
    this.map.addInteraction(this.snap_edit);

    this.draw_add.on('drawend',
      (e: any) => {
        this.myFeature = e.feature;
        if (this.myFeature) {

          var geometry = this.myFeature.getGeometry();
          // var coord = geometry.getCoordinates();
          console.log('geometry', geometry.getCoordinates())
          this.source_mod.addFeature(this.myFeature);

          //----- transoformation des coord d'un point
          const proj44 = (proj4 as any).default;
          proj44.defs([
            ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
            ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
          ]);
          var src = 'EPSG:3857';
          var dest = 'EPSG:2154';
          register(proj44)
          var transGeometry = geometry.transform(src, dest);
          var coordLinestring = transGeometry.getCoordinates();
          console.log('geometry tran', coordLinestring)


          var gmlFormat = '<gml:' + this.typefetaure2 + '\t' + 'srsName="http://www.opengis.net/gml/srs/epsg.xml#2154">\n' + '<gml:coordinates  >'
          for (let i = 0; i < (coordLinestring).length; i++) {
            console.log(coordLinestring[i])
            gmlFormat = (gmlFormat.concat(coordLinestring[i][0]));
            gmlFormat = (gmlFormat.concat(','));
            gmlFormat = (gmlFormat.concat(coordLinestring[i][1]));
            gmlFormat = (gmlFormat.concat(','));
            gmlFormat = (gmlFormat.concat('0'));
            gmlFormat = (gmlFormat.concat(' '));

          }

          gmlFormat = (gmlFormat.concat('</gml:coordinates>\n'));
          gmlFormat = (gmlFormat.concat('</gml:' + this.typefetaure2 + '>'));
          console.log('reate gmlFormat', gmlFormat);


          this.postData =
            '<wfs:Transaction service="WFS" version="1.1.0"\n' +
            'xmlns:' + this.ProjectNameGeo + '="projet/' + this.ProjectNameGeo + '"\n' +
            'xmlns:ogc="http://www.opengis.net/ogc"\n' +
            'xmlns:wfs="http://www.opengis.net/wfs"\n' +
            'xmlns:gml="http://www.opengis.net/gml"\n' +
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
            'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0,/WFS-transaction.xsd http://www.openplans.org/' + this.ProjectNameGeo + '\t' + 'http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=' + this.ProjectNameGeo + ':' + this.valLayer + '">' + '\n' +
            '<wfs:Insert >' + '\n' +
            '<' + this.ProjectNameGeo + ':' + this.valLayer + '>' + '\n';

          // // JE TEST

          var gmlFormat2 =

            '<gml:LineString>' + '\n' +
            '<gml:coordinates  >' + '\n' +
            '649291.1788346765,6867144.793599444,0 735763.6490276353,6670628.43325318,0' + '\n' +
            '</gml:coordinates>' + '\n' +
            '</gml:LineString>' + '\n';



          this.postData1_TEST =
            '<wfs:Transaction service="WFS" version="1.1.0,"\n' +
            'xmlns:SNCF="projet/SNCF"\n' +
            'xmlns:ogc="http://www.opengis.net/ogc"\n' +
            'xmlns:wfs="http://www.opengis.net/wfs"\n' +
            'xmlns:gml="http://www.opengis.net/gml"\n' +
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
            'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0,/WFS-transaction.xsd http://www.openplans.org/SNCF http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=SNCF:p_tiv">\n' +
            '<wfs:Insert>\n' +
            '<SNCF:p_tiv>\n' +

            '<SNCF:geom>\n' +

            gmlFormat2 + '\n' +

            '</SNCF:geom>\n' +

            '<SNCF:sens_principal>\n' + 'hajar' + '\n' + '</SNCF:sens_principal>\n' +
            '</SNCF:p_tiv>\n' +
            '</wfs:Insert>\n' +
            '</wfs:Transaction>\n';

          // //


        }

        //to remove mousse draw
        this.map.removeInteraction(this.draw_add)



      })



  }
  //delete the drwa feature
  delete_p_bus_ndv() {
    this.source_mod.removeFeature(this.myFeature);
  }

  //function qui récupere les attributs du form P_tiv
  FormLayerPtivFun() {

    this.postData =
      '<wfs:Transaction service="WFS" version="1.1.0"\n' +
      'xmlns:' + this.ProjectNameGeo + '="projet/' + this.ProjectNameGeo + '"\n' +
      'xmlns:ogc="http://www.opengis.net/ogc"\n' +
      'xmlns:wfs="http://www.opengis.net/wfs"\n' +
      'xmlns:gml="http://www.opengis.net/gml"\n' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
      'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0,/WFS-transaction.xsd http://www.openplans.org/' + this.ProjectNameGeo + '\t' + 'http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=' + this.ProjectNameGeo + ':' + this.valLayer + '">' + '\n' +
      '<wfs:Insert >' + '\n' +
      '<' + this.ProjectNameGeo + ':' + this.valLayer + '>' + '\n';

    this.submitted = true;
    console.log('FormLayerPtiv', this.FormLayerPtiv.value)
    console.log('FormLayerPtiv', this.FormLayerPtiv.value.id_ndv1)
    console.log('FormLayerPtiv', this.FormLayerPtiv.value.id_ndv2)

    var keys = Object.keys(this.FormLayerPtiv.value)
    var obj_value = Object.values(this.FormLayerPtiv.value)

    var postData2 = '';
    for (let i = 0; i < (keys).length; i++) {
      var rqt = '<' + this.ProjectNameGeo + ':' + keys[i] + '>' + '\n' + obj_value[i] + '\n' +
        '</' + this.ProjectNameGeo + ':' + keys[i] + '>' + '\n';
      postData2 = (postData2.concat(rqt));

    }

    var postDataFinal = (this.postData.concat(postData2));
    var postData3 = '</' + this.ProjectNameGeo + ':' + this.valLayer + '>' + '\n' +
      '</wfs:Insert>' + '\n' +
      '</wfs:Transaction>'

    postDataFinal = (postDataFinal.concat(postData3));

    console.log(postDataFinal);

    //---------  requette POST à notre serveur
    var req1 = new XMLHttpRequest();
    req1.open("POST", '/GeoservHTTP/wfs', false);
    req1.setRequestHeader('Content-type', 'text/xml');

    req1.onreadystatechange = function () {
      // 4 means done
      if (req1.readyState != 4) return;
      if (req1.status != 200 && req1.status != 304) {
        alert('HTTP error here' + req1.status);
        return;
      }
      // alert(req1.responseText);
      //  Ext.MessageBox.alert('Status', 'changes saved successfully');
    }

    if (req1.readyState == 4) return;

    //-----------------------------------Attention----------------------------------------
    req1.send(postDataFinal);
    console.log('finitos', req1.responseText)
    //alert(req1.responseText);

    alert('Feature saved successfully');
    //refresh layer and delete popup

    this.vectorGeoserver.getSource().refresh();
    this.featureOverlay.getSource().clear();
    //this.overlay2.setPosition(undefined);

    console.log('finitos')

    var output = {
      "p_bus_1": this.FormLayerPtiv.value.id_ndv1,
      "p_bus_2": this.FormLayerPtiv.value.id_ndv2,
      "nom_schema": this.FormLayerPtiv.value.nom_schema,
    }

    var outputDB = JSON.stringify(output);
    console.log(typeof (outputDB));

    //envoyer les id de p_bus_ndv_1 et p_bus_ndv_2 au back-end
    this.http
      .post('http://127.0.0.1:8000/api/p_tav_from_2_navs?request=' + outputDB, null)
      .subscribe((response: object) => {
        console.log(response);
      })


  }

  //récuperer la date du jour et lui associer au champ date_heure_maj du form P_tive

  GetFullDate_Ptiv() {
    console.log('date here ')
    var d = new Date();
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + ' ' + hours;
    console.log(fullDate);
    this.FormLayerPtiv.patchValue({ date_heure_maj: fullDate });
  }

  // chercher une entité et zoomer en meme temps

  SearchFeature2() {

    //console.log((<HTMLInputElement>document.getElementById('ModalProject')).value);
    //console.log((<HTMLInputElement>document.getElementById('inputId')).value);


    var ModalProject = this.FormModalSearch.value.layer
    var inputId = this.FormModalSearch.value.inputId
    console.log(ModalProject)
    console.log(inputId)


    var output = {
      "ProjectName": this.dataProject.databaseName,
      "ProjectLayer": ModalProject,
      "inputId": inputId,

    }
    var outputDB = JSON.stringify(output);
    console.log(typeof (outputDB));
    // nous envoyons le output ;nom db , layer and id et nous récupérons la geometry
    this.http
      .post('http://127.0.0.1:8000/api/GetGeometryByLayerNameAndID?request=' + outputDB, null)
      .subscribe((response: object) => {
        console.log('data send');
        this.FeatureGeometry = response;
        this.FeatureGeometrySend = this.FeatureGeometry[0].st_asgeojson;
        console.log(this.FeatureGeometrySend);

        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(this.FeatureGeometrySend, { featureProjection: 'EPSG:3857' }),
        });

        this.layerZoom = new VectorLayer({
          source: vectorSource,
        });

        // this.map.addLayer(this.layerZoom);

        setTimeout(() => {

          var style = new Style({
            //for the point
            image: new Circle({
              stroke: new Stroke({
                color: 'rgba(60, 179, 113, 1.0)',
                width: 5
              }),
              radius: 3
            }),
            //for the polyline
            stroke: new Stroke({
              width: 6,
              color: [60, 179, 113, 0.8],
            }),
          })

          var search = ModalProject + '.' + inputId
          console.log(search)
          var feature = this.vectorGeoserver.getSource().getFeatureById(search);
          console.log(feature);
          feature.setStyle(style);

          var layerExtent = this.layerZoom.getSource().getExtent();
          console.log("layerExtent", layerExtent)

          const proj44 = (proj4 as any).default;

          proj44.defs([
            ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
            ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
          ]);
          register(proj44)
          //var trans = layerExtent.transform(src, dest);

          var trans = transformExtent(layerExtent, 'EPSG:2154', 'EPSG:3857')
          console.log('after', trans);

          if (trans) {

            this.map.getView().fit(trans);
          }
        }, 2000);

      })



  }


  // function qui zomm sur feature choisie
  ZoomToFeature() {
    this.dataService.data5.subscribe(response => {
      console.log('je suis arrive à cart com  ready for the zoom', response)
    })
  }


  // getter f to access form controls
  get h(): { [key: string]: AbstractControl } {
    return this.FormLayerPont.controls;
  }

  //Get the coordinate of the first point
  p_pont_1() {
    console.log('Get the coordinate of the fisrt point ')

    var style = new Style({
      //for the point
      image: new Circle({
        stroke: new Stroke({
          color: 'rgba(60, 179, 113, 1.0)',
          width: 5
        }),
        radius: 3
      }),

    })

    if (this.modify) {
      this.map.removeInteraction(this.modify);
    }
    if (this.snap_edit) {
      this.map.removeInteraction(this.snap_edit);
    }

    this.source_mod = this.vectorGeoserver.getSource();

    console.log("source_mod ", this.source_mod)
    this.draw_add = new Draw({
      source: this.source_mod,
      type: 'Point',
      stopClick: true
    });
    this.map.addInteraction(this.draw_add);
    //var source_g = geojson.getSource();
    this.snap_edit = new Snap({
      source: this.source_mod
    });
    this.map.addInteraction(this.snap_edit);

    this.draw_add.on('drawend',
      (e: any) => {
        this.myFeature = e.feature;
        if (this.myFeature) {
          this.myFeature.setStyle(style);
          var geometry = this.myFeature.getGeometry();

          console.log('BEFORE')
          console.log((geometry.getCoordinates())[0])
          console.log((geometry.getCoordinates())[1])
          this.source_mod.addFeature(this.myFeature);


          const proj44 = (proj4 as any).default;
          proj44.defs([
            ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
            ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
          ]);
          var src = 'EPSG:3857';
          var dest = 'EPSG:2154';
          register(proj44)
          var transGeometry = geometry.transform(src, dest);
          var coordLinestring = transGeometry.getCoordinates();

          // var coord = geometry.getCoordinates();
          //console.log('geometry', geometry.getCoordinates())
          console.log('AFTER')
          this.cord_pt1_x = coordLinestring[0];
          this.cord_pt1_y = coordLinestring[1];
          console.log(this.cord_pt1_x)
          console.log(this.cord_pt1_y)

          this.FormLayerPont.patchValue({ cord_pt1_x: this.cord_pt1_x });
          this.FormLayerPont.patchValue({ cord_pt1_y: this.cord_pt1_y });
          this.FormLayerPont.patchValue({ id_pas: this.id_pas_user });
          this.FormLayerPont.patchValue({ nom_schema: this.nom_schema });



        }
        //to remove mousse draw
        this.map.removeInteraction(this.draw_add)
      })





  }
  //Get the coordinate of the sedond point
  p_pont_2() {

    console.log('Get the coordinate of the second point ')
    console.log('Get the coordinate of the fisrt point ')

    var style = new Style({
      //for the point
      image: new Circle({
        stroke: new Stroke({
          color: 'rgba(60, 179, 113, 1.0)',
          width: 5
        }),
        radius: 3
      }),

    })

    if (this.modify) {
      this.map.removeInteraction(this.modify);
    }
    if (this.snap_edit) {
      this.map.removeInteraction(this.snap_edit);
    }

    this.source_mod = this.vectorGeoserver.getSource();

    console.log("source_mod ", this.source_mod)
    this.draw_add = new Draw({
      source: this.source_mod,
      type: 'Point',
      stopClick: true
    });
    this.map.addInteraction(this.draw_add);
    //var source_g = geojson.getSource();
    this.snap_edit = new Snap({
      source: this.source_mod
    });
    this.map.addInteraction(this.snap_edit);

    this.draw_add.on('drawend',
      (e: any) => {
        this.myFeature = e.feature;
        if (this.myFeature) {
          this.myFeature.setStyle(style);
          var geometry = this.myFeature.getGeometry();
          // var coord = geometry.getCoordinates();
          console.log('BEFORE')
          console.log((geometry.getCoordinates())[0])
          console.log((geometry.getCoordinates())[1])
          this.source_mod.addFeature(this.myFeature);

          const proj44 = (proj4 as any).default;
          proj44.defs([
            ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
            ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
          ]);
          var src = 'EPSG:3857';
          var dest = 'EPSG:2154';
          register(proj44)
          var transGeometry = geometry.transform(src, dest);
          var coordLinestring = transGeometry.getCoordinates();

          console.log('AFTER')
          this.cord_pt2_x = coordLinestring[0];
          this.cord_pt2_y = coordLinestring[1];
          console.log(this.cord_pt2_x)
          console.log(this.cord_pt2_y)




          this.FormLayerPont.patchValue({ cord_pt2_x: this.cord_pt2_x });
          this.FormLayerPont.patchValue({ cord_pt2_y: this.cord_pt2_y });

        }
        //to remove mousse draw
        this.map.removeInteraction(this.draw_add)
      })




  }
  //function qui récupere les attributs du form Pont
  FormLayerPontFun() {
    //on ajoute le valeur de is_pas_user au form
    //this.FormLayerPont.patchValue({ id_pas: this.id_pas_user });

    this.submitted = true;
    console.log('FormLayerPontFun')
    console.log((this.h['id_objet']).errors)
    console.log((this.h['imu']).errors)
    console.log(typeof (this.FormLayerPont.value.id_objet))


    var outputDB = JSON.stringify(this.FormLayerPont.value);
    console.log(typeof (outputDB));

    this.http
      .post('http://127.0.0.1:8000/api/Form_Pont_New_Ligne?request=' + outputDB, null)
      .subscribe((response: object) => {
        console.log(response);
      })

  }
  //récuperer la date du jour et lui associer au champ date_heure_maj du form Pont
  GetFullDate_Pont() {
    console.log('date here ')
    var d = new Date();
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + ' ' + hours;
    console.log(fullDate);
    this.FormLayerPont.patchValue({ date_heure_maj: fullDate });
  }


  //récuperer la date du jour et lui associer au champ date_heure_maj du form sg_signal

  get s(): { [key: string]: AbstractControl } {
    return this.FormLayerSgSignal.controls;
  }

  GetFullDate_Sg_signal() {
    console.log('date here ')
    var d = new Date();
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + ' ' + hours;
    console.log(fullDate);
    this.FormLayerSgSignal.patchValue({ date_heure_maj: fullDate });
  }

  draw_p_pont() {

    console.log('Draw')
    console.log(this.id_pas_user)
    console.log(this.nom_schema)

    this.FormLayerSgSignal.patchValue({ id_pas: this.id_pas_user });
    this.FormLayerSgSignal.patchValue({ nom_schema: this.nom_schema });



    this.source_mod = this.vectorGeoserver.getSource();

    this.draw_add = new Draw({
      source: this.source_mod,
      type: 'Point',
      stopClick: true
    });
    this.map.addInteraction(this.draw_add);

    this.draw_add.on('drawend',
      (e: any) => {
        this.myFeature = e.feature;
        if (this.myFeature) {

          var geometry = this.myFeature.getGeometry();
          // var coord = geometry.getCoordinates();
          console.log('geometry', geometry.getCoordinates())
          this.source_mod.addFeature(this.myFeature);

          //----- transoformation des coord d'un point
          const proj44 = (proj4 as any).default;
          proj44.defs([
            ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs'],
            ['EPSG:2154', '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
          ]);
          var src = 'EPSG:3857';
          var dest = 'EPSG:2154';
          register(proj44)
          var transGeometry = geometry.transform(src, dest);
          var coord = transGeometry.getCoordinates();
          console.log('geometry tran', coord)

          console.log('AFTER')
          this.cord_pt_x = coord[0];
          this.cord_pt_y = coord[1];
          console.log(this.cord_pt_x)
          console.log(this.cord_pt_y)

          this.FormLayerSgSignal.patchValue({ cord_pt_x: this.cord_pt_x });
          this.FormLayerSgSignal.patchValue({ cord_pt_y: this.cord_pt_y });


        }

        //to remove mousse draw
        this.map.removeInteraction(this.draw_add)



      })



  }
  //submit the from of signal

  FormLayerSgSignalFun() {
    console.log('FormLayerSgSignalFun')
    console.log(this.FormLayerSgSignal.value)

    if (this.FormLayerSgSignal.value.equipe == true) {
      this.FormLayerSgSignal.patchValue({ equipe: "O" });

    } else {
      this.FormLayerSgSignal.patchValue({ equipe: "N" });
    }

    var outputDB = JSON.stringify(this.FormLayerSgSignal.value);

    this.http
      .post('http://127.0.0.1:8000/api/Form_Sg_SIGNAL_New_Ligne?request=' + outputDB, null)
      .subscribe((response: object) => {
        console.log(response);

        //to refresh the layer
        this.source_mod = this.vectorGeoserver.getSource();
        this.source_mod.refresh()

      })

  }

  //refreshLayers
  refreshLayers() {
    console.log('refresh();')
    this.vectorGeoserver.getSource().refresh();
    console.log('sessionStorage();')
    console.log(sessionStorage.getItem('id_pas_storage'));
  }

  //style Layers
  StyleLayer() {
    console.log("StyleLayer")
    console.log(this.FormModalStyleLayer.value)
    var layer = this.FormModalStyleLayer.value.LayerToStyle;
    console.log(layer)
    var color = this.FormModalStyleLayer.value.ColorToStyle;
    var form = this.FormModalStyleLayer.value.StyleForme;
    var size = this.FormModalStyleLayer.value.StyleSize;
    var colorFill = this.FormModalStyleLayer.value.ColorToStyleFill;


    // J'ai un prob avec le glyph
    var style_user = new Style({
      image: new FontSymbol({
        form: form,
        radius: size,
        fill: new Fill({
          color: colorFill,
        }),
        stroke: new Stroke({
          color: color,
          width: 5
        }),

      }),
      stroke: new Stroke({
        width: 6,
        color: color,
      }),
    })

    //on a récuperer toutes les couches de la carte et on a changer le style  en fonction du nom de la couche
    var features = this.vectorGeoserver.getSource().getFeatures()
    for (let i = 0; i < features.length; i++) {
      var id_f = features[i].getId();
      var nom_spl = (<string>id_f).split(".");
      var nom = nom_spl[0];

      if (nom == layer) {
        features[i].setStyle(style_user)
      }

    }

    this.legendTab1 = { 'p_bus_ndv': 0, 'p_tiv': 1 };
    this.legendTab2 = { 'sg_signal': 0, 'sg_limvit': 1, 'pont': 2 };


    //---------------------------------------Change the legend---------------------------------------//
    //console.log(this.tesTab['p_bus_ndv'])
    //this.legend1.getItems().removeAt(1);
    for (let i = 0; i < features.length; i++) {
      var id_f = features[i].getId();
      var nom_spl = (<string>id_f).split(".");
      var nom = nom_spl[0];
      var typegeom = features[i].getGeometry().getType()

      if (nom == layer && this.ProjectNameGeo == 'SP4') {
        this.keyLegend = this.legendTab2[layer]
        this.legend1.getItems().removeAt(this.keyLegend);
        this.legend1.addItem({
          title: nom,
          typeGeom: typegeom,
          style: style_user
        });
        break;
      }

      if (nom == layer && this.ProjectNameGeo == 'SNCF') {
        this.keyLegend = this.legendTab1[layer]

        this.legend1.getItems().removeAt(this.keyLegend);
        this.legend1.addItem({
          title: nom,
          typeGeom: typegeom,
          style: style_user
        });
        break;
      }
    }



    //---------------------------------------Save the style---------------------------------------//
    //save the style
    if (layer == 'p_bus_ndv') {
      this.Style_layer_P_bus_ndv = {
        'color': color.substr(1), 'form': form, 'size': size, 'colorFill': colorFill.substr(1)
      }
    }

    if (layer == 'p_tiv') {
      this.Style_layer_P_tiv = {
        'color': color.substr(1), 'form': form, 'size': size, 'colorFill': colorFill.substr(1)
      }
    }

    //

    if (layer == 'pont') {
      this.Style_layer_Pont = {
        'color': color.substr(1), 'form': form, 'size': size, 'colorFill': colorFill.substr(1)
      }
      console.log(this.Style_layer_Pont)

    }

    if (layer == 'sg_signal') {
      this.Style_layer_Signal = {
        'color': color.substr(1), 'form': form, 'size': size, 'colorFill': colorFill.substr(1)
      }
      console.log(this.Style_layer_Signal)

    }

    if (layer == 'sg_limvit') {
      this.Style_layer_Limvit = {
        'color': color.substr(1), 'form': form, 'size': size, 'colorFill': colorFill.substr(1)
      }
      console.log(this.Style_layer_Limvit)

    }

  }

  //save style Layer : Project
  btn_Save_style() {

    console.log(this.Style_layer_Pont)
    console.log(this.Style_layer_Signal)
    console.log(this.Style_layer_Limvit)


    var output = {}

    if (this.ProjectNameGeo == 'SNCF') {
      output = {
        'id_pas_user': this.id_pas_user,
        'projectName': this.ProjectNameGeo,
        'style': {
          'p_bus_ndv': this.Style_layer_P_bus_ndv,
          'p_tiv': this.Style_layer_P_tiv
        }
      }

    }
    if (this.ProjectNameGeo == 'SP4') {
      output = {
        'id_pas_user': this.id_pas_user,
        'projectName': this.ProjectNameGeo,
        'style': {
          'pont': this.Style_layer_Pont,
          'sg_signal': this.Style_layer_Signal,
          'sg_limvit': this.Style_layer_Limvit,
        }
      }

    }




    var outputDB = JSON.stringify(output);
    console.log(outputDB)

    this.http
      .post('http://127.0.0.1:8000/api/SaveStyleProject?request=' + outputDB, null)
      .subscribe((response: object) => {
        console.log(response);
      })

  }

  //Apply style Layer : Project
  btn_Apply_style() {
    console.log("btn_Apply_style")

    //delete the last legend the legend
    this.map.removeControl(this.legendCtrl);

    //create another legend
    this.legend1 = new Legend({
      title: 'Legend',
      margin: 5
    });

    this.legendCtrl = new LegendCont({
      legend: this.legend1,
      collapsed: false
    });
    this.map.addControl(this.legendCtrl);


    var output = {
      'id_pas_user': this.id_pas_user,
      'projectName': this.ProjectNameGeo,
    }

    var outputDB = JSON.stringify(output);
    console.log(outputDB);

    this.http
      .post('http://127.0.0.1:8000/api/getStyleProject?request=' + outputDB, null)
      .subscribe((response: object) => {
        this.getStyleProject = response;

        console.log(this.getStyleProject);
        var StyleProject = JSON.parse((this.getStyleProject)[0].style);
        var keys_layers = Object.keys(StyleProject)

        console.log(keys_layers)
        console.log(keys_layers[0])
        console.log(keys_layers[1])

        for (let i = 0; i < keys_layers.length; i++) {

          var layer = keys_layers[i]
          console.log(layer)
          var form = StyleProject[layer].form
          console.log(form)
          var color = '#' + (StyleProject[layer].color)
          console.log(color)
          var size = StyleProject[layer].size
          console.log(size)
          var colorFill = '#' + (StyleProject[layer].colorFill)
          console.log(colorFill)

          var style_user = new Style({
            image: new FontSymbol({
              form: form,
              radius: size,
              fill: new Fill({
                color: colorFill,
              }),
              stroke: new Stroke({
                color: color,
                width: 5
              }),

            }),
            stroke: new Stroke({
              width: 6,
              color: color,
            }),
          })


          //update the legend
          if (this.ProjectNameGeo == 'SP4') {

            if (layer == 'sg_limvit') {
              this.legend1.addItem({
                title: layer,
                typeGeom: 'Point',
                style: style_user
              });
            }
            if (layer == 'sg_signal') {
              this.legend1.addItem({
                title: layer,
                typeGeom: 'Point',
                style: style_user
              });
            }
            if (layer == 'pont') {
              this.legend1.addItem({
                title: layer,
                typeGeom: 'Point',
                style: style_user
              });
            }


          }

          if (this.ProjectNameGeo == 'SNCF') {

            if (layer == 'p_bus_ndv') {
              this.legend1.addItem({
                title: layer,
                typeGeom: 'Point',
                style: style_user
              });
            }
            if (layer == 'p_tiv') {
              this.legend1.addItem({
                title: layer,
                typeGeom: 'LineString',
                style: style_user
              });
            }
          }

          //
          var features = this.vectorGeoserver.getSource().getFeatures()
          for (let i = 0; i < features.length; i++) {
            var id_f = features[i].getId();
            var nom_spl = (<string>id_f).split(".");
            var nom = nom_spl[0];

            if (nom == layer) {
              features[i].setStyle(style_user)
            }
          }

        }





      })





  }



}

