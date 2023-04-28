import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-almuerzos',
  templateUrl: './almuerzos.component.html',
  styleUrls: ['./almuerzos.component.css'],
})
export class AlmuerzosComponent implements AfterViewInit {
  idUser: number = Number(localStorage.getItem('idU'));
  user_nombre = localStorage.getItem('nombreC');
  saldo: any;
  foods: any;
  listaAlmuerzosDiariosUsr: any;
  horaActual: any;
  existe: boolean = false;
  diaNombre: any;
  diaNumero: any;
  fechaCompleta: string = '';
  fechaExtendida: string = '';
  mes: any;
  anho: any;
  elegirPlato: boolean = false;
  diaCompleto: string = '';
  selected!: Date | null;
  displayedColumns: string[] = [
    'fecha_completa_almuerzo',
    'nombre_almuerzo',
    'estado_ensalada',
    'estado_sopa',
    'estadoAlmuerzoEstudiante',
    'eliminar',
  ];
  dataSource: MatTableDataSource<any>;

  mesActual = new Date().getMonth();
  anhoActual = new Date().getFullYear();

  mesNombre: string = MESES[this.mesActual];

  mesNumero!: number;
  mesSeleccionado!: number;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
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
    sopa: [''],
  });

  ngOnInit() {
    console.log('DIA: ' + new Date().getDate());
    console.log('Hora: ' + new Date().getDate());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.mesNombre;
    this.mesSeleccionado = this.mesActual + 1;
    this.cargarAlmuerzosPorUsuario(this.mesSeleccionado);
    this.calcularSaldoActual(this.mesSeleccionado, this.anhoActual);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listaDiariaAlmuerzo(dia: any, mes: any, anho: any, diaSeleccionado: any) {
    this.elegirPlato = true;
    this.diaCompleto = diaSeleccionado + '/' + (mes + 1) + '/' + anho;
    console.log(this.diaCompleto);
    this._almuerzos.getAlmuerzosDia(this.diaCompleto).subscribe((respuesta) => {
      this.foods = respuesta;
      console.log(respuesta);
    });
    this._almuerzos
      .existeAlmuerzoMensualUsr(this.idUser, this.diaCompleto)
      .subscribe((resp) => {
        console.log(resp);
        if (resp) {
          this.existe = true;
        } else {
          this.existe = false;
        }
      });
  }

  agregarAlmuerzoDiario(
    fecha: any,
    idAlmuerzo: number,
    opcionSopa: any,
    opcionEnsalada: any
  ) {
    this.diaNombre = DIAS[fecha.getDay()];
    this.diaNumero = fecha.getDate();
    this.mes = fecha.getMonth();
    this.fechaCompleta =
      this.diaNumero + '/' + (this.mes + 1) + '/' + this.anhoActual;
    this.fechaExtendida =
      DIAS[fecha.getDay()] +
      ', ' +
      fecha.getDate() +
      ' de ' +
      MESES[this.mes] +
      ' de ' +
      this.anhoActual;
    console.log('Este es Fecha Completa: ' + this.fechaCompleta);
    console.log('Este es Fecha Extendida: ' + this.fechaExtendida);
    const almuerzosDiarios = {
      idUser: this.idUser,
      idAlmuerzo: Number(idAlmuerzo),
      fechaCompleta: this.fechaExtendida,
      fechaAlmuerzo: this.fechaCompleta,
      dia: this.diaNumero,
      mes: this.mes + 1,
      anho: this.anhoActual,
      opcionSopa: opcionSopa ? 1 : 0,
      opcionEnsalada: opcionEnsalada ? 1 : 0,
    };
    console.log(almuerzosDiarios);
    if (this.existe) {
      this._snackBar.open('El dia ya tiene ALMUERZO seleccionado', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.almuerzosPorDiaForm.reset();
    } else {
      this._almuerzos
        .newAlmuerzosPorAlumno(almuerzosDiarios)
        .subscribe((respuesta) => {
          console.log(respuesta);
        });
      this._snackBar.open('El Almuerzo fue insertado correctamente', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.almuerzosPorDiaForm.reset();
      this.cargarAlmuerzosPorUsuario(this.mesSeleccionado);
      this.calcularSaldoActual(this.mesSeleccionado, this.anhoActual);
    }
  }

  cargarAlmuerzosPorUsuario(mesSeleccionado: number) {
    console.log(this.mesSeleccionado, this.anhoActual);
    this._almuerzos
      .getAllAlmuersosUser(this.idUser, mesSeleccionado, this.anhoActual)
      .subscribe((respuesta) => {
        this.listaAlmuerzosDiariosUsr = respuesta;
        this.dataSource = new MatTableDataSource(this.listaAlmuerzosDiariosUsr);
      });
  }

  elimiarAlmuerzoDiario(id: number, dia: number, mes: number) {
    console.log(mes);
    console.log(this.mesActual + 1);
    if (mes == this.mesActual + 1) {
      this.diaNumero = new Date().getDate();
      //this.diaNumero = 24;
      this.horaActual = new Date().getHours();
      //this.horaActual = 8;
      //console.log(dia < this.diaNumero);
      //console.log(this.horaActual < 8);
      //console.log(dia == this.diaNumero);

      if (dia < this.diaNumero) {
        console.log('no se puede eliminar dia');
        this._snackBar.open('El almuerzo ya no puede ser eliminado', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else if (dia == this.diaNumero) {
        if (this.horaActual < 8) {
          console.log('se puede eliminar hora no supera las 8');
          this._almuerzos.eliminarAlmuerzoUsr(id).subscribe((respuesta) => {
            console.log(respuesta);
          });
          this._snackBar.open('El almuerzo fue eliminado correctamente', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.cargarAlmuerzosPorUsuario(this.mesSeleccionado);
          this.calcularSaldoActual(this.mesSeleccionado, this.anhoActual);
        } else {
          console.log('no se puede eliminar porque hora supera las 8');
          this._snackBar.open(
            'El almuerzo ya no puede ser eliminado la hora ya supero las 8:00am',
            '',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            }
          );
        }
      } else {
        console.log('se puede eliminar');
        this._almuerzos.eliminarAlmuerzoUsr(id).subscribe((respuesta) => {
          console.log(respuesta);
        });
        this._snackBar.open('El almuerzo fue eliminado correctamente', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.cargarAlmuerzosPorUsuario(this.mesSeleccionado);
        this.calcularSaldoActual(this.mesSeleccionado, this.anhoActual);
      }
    } else if (mes < this.mesActual + 1) {
      this._snackBar.open('El almuerzo ya no puede ser eliminado', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    } else {
      console.log('se puede eliminar dia aun no llega');
      this._almuerzos.eliminarAlmuerzoUsr(id).subscribe((respuesta) => {
        console.log(respuesta);
      });
      this._snackBar.open('El almuerzo fue eliminado correctamente', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.cargarAlmuerzosPorUsuario(this.mesSeleccionado);
      this.calcularSaldoActual(this.mesSeleccionado, this.anhoActual);
    }
  }

  calcularSaldoActual(mes: number, ano: number) {
    this._almuerzos
      .contarCantidadAlmuerzoUserMes(this.idUser, mes, ano)
      .subscribe((respuesta) => {
        this.saldo = Number(respuesta) * 16000;
        console.log(respuesta);
      });
  }

  seleccionarMesParaMostrar(mes: number) {
    if (this.mesNumero == 12) {
      this.mesSeleccionado = 1;
      this.mesNombre = MESES[this.mesSeleccionado - 1];
      this.cargarAlmuerzosPorUsuario(this.mesSeleccionado);
      this.calcularSaldoActual(this.mesSeleccionado, this.anhoActual);

      //} else if (this.mesNumero == 1) {
      //  this.mesNumero = 12;
      //  this.mesNombre = this.meses[this.mesNumero - 1];
      //  this.cargarAlmuersosMes(this.mesNumero);
    } else {
      this.mesSeleccionado = this.mesSeleccionado + mes;
      this.mesNombre = MESES[this.mesSeleccionado - 1];

      this.cargarAlmuerzosPorUsuario(this.mesSeleccionado);
      this.calcularSaldoActual(this.mesSeleccionado, this.anhoActual);
    }
    console.log(this.mesSeleccionado);
  }
}
