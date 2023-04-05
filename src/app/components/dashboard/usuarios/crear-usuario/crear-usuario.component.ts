import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EntidadesService } from 'src/app/services/entidades.service';
import { NivelesService } from 'src/app/services/niveles.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  entidades: any;

  niveles: any;

  roles: any[] = [
    { nombreRol: 'SuperAdmin' },
    { nombreRol: 'admin' },
    { nombreRol: 'user' },
    { nombreRol: 'cocina' }
  ]

  secciones: any[] = [
    { nombreSeccion: 'A' },
    { nombreSeccion: 'B' },
    { nombreSeccion: ' ' }
  ]

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _niveles: NivelesService,
    private _entidades: EntidadesService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      user_name: ['', Validators.required],
      user_pass: ['', Validators.required],
      user_rol: ['', Validators.required],
      user_nombre: ['', Validators.required],
      user_apellido: ['', Validators.required],
      seccion_user: ['', Validators.required],
      idEntidad: ['', Validators.required],
      idNivel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._entidades.getEntidades().subscribe(respuesta => {
      console.log(respuesta);
      this.entidades = respuesta;
    });
    this._niveles.getNiveles().subscribe(respuesta => {
      console.log(respuesta);
      this.niveles = respuesta;
    });
  }

  agregarUsuario() {
    console.log(this.form);
    console.log(this.form.value);
    this._usuarioService.agregarUsuario(this.form.value).subscribe();
    this._snackBar.open('El usuario fue creado correctamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    this.router.navigate(['/dashboard/usuarios']);
  }

}
