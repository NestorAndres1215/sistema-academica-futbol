import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { DtUsuarioComponent } from '../dt-usuario/dt-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-administrador',
  templateUrl: './usuario-administrador.component.html',
  styleUrls: ['./usuario-administrador.component.css']
})
export class UsuarioAdministradorComponent implements OnInit {
  filtro: string = '';
  listar: any[] = [];
  usuariosFiltrados: any[] = [];
  imagenUrlBase = 'data:image/jpeg;base64,';


  botonesConfig = {
    editar: false,
    volver: true,

  };

  constructor(private admin: AdminService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    // Llamar al servicio para obtener la lista de usuarios
    this.admin.listarAdminActivado().subscribe(
      (data) => {
        this.listar = data;
        this.usuariosFiltrados = [...this.listar]; // Inicializar la lista filtrada con todos los usuarios
        console.log(this.listar);
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }

  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
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

  operar(perfil: any) {
    console.log(typeof perfil)
    const dialogRef = this.dialog.open(DtUsuarioComponent, {
      width: '400px',
      height: '480px',
      data: {
        perfil
      }
    });
  }
  volver(): void {
    this.router.navigate(['/administrador']);
  }
}
