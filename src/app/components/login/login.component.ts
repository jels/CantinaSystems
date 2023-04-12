import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _userService: UsuarioService) {

    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  ingresar() {
    console.log(localStorage.getItem('rol'));
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    this._userService.getExistUser(usuario, password).subscribe((respuesta: any[]) => {
      console.log(respuesta[0]);
      localStorage.setItem('idU', respuesta[0].id_users);
      localStorage.setItem('rol', respuesta[0].user_rol);
      localStorage.setItem('foto', respuesta[0].user_foto);
      localStorage.setItem('nombreC', (respuesta[0].user_nombre) + ", " + (respuesta[0].user_apellido));
      if (localStorage.getItem('rol') == 'admin') {
        console.log(localStorage.getItem('rol'));
        this.fakeLoading();
        this.router.navigate(['dashboard']);

      } else {
        this.error();
        this.form.reset();
      }
    });


    //else if (usuario == 'jels' && password == '123') {
    //  this.fakeLoading();
    //  this.router.navigate(['comedor']);
    //
    //} else if (usuario == 'cocina' && password == '123') {
    //  this.fakeLoading();
    //  this.router.navigate(['cocina']);

    //} 


  }

  error() {
    this._snackBar.open('usuario o contraseña ingresado son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }
}
