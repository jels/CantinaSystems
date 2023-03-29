import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cargar-datos',
  templateUrl: './cargar-datos.component.html',
  styleUrls: ['./cargar-datos.component.css']
})
export class CargarDatosComponent implements OnInit {

  almuerzos: any;

  usuarios: any;

  form: FormGroup;




  constructor(private fb: FormBuilder, private _almuerzos: AlmuerzosService, private _usuarios: UsuarioService) {
    this.form = this.fb.group({
      user_nombre: ['', Validators.required],
      nombre_almuerzo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._almuerzos.getAlmuerzos().subscribe(respuesta => {
      console.log(respuesta);
      this.almuerzos = respuesta;
    });
    this._usuarios.getUsersByApellido().subscribe(respuesta => {
      console.log(respuesta);
      this.usuarios = respuesta;
    });

  }

  recargar() {
    this.form.reset();
    location.reload();
  }






}
