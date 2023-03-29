import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagos } from 'src/app/interfaces/pagos';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit{
  listPagos: Pagos[] = [];
  
  displayedColumns: string[] = ['anho','mes','dia','monto','foto'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _pagosService: PagosService, private _snackBar: MatSnackBar){}

  ngOnInit(): void{
    this.cargarPagos();
  }

  cargarPagos(){
    this.listPagos = this._pagosService.getPagos();
    this.dataSource = new MatTableDataSource(this.listPagos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
