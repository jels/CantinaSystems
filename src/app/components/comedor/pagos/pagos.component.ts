import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagos } from 'src/app/interfaces/pagos';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
})
export class PagosComponent implements AfterViewInit {
  idUser: number = Number(localStorage.getItem('idU'));

  verImagen: string = '';
  listPagos: any;
  deuda: any;
  pagos: any;

  montoDeuda!: number;

  displayedColumns: string[] = ['anho', 'mes', 'dia', 'monto', 'foto'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _pagosService: PagosService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.cargarPagos(this.idUser);
  }

  ngAfterViewInit() {
    this.cargarPagos(this.idUser);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargarDeudaTotal(this.idUser);
  }

  cargarDeudaTotal(idUsr: number) {
    this._pagosService.getDeudaUser(idUsr).subscribe((resp) => {
      this.deuda = Number(resp);
      this._pagosService.getPagosUser(idUsr).subscribe((resp2) => {
        this.pagos = Number(resp2);
        this.montoDeuda = this.pagos - this.deuda;
        console.log(this.montoDeuda);
      });
    });
  }

  cargarPagosTotal(idUsr: number) {
    this._pagosService.getPagosUser(idUsr).subscribe((resp) => {
      this.pagos = Number(resp);
    });
  }

  cargarPagos(idUser: number) {
    this._pagosService.getPagosUsr(idUser).subscribe((resp) => {
      console.log(resp);
      this.listPagos = resp;
    });
    this.dataSource = new MatTableDataSource(this.listPagos);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(foto_pago: string) {
    this.verImagen = foto_pago;
  }
}
