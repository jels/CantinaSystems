import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  almuerzos: any[] = [
    { idAlmuerzo: '1', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '2', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '3', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '4', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '5', nombreAlmuerzo: 'SuperAdmin' },
    { idAlmuerzo: '6', nombreAlmuerzo: 'SuperAdmin' }
  ]
  selected = 'None';

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('rol') != 'admin') {
      this.router.navigate(['login']);
    }
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
