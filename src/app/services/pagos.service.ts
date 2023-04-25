import { Injectable } from '@angular/core';
import { NuevoPago, Pagos } from '../interfaces/pagos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  API: string = 'http://localhost/cantinasystems/src/app/server/pagos.php';

  URL = 'http://localhost/cantinasystems/src/app/server/assets/';

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

  uploadFile(archivo: any) {
    return this.http.post(
      `${this.URL}subirArchivo.php`,
      JSON.stringify(archivo)
    );
  }

  getAllPagos() {
    return this.http.get(this.API + '?consultarPagos');
  }

  getPagosUsr(idUsr: number) {
    return this.http.get(this.API + '?pagosXuser=' + idUsr);
  }

  setNewPago(pago: NuevoPago): Observable<any> {
    return this.http.post(this.API + '?nuevoPago', pago);
  }

  getDeudaUser(idUser: number) {
    return this.http.get(this.API + '?deudaTotalUsr=' + idUser);
  }

  getPagosUser(idUser: number) {
    return this.http.get(this.API + '?pagosTotalesUser=' + idUser);
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
