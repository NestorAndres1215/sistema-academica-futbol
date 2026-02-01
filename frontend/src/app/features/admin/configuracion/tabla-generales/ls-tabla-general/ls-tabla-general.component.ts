import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/core/services/excel.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { VisorTbGeneralComponent } from '../visor-tb-general/visor-tb-general.component';
import { EditTbGeneralComponent } from '../edit-tb-general/edit-tb-general.component';
import { LtDevComponent } from '../lt-dev/lt-dev.component';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';

import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LstDesTbGeneralComponent } from '../lst-des-tb-general/lst-des-tb-general.component';
import { RegSedeComponent } from '../../sede/reg-sede/reg-sede.component';
import { RegTbGeneralComponent } from '../reg-tb-general/reg-tb-general.component';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';

@Component({
  selector: 'app-ls-tabla-general',
  templateUrl: './ls-tabla-general.component.html',
  styleUrls: ['./ls-tabla-general.component.css']
})
export class LsTablaGeneralComponent implements OnInit {


   botonesConfig = {
    editar: false,
    volver: true,
  };

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
  volver(): void {
    this.route.navigate(['/administrador']);
  }
  operar() {

    const dialogRef = this.dialog.open(RegTbGeneralComponent, {
      width: '550px',
      height: '300px',
      data: {

      },
    });

    // Escucha el cierre del modal para actualizar la tabla
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
    private mensjae: MensajeService,
    private excel: ExcelService,
    private pdfService: PdfService,
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
    this.generalService.listarGeneralActivado().subscribe((data) => {
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
    console.log(row)

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton !== 'CONFIRMAR') return;

      this.generalService.desactivarGeneral(row.codigo).subscribe(result => {
        // Crear el historial
        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
          detalle: `El usuario ${this.loginService.getUser().username} desactivó un cargo de ${row.nombre}`
        };

        console.log(historial);

        // Registrar el historial
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensjae.MostrarMensajeExito("Se desactivó correctamente las tabla general");
            this.listarGeneral(); // Actualizar la lista de cargos
          },
          error => {
            this.mensjae.MostrarBodyError(error); // Manejar error al registrar el historial
          }
        );
      }, error => {
        this.mensjae.MostrarBodyError(error); // Manejar error al desactivar el cargo
      });
    });

  }



}
