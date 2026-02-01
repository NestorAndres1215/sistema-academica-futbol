import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/core/services/admin.service';
import { LoginService } from 'src/app/core/services/login.service';
import { VisorUsuarioComponent } from '../visor-usuario/visor-usuario.component';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // Asegúrate de que esté importado
import { ExcelService } from 'src/app/core/services/excel.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { ModalEliminacionComponent } from '../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';

import { MensajeService } from 'src/app/core/services/mensaje.service';
import { LsDesUsuarioComponent } from '../ls-des-usuario/ls-des-usuario.component';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';

@Component({
  selector: 'app-lst-usuario',
  templateUrl: './lst-usuario.component.html',
  styleUrls: ['./lst-usuario.component.css']
})
export class LstUsuarioComponent implements OnInit {
 botonesConfig = {
    editar: false,
    volver: true,

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
    private admin: AdminService,
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
    this.listarUsuario();
  }
  async listarUsuario() {
    this.admin.listarAdminActivado().subscribe((data) => {
      console.log(data)
      this.user = this.loginService.getUser();
      console.log(this.user.ul_codigo)
      data = data.filter(item => item.codigo !== this.user.ul_codigo);
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

    const dialogRef = this.dialog.open(VisorUsuarioComponent, {
      disableClose: true,
      width: '1050px',
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
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      disableClose: true,
      width: '1050px',
      height: '450px',
      data: {
        row,
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarUsuario()
    })
  }
  volver(): void {
    this.route.navigate(['/administrador']);
  }


  // Método para exportar a Excel
  exportarExcel() {
    // Crear el objeto de historial
    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de los administradores a un archivo Excel.`
    };

    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder con la exportación
        this.excel.descargarExcelAdmin().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'datos_exportados.xlsx';  // Nombre del archivo Excel
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        });
      },
      error => {
        this.mensjae.MostrarBodyError("Error al registrar el historial: " + error); // Manejar el error de historial
      }
    );
  }

  // Método para exportar a PDF
  exportarPDF(): void {
    // Crear el objeto de historial
    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de los usuarios a un archivo PDF.`
    };

    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder con la exportación
        this.pdfService.descargarPDFUsuario().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'informe_usuarios.pdf'; // Nombre del archivo PDF
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        });
      },
      error => {
        this.mensjae.MostrarBodyError("Error al registrar el historial: " + error); // Manejar el error de historial
      }
    );
  }

  exportarPrint(): void {
    // Suponiendo que this.datostabla es un array o un objeto que quieres imprimir
    const contenidoAImprimir = this.datosTabla;

    if (contenidoAImprimir) {
      // Crear un iframe
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;

      // Convertir los datos en formato HTML (esto puede variar dependiendo del formato de 'this.datostabla')
      let contenidoHTML = '<table border="1"><tr><th>Primer Nombre</th><th>Segundo Nombre</th><th>Apellido Paterno</th><th>Apellido Materno</th><th>DNI</th><th>Teléfono</th><th>Correo</th><th>Dirección</th><th>Edad</th></tr>';

      contenidoAImprimir.forEach((item: any) => {
        contenidoHTML += `
          <tr>
            <td>${item.primerNombre}</td>
            <td>${item.segundoNombre}</td>    
            <td>${item.apellidoPaterno}</td>
            <td>${item.apellidoMaterno}</td>
            <td>${item.dni}</td>
            <td>${item.telefono}</td>
            <td>${item.correo}</td>
            <td>${item.direccion}</td>
            <td>${item.edad}</td>
          </tr>`;
      });

      contenidoHTML += '</table>';

      // Escribir el contenido a imprimir en el iframe
      iframeDoc?.open();
      iframeDoc?.write(`
        <html>
          <head>
            <style>
              /* Aquí puedes agregar estilos para la impresión si es necesario */
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
              h1 { text-align: center; }
            </style>
          </head>
          <body>
            <h1 style="text-align: center;">Detalles de los Usuarios</h1> <!-- Título -->
            ${contenidoHTML}
          </body>
        </html>
      `);
      iframeDoc?.close();

      // Ejecutar el comando de impresión en el iframe
      iframe.contentWindow?.print();

      // Eliminar el iframe después de la impresión
      document.body.removeChild(iframe);
    }
  }
  exportarReporteAdministradores(): void {
    // Verificar que existan datos para imprimir
    if (!this.datosTabla || this.datosTabla.length === 0) {
      console.warn('No hay datos disponibles para generar el reporte');
      return;
    }

    // Crear iframe para la impresión
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

    // Generar tabla HTML con estilos profesionales
    let tablaHTML = `
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: 'Arial', sans-serif;">
        <thead>
            <tr style="background-color: #f8f9fa; color: #495057; font-weight: bold;">
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">N°</th>
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">DNI</th>
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Nombre Completo</th>
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Contacto</th>
                <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Edad</th>
            </tr>
        </thead>
        <tbody>`;

    // Llenar la tabla con datos
    this.datosTabla.forEach((usuario: any, index: number) => {
      const nombreCompleto = `
            ${usuario.primerNombre} 
            ${usuario.segundoNombre || ''} 
            ${usuario.apellidoPaterno} 
            ${usuario.apellidoMaterno || ''}
        `.replace(/\s+/g, ' ').trim();

      tablaHTML += `
        <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${index + 1}</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${usuario.dni}</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${nombreCompleto}</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">
                Tel: ${usuario.telefono}<br>
                Email: ${usuario.correo}<br>
                Dirección: ${usuario.direccion}
            </td>
            <td style="padding: 10px; border: 1px solid #dee2e6; text-align: center;">${usuario.edad}</td>
        </tr>`;
    });

    tablaHTML += `</tbody></table>`;

    // Contenido completo del documento
    const contenidoCompleto = `
    <html>
        <head>
            <title>Reporte de Administradores</title>
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
                <h1 class="titulo-reporte">REPORTE DE  ADMINISTRADORES</h1>
                <div class="fecha-reporte">Generado el ${fechaReporte}</div>
            </div>
            
            ${tablaHTML}
            
            <div class="footer">
                Academia Santos FC © ${new Date().getFullYear()}
            </div>
        </body>
    </html>`;

    // Escribir el contenido en el iframe
    iframeDoc?.open();
    iframeDoc?.write(contenidoCompleto);
    iframeDoc?.close();

    // Imprimir y limpiar
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      document.body.removeChild(iframe);
    }, 300);
  }
  eliminar(row: any) {
    console.log(row.codigo);
    console.log(this.user.us_codigo);

    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      disableClose: true,
      width: '500px',
      data: {
        row,
        titulo: 'Eliminar',
        subtitulo: `¿Deseas eliminar el usuario ${row.username} con el código ${row.codigo}?`
      },
    });

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;

      // Primero desactivamos al usuario
      this.admin.desactivarAdmin(row.codigo).subscribe(result => {
        console.log(result);
        this.mensjae.MostrarMensajeExito("Se desactivó correctamente el usuario");

        // Después de desactivar, registramos el historial
        const historial: Historial = {
          usuario: this.loginService.getUser().username,
          detalle: `El usuario ${this.loginService.getUser().username} desactivó al usuario con el código ${row.codigo} y nombre de usuario ${row.username}.`
        };

        // Registrar el historial
        this.historialService.registrar(historial).subscribe(
          () => {
            // Si se registra el historial con éxito, refrescar la lista de usuarios
            this.listarUsuario();
          },
          error => {
            this.mensjae.MostrarBodyError("Error al registrar el historial: " + error); // Manejar el error de historial
          }
        );
      });
    });
  }



  verUsuariosDesactivados() {
    const dialogRef = this.dialog.open(LsDesUsuarioComponent, {
      disableClose: true,
      width: '1050px',
      height: '650px',
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarUsuario()
    })
  }


}
