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
  selector: 'app-reg-tb-general',
  templateUrl: './reg-tb-general.component.html',
  styleUrls: ['./reg-tb-general.component.css']
})
export class RegTbGeneralComponent implements OnInit {

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
    if (!this.formulario.valid) {
      this.mensaje.MostrarMensaje("FORMULARIO VACÍO");
      this.formulario.markAllAsTouched();
      return;
    }

    const objRegistrar: General = {
      clave: this.formulario.get('clave')?.value,
      descripcion1: this.formulario.get('descripcion')?.value,
      usuarioCreacion: this.loginService.getUser().username,
    };

    this.generalService.registrarGeneral(objRegistrar).subscribe(
      response => {
        this.mensaje.MostrarMensajeExito("SE REGISTRO TABLA GENERAL");

        const historial: Historial = {
          usuario: this.loginService.getUser().username,
          detalle: `El usuario ${this.loginService.getUser().username} registró una nueva entrada en la tabla General con código ${this.codigo}.`
        };

        this.historialService.registrar(historial).subscribe(
          () => {
            this.dialog.closeAll();
            this.cdr.detectChanges();
          },
          error => {
            this.mensaje.MostrarBodyError("Error al registrar el historial: " + error); // Manejar error en historial
          }
        );
      },
      error => {
        this.mensaje.MostrarBodyError(error);
      }
    );

  }

  cerrar() {
    this.dialogRe.close();
  }


}
