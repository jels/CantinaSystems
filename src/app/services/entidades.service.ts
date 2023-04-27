import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntidadesService {
  API: string = environment.apiURL + '/server/entidades.php';

  constructor(private clientHttp: HttpClient) {}

  getEntidades() {
    return this.clientHttp.get(this.API);
  }
}
