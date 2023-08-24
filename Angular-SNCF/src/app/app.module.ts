import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
// ce module qui va nous permette de se connecter à nos API distant
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarteComponent } from './carte/carte.component';
import { LayersComponent } from './component/layers/layers.component';
import { FormsModule, ReactiveFormsModule , Validators } from '@angular/forms';
import { InfoLayerComponent } from './component/info-layer/info-layer.component';
import { ModalModule } from 'ng-modal-lib';
import { PtivComponent } from './component/ptiv/ptiv.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './component/index/index.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { LoginComponent } from './component/login/login.component';
import { LayerAttributComponent } from './component/layer-attribut/layer-attribut.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { ErrorpageComponent } from './component/errorpage/errorpage.component';



// we create a variable
const appRoutes: Routes =[{
path:'', component:LayersComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    CarteComponent,
    LayersComponent,
    AccueilComponent,
    IndexComponent,
    InfoLayerComponent,
    PtivComponent,
    IndexComponent,
    NavBarComponent,
    LoginComponent,
    LayerAttributComponent,
    AdministrationComponent,
    ErrorpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    BrowserAnimationsModule,
    ModalModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }
