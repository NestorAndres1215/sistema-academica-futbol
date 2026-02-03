import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/core/services/admin.service';
import { LoginService } from 'src/app/core/services/login.service';
import { VisorUsuarioComponent } from '../visor-usuario/visor-usuario.component';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';
import { Router } from '@angular/router';
import 'jspdf-autotable';
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
  
  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Nombre', clave: 'primerNombre' },
    { etiqueta: 'Usuario', clave: 'usuario.username' },
    { etiqueta: 'Correo', clave: 'correo' },
    { etiqueta: 'Teléfono', clave: 'telefono' },
    { etiqueta: 'DNI', clave: 'dni' },
    { etiqueta: 'Dirección', clave: 'direccion' }
  ];

  botonesConfigTable = {
    actualizar: true,
    ver: true,
  };
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

    dialogRef.afterClosed().subscribe(data => {
      this.listarUsuario()
    })
  }

  volver(): void {
    this.route.navigate(['/administrador']);
  }


  exportarExcel() {

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de los administradores a un archivo Excel.`
    };


    this.historialService.registrar(historial).subscribe(
      () => {

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


  exportarPDF(): void {

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} exportó los datos de los usuarios a un archivo PDF.`
    };

    this.historialService.registrar(historial).subscribe(
      () => {

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

  exportarReporteAdministradores(): void {
    if (!this.datosTabla || this.datosTabla.length === 0) {
      console.warn('No hay datos disponibles para generar el reporte');
      return;
    }

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

    iframeDoc?.open();
    iframeDoc?.write(contenidoCompleto);
    iframeDoc?.close();

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
      this.admin.desactivarAdmin(row.codigo).subscribe(result => {
        this.mensjae.MostrarMensajeExito("Se desactivó correctamente el usuario");

        const historial: Historial = {
          usuario: this.loginService.getUser().username,
          detalle: `El usuario ${this.loginService.getUser().username} desactivó al usuario con el código ${row.codigo} y nombre de usuario ${row.username}.`
        };

        this.historialService.registrar(historial).subscribe(
          () => {

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
    dialogRef.afterClosed().subscribe(data => {
      this.listarUsuario()
    })
  }


}
