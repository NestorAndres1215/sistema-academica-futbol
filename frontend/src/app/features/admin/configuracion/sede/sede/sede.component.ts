import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/core/services/excel.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';

import { EditSedeComponent } from '../edit-sede/edit-sede.component';
import { RegSedeComponent } from '../reg-sede/reg-sede.component';
import { VisorSedeComponent } from '../visor-sede/visor-sede.component';
import { LstDesSedeComponent } from '../lst-des-sede/lst-des-sede.component';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  botonesConfig = {
    editar: false,
    volver: true,

  };
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
  volver(): void {
    this.route.navigate(['/administrador']);
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
      if (result) {
        console.log('Elemento eliminado');
      }
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

    // Escucha el cierre del modal para actualizar la tabla
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

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarSede()
    })
  }
  exportarExcel() {
    // Crear el objeto de historial para registrar la exportación de Excel
    const historial: Historial = {
      usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de sedes a un archivo Excel.`
    };

    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder con la exportación del Excel
        this.excel.descargarExcelSede().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'datos_exportados_sedes.xlsx';  // Nombre del archivo Excel
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        });
      },
      error => {
        // Manejar error si no se pudo registrar el historial
        this.mensjae.MostrarBodyError('Error al registrar el historial: ' + error);
      }
    );
  }


  exportarPDF(): void {

    const historial: Historial = {
      usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de sedes a un archivo PDF.`
    };


    this.historialService.registrar(historial).subscribe(
      () => {
  
        this.pdfService.descargarPDFSede().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'informe_sedes.pdf';  // Nombre del archivo PDF
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        });
      },
      error => {
        this.mensjae.MostrarBodyError('Error al registrar el historial: ' + error);
      }
    );
  }

  exportarPrint(): void {
    // Suponiendo que this.datosTabla es un array o un objeto que quieres imprimir
    const contenidoAImprimir = this.datosTabla;

    if (contenidoAImprimir) {
      // Crear un iframe
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;

      // Encabezado del reporte
      const fechaReporte = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      // Convertir los datos en formato HTML
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

      // Escribir el contenido a imprimir en el iframe
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

      // Ejecutar el comando de impresión en el iframe
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

      // Crear el objeto de historial para registrar la eliminación de la sede
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
        detalle: `El usuario ${this.loginService.getUser().username} desactivó la sede ${row.nombre} con el código ${row.codigo}.`
      };

      // Registrar el historial
      this.historialService.registrar(historial).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder con la desactivación de la sede
          this.sede.desactivarSede(row.codigo).subscribe(result => {
            console.log(result);
            this.mensjae.MostrarMensajeExito("Se desactivó correctamente la sede.");
            this.listarSede(); // Actualizar la lista de sedes
          });
        },
        error => {
          // Manejar error si no se pudo registrar el historial
          this.mensjae.MostrarBodyError('Error al registrar el historial: ' + error);
        }
      );
    });
  }


  verSedeDesactivados() {
    const dialogRef = this.dialog.open(LstDesSedeComponent, {
      width: '1050px',
      height: '650px',
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarSede()
    })
  }
}
