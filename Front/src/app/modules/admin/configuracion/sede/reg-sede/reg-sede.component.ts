import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SedeService } from 'src/app/services/sede.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Sede } from 'src/app/model/sede';
import { LoginService } from 'src/app/services/login.service';
import { SedeComponent } from '../sede/sede.component';
import { HistorialService } from 'src/app/services/historial.service';
import { Historial } from 'src/app/model/historial';

@Component({
  selector: 'app-reg-sede',
  templateUrl: './reg-sede.component.html',
  styleUrls: ['./reg-sede.component.css']
})
export class RegSedeComponent implements OnInit {

  lista: any
  constructor(
    private dialogRe: MatDialogRef<SedeComponent>,
    private sede: SedeService,
    private historialService:HistorialService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private mensaje: MensajeService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }
  public formulario: UntypedFormGroup;
  ngOnInit(): void {


    this.initForm()
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
        codigo: "0001", // Este valor parece ser estático, asegúrate de actualizarlo si es necesario
        nombre: this.formulario.get('nombre')?.value,
        direccion: this.formulario.get('direccion')?.value,
        telefono: this.formulario.get('telefono')?.value,
        usuarioCreacion: this.loginService.getUser().username,
      };
      console.log(objRegistrar);
  
      // Crear el objeto de historial para registrar la acción
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
        detalle: `El usuario ${this.loginService.getUser().username} registró una nueva sede con el nombre ${objRegistrar.nombre} y el código ${objRegistrar.codigo}.`
      };
  
      // Registrar el historial primero
      this.historialService.registrar(historial).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder con el registro de la sede
          this.sede.registrarSede(objRegistrar).subscribe(
            response => {
              // Mostrar mensaje de éxito
              this.mensaje.MostrarMensajeExito("SE REGISTRÓ LA SEDE");
  
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
          // Si hubo un error al registrar el historial, mostrar un mensaje de error
          this.mensaje.MostrarBodyError('Error al registrar el historial: ' + error);
        }
      );
  
    } else {
      this.mensaje.MostrarMensajeError("FORMULARIO VACÍO");
      this.formulario.markAllAsTouched();
    }
  }
  

  cerrar() {
    this.dialogRe.close();
  }

}
