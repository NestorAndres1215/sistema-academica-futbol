import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { VisorProfesorComponent } from '../visor-profesor/visor-profesor.component';
import { Respuesta } from 'src/app/model/respuesta';
import { ModalEliminacionComponent } from '../../components/modal-eliminacion/modal-eliminacion.component';
import { LstDesProfesorComponent } from '../lst-des-profesor/lst-des-profesor.component';
import { PdfService } from 'src/app/services/pdf.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProfesorService } from 'src/app/services/profesor.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Router } from '@angular/router';
import { EditProfesorComponent } from '../edit-profesor/edit-profesor.component';
import { HistorialService } from 'src/app/services/historial.service';
import { Historial } from 'src/app/model/historial';

@Component({
  selector: 'app-lst-profesores',
  templateUrl: './lst-profesores.component.html',
  styleUrls: ['./lst-profesores.component.css']
})
export class LstProfesoresComponent implements OnInit {

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
    private admin: ProfesorService,
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
    this.user = this.loginService.getUser();
    this.listarProdesor();
  }
  async listarProdesor() {
    this.admin.listarProfesorActivado().subscribe((data) => {
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

    const dialogRef = this.dialog.open(VisorProfesorComponent, {
      disableClose: true,
      width: '1050px',
      height: '550px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pageSizeChanged()

    });

  }
  editar(row: any) {
    const dialogRef = this.dialog.open(EditProfesorComponent, {
      width: '1050px',
      disableClose: true,
      height: '550px',
      data: {
        row,
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarProdesor()
      this.pageSizeChanged()
    })
  }
  volver(): void {
    this.route.navigate(['/administrador']);
  }


  exportarExcel(): void {
    // Crear el historial antes de exportar el Excel
    const usuario = this.loginService.getUser().username; // Obtener el nombre de usuario del servicio de login
    const historial: Historial = {
      usuario: usuario,
      detalle: `El usuario ${usuario} descargó el informe de profesores en formato Excel.`
    };

    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder a descargar el Excel
        this.excel.descargarExcelProfesor().subscribe((data: Blob) => {
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
        }, error => {
          this.mensjae.MostrarBodyError('Error al descargar el archivo Excel: ' + error);
        });
      },
      error => {
        this.mensjae.MostrarBodyError('Error al registrar el historial: ' + error);
      }
    );
  }



  exportarPDF(): void {
    // Crear el historial antes de exportar el PDF
    const usuario = this.loginService.getUser().username; // Obtener el nombre de usuario del servicio de login
    const historial: Historial = {
      usuario: usuario,
      detalle: `El usuario ${usuario} descargó el informe de cargos en formato PDF.`
    };

    // Registrar el historial
    this.historialService.registrar(historial).subscribe(
      () => {
        // Si el historial se registra correctamente, proceder a descargar el PDF
        this.pdfService.descargarPDFProfesor().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'informe_cargo.pdf'; // Nombre del archivo PDF
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(urlBlob);
          document.body.removeChild(a);
        }, error => {
          this.mensjae.MostrarBodyError('Error al descargar el PDF: ' + error);
        });
      },
      error => {
        this.mensjae.MostrarBodyError('Error al registrar el historial: ' + error);
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
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);


      const iframeDoc = iframe.contentWindow?.document;

      const fechaReporte = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });


      // Convertir los datos en formato HTML (esto puede variar dependiendo del formato de 'this.datostabla')
      let contenidoHTML = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: 'Arial', sans-serif;">
        <thead>
          <tr style="background-color: #f8f9fa; color: #495057; font-weight: bold;">
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Nombre Completo</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">DNI</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Teléfono</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Correo</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Edad</th>
            <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Cargo</th>
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
  ${item.cargo?.nombre || 'No asignado'}
</td>
<td style="padding: 8px; border: 1px solid #dee2e6;">
  ${item.sede?.nombre || 'No asignada'}
</td>

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
    console.log(row.usuario.username)

    console.log(row)


    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      disableClose: true,
      width: '500px',
      data: {
        row,
        titulo: 'Restaurar',
        subtitulo: `¿Deseas restaurar el usuario ${row.usuario.username} con el codigo ${row.codigo} ? `
      },

    });
    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;
      this.admin.desactivarProfesor(row.codigo).subscribe(result => {
        console.log(result);

        // Crear el historial después de activar al usuario
        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
          detalle: `El usuario ${this.loginService.getUser().username} desactivo  al profesor ${row.usuario.username} con el código ${row.codigo}.`
        };

        // Registrar el historial
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensjae.MostrarMensajeExito("Se restauró correctamente el usuario");
            this.listarProdesor(); // Refrescar la lista de usuarios desactivados
          },
          error => {
            this.mensjae.MostrarBodyError('Error al registrar el historial: ' + error);
          }
        );
      }, error => {
        this.mensjae.MostrarBodyError('Error al restaurar el usuario: ' + error);
      });

    })
  }



  verUsuariosDesactivados() {
    const dialogRef = this.dialog.open(LstDesProfesorComponent, {
      disableClose: true,
      width: '1450px',
      height: '650px',
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarProdesor()
    })
  }




}
