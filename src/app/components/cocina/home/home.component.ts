import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  full: Boolean = true;
  exitenAlmuerzos: Boolean = false;
  pendientes: any;

  diaHoy = new Date().getDate();
  mesActual = new Date().getMonth();
  anhoActual = new Date().getFullYear();
  fechaHoy = (this.diaHoy + 1) + "/" + (this.mesActual + 1) + "/" + this.anhoActual;

  listaAlmuerzos: any;

  displayedColumns: string[] = ['numero', 'nombreCompleto', 'entidad', 'nivel', 'almuerzo', 'estado', 'settings'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _almuerzosService: AlmuerzosService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.cargarAlmuerzosHoy(this.fechaHoy);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  calcularAlmuerzosPendientes(fechaHoy: string) {
    this._almuerzosService.getCantidadPendientesDiario(fechaHoy).subscribe(resp => { this.pendientes = resp; });
  }

  marcarEntregado(idAlmuerzoXdia: number) {
    console.log(idAlmuerzoXdia);
    this._almuerzosService.entregarAlmuerzoEstudiante(idAlmuerzoXdia).subscribe();
    this.cargarAlmuerzosHoy(this.fechaHoy);
    this.calcularAlmuerzosPendientes(this.fechaHoy);
  }

  cargarAlmuerzosHoy(fechaBuscada: string) {
    this.calcularAlmuerzosPendientes(fechaBuscada);
    this._almuerzosService.listarAlmuerzosDiariosCocina(fechaBuscada).subscribe(respuesta => {
      console.log(respuesta);
      this.listaAlmuerzos = respuesta;
      this.dataSource = new MatTableDataSource(this.listaAlmuerzos);
      if (this.listaAlmuerzos.length > 0) {
        this.exitenAlmuerzos = true;
      } else {
        this.exitenAlmuerzos = false;
      }
      console.log(this.exitenAlmuerzos);
    });
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  elem = document.documentElement;
  fullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      this.full = false;
    }
  }
  close_fullscreen() {
    document.exitFullscreen();
    this.full = true;
  }
}