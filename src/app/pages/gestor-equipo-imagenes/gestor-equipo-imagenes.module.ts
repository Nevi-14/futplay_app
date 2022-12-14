import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestorEquipoImagenesPageRoutingModule } from './gestor-equipo-imagenes-routing.module';

import { GestorEquipoImagenesPage } from './gestor-equipo-imagenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestorEquipoImagenesPageRoutingModule
  ],
  declarations: [GestorEquipoImagenesPage]
})
export class GestorEquipoImagenesPageModule {}
