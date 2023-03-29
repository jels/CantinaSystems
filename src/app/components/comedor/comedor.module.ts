import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ComedorRoutingModule } from './comedor-routing.module';
import { ComedorComponent } from './comedor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { PagosComponent } from './pagos/pagos.component';
import { AlmuerzosComponent } from './almuerzos/almuerzos.component';
import { UserComponent } from './user/user.component';
import { HistorialComponent } from './historial/historial.component';


@NgModule({
  declarations: [
    ComedorComponent,
    NavbarComponent,
    InicioComponent,
    PagosComponent,
    AlmuerzosComponent,
    UserComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    ComedorRoutingModule,
    SharedModule
  ]
})
export class ComedorModule { }
