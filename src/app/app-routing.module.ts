import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', loadChildren: ()=> import('./components/dashboard/dashboard.module').then( x => x.DashboardModule ) },
  { path: 'comedor', loadChildren: ()=> import('./components/comedor/comedor.module').then( x => x.ComedorModule ) },
  { path: 'cocina', loadChildren: ()=> import('./components/cocina/cocina.module').then( x => x.CocinaModule ) },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
