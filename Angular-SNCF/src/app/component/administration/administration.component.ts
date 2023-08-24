import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Workspace {
  name: string;
  editable: boolean;
  dataStores?: DataStore[];
  href: string;
}
interface Couches {
  info_db: InfoDb[]
  layers: Layers[]
}

interface Projet {
  couches: any;
  nom: any;
  db_id: number;
  id: number;
}
interface InfoDb {
  nom: string;
  sp: string;
  vrs: string;
  environnement: string;
}
interface Layers {
  id: number;
  db_id: number;
  couches: any;
  nom: string;
}
interface DataStore {
  name: string;
  href: string;
}
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

export class AdministrationComponent implements OnInit {
  workspaces: Workspace[];
  dataStores: any;
  nom: string;
  newNom: string;
  nom_entrepot: any;
  projets: any;
  projetsRecups: Projet[];
  selectedProjetCouches: string = '';


  constructor(private http: HttpClient) {
    this.nom = ''
    this.newNom = ''
    this.workspaces = [];
    // this.projets = []
    this.projetsRecups = []
  }

  ngOnInit(): void {
    this.getWorkspaces();
    this.getProjets();
    // this.getAllDatastores();
  }
  toggleEdit(workspace: Workspace) {
    workspace.editable = !workspace.editable;
  }
  // -------------------------- Espace Workspaces --------------------------
  /* Fonction pour récupérer les workspaces de GeoServer */

  async getWorkspaces(): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW46Z2Vvc2VydmVy');
    try {
      const response = await firstValueFrom(this.http.get<any>('http://localhost:8080/geoserver/rest/workspaces', { headers }));
      const workspacesData = response?.workspaces?.workspace || [];
      this.workspaces = workspacesData.map((workspace: any) => ({ name: workspace.name, editable: false }));
      for (const workspace of this.workspaces) {
        const dataResponse: any = await this.getDatastores(workspace.name);
        const dataStores: DataStore[] = dataResponse?.dataStores?.dataStore || [];
        workspace.dataStores = dataStores;
      }
      this.getProjets()
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }


  /* Fonction pour ajouter un workspace sur GeoServer */

  async addWorkspace() {
    const url = 'http://localhost:8080/geoserver/rest/workspaces';
    const workspaceName = this.nom;

    const data = `<workspace>
      <name>${workspaceName}</name>
    </workspace>`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Authorization': 'Basic YWRtaW46Z2Vvc2VydmVy'
    });
    try {
      await firstValueFrom(this.http.post(url, data, { headers }));
      console.log('Workspace added successfully.');
      this.getWorkspaces()
    } catch (error) {
      console.error('Failed to add workspace:', error);
    }
  }

  /* Fonction pour supprimer un workspace de GeoServer */

  async deleteWorkspace(workspaceName: string) {
    const dataStoreDelete = this.workspaces.find(workspace => workspace.name === workspaceName);
    if (dataStoreDelete?.dataStores && dataStoreDelete?.dataStores?.length > 0) {
      const deleteDataStorePromises = dataStoreDelete.dataStores.map(datastore =>
        this.deleteDataStore(dataStoreDelete.name, datastore.name)
      );
      await Promise.all(deleteDataStorePromises);
    }

    const url = `http://localhost:8080/geoserver/rest/workspaces/${workspaceName}`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW46Z2Vvc2VydmVy'
    });

    try {
      await firstValueFrom(this.http.delete(url, { headers }));
      console.log('Workspace deleted successfully.');

      // Mettre à jour les données des workspaces
      const projetsDelete = this.projetsRecups.filter(projet => projet.nom === workspaceName);

      if (projetsDelete.length > 0) {
        const deleteProjetPromises = projetsDelete.map(projet =>
          this.deleteProjet(projet.id)
        );
        await Promise.all(deleteProjetPromises);
        
      }
      this.getProjets();
      this.getWorkspaces();
    } catch (error) {
      console.error('Failed to delete workspace:', error);
    }
  }


  /* Fonction pour éditer un workspace de GeoServer, après modification du nom, appuyez sur entrée */

  async saveWorkspaceName(workspace: Workspace) {
    const url = `http://localhost:8080/geoserver/rest/workspaces/${workspace.name}`;
    const data = `<workspace>
      <name>${this.newNom}</name>
    </workspace>`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Authorization': 'Basic YWRtaW46Z2Vvc2VydmVy'
    });

    try {
      await firstValueFrom(this.http.put(url, data, { headers }));
      console.log('Workspace name updated successfully.');
      workspace.editable = false; // Désactiver le mode d'édition après la sauvegarde
      this.getWorkspaces()
    } catch (error) {
      console.error('Failed to update workspace name:', error);
    }
  }



  // --------------------------// --------------------------// --------------------------// --------------------------
  // -------------------------- Espace DataStores --------------------------
  // --------------------------// --------------------------// --------------------------// --------------------------




  async getDatastores(workspaceName: string): Promise<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW46Z2Vvc2VydmVy');
    try {
      const url = `http://localhost:8080/geoserver/rest/workspaces/${workspaceName}/datastores`;
      const response = await firstValueFrom(this.http.get<any[]>(url, { headers }));
      this.dataStores = response
      return response;
    } catch (error) {
      console.error('An error occurred:', error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }

  // Pas utilisé
  // async getAllDatastores(): Promise<void> {
  //   const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW46Z2Vvc2VydmVy');
  //   try {
  //     const response = await firstValueFrom(this.http.get<any[]>('http://localhost:8080/geoserver/rest/workspaces', { headers }));
  //     this.workspaces = response.map((workspace: any) => ({ name: workspace.name, href: workspace.href, editable: false }));
  //     for (const workspace of this.workspaces) {
  //       const dataResponse: any = await this.getDatastores(workspace.name);
  //       const dataStores: DataStore[] = dataResponse.dataStores.dataStore;
  //       workspace.dataStores = dataStores;
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // }

  async addDatastore(workspacename: string, datastorename: string) {
    const url = `http://localhost:8080/geoserver/rest/workspaces/${workspacename}/datastores`;

    const data = `<dataStore>
      <name>${datastorename}</name>
      <connectionParameters>
        <host>localhost</host>
        <port>5432</port>
        <database>DB</database>
        <user>postgres</user>
        <passwd>admin</passwd>
        <dbtype>postgis</dbtype>
      </connectionParameters>
    </dataStore>`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Authorization': 'Basic YWRtaW46Z2Vvc2VydmVy'
    });
    try {
      await firstValueFrom(this.http.post(url, data, { headers }));
      console.log('DataStore added successfully.');
      this.getWorkspaces()
    } catch (error) {
      console.error('Failed to add DataSpace:', error);
    }
  }

  async deleteDataStore(workspaceName: string, dataStoreName: string) {
    const url = `http://localhost:8080/geoserver/rest/workspaces/${workspaceName}/datastores/${dataStoreName}`;;
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW46Z2Vvc2VydmVy'
    });

    try {
      await firstValueFrom(this.http.delete(url, { headers }));
      console.log('DataStore deleted successfully.');

      // Mettre à jour les données des workspaces
      this.getWorkspaces();
    } catch (error) {
      console.error('Failed to delete DataStore:', error);
    }
  }
  // --------------------------// --------------------------// --------------------------// --------------------------
  // -------------------------- Espace Projets --------------------------
  // --------------------------// --------------------------// --------------------------// --------------------------
  //Récupère le projet choisi dans le modal  
  selectProjetCouches(selectedProjet: string) {
    const projet = this.projetsRecups.find(p => p.nom === selectedProjet);
    console.log(projet)
    if (projet) {
      this.selectedProjetCouches = JSON.parse(projet.couches);
    } else {
      this.selectedProjetCouches = ''
    }
  }
  //récupère tous les projets
  async getProjets() : Promise<void> {
    this.http
      .get('http://127.0.0.1:8000/api/projects')
      .subscribe((response) => {
        this.projets = response as Couches[];
        for (let i = 0; i < this.projets.length; i++) {
          // Parser la chaîne JSON de la propriété "couches" en un tableau d'éléments

          // Ajouter les couches du projet au tableau couches du projet
          this.projetsRecups[i] = this.projets[i]

        }
      });
  }


  addProjet(nom: string, selectedOptions: HTMLCollectionOf<HTMLOptionElement>, db_id: string) {
    const selectedCouches: string[] = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      selectedCouches.push(selectedOptions[i].value);
    }


    const payload = {
      'namedatabase': db_id,
      'couches': selectedCouches,
      'nom': nom
    }
    const payloadGo = JSON.stringify(payload)
    this.http.post('http://127.0.0.1:8000/api/addDBproject', payloadGo).subscribe(
      () => {
        // Réussite
        this.getProjets()

      },
      (error) => {
        console.error('Erreur lors de l\'ajout du projet :', error);
      }
    );

  }

  async deleteProjet(id: number) {
    console.log(id)
    this.http.delete(`http://127.0.0.1:8000/api/removeProject/${id}`).subscribe(
      () => {
        console.log('Projet supprimé avec succès.');
       
        // Effectuez les actions nécessaires après la suppression du projet.
      },
      error => {
        console.error('Une erreur s\'est produite lors de la suppression du projet :', error);
        // Gérez l'erreur de suppression ici.
      }
      
    );
    this.getProjets()

  }
}
