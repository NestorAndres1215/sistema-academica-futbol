import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { LsTablaGeneralComponent } from '../ls-tabla-general/ls-tabla-general.component';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VisorTbGeneralComponent } from '../visor-tb-general/visor-tb-general.component';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lst-des-lt-dev',
  templateUrl: './lst-des-lt-dev.component.html',
  styleUrls: ['./lst-des-lt-dev.component.css']
})
export class LstDesLtDevComponent implements OnInit {

  volver() {
    this.dialogRe.close();
  }

  botonesConfigTable = {
    ver: true,
    desactivar: true,
  };

  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Clave', clave: 'clave' },
    { etiqueta: 'Descripción', clave: 'descripcion1' },
  ];


  user: any = null;
  xd: any
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalItems: number;
  pageSize = 5;
  listar: any

  constructor(
    private generalService: GeneralService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private historialService: HistorialService,
    private dialogRe: MatDialogRef<LsTablaGeneralComponent>,
    private change: ChangeDetectorRef,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.listarGeneral()
  }

  pageSizeChanged() {
    this.paginator.firstPage();
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
  }


  pageChanged(event: PageEvent) {
    this.totalItems = this.datosTabla.length
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedData = this.datosTabla.slice(startIndex, endIndex);
  }

  async listarGeneral() {
    this.generalService.listarGeneralDevDesactivado().subscribe((data) => {
      this.datosTabla = data;
      this.pagedData = data
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
      this.change.markForCheck();
    })
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
      this.generalService.activarGeneralGen(row.codigo).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.alertService.advertencia(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);
          this.listarGeneral(); 
        },
        error: error => {
           this.alertService.error(TITULO_MESAJES.ERROR_TITULO,error.error.message);
        }
      });
    });
  }

}
