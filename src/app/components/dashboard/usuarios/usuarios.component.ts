import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListUsuario } from 'src/app/interfaces/listUsers';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listUsuarios: any;

  displayedColumns: string[] = ['id_users', 'user_name', 'user_pass', 'user_nombre', 'user_apellido', 'acronimoEntidad', 'acronimoNivel', 'cicloNivel', 'user_estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _usuarioService: UsuarioService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this._usuarioService.getAllUsers().subscribe(respuesta => {
      console.log(respuesta);
      this.listUsuarios = respuesta;
      this.dataSource = new MatTableDataSource(this.listUsuarios);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarUsuario(index: number) {

    console.log(index);
    this._usuarioService.darDeBajaUsuario(index, 0);
    //this._snackBar.open('El usuario fue Dado de baja correctamente', '', {
    //  duration: 5000,
    //  horizontalPosition: 'center',
    //  verticalPosition: 'bottom'
    //});
    //location.reload();

  }

  editarUsuario(index: number) {
    console.log(index);
  }

  verDatos(index: number) {
    console.log(index);
  }


}
