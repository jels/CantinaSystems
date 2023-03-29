import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ListUsuario } from 'src/app/interfaces/listUsers';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nuevo-menudiario',
  templateUrl: './nuevo-menudiario.component.html',
  styleUrls: ['./nuevo-menudiario.component.css']
})
export class NuevoMenudiarioComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  //dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  // Only highligh dates inside the month view.
  //const mes = new Date().getMonth()+1;
  //console.log(mes);
  // if (view === 'month' || mes === 3 ) {
  // const date = cellDate.getDate();

  // Highlight the 1st and 20th day of each month.
  //return date === 10 || date === 20 || date === 6 || date === 7 ? 'example-custom-date-class' : '';
  //}

  // return '';
  // };

  colegios: any[] = [
    { idColegio: '1', nombreColegio: 'CADA' },
    { idColegio: '2', nombreColegio: 'CERVANTES' },
    { idColegio: '3', nombreColegio: 'VARIOS' }
  ]

  grados: any[] = [
    { idGrado: '1', nombreGrado: 'Pre-Jardin' },
    { idGrado: '2', nombreGrado: 'Jardin' },
    { idGrado: '3', nombreGrado: 'Pre-Escolar' },
    { idGrado: '4', nombreGrado: '1er Grado' },
    { idGrado: '5', nombreGrado: '2do Grado' },
    { idGrado: '6', nombreGrado: '3er Grado' },
    { idGrado: '7', nombreGrado: '4to Grado' },
    { idGrado: '8', nombreGrado: '5to Grado' },
    { idGrado: '9', nombreGrado: '6to Grado' },
  ]


  form: FormGroup;

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService, private router: Router, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      colegio: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  //  agregarUsuario(){
  //    console.log(this.form);
  //    console.log(this.form.value.fecha);

  //    const user: ListUsuario = {
  //      idUser: this.form.value.iduser,
  //      userName: this.form.value.userName,
  //      nombre: this.form.value.nombre,
  //      apellido: this.form.value.apellido,
  //      colegio: this.form.value.colegio,
  //      grado: this.form.value.grado,
  //      nivel: "",
  //      estado: "activo"
  //    }
  //    console.log(user);
  //    this._usuarioService.agregarUsuario(user);
  //    this.router.navigate(['/dashboard/horarios']);
  //    this._snackBar.open('El usuario fue creado correctamente', '', {
  //      duration: 5000,
  //      horizontalPosition: 'center',
  //      verticalPosition: 'bottom'
  //    });
  //  }
}
