import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  {path: 'cadastrar', loadChildren: () => import('./pages/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)},  {
    path: 'homecli',
    loadChildren: () => import('./pages/homecli/homecli.module').then( m => m.HomecliPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
