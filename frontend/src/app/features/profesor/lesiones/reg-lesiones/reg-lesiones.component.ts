import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ModuloLesionesComponent } from '../modulo-lesiones/modulo-lesiones.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LesionService } from 'src/app/core/services/lesion.service';
import { Lesion } from 'src/app/core/model/lesion';
import { Historial } from 'src/app/core/model/historial';


@Component({
  selector: 'app-reg-lesiones',
  templateUrl: './reg-lesiones.component.html',
  styleUrls: ['./reg-lesiones.component.css']
})
export class RegLesionesComponent implements OnInit {
  operar() {
    const fechaLesion = new Date(this.formulario.get('fechaLesion')?.value);
    const fechaRecuperacion = new Date(this.formulario.get('fechaRecuperacion')?.value);

    if (fechaRecuperacion < fechaLesion) {
      this.mensaje.MostrarMensaje("La fecha de recuperación no puede ser anterior a la fecha de lesión.");
      return;
    }

    const datos = {
      fechaLesion: fechaLesion.toISOString().split('T')[0],  // Formato YYYY-MM-DD
      fechaRecuperacion: fechaRecuperacion.toISOString().split('T')[0]
    };
    if (this.formulario.valid) {
      const EstudianteRegistrado = this.estudiantes.filter(i => i.codigo == this.formulario.get('estudiante').value)
      const codigoEquipo = EstudianteRegistrado.map(i => String(i.codigo));
      const codigoEstudiante = EstudianteRegistrado.map(i => String(i.estudiante.codigo));

      const objclase: Lesion = {
        tipoLesion: this.formulario.get('tipoLesion').value,
        fechaLesion: this.formulario.get('fechaLesion').value,
        gravedad: this.formulario.get('gravedad').value,
        tiempoRecuperacion: this.formulario.get('tiempoRecuperacion').value,
        comentarios: "",
        fechaRecuperacion: this.formulario.get('fechaRecuperacion').value,
        descripcion: this.formulario.get('descripcion').value,
        estudiante: codigoEstudiante[0],
        equipo: codigoEquipo[0]
      };
      console.log(objclase)

      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} registró una lesion.`
      };
      this.lesionService.registrar(objclase).subscribe({
        next: () => {

          this.historialService.registrar(historial).subscribe({
            next: () => {
              this.mensaje.MostrarMensajeExito("SE REGISTRÓ CORRECTAMENTE");
              this.formulario.reset();
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error: (error) => {
              this.mensaje.MostrarBodyError("Error al registrar el historial: " + error);
            }
          });
        },
        error: (error) => {
          this.mensaje.MostrarBodyError("Error al registrar la lesión: " + error);
        }
      });



    }
    else {
      console.log("formulario vacio")
      this.mensaje.MostrarMensaje("FORMULARIO VACIO")
      this.formulario.markAllAsTouched();
    }
  }
  cerrar() {
    this.dialogRe.close();
  }

  constructor(
    private historialService: HistorialService,
    private lesionService: LesionService,
    private formBuilder: UntypedFormBuilder,
    private equipodevService: EquipoService,
    private mensaje: MensajeService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private dialogRe: MatDialogRef<ModuloLesionesComponent>,
    private dialog: MatDialog
  ) { }

  formulario: UntypedFormGroup;
  ngOnInit(): void {
    this.initForm()
    this.listarDevEquipo()
  }


  initForm(): void {
    this.formulario = this.formBuilder.group({
      estudiante: ['', Validators.required],
      gravedad: ['', Validators.required],
      tipoLesion: ['', Validators.required],
      tiempoRecuperacion: ['', Validators.required],
      fechaLesion: ['', Validators.required],
      fechaRecuperacion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

  }


  estudiantes: any
  async listarDevEquipo() {
    this.equipodevService.listarDev().subscribe((data) => {
      this.estudiantes = data.filter(i => i.estudiante.codigo !== "0000")


      const usuariosCodigo = data
        .filter(i => i.profesor && i.profesor.usuario && i.profesor.usuario.codigo === this.loginService.getUser().ul_codigo);
      const equipos = usuariosCodigo.map(i => i.equipo.nombre);

      const estudiantesFiltrados = this.estudiantes.filter(estudiante =>
        equipos.includes(estudiante.equipo.nombre)
      );

      // Resultado
      console.log(estudiantesFiltrados);
      //   this.listarEquipo()

    });
  }
}
