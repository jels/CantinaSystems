import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API: string = 'http://localhost/cantinasystems/src/app/server/users.php/';

  constructor(private clientHttp: HttpClient) { }

  getAllUsers() {
    return this.clientHttp.get(this.API);
  }
  getUsersByApellido() {
    return this.clientHttp.get(this.API+"?ordenado");
  }

  agregarUsuario(usuario: Usuario): Observable<any> {
    return this.clientHttp.post(this.API + "?insertar=1", usuario);
  }

  darDeBajaUsuario(id: number, estado:number): Observable<any> {
    return this.clientHttp.post(this.API + "?baja="+id, estado);
  }

}
