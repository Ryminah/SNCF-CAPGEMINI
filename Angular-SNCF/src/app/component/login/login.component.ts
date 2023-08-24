import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataUser: any; value_login_w: any; IdPas: any;
  TableDataUser: any[] = [];
  KeysTableUser: any;
  nom_shema: any;
  nom_shema_user: any;

  constructor(private http: HttpClient, private router: Router,private dataService: DataService) { }

  ngOnInit(): void {
    this.getDataProducteur();
  }

  // récuperer data user ; nom , prenom , login
  getDataProducteur() {
    this.http
      .post('http://127.0.0.1:8000/api/getDataProducteur', null)
      .subscribe((response: object) => {
        console.log(response);
        this.dataUser = response
      })
  }

  // réuperer user choisie
  OnchangeUser() {
    console.log('OnchangeUser')
    let value_login_w = (<HTMLSelectElement>document.getElementById('dataUseLogin_wr')).value;
    console.log(value_login_w)

    this.http
      .post('http://127.0.0.1:8000/api/getIdPas?request=' + value_login_w, null)
      .subscribe((response: object) => {
        console.log(response);
        this.IdPas = response;

        if (this.IdPas[0]) {
          this.KeysTableUser = Object.keys(this.IdPas[0]);
        }
        for (let i = 0; i < this.IdPas.length; i++){
          this.TableDataUser[i] = Object.values(this.IdPas[i]);
      }

      if (this.IdPas.length == 0) {
        window.alert('Aucun pas pour cet utilisateur ! ');
      } else {
            console.log('Empty response');
          }
      })

  }


  OnchangeId_pas(){
    console.log('OnchangeUser')
    let value_id_pas = (<HTMLSelectElement>document.getElementById('select_id_pas')).value;
    console.log(value_id_pas)
    this.http
    .post('http://127.0.0.1:8000/api/getNom_schema_byIdPas?request=' + value_id_pas, null)
    .subscribe((response: object) => {
      console.log(response);
      this.nom_shema=response;
      this.nom_shema_user=this.nom_shema[0].nom_schema;
      console.log( this.nom_shema_user);
    })
  }

  authenticate() {
    console.log('authenticate')
    let value_login_w = (<HTMLSelectElement>document.getElementById('select_id_pas')).value;
    console.log(value_login_w)

    var output = {
      id_pas: value_login_w ,
      nom_schema: this.nom_shema_user ,
    }

    this.dataService.sendIdPas(output);

    setTimeout(() => {
       this.router.navigate(['/CarteComponent']);
    },1000)
    //this.router.navigate(['/CarteComponent']);
  }

}
