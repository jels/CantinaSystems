import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './reportes/reportes.component';
import { HorariosComponent } from './horarios/horarios.component';
import { PagosComponent } from './pagos/pagos.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { NuevoMenudiarioComponent } from './horarios/nuevo-menudiario/nuevo-menudiario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { VerDatosComponent } from './usuarios/ver-datos/ver-datos.component';
import { CargarDatosComponent } from './cargar-datos/cargar-datos.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    UsuariosComponent,
    ReportesComponent,
    HorariosComponent,
    PagosComponent,
    CrearUsuarioComponent,
    NuevoMenudiarioComponent,
    EditarUsuarioComponent,
    VerDatosComponent,
    CargarDatosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
