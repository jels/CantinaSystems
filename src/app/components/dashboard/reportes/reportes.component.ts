import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  mesNombre: string = '';
  fecha = new Date();
  mesNumero!: number;
  listAlmuerzo: any;
  listAlmuerzoDiario: any = 0;
  diaSeleccionado!: string;
  anho!: number;

  meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  displayedColumns: string[] = [
    'id_almuerzo',
    'fecha_completa_almuerzo',
    'nombre_almuerzo',
    'cantidad_almuerzos',
    'ver_almuerzo',
  ];

  displayedColumnsDiario: string[] = [
    'nombre_almuerzo',
    'cantidad_almuerzos',
    'entidad',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any>;
  dataSourceDiario: MatTableDataSource<any>;

  constructor(
    private _almuerzoService: AlmuerzosService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSourceDiario = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.mesNombre = this.meses[this.fecha.getMonth()];
    this.mesNumero = this.fecha.getMonth() + 1;
    this.anho = this.fecha.getFullYear();
    this.cargarCantAlmuersosMes(this.mesNumero, this.anho);
    console.log(this.mesNumero);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterDia(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDiario.filter = filterValue.trim().toLowerCase();
  }

  listarAlmuerzosPorDia(fecha: string) {
    this.diaSeleccionado = fecha;
    console.log('La fecha a ver:' + fecha);
    this._almuerzoService.getCantAlmuerzosDia(fecha).subscribe((respuesta) => {
      console.log(respuesta);
      if (respuesta == 0) {
        this.listAlmuerzoDiario = 0;
      } else {
        this.listAlmuerzoDiario = respuesta;

        this.dataSourceDiario = new MatTableDataSource(this.listAlmuerzoDiario);
      }
    });
  }

  VerAlmuerzosPorEntidad(detalles: string) {
    console.log(detalles);
  }

  cargarCantAlmuersosMes(mes: number, anho: number) {
    this._almuerzoService
      .getCantAlmuerzosMes(mes, anho)
      .subscribe((respuesta) => {
        console.log(respuesta);
        if (respuesta == 0) {
          this.listAlmuerzo = 0;
        } else {
          this.listAlmuerzo = respuesta;
          this.dataSource = new MatTableDataSource(this.listAlmuerzo);
        }
      });
  }

  seleccionarMesParaMostrar(mes: number) {
    if (this.mesNumero == 12) {
      this.mesNumero = 1;
      this.mesNombre = this.meses[this.mesNumero - 1];
      //} else if (this.mesNumero == 1) {
      //  this.mesNumero = 12;
      //  this.mesNombre = this.meses[this.mesNumero - 1];
      //  this.cargarAlmuersosMes(this.mesNumero);
    } else {
      this.mesNumero = this.mesNumero + mes;
      this.mesNombre = this.meses[this.mesNumero - 1];
    }
    console.log(this.mesNumero);
  }
}
