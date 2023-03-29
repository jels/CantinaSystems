import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  API: string='http://localhost/cantinasystems/src/app/server/entidades.php';

  constructor( private clientHttp: HttpClient ) { }

  getEntidades(){
    return this.clientHttp.get(this.API);
  }
}
