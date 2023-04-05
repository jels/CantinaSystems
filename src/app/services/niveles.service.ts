import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NivelesService {
  
  API: string='http://localhost/cantinasystems/src/app/server/niveles.php';

  constructor( private clientHttp: HttpClient ) { }

  getNiveles(){
    return this.clientHttp.get(this.API);
  }
}
