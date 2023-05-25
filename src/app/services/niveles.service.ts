import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NivelesService {
  API: string = environment.apiURL + '/niveles.php';

  constructor(private clientHttp: HttpClient) {}

  getNiveles() {
    return this.clientHttp.get(this.API);
  }
}
