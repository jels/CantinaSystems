import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';


@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  mesActual: string = "";
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

  listAlmuerzo: any;

  displayedColumns: string[] = ['dia_completo_almuerzo', 'nombre_almuerzo', 'estado', 'eliminar'];
  dataSource: MatTableDataSource<any>;
  fecha = new Date();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private _almuerzoService: AlmuerzosService, private router: Router, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.mesActual = meses[this.fecha.getMonth()];
    console.log(this.mesActual);
    this.dataSource.sort = this.sort;
    this._almuerzoService.getAlmuerzosMes(this.fecha.getMonth() + 1).subscribe(respuesta => {
      console.log(respuesta);
      this.listAlmuerzo = respuesta;
      this.dataSource = new MatTableDataSource(this.listAlmuerzo);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarAlmuersosMes() {
    this._almuerzoService.getAlmuerzosMes(this.fecha.getMonth() + 1).subscribe(respuesta => {
      console.log(respuesta);
      this.listAlmuerzo = respuesta;
    });
  }

}
