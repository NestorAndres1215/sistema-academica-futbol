import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HorarioComponent } from '../horario/horario.component';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { HorarioService } from 'src/app/core/services/horario.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Historial } from 'src/app/core/model/historial';
import { Horario } from 'src/app/core/model/horario';


@Component({
  selector: 'app-reg-horario',
  templateUrl: './reg-horario.component.html',
  styleUrls: ['./reg-horario.component.css']
})
export class RegHorarioComponent implements OnInit {
  minTime: string ; // Hora mínima (por ejemplo, 8:00 AM)
  maxTime: string ; // Hora máxima (por ejemplo, 6:00 PM)

  async validarHora() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
  
    // Definir la hora mínima (por ejemplo, 08:00 AM)
    this.minTime = '08:00';
  
    // Definir la hora máxima (por ejemplo, la hora actual)
    this.maxTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    console.log(this.maxTime)
  }
  
  operar() {
    // Obtener las horas desde el formulario
    const finHora = this.formulario.get('fin')?.value;
    const inicioHora = this.formulario.get('inicio')?.value;

    const validarHoras = () => {
      if (inicioHora && finHora) {
        const inicio = new Date('1970-01-01T' + inicioHora);
        const fin = new Date('1970-01-01T' + finHora);

        // Comprobar si la hora de inicio es menor que la de fin
        if (inicio >= fin) {
          this.formulario.get('fin')?.setErrors({ invalidTime: true });
          this.mensaje.MostrarMensaje('La hora de inicio debe ser menor que la hora de fin.');
          return false;
        }

        // Calcular la diferencia en milisegundos
        const diferenciaHoras = (fin.getTime() - inicio.getTime()) / (1000 * 3600);  // Convertir milisegundos a horas

        // Comprobar si la diferencia está entre 1 y 4 horas
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
      return true;  // Validación exitosa
    };

    // Validar las horas antes de proceder
    if (!validarHoras()) {
      return;  // Si la validación falla, detener la ejecución
    }


    if (this.formulario.valid) {
      const objHorario: Horario = {

        finHora: this.formulario.get('fin')?.value,
        inicioHora: this.formulario.get('inicio')?.value,
        usuarioRegistro: this.loginService.getUser().username,
      }
      console.log(objHorario)
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} actualizó al horario con el codigo ${objHorario.codigo}`,
      };
      this.horarioService.registrar(objHorario).subscribe({
        next: () => {
          // Si el horario se registra correctamente, proceder con la actualización del estudiante
          this.historialService.registrar(historial).subscribe({
            next: (response) => {
              this.mensaje.MostrarMensajeExito("SE REGISTRO HORARIO");
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error: (error) => {
              // Manejar errores al registrar el historial
              console.error("Error al registrar el historial:", error);
              this.mensaje.MostrarError("Error al registrar el historial: " + error.message || error);
            }
          });
        },
        error: (error) => {
          // Manejar errores al registrar el horario
          console.error("Error al registrar el horario:", error);
          this.mensaje.MostrarBodyError( error );
        }
      });
      
    } else {

    }
  }
  cerrar() {
    this.dialogRe.close();
  }
  public formulario: UntypedFormGroup;
  constructor(
    private dialogRe: MatDialogRef<HorarioComponent>,
    private loginService: LoginService,
    private historialService: HistorialService,
    private mensaje: MensajeService,
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
