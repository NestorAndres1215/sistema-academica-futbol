import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { VisorTbGeneralComponent } from '../visor-tb-general/visor-tb-general.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LsTablaGeneralComponent } from '../ls-tabla-general/ls-tabla-general.component';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lst-des-tb-general',
  templateUrl: './lst-des-tb-general.component.html',
  styleUrls: ['./lst-des-tb-general.component.css']
})
export class LstDesTbGeneralComponent implements OnInit {

  volver() {
    this.dialogRe.close();
  }

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

    private route: Router
  ) {
    this.pageChanged({
      pageIndex: 0, pageSize: this.pageSize,
      length: 0
    });
  }

  ngOnInit(): void {
    this.listarGeneral()
  }

  pageSizeChanged() {
    this.paginator.firstPage();
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
  }


  pageChanged(event: PageEvent) {
    console.log(event)
    this.totalItems = this.datosTabla.length
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedData = this.datosTabla.slice(startIndex, endIndex);
  }
  async listarGeneral() {
    this.generalService.listarGeneralDesactivado().subscribe((data) => {
      console.log(data)
      this.datosTabla = data;
      this.pagedData = data
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });

      this.change.markForCheck();
    })
  }

  visor(row: any) {
    console.log(row)

    const dialogRef = this.dialog.open(VisorTbGeneralComponent, {
      disableClose: true,
      width: '550px',
      height: '550px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Elemento eliminado');
      }
    });

  }


  eliminar(row: any) {
    console.log(row)
    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      width: '500px',
      data: {
        row,
        titulo: 'Eliminar',
        subtitulo: `¿Deseas eliminar el tabla general  ${row.descripcion1} con el codigo ${row.codigo} ? `
      },

    });
    console.log(row)

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton !== 'CONFIRMAR') return;
      const historial: Historial = {
        usuario: this.loginService.getUser().username, 
        detalle: `El usuario ${this.loginService.getUser().username} desactivó un cargo de ${row.nombre}`
      };
      this.generalService.activarGeneral(row.codigo).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.alertService.advertencia(TITULO_MESAJES.DESACTIVADO, MENSAJES.DESACTIVADO);
          this.listarGeneral();
        },
      });

    });

  }


}
