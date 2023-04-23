import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { bajaUser } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  listUsuarios: any;
  estado: number = 0;

  bUser: bajaUser = {
    estado_user: 0,
    id_user: 0,
  };

  displayedColumns: string[] = [
    'id_users',
    'user_name',
    'user_pass',
    'user_nombre',
    'user_apellido',
    'acronimoEntidad',
    'acronimoNivel',
    'cicloNivel',
    'user_estado',
    'acciones',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarUsuarios() {
    this._usuarioService.getAllUsers().subscribe((respuesta) => {
      console.log(respuesta);
      this.listUsuarios = respuesta;
      this.dataSource = new MatTableDataSource(this.listUsuarios);
    });
  }

  eliminarUsuario(index: number, estado: number) {
    if (estado == 1) {
      this.estado = 0;
    } else {
      this.estado = 1;
    }
    this.bUser.estado_user = this.estado;
    this.bUser.id_user = Number(index);
    console.log(this.bUser);
    this._usuarioService.darDeBajaUsuario(this.bUser).subscribe((data) => {
      console.log(data);
    });
    this._snackBar.open('El usuario fue dado de baja correctamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    location.reload();
  }

  editarUsuario(index: number) {
    console.log(index);
  }

  verDatos(index: number) {
    console.log(index);
  }
}
