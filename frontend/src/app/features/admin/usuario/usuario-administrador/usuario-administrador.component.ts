import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalPerfilComponent } from 'src/app/shared/modal/modal-perfil/modal-perfil.component';

@Component({
  selector: 'app-usuario-administrador',
  templateUrl: './usuario-administrador.component.html',
  styleUrls: ['./usuario-administrador.component.css']
})
export class UsuarioAdministradorComponent implements OnInit {
  filtro: string = '';
  listar: any[] = [];
  usuariosFiltrados: any[] = [];

  constructor(private admin: AdminService, private dialog: MatDialog, private router: Router) { }
  columnas = [
    { clave: 'perfil' },
    { clave: 'primerNombre' },
    { clave: 'segundoNombre' },
    { clave: 'apellidoPaterno' },
    { clave: 'apellidoMaterno' }
  ];


  ngOnInit(): void {

    this.admin.listarAdminActivado().subscribe(
      (data) => {
        this.listar = data;
        this.usuariosFiltrados = [...this.listar];
   
      },
    );
  }


  filtrarUsuarios() {
    if (!this.listar || this.listar.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }

    const term = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.listar.filter(usuario =>
      (usuario.primerNombre + ' ' + usuario.segundoNombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno)
        .toLowerCase()
        .includes(term)
    );
  }
  columnasDetalle = [
    { clave: 'usuario.username', etiqueta: 'Usuario' },
    { clave: 'primerNombre', etiqueta: 'Nombre' },
    { clave: 'apellidoPaterno', etiqueta: 'Apellido' },
    { clave: 'correo', etiqueta: 'Correo', roles: ['admin'] },
    { clave: 'telefono', etiqueta: 'Teléfono' }
  ];
  tipoUsuario: 'admin' | 'profesor' = 'admin';
  operar(perfil: any) {

    const dialogRef = this.dialog.open(ModalPerfilComponent, {
      width: '400px',
      height: '445px',
      data: {
        perfiles: [perfil],
        columnas: this.columnasDetalle,
        tipoUsuario: this.tipoUsuario
      }
    });
  }

}
