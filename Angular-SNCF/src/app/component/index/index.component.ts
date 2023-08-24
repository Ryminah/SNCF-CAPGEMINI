import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';


interface AuthResponse {
  success: string;
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  password: any;
  username: any;
  IdPas: any;
  TableDataUser: any[] = [];
  KeysTableUser: any;
  nom_shema: any;
  nom_shema_user: any;
  constructor(private http: HttpClient, private router: Router,  private dataService: DataService) {
    }

  ngOnInit(): void {

  }

  authenticate(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const data = { username: this.username, password: this.password };
      this.http
        .post<AuthResponse>('http://127.0.0.1:8000/api/authenticate', data, { headers: headers })
        .subscribe((response) => {
          if(response.success === 'true'){
            this.dataService.sendUsername(this.username);
            this.router.navigate(['/Accueil'])
          }
          else{
            console.log(response);
            window.alert("Nom de compte ou mot de passe incorrect")
              }
  })
  }
}
