import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

import { LoginService } from 'src/app/core/services/login.service';
import { EdtDatosComponent } from './edt-datos/edt-datos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  datos: any
  user: any
  imagenUrlBase = 'data:image/jpeg;base64,';
  lista: any = []

  constructor(
    public login: LoginService,
    public adminService: AdminService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.listar()
  }

  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }


  async listar() {
    this.adminService.listaUsuarioPorCodigo(this.user.ul_codigo).subscribe(data => {
      this.lista = data;
    }); 
  }

   botonesConfig = {
    editar: true,
  };
  
  operar() {

    const dialogRef = this.dialog.open(EdtDatosComponent, {
      width: '1050px',
      height: '800px',
      data: {
        row: this.lista, 
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listar(); 
    });
  }
  
}


