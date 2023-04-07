import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Almuerzo, NuevoMenu } from 'src/app/interfaces/almuerzos';
import { AlmuerzosService } from 'src/app/services/almuerzos.service';

@Component({
  selector: 'app-new-almuerzo',
  templateUrl: './new-almuerzo.component.html',
  styleUrls: ['./new-almuerzo.component.css']
})

export class NewAlmuerzoComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _almuerzoService: AlmuerzosService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre_almuerzo: ['', Validators.required],
      descripcion_almuerzo: ['', Validators.required]
    });

  }
  ngOnInit(): void {

  }

  agregarAlmuerzo() {
    const newAlm: NuevoMenu = {
      nombre_almuerzo: this.form.value.nombre_almuerzo,
      descripcion_almuerzo: this.form.value.descripcion_almuerzo,
    }
    this._almuerzoService.newMenu(newAlm).subscribe(resp => { console.log(resp) });
    this._snackBar.open('El almuerzo fue creado correctamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    //this.router.navigate(['/dashboard/almuerzos']);
  }
}
