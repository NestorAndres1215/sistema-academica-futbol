import { Time } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { LsPartidoComponent } from '../ls-partido/ls-partido.component';
import { Historial } from 'src/app/core/model/historial';
import { Partido } from 'src/app/core/model/partido';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-reg-partido',
  templateUrl: './reg-partido.component.html',
  styleUrls: ['./reg-partido.component.css']
})
export class RegPartidoComponent implements OnInit {
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
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registro al partido ${objPartido.codigo} .`,
    };

    this.partidoService.registrar(objPartido).subscribe({
      next: async () => {
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        await firstValueFrom(this.historialService.registrar(historial));
        this.dialog.closeAll();
        this.cdr.detectChanges();
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    })
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
    this.formulario = this.formBuilder.group({
      equipo: [this.equipo, Validators.required],
      equipoRival: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      lugar: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }
}
