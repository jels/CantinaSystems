import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbar: any[] = [
    {
      "nombre": "Inicio",
      "redirect": "/comedor"
    },
    {
      "nombre": "Almuerzos",
      "redirect": "/comedor/almuerzos"
    },
    {
      "nombre": "Pagos",
      "redirect": "/comedor/pagos"
    },
    {
      "nombre": "Historial",
      "redirect": "/comedor/historial"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.navbar.slice();
  }

}
