import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlmuerzoMensual } from '../interfaces/almuerzos';

@Injectable({
  providedIn: 'root'
})
export class AlmuerzosService {

  API: string = 'http://localhost/cantinasystems/src/app/server/almuerzos.php';

  constructor(private clientHttp: HttpClient) { }

  newAlmuerzo(newPlato: any): Observable<any> {
    return this.clientHttp.post(this.API + "?insertarAlmuerzo=1", newPlato);
  }

  existeAlmuerzoMensualUsr(id: number, fecha: string) {
    return this.clientHttp.get(this.API + "?existeAlmuerzoDiarioUser=" + id + "&fecha=" + fecha);
  }

  newAlmuerzosPorAlumno(newAlmuerzoAlmuno: any): Observable<any> {
    return this.clientHttp.post(this.API + "?insertarAlmuerzosDiarios=1", newAlmuerzoAlmuno);
  }

  newMenuMensual(newAlmuerzoMensual: AlmuerzoMensual): Observable<any> {
    return this.clientHttp.post(this.API + "?insertarMenuMensual=1", newAlmuerzoMensual);
  }

  //newAlmuerzos(newAlmuerzo: any): Observable<any> {
  //  return this.clientHttp.post(this.API + "?insertarAlmuerzosDiarios=1", newAlmuerzo);
  //}

  getAllAlmuersosUser(id: number, mes: number) {
    return this.clientHttp.get(this.API + "?almuerzosUserMensual=" + id + "&mes=" + mes);
  }

  getAlmuerzos() {
    return this.clientHttp.get(this.API+"?default");
  }
  getCantidadMenusDiario(fecha: string){
    return this.clientHttp.get(this.API + "?contarAlmuerzosDiariosMenu=" + fecha);
  }

  getAlmuerzosDia(fecha: string) {
    return this.clientHttp.get(this.API + "?almuerzosDiarios='" + fecha + "'")
  }

  getAlmuerzosMes(mes: number) {
    return this.clientHttp.get(this.API + "?almuerzosMensuales=" + mes);
  }

  getAllAlmuerzos() {
    return this.clientHttp.get(this.API + "?listAlmuerzos");
  }

  eliminarAlmuerzoUsr(id: number) {
    return this.clientHttp.get(this.API + "?eliminarAlmuerzoMensualUsr=" + id);

  }
}
