import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocinaComponent } from './cocina.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: CocinaComponent, children:[
      {
        path: '', component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocinaRoutingModule { }
