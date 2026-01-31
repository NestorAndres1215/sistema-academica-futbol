import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EquipoService } from 'src/app/services/equipo.service';
import { LsPartidoComponent } from '../ls-partido/ls-partido.component';
import { Time } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { PartidoService } from 'src/app/services/partido.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Estudiante } from 'src/app/model/estudiante';
import { Historial } from 'src/app/model/historial';
import { HistorialService } from 'src/app/services/historial.service';
import { Partido } from 'src/app/model/partido';

@Component({
  selector: 'app-edit-partido',
  templateUrl: './edit-partido.component.html',
  styleUrls: ['./edit-partido.component.css']
})
export class EditPartidoComponent implements OnInit {
  time: string = ''; // Define la variable con un valor inicial
  operar() {
    console.log(this.formulario.value)

if (this.formulario.valid) {
      const objPartido:   Partido = {
        codigo: this.codigoPartido,
        equipoRival: this.formulario.get('equipoRival')?.value,
        fecha: this.formulario.get('fecha')?.value,
        hora: this.formulario.get('hora')?.value,
        lugar: this.formulario.get('lugar')?.value,
        tipoPartido: this.formulario.get('tipo')?.value,
        equipo: this.formulario.get('equipo')?.value,
      };
      console.log(objPartido)

      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} actualizó al partido ${objPartido.codigo} .`,
      };

      // Registrar el historial
      this.partidoService.actualizar(objPartido).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder con la actualización del estudiante
          this.historialService.registrar(historial).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE ACTUALIZÓ PARTIDO");
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError(error);
            }
          );
        },
        error => {
          // Si hubo un error al registrar el historial, mostrar un mensaje de error
          this.mensaje.MostrarBodyError("Error al registrar el historial: " + error);
        }
      );
    }
    else {
      this.mensaje.MostrarMensaje("FORMULARIO VACIO")
      this.formulario.markAllAsTouched();
    }



  }
  cerrar() {
    this.dialogRe.close();
  }



  constructor(
    private partidoService:PartidoService,
    private mensaje:MensajeService,
    private formBuilder: UntypedFormBuilder,
    private loginService:LoginService,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private historialService: HistorialService,
    private dialogRe: MatDialogRef<LsPartidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private equipoService: EquipoService
  ) { }


  public formulario: UntypedFormGroup;
  equipoLocal: string
  equipoRival: string
  fecha: Date
  hora: Time
  lugar: string
  tipoPartido: string
codigoPartido:string
profesor:string
  ngOnInit(): void {
    console.log(this.data.row)
    console.log(this.data.profesor)
    this.profesor=this.data.profesor
    this.codigoPartido=this.data.row.codigo
    this.equipoLocal = this.data.row.equipo.codigo
    this.equipoRival = this.data.row.equipoRival
    this.fecha = this.data.row.fecha
    this.hora = this.data.row.hora
    this.lugar = this.data.row.lugar
    this.tipoPartido = this.data.row.tipoPartido
    console.log(this.hora)
    this.listaEquipo()
    this.initForm()
  }
  equipo: any
  listaEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      console.log(data)
      this.equipo = data

    })
  }

  initForm(): void {
    const fechaUtc = new Date(this.fecha);
    const fechaLocal = new Date(fechaUtc.getTime() + fechaUtc.getTimezoneOffset() * 60000);
    console.log(this.profesor)
    this.formulario = this.formBuilder.group({
      equipo: [this.equipoLocal, Validators.required],
      equipoRival: [this.equipoRival, Validators.required],
      fecha: [fechaLocal, Validators.required],
      hora: [this.hora, Validators.required],
      lugar: [this.lugar, Validators.required],
      tipo: [this.tipoPartido, Validators.required],
    });
    if (this.profesor !== undefined) {
      this.formulario.get('equipo')?.disable();
    }
  }
}
