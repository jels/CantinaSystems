import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';

const MESES: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

@Component({
  selector: 'app-almuerzos',
  templateUrl: './almuerzos.component.html',
  styleUrls: ['./almuerzos.component.css']
})
export class AlmuerzosComponent implements AfterViewInit {

  foods: any;
  listaAlmuerzosDiariosUsr: any;

  existe: boolean = false;

  diaNombre: any;
  diaNumero: any;
  fechaCompleta: string = "";
  fechaExtendida: string = "";
  mes: any;
  anho: any;

  elegirPlato: boolean = false;
  diaCompleto: string = "";
  selected!: Date | null;
  displayedColumns: string[] = ['fecha_completa_almuerzo', 'nombre_almuerzo', 'estado_ensalada', 'estado_sopa', 'estadoAlmuerzoEstudiante', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  mesActual = new Date().getMonth();

  mesNombre: string = MESES[this.mesActual];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _formBuilder: FormBuilder,
    private _almuerzos: AlmuerzosService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
    this.elegirPlato = false;
  }

  almuerzosPorDiaForm: FormGroup = this._formBuilder.group({
    firstCtrl: [''],
    secondCtrl: [''],
    ensalada: [''],
    sopa: ['']
  });

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.mesNombre;
    this.cargarAlmuerzosPorUsuario(10);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //  this.diaCompleto = (fechaSeleccionada.getDate() + "/" + (fechaSeleccionada.getMonth() + 1) + "/" + fechaSeleccionada.getFullYear());
  listaDiariaAlmuerzo(idUser: number, dia: any, mes: any, anho: any, diaSeleccionado: any) {
    this.elegirPlato = true;
    this.diaCompleto = (diaSeleccionado + "/" + (mes + 1) + "/" + anho);
    console.log(this.diaCompleto);
    this._almuerzos.getAlmuerzosDia(this.diaCompleto).subscribe(respuesta => {
      this.foods = respuesta;
    });
    this._almuerzos.existeAlmuerzoMensualUsr(10, this.diaCompleto).subscribe(resp => {
      console.log(resp);
      if (resp) {
        this.existe = true;
      } else {
        this.existe = false;
      }
    });
  }

  agregarAlmuerzoDiario(idUser: number, fecha: any, idAlmuerzo: number, opcionSopa: any, opcionEnsalada: any) {

    this.diaNombre = DIAS[fecha.getDay()];
    this.diaNumero = fecha.getDate();
    this.mes = fecha.getMonth();
    this.anho = fecha.getFullYear();
    this.fechaCompleta = (this.diaNumero + "/" + (this.mes + 1) + "/" + this.anho);
    this.fechaExtendida = (DIAS[fecha.getDay()] + ", " + fecha.getDate() + " de " + MESES[this.mes] + " de " + this.anho);
    console.log("Este es Fecha Completa: " + this.fechaCompleta);
    console.log("Este es Fecha Extendida: " + this.fechaExtendida);

    let myNumber: number = +idAlmuerzo;

    const almuerzosDiarios = {
      idUser: idUser,
      idAlmuerzo: myNumber,
      fechaCompleta: this.fechaExtendida,
      fechaAlmuerzo: this.fechaCompleta,
      dia: this.diaNumero,
      mes: this.mes + 1,
      anho: this.anho,
      opcionSopa: (opcionSopa ? 1 : 0),
      opcionEnsalada: (opcionEnsalada ? 1 : 0)
    };
    console.log(almuerzosDiarios);
    if (this.existe) {
      this._snackBar.open('El dia ya tiene ALMUERZO seleccionado', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.almuerzosPorDiaForm.reset();
    } else {
      this._almuerzos.newAlmuerzosPorAlumno(almuerzosDiarios).subscribe(respuesta => {
        console.log(respuesta);
      });
      this._snackBar.open('El Almuerzo fue insertado correctamente', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.cargarAlmuerzosPorUsuario(10);
      this.almuerzosPorDiaForm.reset();
    }


    //location.reload();
  }

  cargarAlmuerzosPorUsuario(idUsuario: number) {
    console.log(this.mesActual);
    this._almuerzos.getAllAlmuersosUser(idUsuario, this.mesActual + 1).subscribe(respuesta => {
      this.listaAlmuerzosDiariosUsr = respuesta;
      this.dataSource = new MatTableDataSource(this.listaAlmuerzosDiariosUsr);
    });

  }

  elimiarAlmuerzoDiario(id: number) {
    this._almuerzos.eliminarAlmuerzoUsr(id).subscribe(respuesta => { console.log(respuesta); });
    this._snackBar.open('El almuerzo fue eliminado correctamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    this.cargarAlmuerzosPorUsuario(10);
    //location.reload();
  }
}