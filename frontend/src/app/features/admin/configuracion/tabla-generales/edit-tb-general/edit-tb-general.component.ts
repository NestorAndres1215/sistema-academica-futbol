import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LsTablaGeneralComponent } from '../ls-tabla-general/ls-tabla-general.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { General } from 'src/app/core/model/General';
import { Historial } from 'src/app/core/model/historial';


@Component({
  selector: 'app-edit-tb-general',
  templateUrl: './edit-tb-general.component.html',
  styleUrls: ['./edit-tb-general.component.css']
})
export class EditTbGeneralComponent implements OnInit {

  lista: any
  constructor(
    private dialogRe: MatDialogRef<LsTablaGeneralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mensaje:MensajeService,
    private loginService:LoginService,
    private generalService:GeneralService,
     private cdr: ChangeDetectorRef,
            private dialog: MatDialog,
            private historialService:HistorialService,
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
        descripcion1: this.formulario.get('descripcion')?.value,
        usuarioCreacion: this.usuarioCreacion,
        usuarioActualizacion: this.loginService.getUser().username,
      };
      console.log(objRegistrar);
  
      this.generalService.actualizarGeneral(objRegistrar).subscribe(
        response => {
          // Mostrar mensaje de éxito
          this.mensaje.MostrarMensajeExito("SE ACTUALIZÓ DETALLE");
  
          // Registro en el historial
          const historial: Historial = {
            usuario: this.loginService.getUser().username,
            detalle: `El usuario ${this.loginService.getUser().username} actualizó la listado de detalle con el código ${objRegistrar.codigo}.`
          };
  
          // Registrar el historial
          this.historialService.registrar(historial).subscribe(
            () => {
              // Si el historial se guarda correctamente, cerrar el modal y forzar la detección de cambios
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError("Error al registrar el historial: " + error); // Manejar error en historial
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
