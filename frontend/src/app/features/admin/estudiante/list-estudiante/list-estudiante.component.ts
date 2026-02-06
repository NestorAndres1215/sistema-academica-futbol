import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalEliminacionComponent } from '../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { EditEstudianteComponent } from '../edit-estudiante/edit-estudiante.component';
import { VisorEstudianteComponent } from '../visor-estudiante/visor-estudiante.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PdfService } from 'src/app/core/services/pdf.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { Router } from '@angular/router';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';
import { AlertService } from 'src/app/core/services/alert.service';
import { firstValueFrom } from 'rxjs';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-list-estudiante',
  templateUrl: './list-estudiante.component.html',
  styleUrls: ['./list-estudiante.component.css']
})
export class ListEstudianteComponent implements OnInit {

  user: any = null;
  xd: any
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 15, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalItems: number;
  pageSize = 5;
  listar: any

  constructor(
    private admin: EstudianteService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private change: ChangeDetectorRef,
    private alertService: AlertService,
    private historialService: HistorialService,
    private excel: ExcelService,
    private pdfService: PdfService,

  ) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.listarProfesor();
  }

  pageIndex = 0;


  listarProfesor(): void {
    this.admin.listarEstudianteActivado().subscribe((data: any[]) => {
      data = data.filter(item => item.codigo !== '0000');
      this.datosTabla = data.map(row => ({
        ...row,
        nombreCompleto: `${row.primerNombre} ${row.segundoNombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`
      }));

      this.totalItems = this.datosTabla.length;
      this.pageIndex = 0;
      this.updatePagedData();
      this.getUserInfo();
      this.change.markForCheck();
    });
  }

  async getUserInfo() {
    this.user = this.loginService.getUser();
    const usuarios = this.datosTabla.filter(item => item.id === this.user.id);
    this.xd = usuarios
  }

  pageSizeChanged() {
    this.paginator.firstPage();
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
  }

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.datosTabla.slice(startIndex, endIndex);
  }


  visor(row: any) {
  

    const dialogRef = this.dialog.open(VisorEstudianteComponent, {
      disableClose: true,
      width: '1050px',
      height: '550px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageSizeChanged()
      }
    });

  }
  editar(row: any) {
    const dialogRef = this.dialog.open(EditEstudianteComponent, {
      width: '1050px',
      disableClose: true,
      height: '550px',
      data: {
        row,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarProfesor()
      this.pageSizeChanged()
    })
  }

  exportarExcel() {

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de estudiantes a un archivo Excel.`,
    };

    this.excel.descargarExcelEstudiante().subscribe({
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
      error: (error) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });

  }
  botonesConfigTable = {
    actualizar: true,
    ver: true,
  };

  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Nombre', clave: 'primerNombre' },
    { etiqueta: 'Correo', clave: 'correo' },
    { etiqueta: 'Teléfono', clave: 'telefono' },
    { etiqueta: 'Nro Documento', clave: 'dni' },
    { etiqueta: 'Sede', clave: 'sede.nombre' }
  ];

  exportarPDF(): void {
    // Crear el objeto del historial
    const historial: Historial = {
      usuario: this.loginService.getUser().username, // Usuario que realiza la acción
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de estudiantes a un archivo PDF.`,
    };

    this.pdfService.descargarPDFEstudiante().subscribe({
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
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Nombre Completo</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">DNI</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Teléfono</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Correo</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Edad</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Sede</th>
          </tr>
        </thead>
        <tbody>`;

      contenidoAImprimir.forEach((item: any) => {
        contenidoHTML += `
          <tr>
   <td style="padding: 8px; border: 1px solid #dee2e6;">
  ${[item.primerNombre, item.segundoNombre, item.apellidoPaterno, item.apellidoMaterno].filter(Boolean).join(" ")}
</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${item.dni}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${item.telefono}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${item.correo}</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">${item.edad}</td>

<td style="padding: 8px; border: 1px solid #dee2e6;">
  ${item.sede?.nombre || 'No asignada'}
</td>

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
  margin: 2cm 1cm 2cm 1.5cm; /* Márgenes: arriba, derecha, abajo, izquierda */
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
         <h1 class="titulo-reporte">Reporte de Profesores</h1>
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
        subtitulo: `¿Deseas eliminar el usuario ${row.usuario.username} con el codigo ${row.codigo} ? `
      },
    });
    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;

      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} eliminó al estudiante ${row.usuario.username} con el código ${row.codigo}.`
      };
      this.admin.desactivarEstudiante(row.codigo).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.alertService.advertencia(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);
        },
      });
    })
  }


}
