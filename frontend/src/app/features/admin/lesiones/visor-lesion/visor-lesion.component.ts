import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LsLesionesComponent } from '../ls-lesiones/ls-lesiones.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LesionService } from 'src/app/core/services/lesion.service';
import { VisorLesiondetComponent } from '../visor-lesiondet/visor-lesiondet.component';

@Component({
  selector: 'app-visor-lesion',
  templateUrl: './visor-lesion.component.html',
  styleUrls: ['./visor-lesion.component.css']
})
export class VisorLesionComponent implements OnInit {

  virsor(row) {
    this.dialog.open(VisorLesiondetComponent, {
      disableClose: true,
      width: '1020px',
      height: '450px',
      data: { row },
    });
  }
  
  formulario: UntypedFormGroup;
  lista: any;
  cerrar() {
    this.dialogRe.close();
  }
  tutorLesion: any
  codigoLesion: string
  constructor(
    private dialog: MatDialog,
    private lesionService: LesionService,
    private dialogRe: MatDialogRef<LsLesionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  botonesConfigTable = { ver: true, imprimir: true };
  ngOnInit(): void {
    this.tutorLesion = this.data.row
    this.codigoLesion = this.data.row.lesionado.codigo
    this.listaLesiones()
  }
  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Fecha', clave: 'lesiones.fechaLesion' },
    { etiqueta: 'Tipo Evento', clave: 'lesiones.fechaLesion' },
  ];
  lesion: any
  listaLesiones() {
    this.lesionService.listarLesionDevActivado().subscribe(
      (data) => {
        this.lesion = data.filter(i => i.lesiones.codigo === this.codigoLesion);
      },
    );
  }
  imprimir(lesion: any): void {
    const estudiante = lesion.lesiones.estudiante;

    const informeHTML = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1, h2, h3 { text-align: center; }
            h1 { font-size: 28px; margin-bottom: 20px; text-transform: uppercase; font-weight: bold; }
            h2 { font-size: 24px; margin-bottom: 20px; font-weight: bold; }
            h3 { font-size: 20px; margin-bottom: 15px; font-weight: bold; }
            p { font-size: 16px; text-align: justify; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 16px; }
            th { background-color: #f2f2f2; }
            .text-center { text-align: center; }
          </style>
        </head>
        <body>
          <h1>ACTA DE LESIÓN</h1>
          <h2>Informe Médico del Estudiante</h2>
          <p><strong>Estudiante:</strong> ${estudiante.primerNombre} ${estudiante.apellidoPaterno} ${estudiante.apellidoMaterno}</p>
          <p><strong>Edad:</strong> ${estudiante.edad} años </p>
          <p><strong>Teléfono:</strong> ${estudiante.telefono}</p>
          <p> <strong>Correo:</strong> ${estudiante.correo}</p>
          <p><strong>Sede:</strong> ${estudiante.sede.nombre}</p>
          
          <h3>Detalles de la Lesión</h3>
          <table>
            <tr>
              <th>Tipo de Lesión</th>
              <td>${lesion.lesiones.tipoLesion}</td>
            </tr>
            <tr>
              <th>Fecha de Lesión</th>
              <td>${lesion.lesiones.fechaLesion}</td>
            </tr>
            <tr>
              <th>Gravedad</th>
              <td>${lesion.lesiones.gravedad}</td>
            </tr>
            <tr>
              <th>Tiempo de Recuperación (días)</th>
              <td>${lesion.lesiones.tiempoRecuperacion}</td>
            </tr>
          </table>
  
          <h3>Detalles del Recuperacion</h3>
          <table>
            <tr>
              <th>Fecha del Recuperacion</th>
              <td>${lesion.fecha}</td>
            </tr>
            <tr>
              <th>Hora del Recuperacion</th>
              <td>${lesion.hora}</td>
            </tr>
            <tr>
              <th>Tipo de Lesion</th>
              <td>${lesion.tipoEvento}</td>
            </tr>
            <tr>
              <th>Descripción</th>
              <td>${lesion.descripcion}</td>
            </tr>
            <tr>
              <th>Responsable</th>
              <td>${lesion.responsable}</td>
            </tr>
            <tr>
              <th>Observaciones</th>
              <td>${lesion.observaciones}</td>
            </tr>
          </table>
          
          <h3 class="text-center">Firma del Responsable</h3>
          <p class="text-center">__________________________</p>
          <p class="text-center">Responsable de la Atención Médica</p>
        </body>
      </html>
    `;

    // Crear un iframe temporal para imprimir
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    iframeDoc?.open();
    iframeDoc?.write(informeHTML);
    iframeDoc?.close();

    // Imprimir
    iframe.contentWindow?.print();

    // Eliminar el iframe temporal
    document.body.removeChild(iframe);
  }


}
