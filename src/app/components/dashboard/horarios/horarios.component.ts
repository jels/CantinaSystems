import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  colegios: any[] = [
    {idColegio: '1', nombreColegio: 'CADA'},
    {idColegio: '2', nombreColegio: 'CERVANTES'},
    {idColegio: '3', nombreColegio: 'VARIOS'}
  ]

  grados: any[] = [
    {idGrado: '1', nombreGrado: 'Pre-Jardin'},
    {idGrado: '2', nombreGrado: 'Jardin'},
    {idGrado: '3', nombreGrado: 'Pre-Escolar'},
    {idGrado: '4', nombreGrado: '1er Grado'},
    {idGrado: '5', nombreGrado: '2do Grado'},
    {idGrado: '6', nombreGrado: '3er Grado'},
    {idGrado: '7', nombreGrado: '4to Grado'},
    {idGrado: '8', nombreGrado: '5to Grado'},
    {idGrado: '9', nombreGrado: '6to Grado'},

  ]

  form: FormGroup;

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService, private router: Router, private _snackBar: MatSnackBar){
    this.form = this.fb.group({
      userName:['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      colegio: ['', Validators.required],
      grado: ['', Validators.required]
    });
  }

  ngOnInit(): void{

  }


}
