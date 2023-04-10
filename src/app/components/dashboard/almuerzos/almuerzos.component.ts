import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';

@Component({
  selector: 'app-almuerzos',
  templateUrl: './almuerzos.component.html',
  styleUrls: ['./almuerzos.component.css']
})
export class AlmuerzosComponent {

  listAlmuerzo: any;

  displayedColumns: string[] = ['numero', 'idAlmuerzo', 'nombre_almuerzo', 'estado', 'darBaja'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private _almuerzoService: AlmuerzosService, private router: Router, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
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
    this._almuerzoService.getAllAlmuerzos().subscribe(respuesta => {
      console.log(respuesta);
      this.listAlmuerzo = respuesta;
      this.dataSource = new MatTableDataSource(this.listAlmuerzo);
    });
  }
}
