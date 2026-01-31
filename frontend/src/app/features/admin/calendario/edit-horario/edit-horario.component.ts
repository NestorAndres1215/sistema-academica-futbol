import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HorarioComponent } from '../horario/horario.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { LoginService } from 'src/app/core/services/login.service';
import { HorarioService } from 'src/app/core/services/horario.service';

import { HistorialService } from 'src/app/core/services/historial.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { Historial } from 'src/app/core/model/historial';
import { Horario } from 'src/app/core/model/horario';

@Component({
  selector: 'app-edit-horario',
  templateUrl: './edit-horario.component.html',
  styleUrls: ['./edit-horario.component.css']
})
export class EditHorarioComponent implements OnInit {


  cerrar() {
    this.dialogRe.close();
  }
  constructor(
    private dialogRe: MatDialogRef<HorarioComponent>,
    private loginService: LoginService,
    private historialService: HistorialService,
    private mensaje: MensajeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private horarioService: HorarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }
    lista: any

  ngOnInit(): void {
    this.lista = this.data
    this.listarEdiciones()
  }

  inicio: string
  final: string
  usuarioCreacion: string;
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  public formulario: UntypedFormGroup;
  codigo: string

  listarEdiciones() {
    this.codigo = this.lista.row.codigo;
    this.inicio = this.lista.row.inicioHora;
    this.final = this.lista.row.finHora;
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
      inicio: [this.inicio, Validators.required],
      fin: [this.final, Validators.required],

    });
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
          this.mensaje.MostrarMensaje('La hora de inicio debe ser menor que la hora de fin.');
          return false;
        }

        const diferenciaHoras = (fin.getTime() - inicio.getTime()) / (1000 * 3600);  // Convertir milisegundos a horas

        if (diferenciaHoras < 1) {
          this.formulario.get('fin')?.setErrors({ minDuration: true });
          this.mensaje.MostrarMensaje('La duración debe ser mayor a 1 hora.');
          return false;
        }

        if (diferenciaHoras > 4) {
          this.formulario.get('fin')?.setErrors({ maxDuration: true });
          this.mensaje.MostrarMensaje('La duración no puede ser mayor a 4 horas.');
          return false;
        }
      }
      return true; 
    };

    if (!validarHoras()) {
      return;  
    }

    if (this.formulario.valid) {
      const objHorario: Horario = {
        codigo: this.codigo,
        finHora: this.formulario.get('fin')?.value,
        inicioHora: this.formulario.get('inicio')?.value,
        usuarioRegistro: this.usuarioCreacion,
        usuarioActualizacion: this.loginService.getUser().username,
      }
      console.log(objHorario)
      const historial: Historial = {
        usuario: this.loginService.getUser().username, 
        detalle: `El usuario ${this.loginService.getUser().username} actualizó al horario con el codigo ${objHorario.codigo}`,
      };
      this.horarioService.actualizar(objHorario).subscribe(
        () => {
          this.historialService.registrar(historial).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE ACTUALIZÓ HORARIO");
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError(error);
            }
          );
        },
        error => {
          this.mensaje.MostrarBodyError(error);
        }
      );
    } else {

    }
  }
}
