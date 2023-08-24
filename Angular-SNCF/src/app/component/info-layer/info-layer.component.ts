import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-info-layer',
  templateUrl: './info-layer.component.html',
  styleUrls: ['./info-layer.component.css']
})

export class InfoLayerComponent implements OnInit {
  isButtonVisible ='false';
  param: any;
  TableLayer: any;
  KeysTableLayer:any;

  TableLayer2: any[] = [];

  constructor(private dataService: DataService, private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getTableLayr();
  }

  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
  //récupérer la table choisie (renvoyé par l'api laravel )

  getTableLayr() {

    /*
     this.dataService.getDataLayr().subscribe(res => {
      console.log("i'm working");
     // console.log(res);
      //ici on a passé à la variable layers la reponce  res qui contient le tabelau de la couche choisie 
      this.Table=res;
      console.log(this.Table);
      //console.log(Object.keys(this.Table));
    })
  */

    /* méthode 1 : working
    
    this.route.queryParams.subscribe((paramss: any) => {
      console.log('info layer ');
      this.param=paramss;
      console.log(this.param);
      
    })
    */

    /*  méthode 2 : sharing data by service not working
    console.log("done");
    console.log(this.dataService.getDatalayerTab());
    
    */

    //méthode 3 ------ Working
    //Sharing Data Between Components Using RxJS 

    /*
    this.dataService.data.subscribe(response => {
      console.log("i'm here 1");
      console.log(response);
      this.isButtonVisible=JSON.stringify(response);
      console.log(this.isButtonVisible);
    });
*/
    this.dataService.data.subscribe(response => {
      console.log("i'm here");
      console.log(response);
      this.TableLayer = response;
      //je recupere keys du tableau
      this.KeysTableLayer=Object.keys(this.TableLayer[0]);
       //console.log(this.KeysTableLayer);
      console.log(Array.from(this.TableLayer));  // you will receive the data from sender component here.
      
      /*      for (let i = 0; i <2 ; i++) {
        console.log(`key:value`);
        console.log(this.TableLayer[i]);
        this.arrray.push(this.TableLayer[i]);
      }
      console.log('array final')
      console.log(this.arrray)
     */
      
      for (let i = 0; i < this.TableLayer.length; i++){
          this.TableLayer2[i] = Object.values(this.TableLayer[i]);
      }

  
    });
  }

}
