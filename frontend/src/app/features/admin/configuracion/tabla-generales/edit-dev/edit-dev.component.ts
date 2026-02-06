import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LtDevComponent } from '../lt-dev/lt-dev.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LoginService } from 'src/app/core/services/login.service';
import { GeneralService } from 'src/app/core/services/general.service';

import { HistorialService } from 'src/app/core/services/historial.service';
import { General } from 'src/app/core/model/General';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-dev',
  templateUrl: './edit-dev.component.html',
  styleUrls: ['./edit-dev.component.css']
})
export class EditDevComponent implements OnInit {


  lista: any
  constructor(
    private dialogRe: MatDialogRef<LtDevComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private loginService: LoginService,
    private historialService: HistorialService,
    private generalService: GeneralService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder,) { }
  public formulario: UntypedFormGroup;
  ngOnInit(): void {
    this.lista = this.data
    this.listarEdiciones()
  }
  clave: string
  descripcion: string
  codigo: string
  usuarioCreacion: string
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  listarEdiciones() {
    this.clave = this.lista.row.clave;
    this.codigo = this.lista.row.codigo;
    this.descripcion = this.lista.row.descripcion1;

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
      codigo: [{ value: this.codigo, disabled: true }, Validators.required],
      clave: [{ value: this.clave, disabled: true }, Validators.required],
      descripcion: [this.descripcion, Validators.required],
    });
  }

  operar() {

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const objRegistrar: General = {
      codigo: this.formulario.get('codigo')?.value,
      clave: this.formulario.get('clave')?.value,
      descripcionPrimero: this.formulario.get('descripcion')?.value,
      usuarioCreacion: this.usuarioCreacion,
      usuarioActualizacion: this.loginService.getUser().username,
    };
 
    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizó el detalle de la tabla con el código ${objRegistrar.codigo}.`
    };

    this.generalService.actualizarGeneralDev(objRegistrar).subscribe({
      next: async () => {
        this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
await firstValueFrom(this.historialService.registrar(historial));

        this.dialog.closeAll();
        this.cdr.markForCheck(); // suficiente si usas OnPush
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });


  }


  cerrar() {
    this.dialogRe.close();
  }
}
