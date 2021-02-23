import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomecliPageRoutingModule } from './homecli-routing.module';

import { HomecliPage } from './homecli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomecliPageRoutingModule
  ],
  declarations: [HomecliPage]
})
export class HomecliPageModule {}
