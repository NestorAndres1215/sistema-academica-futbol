import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { UserService } from 'src/app/core/services/usuario.service';
import { EditContraComponent } from '../edit-contra/edit-contra.component';

@Component({
  selector: 'app-actualizar-contra',
  templateUrl: './actualizar-contra.component.html',
  styleUrls: ['./actualizar-contra.component.css']
})
export class ActualizarContraComponent implements OnInit {

  botonesConfigTable = {
    actualizar: true,
  };
  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Nombre', clave: 'username' },

  ];

  editar(row: any) {
    const dialogRef = this.dialog.open(EditContraComponent, {
      width: '550px',
      disableClose: true,
      height: '550px',
      data: {
        row,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listar()
    })
  }
  botonesConfig = {
    editar: false,
    volver: true,

  };
  volver() {
    throw new Error('Method not implemented.');
  }

  constructor(private dialog: MatDialog, private loginService: LoginService, private fb: UntypedFormBuilder, private profesorService: ProfesorService, private usuarioService: UserService, private cdRef: ChangeDetectorRef) { }
  usuario: any

  ngOnInit(): void {
    this.listar()

  }

  async listar() {
    this.usuarioService.findAll().subscribe({
      next: (data) => {
        this.usuario = data.filter(i => i.codigo === this.loginService.getUser().ul_codigo);
      },
    });
  }






}
