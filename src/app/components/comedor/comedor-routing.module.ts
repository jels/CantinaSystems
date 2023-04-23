import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmuerzosComponent } from './almuerzos/almuerzos.component';
import { ComedorComponent } from './comedor.component';
import { HistorialComponent } from './historial/historial.component';
import { InicioComponent } from './inicio/inicio.component';
import { PagosComponent } from './pagos/pagos.component';
import { UserComponent } from './user/user.component';
import { NewPagoComponent } from './pagos/new-pago/new-pago.component';

const routes: Routes = [
  {
    path: '',
    component: ComedorComponent,
    children: [
      {
        path: '',
        component: InicioComponent,
      },
      {
        path: 'pagos',
        component: PagosComponent,
      },
      {
        path: 'almuerzos',
        component: AlmuerzosComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'historial',
        component: HistorialComponent,
      },
      {
        path: 'pagos/new',
        component: NewPagoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComedorRoutingModule {}
