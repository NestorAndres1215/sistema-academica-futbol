import { Time } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EquipoService } from 'src/app/core/services/equipo.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { LsPartidoComponent } from '../ls-partido/ls-partido.component';
import { Historial } from 'src/app/core/model/historial';
import { Partido } from 'src/app/core/model/partido';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-historial-edit-admin',
  templateUrl: './historial-edit-admin.component.html',
  styleUrls: ['./historial-edit-admin.component.css']
})
export class HistorialEditAdminComponent implements OnInit {

  formulario: UntypedFormGroup;
  equipoLocal: string
  equipoRival: string
  fecha: Date
  hora: Time
  lugar: string
  tipoPartido: string
  marcadorLocal: string
  marcadorVisita: string
  codigoPartido: string
  equipo: any
  time: string = '';

   constructor(
    private partidoService: PartidoService,
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private historialService: HistorialService,
    private dialogRe: MatDialogRef<LsPartidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private equipoService: EquipoService
  ) { }

  ngOnInit(): void {
    this.codigoPartido = this.data.row.codigo
    this.equipoLocal = this.data.row.equipo.codigo
    this.equipoRival = this.data.row.equipoRival
    this.fecha = this.data.row.fecha
    this.hora = this.data.row.hora
    this.lugar = this.data.row.lugar
    this.tipoPartido = this.data.row.tipoPartido
    this.marcadorLocal = this.data.row.marcadorLocal
    this.marcadorVisita = this.data.row.marcadorVisita
    console.log(this.hora)
    this.listaEquipo()
    this.initForm()
  }

  operar() {

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const objPartido: Partido = {
      codigo: this.codigoPartido,
      equipoRival: this.formulario.get('equipoRival')?.value,
      fecha: this.formulario.get('fecha')?.value,
      hora: this.formulario.get('hora')?.value,
      lugar: this.formulario.get('lugar')?.value,
      tipoPartido: this.formulario.get('tipo')?.value,
      equipo: this.formulario.get('equipo')?.value,
      marcadorLocal: this.formulario.get('local')?.value,
      marcadorVisita: this.formulario.get('visita')?.value,
      usuarioCreacion: this.loginService.getUser().username,
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizó al partido ${objPartido.codigo} .`,
    };

    this.partidoService.actualizarFalse(objPartido).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
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

 

  listaEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      this.equipo = data
    })
  }

  initForm(): void {

    const fechaUtc = new Date(this.fecha);
    const fechaLocal = new Date(fechaUtc.getTime() + fechaUtc.getTimezoneOffset() * 60000);

    this.formulario = this.formBuilder.group({
      equipo: [{ value: this.equipoLocal, disabled: true }, Validators.required],
      equipoRival: [{ value: this.equipoRival, disabled: true }, Validators.required],
      fecha: [{ value: fechaLocal, disabled: true }, Validators.required],
      hora: [{ value: this.hora, disabled: true }, Validators.required],
      lugar: [{ value: this.lugar, disabled: true }, Validators.required],
      tipo: [{ value: this.tipoPartido, disabled: true }, Validators.required],
      local: [this.marcadorLocal, Validators.required],
      visita: [this.marcadorVisita, Validators.required],
    });
  }
}
