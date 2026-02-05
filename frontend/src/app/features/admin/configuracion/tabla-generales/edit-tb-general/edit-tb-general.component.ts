import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LsTablaGeneralComponent } from '../ls-tabla-general/ls-tabla-general.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/core/services/general.service';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { General } from 'src/app/core/model/General';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-edit-tb-general',
  templateUrl: './edit-tb-general.component.html',
  styleUrls: ['./edit-tb-general.component.css']
})
export class EditTbGeneralComponent implements OnInit {

  lista: any
  constructor(
    private dialogRe: MatDialogRef<LsTablaGeneralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private loginService: LoginService,
    private generalService: GeneralService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private historialService: HistorialService,
    private formBuilder: UntypedFormBuilder,) { }

  formulario: UntypedFormGroup;

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
      descripcion1: this.formulario.get('descripcion')?.value,
      usuarioCreacion: this.usuarioCreacion,
      usuarioActualizacion: this.loginService.getUser().username,
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizó la listado de detalle con el código ${objRegistrar.codigo}.`
    };

    this.generalService.actualizarGeneral(objRegistrar).subscribe({
      next: async () => {
        this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
        await firstValueFrom(this.historialService.registrar(historial));
        this.dialog.closeAll();
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO,error.error.message);
      }
    });


  }

  cerrar() {
    this.dialogRe.close();
  }

}
