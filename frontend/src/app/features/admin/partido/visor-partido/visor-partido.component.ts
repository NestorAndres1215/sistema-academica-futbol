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
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-visor-partido',
  templateUrl: './visor-partido.component.html',
  styleUrls: ['./visor-partido.component.css']
})
export class VisorPartidoComponent implements OnInit {
  time: string = '';
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
    };
    console.log(objPartido)

    const historial: Historial = {
      usuario: this.loginService.getUser().username, // Usuario que realiza la acción
      detalle: `El usuario ${this.loginService.getUser().username} actualizó al partido ${objPartido.codigo} .`,
    };


    this.partidoService.actualizar(objPartido).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
         this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
        this.dialog.closeAll();
        this.cdr.detectChanges();
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });


  }
  cerrar() {
    this.dialogRe.close();
  }

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


  public formulario: UntypedFormGroup;
  equipoLocal: string
  equipoRival: string
  fecha: Date
  hora: Time
  lugar: string
  tipoPartido: string
  codigoPartido: string
  ngOnInit(): void {
    console.log(this.data.row)
    this.codigoPartido = this.data.row.codigo
    this.equipoLocal = this.data.row.equipo.nombre
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
    this.formulario = this.formBuilder.group({
      equipo: [this.equipoLocal, Validators.required],
      equipoRival: [this.equipoRival, Validators.required],
      fecha: [fechaLocal, Validators.required],
      hora: [this.hora, Validators.required],
      lugar: [this.lugar, Validators.required],
      tipo: [this.tipoPartido, Validators.required],
    });
    this.formulario.disable()
  }

}
