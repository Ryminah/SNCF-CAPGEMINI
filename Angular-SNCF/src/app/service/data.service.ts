import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  //Sharing Data Between Components Using RxJS 
  private dataSource: BehaviorSubject<{}> = new BehaviorSubject({});;
  data: Observable<object> = this.dataSource.asObservable();
  //
  //Sharing Data Between Components Using RxJS 
  private dataSource2: BehaviorSubject<{}> = new BehaviorSubject({});;
  data2: Observable<object> = this.dataSource2.asObservable();

  //Sharing Data Between Components Using RxJS 
  private dataSource3: BehaviorSubject<{}> = new BehaviorSubject({});;
  data3: Observable<object> = this.dataSource3.asObservable();

  //

  //Sharing Data Between LAYER AND CART 
  private dataSource5: BehaviorSubject<{}> = new BehaviorSubject({});;
  data5: Observable<object> = this.dataSource5.asObservable();

  //
  //Sharing Data Between Components Using RxJS 
  private dataSource4: BehaviorSubject<{}> = new BehaviorSubject({});;
  data4: Observable<object> = this.dataSource3.asObservable();


  //Sharing Data Between Components Using RxJS 
  private dataSource6: BehaviorSubject<{}> = new BehaviorSubject({});;
  data6: Observable<object> = this.dataSource6.asObservable();

  //Sharing Data Between Components Using RxJS 
  private dataSource7: BehaviorSubject<{}> = new BehaviorSubject({});;
  data7: Observable<object> = this.dataSource7.asObservable();

  private dataSource8: BehaviorSubject<{}> = new BehaviorSubject({});;
  data8: Observable<object> = this.dataSource8.asObservable();

  constructor(private httpClient: HttpClient) {
    this.Data = new Object();

  }
  LayersChoice: any;
  paramss: any;
  Data;

  //récuprer les noms de toutes les tables dans la base de données 
  getData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/TablesAll');
  }

  //-SendData(data:any){
  //- return this.httpClient.post('http://127.0.0.1:8000/api/LayerData',data);
  //-}

  //récupérer la table choisie (renvoyé par l'api laravel )
  getDataLayr() {
    return this.httpClient.get('http://127.0.0.1:8000/api/LayerData')
  }

  //pour passer data de layer comp to info-layer comp

  setData(val: object) {
    this.Data = val;
  }

  getDatalayerTab() {
    return this.Data;
  }

  //Sharing Data Between Components Using RxJS ; i used this to pass data from layer to infolayer
  sendData(data: Object) {
    console.log("im sending data");
    this.dataSource.next(data);
  }

  // envoyer data du modal to the bachend ; cette méthode ne marche pas 
  /*
  insertProject(data:String) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addproject',data)
  }
  */

  //récuprer les noms de toutes les projets
  getProject() {
    return this.httpClient.get('http://127.0.0.1:8000/api/projects');
  }

  getPotreeData(){
    return this.httpClient.get('http://127.0.0.1:8000/api/GetPotreeData');
  }

  //récuprer les noms de toutes les bases de données
  getDataBase() {
    return this.httpClient.get('http://127.0.0.1:8000/api/DataBaseALL');
  }

  //envoyer les noms du couches de layers comp to carte comp pour afficher le projet 
  sendProject(data2: Object) {
    console.log("the service to  send data PROJECT");
    this.dataSource2.next(data2);
  }

  //envoyer les noms des couches et le nom du projet geoserver  de layers comp to carte comp pour afficher le projet 
  sendDataBaseProject(data3: Object) {
    this.dataSource3.next(data3);
  }


  //envoyer le le boolen du bouton pour affichier le comp du forom , de cart compt -> p-tiv comp
  showCompPtiv(data4: boolean) {
    console.log("the service to  send data chos hide comp");
    this.dataSource4.next(data4);
  }

  //envoyer la Geometry  du feature trouvé par id : layer comp -> cart compt 
  sendGeometryFeature(data5: Object) {
    console.log("the service to  send data PROJECT layer comp -> cart compt ");
    this.dataSource4.next(data5);
  }

  //send id_pas from login comp  to layer compt 

  sendIdPas(data6: Object) {
    console.log("the service to  send data user Login comp -> cart compt ");
    console.log(data6)
    this.dataSource6.next(data6);
    sessionStorage.setItem('dataUser', JSON.stringify(data6));

  }

  // envoie le projet choisi dans le modal vers le composant carte 
  sendProjetChoisi(data7: Object){
    console.log(data7)
    this.dataSource7.next(data7)
    //sessionStorage.setItem('dataUser', JSON.stringify(data7));
  }

  sendUsername(data8: string){
    console.log(data8)
    this.dataSource8.next(data8)
    sessionStorage.setItem('username', data8);
  }
  //store data 
  

}
