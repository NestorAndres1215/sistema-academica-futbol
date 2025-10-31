import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { General } from 'src/app/model/General';
import { LtDevComponent } from '../lt-dev/lt-dev.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MensajeService } from 'src/app/services/mensaje.service';
import { LoginService } from 'src/app/services/login.service';
import { GeneralService } from 'src/app/services/general.service';
import { Historial } from 'src/app/model/historial';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-edit-dev',
  templateUrl: './edit-dev.component.html',
  styleUrls: ['./edit-dev.component.css']
})
export class EditDevComponent implements OnInit {


  lista: any
  constructor(
    private dialogRe: MatDialogRef<LtDevComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mensaje: MensajeService,
    private loginService: LoginService,
    private historialService:HistorialService,
    private generalService: GeneralService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder,) { }
  public formulario: UntypedFormGroup;
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
    if (this.formulario.valid) {
      const objRegistrar: General = {
        codigo: this.formulario.get('codigo')?.value,
        clave: this.formulario.get('clave')?.value,
        descripcionPrimero: this.formulario.get('descripcion')?.value,
        usuarioCreacion: this.usuarioCreacion,
        usuarioActualizacion: this.loginService.getUser().username,
      };
      console.log(objRegistrar);
  
      this.generalService.actualizarGeneralDev(objRegistrar).subscribe(
        response => {
          // Mostrar mensaje de éxito
          this.mensaje.MostrarMensajeExito("SE ACTUALIZÓ DETALLE DE TABLA");
  
          // Registro de la acción en el historial
          const historial: Historial = {
            usuario: this.loginService.getUser().username,
            detalle: `El usuario ${this.loginService.getUser().username} actualizó el detalle de la tabla con el código ${objRegistrar.codigo}.`
          };
  
          // Registrar el historial
          this.historialService.registrar(historial).subscribe(
            () => {
              // Si se registra el historial con éxito, cerrar el modal y forzar detección de cambios
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError("Error al registrar el historial: " + error); // Manejar el error de historial
            }
          );
        },
        error => {
          this.mensaje.MostrarBodyError(error);
        }
      );
    } else {
      this.mensaje.MostrarMensaje("FORMULARIO VACIO");
      this.formulario.markAllAsTouched();
    }
  }
  

  cerrar() {
    this.dialogRe.close();
  }
}
