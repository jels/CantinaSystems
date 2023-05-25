import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bajaUser, Usuario } from '../interfaces/usuario';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  idUserGlobal: number = 0;

  API: string = environment.apiURL + '/users.php/';

  constructor(private clientHttp: HttpClient) {}

  getAllUsers() {
    return this.clientHttp.get(this.API + '?getAllUsers');
  }

  getExistUser(userName: string, password: string): Observable<any[]> {
    return this.clientHttp.get<[]>(
      this.API +
        '?existeUser=' +
        1 +
        '&userName=' +
        userName +
        '&password=' +
        password
    );
  }

  getDatosUser(idUser: number) {
    return this.clientHttp.get(this.API + '?datosUser=' + idUser);
  }

  getUsersByApellido() {
    return this.clientHttp.get(this.API + '?ordenado');
  }

  agregarUsuario(usuario: Usuario): Observable<any> {
    return this.clientHttp.post(this.API + '?insertar=1', usuario);
  }

  darDeBajaUsuario(bajauser: bajaUser): Observable<any> {
    return this.clientHttp.post(this.API + '?baja=1', bajauser);
  }
}
