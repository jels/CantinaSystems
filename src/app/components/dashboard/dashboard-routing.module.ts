import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmuerzosComponent } from './almuerzos/almuerzos.component';
import { NewAlmuerzoComponent } from './almuerzos/new-almuerzo/new-almuerzo.component';
import { CargarDatosComponent } from './cargar-datos/cargar-datos.component';
import { DashboardComponent } from './dashboard.component';
import { HorariosComponent } from './horarios/horarios.component';
import { NuevoMenudiarioComponent } from './horarios/nuevo-menudiario/nuevo-menudiario.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuMensualComponent } from './menu-mensual/menu-mensual.component';
import { PagosComponent } from './pagos/pagos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VerDatosComponent } from './usuarios/ver-datos/ver-datos.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: '', component: InicioComponent
      },
      {
        path: 'usuarios', component: UsuariosComponent
      },
      {
        path: 'reportes', component: ReportesComponent
      },
      {
        path: 'pagos', component: PagosComponent
      },
      {
        path: 'horarios', component: HorariosComponent
      },
      {
        path: 'crear-usuario', component: CrearUsuarioComponent
      },
      {
        path: 'editar-usuario', component: EditarUsuarioComponent
      },
      {
        path: 'ver-datos', component: VerDatosComponent
      },
      {
        path: 'nuevo-menudiario', component: NuevoMenudiarioComponent
      },
      {
        path: 'cargar-datos', component: CargarDatosComponent
      },
      {
        path: 'almuerzos', component: AlmuerzosComponent
      },
      {
        path: 'almuerzos/new-almuerzo', component: NewAlmuerzoComponent
      },
      {
        path: 'menu', component: MenuMensualComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
