import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmuerzosService {

  API: string = 'http://localhost/cantinasystems/src/app/server/almuerzos.php';

  constructor(private clientHttp: HttpClient) { }

  getAlmuerzos() {
    return this.clientHttp.get(this.API);
  }
}
