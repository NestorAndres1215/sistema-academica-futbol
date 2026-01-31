import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalEliminacionComponent } from '../../components/modal-eliminacion/modal-eliminacion.component';
import { EditEquipoComponent } from '../edit-equipo/edit-equipo.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { Router } from '@angular/router';
import { VisorEqupoComponent } from '../visor-equpo/visor-equpo.component';

import { LsDesEquipoComponent } from '../ls-des-equipo/ls-des-equipo.component';
import { GeneralService } from 'src/app/core/services/general.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { RegERquipoComponent } from '../reg-erquipo/reg-erquipo.component';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';

@Component({
  selector: 'app-mant-equipo',
  templateUrl: './mant-equipo.component.html',
  styleUrls: ['./mant-equipo.component.css']
})
export class MantEquipoComponent implements OnInit {

  sedes: any[] = []; // Lista de sedes
  generos: any[] = []; // Lista de sedes
  sedeSeleccionada: string = ''; // Código de la sede seleccionada
  generoSeleccionado: string = '';
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
    private equipoServuce: EquipoService,
    private dialog: MatDialog,
    private generales: GeneralService, private sede: SedeService,
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
  usuariosFiltrados: any[] = [];
  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.listaGenero()
    this.listarSede()

    this.listarProdesor();
  }
  filtro: string = '';
  filtrarUsuarios(): void {
    console.log(this.listar);
    if (!this.listar || this.listar.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }

    const term = this.filtro.toLowerCase(); // Convierte el texto del filtro a minúsculas

    this.usuariosFiltrados = this.listar.filter((usuario) => {
      // Filtrar por nombre
      const coincideConTexto =
        (usuario.nombre && usuario.nombre.toLowerCase().includes(term));

      // Filtrar por sede
      const coincideConSede =
        !this.sedeSeleccionada || (usuario.sede && usuario.sede.toLowerCase() === this.sedeSeleccionada.toLowerCase());

      // Filtrar por género
      const coincideConGenero =
        !this.generoSeleccionado ||
        (this.generoSeleccionado === 'F' && usuario.genero.toLowerCase() === 'femenino') ||
        (this.generoSeleccionado === 'M' && usuario.genero.toLowerCase() === 'masculino');

      // Imprimir información para depuración
      console.log(usuario.genero);
      console.log(coincideConGenero);
      console.log(coincideConTexto, coincideConSede, coincideConGenero);

      return coincideConTexto && coincideConSede && coincideConGenero; // Filtrar por texto, sede y género
    });
  }
  async listarProdesor() {
    this.equipoServuce.listarActivado().subscribe((data) => {
      console.log(data)
      this.user = this.loginService.getUser();

      console.log(data);
      this.datosTabla = data;
      this.pagedData = data
      this.listar = data
      this.usuariosFiltrados = [...this.listar];
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
    this.usuariosFiltrados = this.datosTabla.slice(startIndex, endIndex);
  }

  visor(row: any) {
    console.log(row)

    const dialogRef = this.dialog.open(VisorEqupoComponent, {
      disableClose: true,
      width: '650px',
      height: '600px',
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
    const dialogRef = this.dialog.open(EditEquipoComponent, {

      disableClose: true,
      width: '650px',
      height: '600px',
      data: {
        row,
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarProdesor()
    })
  }

  operar() {
    const dialogRef = this.dialog.open(RegERquipoComponent, {
      disableClose: true,
      width: '650px',
      height: '500px',
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
        this.excel.descargarExcelEquipo().subscribe((data: Blob) => {
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
        this.pdfService.descargarPDFEquipo().subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const urlBlob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = 'informe_datos.pdf'; // Nombre del archivo PDF
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
    const contenidoAImprimir = this.usuariosFiltrados;



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


      let contenidoHTML = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: 'Arial', sans-serif;">
        <thead>
          <tr style="background-color: #f8f9fa; color: #495057; font-weight: bold;">
           <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Nombre del Equipo</th>
           <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Categoria</th>
           <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Sede</th>
           <th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Genero</th>
        
          </tr>
        </thead>
        <tbody>`;
      contenidoAImprimir.forEach((equipo: any) => {
        contenidoHTML += `
          <tr>
            <td style="padding: 8px; border: 1px solid #dee2e6;">${equipo.nombre}</td>
          <td style="padding: 8px; border: 1px solid #dee2e6;">${equipo.categoria}</td>
            <td style="padding: 8px; border: 1px solid #dee2e6;">${equipo.sede}</td>
           <td style="padding: 8px; border: 1px solid #dee2e6;">${equipo.genero}</td>   
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
         <h1 class="titulo-reporte">Reporte de Equipo</h1>
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
        subtitulo: `¿Deseas eliminar el usuario ${row.nombre} con el codigo ${row.codigo} ? `
      },
    });
    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;
      this.equipoServuce.desactivar(row.codigo).subscribe(result => {
        console.log(result);
        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Usuario que realiza la acción
          detalle: `El usuario ${this.loginService.getUser().username} eliminó al estudiante ${row.nombre} con el código ${row.codigo}.`
        };
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensjae.MostrarMensaje("Se desactivó correctamente el estudiante.");
            this.listarProdesor();
          },
          error => {
            this.mensjae.MostrarBodyError(error);
          }
        );

      });

    })
  }


  verUsuariosDesactivados() {
    const dialogRef = this.dialog.open(LsDesEquipoComponent, {
      disableClose: true,
      width: '1450px',
      height: '650px',
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarProdesor()
    })
  }

  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.generos = data;

    })
  }
  listarSede(): void {
    this.sede.listarSedeActivado().subscribe(
      (data) => {
        this.sedes = data;
      },
      (error) => {
        console.error('Error al listar las sedes', error);
      }
    );
  }

}
