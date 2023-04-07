import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { AlmuerzoMensual } from 'src/app/interfaces/almuerzos';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';

@Component({
  selector: 'app-menu-mensual',
  templateUrl: './menu-mensual.component.html',
  styleUrls: ['./menu-mensual.component.css']
})
export class MenuMensualComponent implements OnInit {

  diaNombre: any;
  diaNumero: any;
  fechaCompleta: any;
  fechaExtendida: any;
  mes: any;
  anho: any;
  platos: any;
  mesActual: string = "";
  listAlmuerzo: any;
  dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  displayedColumns: string[] = ['dia_completo_almuerzo', 'nombre_almuerzo', 'estado', 'eliminar'];
  dataSource: MatTableDataSource<any>;
  fecha = new Date();
  cantidadAlmuerzoDiario: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  form: FormGroup;

  constructor(private fb: FormBuilder, private _almuerzoService: AlmuerzosService, private router: Router, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
    this.form = this.fb.group({
      nombrePlato: ['', Validators.required],
      fechaAlmuerzo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.mesActual = this.meses[this.fecha.getMonth()];
    console.log(this.mesActual);
    this.dataSource.sort = this.sort;
    this.cargarAlmuersosMes();
    this.platos = this._almuerzoService.getAlmuerzos().subscribe(respuesta => {
      this.platos = respuesta;
      console.log(this.platos);
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  limiteMenuDiario(fecha: string) {
    this._almuerzoService.getCantidadMenusDiario(fecha).subscribe(resp => {
      this.cantidadAlmuerzoDiario = resp;
      console.log(resp);
    });
  }

  agregarPlatoMensual() {
    const fechaDia = (this.form.value.fechaAlmuerzo.getDate() + "/" + (this.form.value.fechaAlmuerzo.getMonth() + 1) + "/" + this.form.value.fechaAlmuerzo.getFullYear());
    this._almuerzoService.getCantidadMenusDiario(fechaDia).subscribe(resp => {
      this.cantidadAlmuerzoDiario = resp;
      console.log(resp);
    });
    this.limiteMenuDiario(fechaDia);
    console.log(this.cantidadAlmuerzoDiario);
    if (this.cantidadAlmuerzoDiario >= 6) {
      this.form.reset();

      this.limiteMenuDiario(fechaDia);
      this._snackBar.open('Cantidad maxima por dia...no se pudo insertar MENU al dia seleccionado', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      setTimeout(() => {

        //location.reload();
      }, 5000);
    } else {
      const menuMensual: AlmuerzoMensual = {
        id_lista_de_almuerzos_mensuales: null,
        id_almuerzo: Number(this.form.value.nombrePlato),
        mes_lista_almuerzo: Number(this.form.value.fechaAlmuerzo.getMonth() + 1),
        dia_lista_almuerzo: Number(this.form.value.fechaAlmuerzo.getDate()),
        ano_lista_almuerzo: Number(this.form.value.fechaAlmuerzo.getFullYear()),
        fechaCompleta: (this.form.value.fechaAlmuerzo.getDate() + "/" + (this.form.value.fechaAlmuerzo.getMonth() + 1) + "/" + this.form.value.fechaAlmuerzo.getFullYear()),
        dia_completo_almuerzo: (this.dias[this.form.value.fechaAlmuerzo.getDay()] + ", " + this.form.value.fechaAlmuerzo.getDate() + " de " + this.meses[this.form.value.fechaAlmuerzo.getMonth()] + " de " + this.form.value.fechaAlmuerzo.getFullYear()),
        estado_almuerzo_mensual: 1
      }
      console.log(this.dias[this.form.value.fechaAlmuerzo.getDay()] + ", " + this.form.value.fechaAlmuerzo.getDate() + " de " + this.meses[this.form.value.fechaAlmuerzo.getMonth()] + " de " + this.form.value.fechaAlmuerzo.getFullYear());
      console.log(menuMensual);
      this._almuerzoService.newMenuMensual(menuMensual).subscribe(res => {
        console.log(res);
        this.cargarAlmuersosMes();
        this.form.reset();
        this.limiteMenuDiario(fechaDia);
      });
      this._snackBar.open('Menu insertado al dia correctamente ', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }


  //console.log("getDay(): posicion de la semana " + this.form.value.fechaAlmuerzo.getDay());
  //console.log("getDate(): el dia " + this.form.value.fechaAlmuerzo.getDate());
  //console.log("getMonth(): el mes " + this.form.value.fechaAlmuerzo.getMonth());
  //console.log("getFullYear(): el año " + this.form.value.fechaAlmuerzo.getFullYear());
  //console.log("Fecha en su totalidad " + this.form.value.fechaAlmuerzo);
  //this.diaNumero = this.form.value.fechaAlmuerzo.getDay();
  //console.log(this.diaNumero);


  cargarAlmuersosMes() {
    this._almuerzoService.getAlmuerzosMes(this.fecha.getMonth() + 1).subscribe(respuesta => {
      console.log(respuesta);
      if (respuesta == 0) {
        this.listAlmuerzo = 0;
      } else {
        this.listAlmuerzo = respuesta;
        this.dataSource = new MatTableDataSource(this.listAlmuerzo);
      }
    });
  }


  eliminarMenuMensual(id: any) {
    this._almuerzoService.eliminarMenuMensual(id).subscribe(respuesta => { console.log(respuesta); });
    this.cargarAlmuersosMes();
    this._snackBar.open('El MENU fue eliminado correctamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
