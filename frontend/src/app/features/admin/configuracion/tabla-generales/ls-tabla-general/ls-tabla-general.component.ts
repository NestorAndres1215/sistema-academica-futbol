import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/core/services/general.service';
import { VisorTbGeneralComponent } from '../visor-tb-general/visor-tb-general.component';
import { EditTbGeneralComponent } from '../edit-tb-general/edit-tb-general.component';
import { LtDevComponent } from '../lt-dev/lt-dev.component';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LstDesTbGeneralComponent } from '../lst-des-tb-general/lst-des-tb-general.component';
import { RegTbGeneralComponent } from '../reg-tb-general/reg-tb-general.component';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';
import { AlertService } from 'src/app/core/services/alert.service';
import { firstValueFrom } from 'rxjs';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-ls-tabla-general',
  templateUrl: './ls-tabla-general.component.html',
  styleUrls: ['./ls-tabla-general.component.css']
})
export class LsTablaGeneralComponent implements OnInit {
  botonesConfigTable = {
    actualizar: true,
    ver: true,
    desactivar: true,
    listado: true
  };

  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Clave', clave: 'clave' },
    { etiqueta: 'Descripción', clave: 'descripcion1' },
  ];

  verUsuariosDesactivados() {
    const dialogRef = this.dialog.open(LstDesTbGeneralComponent, {
      disableClose: true,
      width: '1050px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarGeneral()
    })
  }

  operar() {

    const dialogRef = this.dialog.open(RegTbGeneralComponent, {
      width: '550px',
      height: '300px',
      data: {
      },
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarGeneral()
    })
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
    private change: ChangeDetectorRef,
    private alertService: AlertService,
    private route: Router
  ) {
  }

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
    this.generalService.listarGeneralActivado().subscribe((data) => {
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
    });
  }

  editar(row: any) {

    const dialogRef = this.dialog.open(EditTbGeneralComponent, {
      disableClose: true,
      width: '550px',
      height: '550px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listarGeneral();
    });
  }

  listado(row: any) {
    const dialogRef = this.dialog.open(LtDevComponent, {
      disableClose: true,
      width: '1050px',
      height: '650px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listarGeneral

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


    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton !== 'CONFIRMAR') return;
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} desactivó un cargo de ${row.nombre}`
      };
      
      this.generalService.desactivarGeneral(row.codigo).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.alertService.advertencia(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);
          this.listarGeneral();
        },
      });
    });
  }
}
