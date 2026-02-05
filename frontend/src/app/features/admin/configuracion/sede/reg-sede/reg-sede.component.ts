import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SedeService } from 'src/app/core/services/sede.service';
import { LoginService } from 'src/app/core/services/login.service';
import { SedeComponent } from '../sede/sede.component';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Sede } from 'src/app/core/model/sede';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';


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
    private historialService: HistorialService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private alertService: AlertService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.initForm()
  }

  formulario: UntypedFormGroup;
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

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }
    const objRegistrar: Sede = {
      codigo: "0001",
      nombre: this.formulario.get('nombre')?.value,
      direccion: this.formulario.get('direccion')?.value,
      telefono: this.formulario.get('telefono')?.value,
      usuarioCreacion: this.loginService.getUser().username,
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró una nueva sede con el nombre ${objRegistrar.nombre} y el código ${objRegistrar.codigo}.`
    };

    this.sede.registrarSede(objRegistrar).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);

        this.dialog.closeAll();
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });

  }

  cerrar() {
    this.dialogRe.close();
  }

}
