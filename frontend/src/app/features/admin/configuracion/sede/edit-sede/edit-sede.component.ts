import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SedeComponent } from '../sede/sede.component';
import { SedeService } from 'src/app/core/services/sede.service';

import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Sede } from 'src/app/core/model/sede';
import { firstValueFrom } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';


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
    private historialService: HistorialService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }

  formulario: UntypedFormGroup
    ;
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

  async operar() {

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const objRegistrar: Sede = {
      codigo: this.codigo,
      nombre: this.formulario.get('nombre')?.value,
      direccion: this.formulario.get('direccion')?.value,
      telefono: this.formulario.get('telefono')?.value,
      usuarioCreacion: this.usuarioCreacion,
      usuarioActualizacion: this.loginService.getUser().username,
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizó la sede ${objRegistrar.nombre} con el código ${objRegistrar.codigo}.`
    };

    try {

      await firstValueFrom(this.sede.actualizarSede(objRegistrar));
      await firstValueFrom(this.historialService.registrar(historial));
      this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
      this.dialog.closeAll();
      this.cdr.detectChanges();

    } catch (error) {
      this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
    }
  }

  cerrar() {
    this.dialogRe.close();
  }
}
