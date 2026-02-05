import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ModuloLesionesComponent } from '../modulo-lesiones/modulo-lesiones.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LesionService } from 'src/app/core/services/lesion.service';
import { Lesion } from 'src/app/core/model/lesion';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';


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
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.FECHA_RECUPERACION_INVALIDA);
      return;
    }
    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }
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
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        this.formulario.reset();
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

  constructor(
    private historialService: HistorialService,
    private lesionService: LesionService,
    private formBuilder: UntypedFormBuilder,
    private equipodevService: EquipoService,
    private alertService: AlertService,
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
    });
  }
  
}
