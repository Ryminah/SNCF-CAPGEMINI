import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username: any;
  isHomePage: boolean = false;

  constructor(private router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/Accueil';
      }
    });
  }

  ngOnInit(): void {
    this.recupererUsername()
  }
  recupererUsername() {
    // Exemple de récupération via dataService, dans data.service.ts
    // this.dataService.data6.subscribe(response => {
    //   this.username = response
    // })
    this.username = sessionStorage.getItem('username')
  }
  changerProjet(){
    sessionStorage.removeItem('couche')
    sessionStorage.removeItem('nom_projet')
    this.router.navigate(['/Accueil'])
  }
  logout() {
    sessionStorage.clear()
    this.router.navigate(['/']);
  }
}
