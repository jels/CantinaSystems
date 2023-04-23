import { Injectable } from '@angular/core';
import { Historial } from '../interfaces/historial';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  listHistorial: Historial[] = [
    { anho: '2022', mes: 'Diciembre', almuerzos: '272.000', pagos: '250.000' },
    { anho: '2023', mes: 'Enero', almuerzos: '272.000', pagos: '250.000' },
    { anho: '2023', mes: 'Febrero', almuerzos: '272.000', pagos: '250.000' },
    { anho: '2023', mes: 'Marzo', almuerzos: '272.000', pagos: '250.000' },
    { anho: '2023', mes: 'Abril', almuerzos: '272.000', pagos: '250.000' },
  ];

  constructor() {}

  getHistorial() {
    return this.listHistorial.slice();
  }
}
