import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { GeneralService } from 'src/app/core/services/general.service';
import { LoginService } from 'src/app/core/services/login.service';
import { LtDevComponent } from '../lt-dev/lt-dev.component';
import { MensajeService } from 'src/app/core/services/mensaje.service';

import { HistorialService } from 'src/app/core/services/historial.service';
import { General } from 'src/app/core/model/General';
import { Historial } from 'src/app/core/model/historial';

@Component({
  selector: 'app-reg-dev',
  templateUrl: './reg-dev.component.html',
  styleUrls: ['./reg-dev.component.css']
})
export class RegDevComponent implements OnInit {

  lista: any
  constructor(
    private dialogRe: MatDialogRef<LtDevComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mensaje: MensajeService,
    private loginService: LoginService,
    private historialService: HistorialService,
    private generalService: GeneralService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder,) { }
   formulario: UntypedFormGroup;
  ngOnInit(): void {

    this.codigo = this.data.codigo
    this.initForm()

  }
  codigo: string
  clave: string
  descripcion: string

  initForm() {
    this.formulario = this.formBuilder.group({
      clave: ["", Validators.required],
      descripcion: ["", Validators.required],
    });
  }

  operar() {
    if (this.formulario.valid) {

      const objRegistrar: General = {
        general: this.codigo,
        clave: this.formulario.get('clave')?.value,
        descripcionPrimero: this.formulario.get('descripcion')?.value,
        usuarioCreacion: this.loginService.getUser().username,
      };
      console.log(objRegistrar);

      this.generalService.registrarGeneralDev(objRegistrar).subscribe(
        response => {
          this.mensaje.MostrarMensajeExito("SE REGISTRO TABLA GENERAL");

          const historial: Historial = {
            usuario: this.loginService.getUser().username,
            detalle: `El usuario ${this.loginService.getUser().username} registró una nueva entrada en la tabla General con código ${this.codigo}.`
          };

          // Registrar el historial
          this.historialService.registrar(historial).subscribe(
            () => {
              // Si el historial se guarda correctamente, cerrar el modal y forzar la detección de cambios
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
          );
        },
        error => {
          this.mensaje.MostrarBodyError(error); // Manejar error en registro
        }
      );
    } else {
      this.mensaje.MostrarMensaje("FORMULARIO VACIO");
      this.formulario.markAllAsTouched();
    }
  }

  cerrar() {
    this.dialogRe.close();
  }

}
