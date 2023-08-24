import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarteComponent } from './carte/carte.component';
import { InfoLayerComponent } from './component/info-layer/info-layer.component';
import { LayersComponent } from './component/layers/layers.component';
import { PtivComponent } from './component/ptiv/ptiv.component';
import { IndexComponent } from './component/index/index.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { LoginComponent } from './component/login/login.component';
import { LayerAttributComponent } from './component/layer-attribut/layer-attribut.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { ErrorpageComponent } from './component/errorpage/errorpage.component';
import { AuthGuard } from './auth/auth.guard';




const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'LayersComponent', component: LayersComponent, canActivate: [AuthGuard] },
  { path: 'CarteComponent', component: CarteComponent, canActivate: [AuthGuard] },
  { path: 'InfoLayerComponent', component: InfoLayerComponent, canActivate: [AuthGuard] },
  { path: 'ptiv', component: PtivComponent, canActivate: [AuthGuard] },
  { path: 'NavBarComponent', component: NavBarComponent, canActivate: [AuthGuard] },
  { path: 'LayerAttributComponent', component: LayerAttributComponent, canActivate: [AuthGuard] },
  { path: 'Accueil', component: AccueilComponent, canActivate: [AuthGuard]},
  { path: 'Administration', component: AdministrationComponent, canActivate: [AuthGuard] },
  { path: 'LoginComponent', component: LoginComponent },
  { path: '**', component:ErrorpageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
