import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { DataService } from 'src/app/service/data.service';


interface GetProjectByIDResponse {
  layers: Couches[];
  info_db: InfoDb[];
}
interface Couches {
  couches: string;
  db_id: Number;
  id: Number;
  nom: String;
}

interface InfoDb {
  environnement: String;
  nom: String;
  sp: String;
  vrs: String;
}

@Component({
  selector: 'app-gestion',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})



export class AccueilComponent implements OnInit {
  dataUser: any;
  projets: any;
  couches: String[];
  info_db: InfoDb[];
  projetChoisi: any;
  username: any;
  nom_projet:any;

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {
    this.couches = [];
    this.info_db = [];
  }
  ngOnInit(): void {
    this.getProjets();
  }

  openAdmin(){
    this.router.navigate(['/Administration'])
  }
  getUsers() {
    this.http
      .get('http://127.0.0.1:8000/api/list-users')
      .subscribe((response: any) => {
        this.dataUser = response.users; // Assurez-vous que "dataUser" est déclarée dans votre composant pour stocker les données.
        console.log(this.dataUser);
      });
    // this.router.navigate(['/CarteComponent'])
  }

  openMap() {
    this.dataService.sendProjetChoisi(this.projetChoisi);
    sessionStorage.setItem('couche', JSON.stringify(this.couches))
    sessionStorage.setItem('nom_projet', this.nom_projet)
    this.router.navigate(['/CarteComponent']);
  }
  

  // Récupère tous les projets de la BDD
  getProjets() {
    this.http
      .get('http://127.0.0.1:8000/api/projects')
      .subscribe((response) => {
        console.log(response);
        this.projets = response;
      });
  }

  selectedProjectDisplay(event: Event) {
    try {
      const target = event.target as HTMLInputElement;
      const id = target.value;

      this.http
        .post('http://127.0.0.1:8000/api/getProjectByID?request=' + id, null)
        .subscribe((response: object) => {
          console.log(response);
          const data = response as GetProjectByIDResponse
          if (!data.info_db[0] || !data.layers[0])
            throw new Error("Erreur de récupération des données du projet " + id)
          this.couches = JSON.parse((data.layers)[0].couches);
          this.info_db = data.info_db;
          this.projetChoisi = data
          this.nom_projet = data.layers[0].nom
         
          console.log("projet = ", this.nom_projet, "info db =", this.info_db, "couches=", this.couches)
        });
    } catch (error) {
      console.log(error);
    }
  }
}
