import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

import { LoginService } from 'src/app/services/login.service';
import { EdtDatosComponent } from './edt-datos/edt-datos.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {



 
  datos: any
  user: any

  constructor(
 
    public login: LoginService,
    public adminService: AdminService,
    private router: Router,
    private dialog: MatDialog,
    
  ) { }

  imagenUrlBase = 'data:image/jpeg;base64,';
  lista: any = []
  ngOnInit(): void {
    this.user = this.login.getUser();
    this.listar()
   

  }
  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }
 

  volver() {
    this.router.navigate(['/administrador']);
  }

  async listar() {
    this.adminService.listaUsuarioPorCodigo(this.user.ul_codigo).subscribe(data => {
      this.lista = data;
    });

  }
  operar() {
    console.log(this.lista); // Verifica que lista tenga datos

    const dialogRef = this.dialog.open(EdtDatosComponent, {
      width: '1050px',
      height: '800px',
      data: {
        row: this.lista, // Pasamos los datos correctamente
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(() => {
      this.listar(); // Llama al método listar para actualizar los datos
    });
  }
  
}


