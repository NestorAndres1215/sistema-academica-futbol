import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LisDesClaseComponent } from '../lis-des-clase/lis-des-clase.component';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ClaseService } from 'src/app/core/services/clase.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/core/services/excel.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { EditEstudianteComponent } from '../../estudiante/edit-estudiante/edit-estudiante.component';
import { VisorEstudianteComponent } from '../../estudiante/visor-estudiante/visor-estudiante.component';
import { VisorClaseComponent } from '../visor-clase/visor-clase.component';
import { EditClaseComponent } from '../edit-clase/edit-clase.component';
import { Historial } from 'src/app/core/model/historial';

@Component({
  selector: 'app-ls-clase',
  templateUrl: './ls-clase.component.html',
  styleUrls: ['./ls-clase.component.css']
})
export class LsClaseComponent implements OnInit {


  user: any = null;
  xd: any
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalItems: number;
  pageSize = 5;
  listar: any

   botonesConfig = {
    editar: false,
    volver: true,

  };

  constructor(
    private claseService: ClaseService,
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
    this.listarProdesor();
  }
  async listarProdesor() {
    this.claseService.listarClaseActivado().subscribe((data) => {
      console.log(data)
      data = data.filter(item => item.codigo !== '0000');
      this.user = this.loginService.getUser();

      console.log(data);
      this.datosTabla = data;
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

    const dialogRef = this.dialog.open(VisorClaseComponent, {
      disableClose: true,
      width: '950px',
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
    const dialogRef = this.dialog.open(EditClaseComponent, {
      width: '1090px',
      disableClose: true,
      height: '500px',
      data: {
        row,
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarProdesor()
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
        this.excel.descargarExcelClase().subscribe((data: Blob) => {
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
        this.pdfService.descargarPDFClase().subscribe((data: Blob) => {
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
    // Suponiendo que this.datosTabla contiene los datos de las clases
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


      // Convertir los datos en formato HTML
      let contenidoHTML = `
 <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: 'Arial', sans-serif;">
   <thead>
     <tr style="background-color: #f8f9fa; color: #495057; font-weight: bold;">
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Código</th>
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Nombre</th>
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Equipo</th>
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Genero</th>
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Inicio Hora</th>
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Fin Hora</th>
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Fecha Inicio</th>
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Fecha Fin</th>
      <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Dia</th>
     </tr>
   </thead>
   <tbody>`;

      contenidoAImprimir.forEach((clase: any) => {
        contenidoHTML += `
     <tr>


<td style="padding: 8px; border: 1px solid #dee2e6;">${clase.codigo}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${clase.nombre}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${clase.equipo.nombre}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${clase.equipo.genero}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">
  ${clase.horario.inicioHora ? clase.horario.inicioHora : 'No asignada'}
</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">
  ${clase.horario.finHora ? clase.horario.finHora : 'No asignada'}
</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${clase.inicio}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${clase.fin}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${clase.dia}</td>

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
         <h1 class="titulo-reporte">Reporte de Clases</h1>
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


  verUsuariosDesactivados() {
    const dialogRef = this.dialog.open(LisDesClaseComponent, {
      disableClose: true,
      width: '1350px',
      height: '450px',
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarProdesor()
    })
  }



}
