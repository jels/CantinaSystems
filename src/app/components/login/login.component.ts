import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router) {

    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  ingresar() {
    console.log(this.form);
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    console.log(usuario, password);

    if (usuario == 'admin' && password == 'admin123') {
      this.fakeLoading();
      this.router.navigate(['dashboard']);

    } else if (usuario == 'jels' && password == '123') {
      this.fakeLoading();
      this.router.navigate(['comedor']);

    } else if (usuario == 'cocina' && password == '123') {
      this.fakeLoading();
      this.router.navigate(['cocina']);

    } else {
      this.error();
      this.form.reset();
    }
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
    }, 1500);
  }
}
