import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';

const MESES: string[] = [
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
const DIAS: string[] = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  nombreUser = localStorage.getItem('nombreC');
  listAlmuerzoHoy: any;
  diaHoyCompleto: string = '';
  diasSeleccionados: any[] = [];
  mesActual: string = '';
  mes = new Date().getMonth();
  diaHoy = new Date().getDate();
  dia = new Date().getDay();
  diaHoyLargo =
    new Date().getDate() +
    '/' +
    (new Date().getMonth() + 1) +
    '/' +
    new Date().getFullYear();

  selected = 'None';

  displayedColumns: string[] = [
    'numero',
    'nombreCompleto',
    'entidad',
    'nivel',
    'almuerzo',
    'estado',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _almuerzoService: AlmuerzosService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    if (localStorage.getItem('rol') != 'admin') {
      this.router.navigate(['login']);
    }
    console.log(this.diaHoy);

    this.diaHoyCompleto =
      DIAS[this.dia] +
      ', ' +
      this.diaHoy +
      ' de ' +
      MESES[this.mes] +
      ' de ' +
      new Date().getFullYear();
    this.mesActual = MESES[this.mes];
    console.log(this.diaHoyCompleto);
    console.log(this.diaHoyLargo);

    this.cargarAlmuerzos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarAlmuerzos() {
    this._almuerzoService
      .listarAlmuerzosDiariosCocina(this.diaHoyLargo)
      .subscribe((respuesta) => {
        console.log(respuesta);
        this.listAlmuerzoHoy = respuesta;
        this.dataSource = new MatTableDataSource(this.listAlmuerzoHoy);
      });
  }

  selectDayParaMostrar(dia: number) {
    if (dia > 0) {
      this.diaHoy = this.diaHoy + dia;
      this.diaHoyLargo =
        this.diaHoy + '/' + (this.mes + 1) + '/' + new Date().getFullYear();
    } else {
      this.diaHoy = this.diaHoy + dia;
      this.diaHoyLargo =
        this.diaHoy + '/' + (this.mes + 1) + '/' + new Date().getFullYear();
    }
    console.log(this.diaHoyLargo);
  }
}
