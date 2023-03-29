import { Injectable } from '@angular/core';
import { Historial } from '../interfaces/historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  listHistorial: Historial[] = [
    {anho: "2022", mes: 'Diciembre', total: '250.000'},
    {anho: "2023", mes: 'Enero', total: '250.000'},
    {anho: "2023", mes: 'Febrero', total: '250.000'},
    {anho: "2023", mes: 'Marzo', total: '250.000'},
    {anho: "2023", mes: 'Abril', total: '250.000'},
    
  ];

  constructor() { }

  getHistorial(){
    return this.listHistorial.slice();
  }
}

