import { Injectable } from '@angular/core';
import { Pagos } from '../interfaces/pagos';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  
  listPagos: Pagos[] = [
    {anho: '2022', mes: 'Diciembre', dia: '30', monto: '250.000', foto: './assets/img/majoyyo.jpg'},
    {anho: '2023', mes: 'Enero', dia: '30', monto: '250.000', foto: './assets/img/majoyyo.jpg'},
    {anho: '2023', mes: 'Febrero', dia: '28', monto: '250.000', foto: './assets/img/majoyyo.jpg'},
    {anho: '2023', mes: 'Marzo', dia: '30', monto: '250.000', foto: './assets/img/majoyyo.jpg'},
    {anho: '2023', mes: 'Abril', dia: '30', monto: '250.000', foto: './assets/img/majoyyo.jpg'}
  ];
  constructor() { }

  getPagos(){
    return this.listPagos.slice();
  }
}
