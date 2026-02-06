import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EditDevComponent } from '../edit-dev/edit-dev.component';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GeneralService } from 'src/app/core/services/general.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { LsTablaGeneralComponent } from '../ls-tabla-general/ls-tabla-general.component';
import { VisorTbGeneralComponent } from '../visor-tb-general/visor-tb-general.component';
import { RegDevComponent } from '../reg-dev/reg-dev.component';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LstDesLtDevComponent } from '../lst-des-lt-dev/lst-des-lt-dev.component';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lt-dev',
  templateUrl: './lt-dev.component.html',
  styleUrls: ['./lt-dev.component.css']
})
export class LtDevComponent implements OnInit {

  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Clave', clave: 'clave' },
    { etiqueta: 'Descripción', clave: 'descripcion1' },
  ];
  botonesConfigTable = {
    actualizar: true,
    ver: true,
    desactivar: true,
  };

  filtro: string = '';
  listar: any[] = [];
  usuariosFiltrados: any[] = [];
  totalItems: number;
  pageSize = 5;
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  codigo: string
  descripcion: string

  constructor(
    private generales: GeneralService,
    private change: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginService: LoginService,
    private historialService: HistorialService,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<LsTablaGeneralComponent>,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.codigo = this.data.row.codigo
    this.descripcion = this.data.row.descripcion1
    this.listarDesactivado()
  }

  pageSizeChanged() {
    this.paginator.firstPage();
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
  }

  pageChanged(event: PageEvent) {
    this.totalItems = this.datosTabla.length
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.usuariosFiltrados = this.datosTabla.slice(startIndex, endIndex);
  }

  async listarDesactivado() {
    this.generales.listarGeneralDevActivado(this.codigo).subscribe((data) => {
      this.datosTabla = data;
      this.pagedData = data
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
      this.change.markForCheck();
    })
  }


  filtrarUsuarios() {
    if (!this.pagedData || this.pagedData.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }

    const term = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.pagedData.filter(usuario =>
      (usuario.descripcion1)
        .toLowerCase()
        .includes(term)
    );
  }

  volver() {
    this.dialogRe.close();
  }


  eliminar(row: any) {
  
    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      width: '500px',
      data: {
        row,
        titulo: 'Eliminar',
        subtitulo: `¿Deseas eliminar el tabla general  ${row.descripcion1} con el codigo ${row.codigo} ? `
      },

    });

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton !== 'CONFIRMAR') return;
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} desactivó un cargo de ${row.nombre}`
      };
      this.generales.desactivarGeneralGen(row.codigo).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.DESACTIVADO);


          this.listarDesactivado();
        },
        error: error => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
        }
      });

    });

  }



  visor(row: any) {
    this.dialog.open(VisorTbGeneralComponent, {
      disableClose: true,
      width: '550px',
      height: '450px',
      data: {
        row,
      }
    });
  }

  editar(row: any) {
    const dialogRef = this.dialog.open(EditDevComponent, {

      width: '550px',
      height: '460px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.listarDesactivado();

    });
  }

  operar() {

    const codigo = this.codigo
    const dialogRef = this.dialog.open(RegDevComponent, {
      width: '700px',
      height: '400px',
      data: {
        codigo
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarDesactivado()
    })
  }

  Ver() {
    const dialogRef = this.dialog.open(LstDesLtDevComponent, {
      disableClose: true,
      width: '1050px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarDesactivado()
    })
  }
}
