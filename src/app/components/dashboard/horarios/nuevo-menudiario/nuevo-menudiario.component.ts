import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';

@Component({
  selector: 'app-nuevo-menudiario',
  templateUrl: './nuevo-menudiario.component.html',
  styleUrls: ['./nuevo-menudiario.component.css']
})
export class NuevoMenudiarioComponent implements OnInit {

  diaNombre: any;
  diaNumero: any;
  fechaCompleta: any;
  fechaExtendida: any;
  mes: any;
  anho: any;

  platos: any;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar, private _almuerzos: AlmuerzosService) {
    this.form = this.fb.group({
      nombrePlato: ['', Validators.required],
      fechaAlmuerzo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.platos = this._almuerzos.getAlmuerzos().subscribe(respuesta => {
      this.platos = respuesta;
      console.log(this.platos);
    });
  }

  agregarPlatoMensual() {

    this.diaNumero = this.form.value.fechaAlmuerzo.getDay();

    console.log(this.diaNumero);
  }

}
