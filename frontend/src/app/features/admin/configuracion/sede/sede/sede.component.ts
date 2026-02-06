import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/core/services/excel.service';

import { PdfService } from 'src/app/core/services/pdf.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';

import { EditSedeComponent } from '../edit-sede/edit-sede.component';
import { RegSedeComponent } from '../reg-sede/reg-sede.component';
import { VisorSedeComponent } from '../visor-sede/visor-sede.component';

import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';
import { AlertService } from 'src/app/core/services/alert.service';
import { firstValueFrom } from 'rxjs';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Nombre', clave: 'nombre' },
    { etiqueta: 'Direccion', clave: 'direccion' },
    { etiqueta: 'Telefono', clave: 'telefono' },
  ];
  botonesConfigTable = {
    actualizar: true,
    ver: true,
  };

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
    private sede: SedeService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private historialService: HistorialService,
    private change: ChangeDetectorRef,
    private alertService: AlertService,
    private excel: ExcelService,
    private pdfService: PdfService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.listarSede()
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

  async listarSede() {
    this.sede.listarSedeActivado().subscribe((data) => {
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

    const dialogRef = this.dialog.open(VisorSedeComponent, {
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
    const dialogRef = this.dialog.open(EditSedeComponent, {
      width: '550px',
      height: '550px',
      data: {
        row,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarSede()
    })
  }

  operar() {
    const dialogRef = this.dialog.open(RegSedeComponent, {
      width: '550px',
      height: '450px',
      data: {

      },
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarSede()
    })
  }

  exportarExcel() {

    const historial: Historial = {
      usuario: this.loginService.getUser().username, 
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de sedes a un archivo Excel.`
    };

  this.excel.descargarExcelSede().subscribe({
      next: async (data: Blob) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        await firstValueFrom(this.historialService.registrar(historial));
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'datos_exportados.xlsx';
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el Excel', err);
      }
    });

  }


  exportarPDF(): void {

    const historial: Historial = {
      usuario: this.loginService.getUser().username, 
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de sedes a un archivo PDF.`
    };

    this.pdfService.descargarPDFSede().subscribe({
      next: async (data: Blob) => {
        await firstValueFrom(this.historialService.registrar(historial));
        const blob = new Blob([data], { type: 'application/pdf' });
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = 'informe_datos.pdf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(urlBlob);
        document.body.removeChild(a);
      },
      error: (error) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });
  }

  exportarPrint(): void {
   
    const contenidoAImprimir = this.datosTabla;

    if (contenidoAImprimir) {

      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;

      const fechaReporte = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      let contenidoHTML = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: 'Arial', sans-serif;">
        <thead>
          <tr style="background-color: #f8f9fa; color: #495057; font-weight: bold;">
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Código</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Nombre</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Descripción</th>
          </tr>
        </thead>
        <tbody>`;

      contenidoAImprimir.forEach((item: any) => {
        contenidoHTML += `
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${item.codigo}</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${item.nombre}</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${item.descripcion}</td>
          </tr>`;
      });

      contenidoHTML += `</tbody></table>`;

      iframeDoc?.open();
      iframeDoc?.write(`
        <html>
          <head>
            <style>
              @page {
                size: A4;
                margin: 2cm;
              }
              body {
                font-family: 'Arial', sans-serif;
                color: #333;
                line-height: 1.6;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #007bff;
                padding-bottom: 10px;
              }
              .titulo-reporte {
                color: #007bff;
                margin-bottom: 5px;
              }
              .fecha-reporte {
                color: #6c757d;
                font-size: 0.9em;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 0.8em;
                color: #6c757d;
                border-top: 1px solid #dee2e6;
                padding-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 class="titulo-reporte">Reporte de los Cargos</h1>
              <div class="fecha-reporte">Generado el ${fechaReporte}</div>
            </div>
            
            ${contenidoHTML}
            
            <div class="footer">
              Academia Santos FC © ${new Date().getFullYear()}
            </div>
          </body>
        </html>
      `);
      iframeDoc?.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 300);
    }
  }

  eliminar(row: any) {
    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      width: '500px',
      data: {
        row,
        titulo: 'Eliminar',
        subtitulo: `¿Deseas eliminar el sede ${row.nombre} con el código ${row.codigo}?`
      },
    });

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;

      const historial: Historial = {
        usuario: this.loginService.getUser().username, 
        detalle: `El usuario ${this.loginService.getUser().username} desactivó la sede ${row.nombre} con el código ${row.codigo}.`
      };

      this.sede.desactivarSede(row.codigo).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.alertService.advertencia(TITULO_MESAJES.DESACTIVADO, MENSAJES.DESACTIVADO);
          this.listarSede();
        },
      });
    });
  }

 
}
