import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/core/services/excel.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { EditPartidoComponent } from '../edit-partido/edit-partido.component';
import { VisorPartidoComponent } from '../visor-partido/visor-partido.component';
import { HistorialEditAdminComponent } from '../historial-edit-admin/historial-edit-admin.component';
import { Historial } from 'src/app/core/model/historial';

@Component({
  selector: 'app-historial-partido-admin',
  templateUrl: './historial-partido-admin.component.html',
  styleUrls: ['./historial-partido-admin.component.css']
})
export class HistorialPartidoAdminComponent implements OnInit {
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

    private partidoService: PartidoService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private change: ChangeDetectorRef,
    private mensjae: MensajeService,
    private historialService: HistorialService,
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
    this.user = this.loginService.getUser();
    this.listarPartidos();
  }
  async listarPartidos() {
    this.partidoService.listarPartidoPasados().subscribe((data) => {
      console.log(data)
      this.user = this.loginService.getUser();
      this.datosTabla = data.map((partido: any) => {
        const marcadorLocal = parseInt(partido.marcadorLocal, 10);
        const marcadorVisita = parseInt(partido.marcadorVisita, 10);

        let resultado = "🔄 Empate"; // Por defecto, empate
        if (marcadorLocal > marcadorVisita) {
          resultado = "✅ Victoria";
        } else if (marcadorLocal < marcadorVisita) {
          resultado = "❌ Derrota";
        }

        return { ...partido, resultado }; // Agrega la propiedad "resultado" al objeto partido
      });
      console.log(data);
      //  this.datosTabla = data;
      this.pagedData = data
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
      this.getUserInfo()
      this.change.markForCheck();
    });
  }

  async getUserInfo() {
    this.user = this.loginService.getUser();
    const userID = this.user.id;
    const usuarios = this.datosTabla.filter(item => item.id === this.user.id);
    this.xd = usuarios
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

  visor(row: any) {
    console.log(row)

    const dialogRef = this.dialog.open(VisorPartidoComponent, {
      width: '850px',
      disableClose: true,
      height: '450px',
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
    const dialogRef = this.dialog.open(HistorialEditAdminComponent, {
      width: '850px',
      disableClose: true,
      height: '450px',
      data: {
        row,
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarPartidos()
    })
  }

  volver(): void {
    this.route.navigate(['/administrador']);
  }



  exportarExcel() {
    // Crear el objeto del historial
    const historial: Historial = {
      usuario: this.loginService.getUser().username, // Usuario que realiza la acción
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de estudiantes a un archivo Excel.`,
    };

    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder con la exportación
        this.excel.descargarExcelPartidoDesactivo().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'datos_exportados.xlsx'; // Nombre del archivo Excel
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        });
      },
      error => {
        // Si hubo un error al registrar el historial, notificar al usuario pero permitir la exportación
        this.mensjae.MostrarBodyError("Error al registrar el historial: " + error);

        // Proceder con la exportación de datos
        this.excel.descargarExcelEstudiante().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'datos_exportados.xlsx'; // Nombre del archivo Excel
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        });
      }
    );
  }

  exportarPDF(): void {
    // Crear el objeto del historial
    const historial: Historial = {
      usuario: this.loginService.getUser().username, // Usuario que realiza la acción
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de estudiantes a un archivo PDF.`,
    };

    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder con la exportación
        this.pdfService.descargarPDFPartidoDesactivado().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'informe_partido_activados.pdf'; // Nombre del archivo PDF
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        });
      },
      error => {
        // Si hubo un error al registrar el historial, notificar al usuario pero permitir la exportación
        this.mensjae.MostrarBodyError("Error al registrar el historial: " + error);

        // Proceder con la exportación de datos
        this.pdfService.descargarPDFEstudiante().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'informe_estudiante.pdf'; // Nombre del archivo PDF
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        });
      }
    );
  }

  exportarPrint(): void {
    // Obtener los datos de partidos desactivados
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

      const fechaReporte = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });


      // Construir el HTML de la tabla con los datos de los partidos
      let contenidoHTML = `
        <table border="1">
   <tr style="background-color: #f8f9fa; color: #495057; font-weight: bold;">
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Equipo</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Marcador</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Equipo Rival</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Tipo de Partido</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Lugar</th>
           <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Resultado</th>
          </tr>`;

      contenidoAImprimir.forEach((partido: any) => {
        let marcadorLocal = parseInt(partido.marcadorLocal);
        let marcadorVisita = parseInt(partido.marcadorVisita);
        let resultado = marcadorLocal > marcadorVisita ? "✅ Victoria"
          : marcadorLocal < marcadorVisita ? "❌ Derrota"
            : "🔄 Empate";

        contenidoHTML += `
          <tr>
     
           <td style="padding: 8px; border: 1px solid #dee2e6;">${partido.equipo.nombre}</td>
           <td style="padding: 8px; border: 1px solid #dee2e6;">${partido.marcadorLocal} - ${partido.marcadorVisita}</td>
           <td style="padding: 8px; border: 1px solid #dee2e6;">${partido.equipoRival}</td>
           <td style="padding: 8px; border: 1px solid #dee2e6;">${partido.tipoPartido}</td>
          <td style="padding: 8px; border: 1px solid #dee2e6;">${partido.lugar}</td>
            <td style="padding: 8px; border: 1px solid #dee2e6;">${resultado}</td>
          </tr>`;
      });

      contenidoHTML += `</tbody></table>`;

      // Escribir el contenido en el iframe
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
         <h1 class="titulo-reporte">Reporte de Sede</h1>
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







}
