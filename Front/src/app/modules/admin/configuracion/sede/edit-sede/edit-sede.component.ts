import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SedeComponent } from '../sede/sede.component';
import { SedeService } from 'src/app/services/sede.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Sede } from 'src/app/model/sede';
import { LoginService } from 'src/app/services/login.service';
import { HistorialService } from 'src/app/services/historial.service';
import { Historial } from 'src/app/model/historial';

@Component({
  selector: 'app-edit-sede',
  templateUrl: './edit-sede.component.html',
  styleUrls: ['./edit-sede.component.css']
})
export class EditSedeComponent implements OnInit {


  lista: any
  constructor(
    private dialogRe: MatDialogRef<SedeComponent>,
    private sede: SedeService,
        private cdr: ChangeDetectorRef,
        private historialService:HistorialService,
        private dialog: MatDialog,
    private mensaje: MensajeService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }
  public formulario: UntypedFormGroup;
  ngOnInit(): void {
    this.lista = this.data
    this.listarEdiciones()
  }

  nombre: string
  telefono: string
  direccion: string
  usuarioCreacion: string
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  codigo: string
  listarEdiciones() {
    this.codigo = this.lista.row.codigo
    this.nombre = this.lista.row.nombre;
    this.telefono = this.lista.row.telefono;
    this.direccion = this.lista.row.direccion;

    this.usuarioCreacion = this.lista.row.usuarioCreacion;
    this.fechaCreacion = this.lista.row.fechaCreacion;
    this.horaCreacion = this.lista.row.horaCreacion;
    this.usuarioActualizacion = this.lista.row.usuarioActualizacion;
    this.fechaActualizacion = this.lista.row.fechaActualizacion;
    this.horaActualizacion = this.lista.row.horaActualizacion;

    this.initForm()

  }
  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: [this.nombre, Validators.required],
      telefono: [this.telefono, Validators.required],
      direccion: [this.direccion, Validators.required],

    });
  }

  operar() {
    if (this.formulario.valid) {
  
      const objRegistrar: Sede = {
        codigo: this.codigo,
        nombre: this.formulario.get('nombre')?.value,
        direccion: this.formulario.get('direccion')?.value,
        telefono: this.formulario.get('telefono')?.value,
        usuarioCreacion: this.usuarioCreacion,
        usuarioActualizacion: this.loginService.getUser().username,
      };
      console.log(objRegistrar);
  
      // Crear el objeto de historial para registrar la actualización de la sede
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
        detalle: `El usuario ${this.loginService.getUser().username} actualizó la sede ${objRegistrar.nombre} con el código ${objRegistrar.codigo}.`
      };
  
      // Registrar el historial
      this.historialService.registrar(historial).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder con la actualización de la sede
          this.sede.actualizarSede(objRegistrar).subscribe(
            response => {
              // Mostrar mensaje de éxito
              this.mensaje.MostrarMensajeExito("SE ACTUALIZÓ SEDE");
  
              // Cerrar el modal
              this.dialog.closeAll();
  
              // Forzar detección de cambios
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError(error);
            }
          );
        },
        error => {
          // Manejar error si no se pudo registrar el historial
          this.mensaje.MostrarBodyError('Error al registrar el historial: ' + error);
        }
      );
  
    } else {
      this.mensaje.MostrarMensaje("FORMULARIO VACÍO");
      this.formulario.markAllAsTouched();
    }
  }

cerrar() {
  this.dialogRe.close();
}
}
