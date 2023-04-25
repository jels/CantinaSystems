import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
})
export class PagosComponent implements OnInit {
  listPagos: any;

  displayedColumns: string[] = [
    'id_pago',
    'nombreCompleto',
    'acronimoEntidad',
    'acronimoNivel',
    'fecha_pago',
    'monto_pago',
    'foto_pago',
  ];
  dataSource: MatTableDataSource<any>;
  verImagen: string = '';
  montoImagen: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _servicePagos: PagosService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllPagos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllPagos() {
    this._servicePagos.getAllPagos().subscribe((respuesta) => {
      console.log(respuesta);
      this.listPagos = respuesta;
      this.dataSource = new MatTableDataSource(this.listPagos);
    });
  }

  openDialog(ruta: string, monto: number) {
    this.verImagen = ruta;
    this.montoImagen = monto;
  }
}
