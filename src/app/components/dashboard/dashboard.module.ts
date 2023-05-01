import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './reportes/reportes.component';
import { PagosComponent } from './pagos/pagos.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { VerDatosComponent } from './usuarios/ver-datos/ver-datos.component';
import { CargarDatosComponent } from './cargar-datos/cargar-datos.component';
import { AlmuerzosComponent } from './almuerzos/almuerzos.component';
import { NewAlmuerzoComponent } from './almuerzos/new-almuerzo/new-almuerzo.component';
import { MenuMensualComponent } from './menu-mensual/menu-mensual.component';
import { VerDiarioComponent } from './reportes/ver-diario/ver-diario.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    UsuariosComponent,
    ReportesComponent,
    PagosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    VerDatosComponent,
    CargarDatosComponent,
    AlmuerzosComponent,
    NewAlmuerzoComponent,
    MenuMensualComponent,
    VerDiarioComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
