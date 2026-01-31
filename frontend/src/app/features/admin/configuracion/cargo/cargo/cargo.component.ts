import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CargoService } from 'src/app/core/services/cargo.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { VisorCargoComponent } from '../visor-cargo/visor-cargo.component';
import { EditCargoComponent } from '../edit-cargo/edit-cargo.component';
import { RegCargoComponent } from '../reg-cargo/reg-cargo.component';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';

import { LstDesCargoComponent } from '../lst-des-cargo/lst-des-cargo.component';

import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {





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
    private cargo: CargoService,
    private dialog: MatDialog,
    private historialService: HistorialService,
    private loginService: LoginService,
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
    this.listarCargo()
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



  async listarCargo() {
    this.cargo.listarCargoActivado().subscribe((data) => {
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

    const dialogRef = this.dialog.open(VisorCargoComponent, {
      disableClose: true,
      width: '550px',
      height: '450px',
      data: {
        row,
      }
    });
  }
  editar(row: any) {
    const dialogRef = this.dialog.open(EditCargoComponent, {
      disableClose: true,
      width: '750px',
      height: '480px',
      data: {
        row,
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarCargo()
    })
  }

  operar() {
    const dialogRef = this.dialog.open(RegCargoComponent, {
      disableClose: true,
      width: '550px',
      height: '330px',
      data: {

      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarCargo()
    })
  }
  exportarExcel() {
    // Crear el historial antes de exportar el Excel
    const historial: Historial = {
      usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
      detalle: `El usuario ${this.loginService.getUser().username} descargó el informe de cargos en formato Excel.`
    };
  
    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder a exportar el archivo Excel
        this.excel.descargarExcelCargo().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'datos_exportados_cargo.xlsx';  // Nombre del archivo Excel
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
  



  exportarPDF(): void {
    // Crear el historial antes de exportar el PDF
    const historial: Historial = {
      usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
      detalle: `El usuario ${this.loginService.getUser().username} descargó el informe de cargos en formato PDF.`
    };

    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder a descargar el PDF
        this.pdfService.descargarPDFCargo().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'informe_cargo.pdf';
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
              <h1 class="titulo-reporte">Detalles de los Cargos</h1>
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
        subtitulo: `¿Deseas eliminar el sede ${row.nombre} con el codigo ${row.codigo} ? `
      },

    });
    console.log(row)

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton !== 'CONFIRMAR') return;

      this.cargo.desactivarCargo(row.codigo).subscribe(result => {
        // Crear el historial
        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
          detalle: `El usuario ${this.loginService.getUser().username} desactivó un cargo de ${row.nombre}`
        };

        console.log(historial);

        // Registrar el historial
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensjae.MostrarMensajeExito("Se desactivó correctamente el cargo ");
            this.listarCargo(); // Actualizar la lista de cargos
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

  verSedeDesactivados() {
    const dialogRef = this.dialog.open(LstDesCargoComponent, {
      width: '1050px',
      height: '650px',
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarCargo()
    })
  }
}
