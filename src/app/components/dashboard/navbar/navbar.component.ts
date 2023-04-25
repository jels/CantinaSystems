import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [
    {
      nombre: 'Inicio',
      redirect: '/dashboard',
    },
    {
      nombre: 'Usuarios',
      redirect: '/dashboard/usuarios',
    },
    {
      nombre: 'Menús',
      redirect: '/dashboard/menu',
    },
    {
      nombre: 'Pagos',
      redirect: '/dashboard/pagos',
    },
    {
      nombre: 'Almuerzos',
      redirect: '/dashboard/almuerzos',
    },
  ];

  constructor(private _menuService: MenuService, private router: Router) {}

  ngOnInit(): void {}

  exit() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
