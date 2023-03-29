import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  almuerzos: any[] = [
    { idAlmuerzo: '1', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '2', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '3', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '4', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '5', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '6', nombreAlmuerzo: 'SuperAdmin' }
  ]
  selected = 'None';

  constructor() { }









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
