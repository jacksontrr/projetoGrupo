import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomecliPage } from './homecli.page';

const routes: Routes = [
  {
    path: '',
    component: HomecliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomecliPageRoutingModule {}
