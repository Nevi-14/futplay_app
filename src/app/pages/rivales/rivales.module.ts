import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RivalesPageRoutingModule } from './rivales-routing.module';

import { RivalesPage } from './rivales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RivalesPageRoutingModule
  ],
  declarations: [RivalesPage]
})
export class RivalesPageModule {}
