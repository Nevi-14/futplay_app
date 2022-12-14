import {  LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';

import {NgCalendarModule} from 'ionic2-calendar'

import localeDe from '@angular/common/locales/es';

import { MapaComponent } from './mapa/mapa.component';

import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

registerLocaleData(localeDe);
@NgModule({
  declarations: [
    HeaderComponent,
    MapaComponent


 
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NgCalendarModule,

  ],
  exports:[
  HeaderComponent,
  MapaComponent

  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}]
  
})


export class ComponentsModule { }