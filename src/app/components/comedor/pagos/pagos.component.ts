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

  listPagos: Pagos[] = [];
  deuda: any;
  pagos: any;

  montoDeuda: any;

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
    this.cargarPagos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargarDeudaTotal(this.idUser);
    this.cargarPagosTotal(this.idUser);
    this.montoDeuda = this.pagos - this.deuda;
  }

  cargarDeudaTotal(idUsr: number) {
    this._pagosService.getDeudaUser(idUsr).subscribe((resp) => {
      this.deuda = Number(resp);
      console.log(this.deuda);
    });
  }

  cargarPagosTotal(idUsr: number) {
    this._pagosService.getPagosUser(idUsr).subscribe((resp) => {
      this.pagos = Number(resp);
      console.log(this.pagos);
      console.log(this.deuda);
    });
  }

  cargarPagos() {
    this.listPagos = this._pagosService.getPagos();
    this.dataSource = new MatTableDataSource(this.listPagos);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
