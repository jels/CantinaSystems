import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NuevoPago } from 'src/app/interfaces/pagos';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-new-pago',
  templateUrl: './new-pago.component.html',
  styleUrls: ['./new-pago.component.css'],
})
export class NewPagoComponent implements OnInit {
  fotoUrl: string = './assets/img/pago.png';
  rutaArchivo: string = './assets/img/pagos/';
  form!: FormGroup;
  id_user: number = Number(localStorage.getItem('idU'));

  mesActual = new Date().getMonth() + 1;
  anhoActual = new Date().getFullYear();
  diaPago = new Date().getDate();

  archivo = {
    enlaceArchivo: this.rutaArchivo,
    nombreArchivo: null,
    base64textString: '',
  };

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _pagoService: PagosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      monto_pago: ['', Validators.required],
      img_pago: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  seleccionarArchivo(event: any) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.archivo.enlaceArchivo = this.rutaArchivo + file.name;
    console.log(this.archivo);

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  upload() {
    console.log(this.archivo);
    this._pagoService.uploadFile(this.archivo).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
      }
    });
  }

  agregarPago() {
    console.log(this.form);
    console.log(this.archivo);
    this._pagoService.uploadFile(this.archivo).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
      }
    });
    const pago: NuevoPago = {
      idUser: Number(this.id_user),
      anho: Number(this.anhoActual),
      mes: Number(this.mesActual),
      dia: Number(this.diaPago),
      monto: Number(this.form.value.monto_pago),
      fechaCompleta:
        this.diaPago + '/' + this.mesActual + '/' + this.anhoActual,
      foto: this.archivo.enlaceArchivo,
      descripcion: 'Aun no disponibilizado',
    };
    this._pagoService.setNewPago(pago).subscribe();
    this._snackBar.open('El pago fue registrado correctamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.router.navigate(['/comedor/pagos']);
  }
}
