import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlmuerzoMensual, NuevoMenu } from '../interfaces/almuerzos';

@Injectable({
  providedIn: 'root',
})
export class AlmuerzosService {
  API: string = 'http://localhost/cantinasystems/src/app/server/almuerzos.php';

  constructor(private clientHttp: HttpClient) {}

  newMenu(newPlato: NuevoMenu): Observable<any> {
    console.log(newPlato);
    return this.clientHttp.post(this.API + '?insertarMenuNuevo=1', newPlato);
  }

  existeAlmuerzoMensualUsr(id: number, fecha: string) {
    return this.clientHttp.get(
      this.API + '?existeAlmuerzoDiarioUser=' + id + '&fecha=' + fecha
    );
  }

  newAlmuerzosPorAlumno(newAlmuerzoAlmuno: any): Observable<any> {
    return this.clientHttp.post(
      this.API + '?insertarAlmuerzosDiarios=1',
      newAlmuerzoAlmuno
    );
  }

  newMenuMensual(newAlmuerzoMensual: AlmuerzoMensual): Observable<any> {
    return this.clientHttp.post(
      this.API + '?insertarMenuMensual=1',
      newAlmuerzoMensual
    );
  }

  contarCantidadAlmuerzoUserMes(id: number, mes: number, anho: number) {
    return this.clientHttp.get(
      this.API +
        '?contarCantidadAlmuerzosUserMes=' +
        id +
        '&mes=' +
        mes +
        '&anho=' +
        anho
    );
  }

  getAllAlmuersosUser(id: number, mes: number) {
    return this.clientHttp.get(
      this.API + '?almuerzosUserMensual=' + id + '&mes=' + mes
    );
  }

  getAlmuerzos() {
    return this.clientHttp.get(this.API + '?default');
  }

  getCantidadMenusDiario(fecha: string) {
    return this.clientHttp.get(
      this.API + '?contarAlmuerzosDiariosMenu=' + fecha
    );
  }

  getAlmuerzosDia(fecha: string) {
    return this.clientHttp.get(this.API + "?almuerzosDiarios='" + fecha + "'");
  }

  getAlmuerzosMes(mes: number) {
    return this.clientHttp.get(this.API + '?almuerzosMensuales=' + mes);
  }

  getCantAlmuerzosMes(mes: number, anho: number) {
    return this.clientHttp.get(
      this.API + '?listAlmuerzosCount=' + mes + '&anho=' + anho
    );
  }

  getCantAlmuerzosDia(fecha: string) {
    return this.clientHttp.get(this.API + '?listAlmuerzosDiaCount=' + fecha);
  }

  getAllAlmuerzos() {
    return this.clientHttp.get(this.API + '?listAlmuerzos');
  }

  eliminarAlmuerzoUsr(id: number) {
    return this.clientHttp.get(this.API + '?eliminarAlmuerzoMensualUsr=' + id);
  }

  eliminarMenuMensual(id: number) {
    return this.clientHttp.get(this.API + '?eliminarMenuMensual=' + id);
  }

  listarAlmuerzosDiariosCocina(fecha: string) {
    return this.clientHttp.get(this.API + '?listaDeAlmuerzosPorDia=' + fecha);
  }

  entregarAlmuerzoEstudiante(id: number) {
    return this.clientHttp.get(this.API + '?entregarAlmuerzo=' + id);
  }

  getCantidadPendientesDiario(fecha: string) {
    return this.clientHttp.get(this.API + '?contarPendientesEntregar=' + fecha);
  }
}
