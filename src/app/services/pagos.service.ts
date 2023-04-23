import { Injectable } from '@angular/core';
import { NuevoPago, Pagos } from '../interfaces/pagos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  API: string = 'http://localhost/cantinasystems/src/app/server/subirPago.php';

  listPagos: Pagos[] = [
    {
      anho: '2022',
      mes: 'Diciembre',
      dia: '30',
      monto: '250.000',
      foto: './assets/img/majoyyo.jpg',
    },
    {
      anho: '2023',
      mes: 'Enero',
      dia: '30',
      monto: '250.000',
      foto: './assets/img/majoyyo.jpg',
    },
    {
      anho: '2023',
      mes: 'Febrero',
      dia: '28',
      monto: '250.000',
      foto: './assets/img/majoyyo.jpg',
    },
    {
      anho: '2023',
      mes: 'Marzo',
      dia: '30',
      monto: '250.000',
      foto: './assets/img/majoyyo.jpg',
    },
    {
      anho: '2023',
      mes: 'Abril',
      dia: '30',
      monto: '250.000',
      foto: './assets/img/majoyyo.jpg',
    },
  ];

  constructor(private http: HttpClient) {}

  getPagos() {
    return this.listPagos.slice();
  }

  setNewPago(pago: NuevoPago): Observable<any> {
    return this.http.post(this.API + '?nuevoPago', pago);
  }

  //subirImagen(datos: any): Observable<any> {
  //  return this.http.post(this.URL, datos);
  //}
  //
  //uploadFile(archivo: any) {
  //  return this.http.post(
  //    `${this.URL}subirArchivo.php`,
  //    JSON.stringify(archivo)
  //  );
  //}
}
