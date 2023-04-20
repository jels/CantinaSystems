import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  nombreUser = localStorage.getItem('nombreC');


  diasSeleccionados: any[] = [];
  mesActual: string = "";
  mes = new Date().getMonth();
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  selected = 'None';
  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('rol') != 'admin') {
      this.router.navigate(['login']);
    }
    this.mesActual = this.meses[this.mes];
    console.log(this.mes + 1);
    console.log(this.mesActual);

  }



  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
