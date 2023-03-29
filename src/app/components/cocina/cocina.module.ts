import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CocinaRoutingModule } from './cocina-routing.module';
import { CocinaComponent } from './cocina.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    CocinaComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CocinaRoutingModule,
    SharedModule
  ]
})
export class CocinaModule { }
