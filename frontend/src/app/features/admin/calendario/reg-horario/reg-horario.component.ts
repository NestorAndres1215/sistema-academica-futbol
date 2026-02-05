import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HorarioComponent } from '../horario/horario.component';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { HorarioService } from 'src/app/core/services/horario.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Historial } from 'src/app/core/model/historial';
import { Horario } from 'src/app/core/model/horario';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-reg-horario',
  templateUrl: './reg-horario.component.html',
  styleUrls: ['./reg-horario.component.css']
})
export class RegHorarioComponent implements OnInit {
  minTime: string;
  maxTime: string;

  async validarHora() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    this.minTime = '08:00';
    this.maxTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  operar() {

    const finHora = this.formulario.get('fin')?.value;
    const inicioHora = this.formulario.get('inicio')?.value;

    const validarHoras = () => {
      if (inicioHora && finHora) {
        const inicio = new Date('1970-01-01T' + inicioHora);
        const fin = new Date('1970-01-01T' + finHora);

        if (inicio >= fin) {
          this.formulario.get('fin')?.setErrors({ invalidTime: true });
          this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.HORA_INICIO_MAYOR_FIN);
          return false;
        }

        const diferenciaHoras = (fin.getTime() - inicio.getTime()) / (1000 * 3600);

        if (diferenciaHoras < 1) {
          this.formulario.get('fin')?.setErrors({ minDuration: true });
          this.formulario.get('fin')?.markAsTouched();
          this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.DURACION_MINIMA);
          return false;
        }

        if (diferenciaHoras > 4) {
          this.formulario.get('fin')?.setErrors({ maxDuration: true });
          this.formulario.get('fin')?.markAsTouched();
          this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.DURACION_MAXIMA);
          return false;
        }
      }
      return true;
    };

    if (!validarHoras()) {
      return;
    }

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }
    const objHorario: Horario = {
      finHora: this.formulario.get('fin')?.value,
      inicioHora: this.formulario.get('inicio')?.value,
      usuarioRegistro: this.loginService.getUser().username,
    }

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizó al horario con el codigo ${objHorario.codigo}`,
    };

    this.horarioService.registrar(objHorario).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        this.dialog.closeAll();
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });
  }

  cerrar() {
    this.dialogRe.close();
  }

  formulario: UntypedFormGroup;
  constructor(
    private dialogRe: MatDialogRef<HorarioComponent>,
    private loginService: LoginService,
    private historialService: HistorialService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private horarioService: HorarioService,
    private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.initForm()
    this.validarHora()
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    });
  }

}
