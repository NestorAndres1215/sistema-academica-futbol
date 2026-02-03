import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';

import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';

import { AdminClaseDiaComponent } from '../admin-clase-dia/admin-clase-dia.component';
import { ClaseDev } from 'src/app/core/model/clasedev';
import { Historial } from 'src/app/core/model/historial';
import { MensajeService } from 'src/app/core/services/mensaje.service';


@Component({
  selector: 'app-admin-carga-edit-clase',
  templateUrl: './admin-carga-edit-clase.component.html',
  styleUrls: ['./admin-carga-edit-clase.component.css']
})
export class AdminCargaEditClaseComponent implements OnInit {

  formulario: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder,
    private claseService: ClaseService,
    private mensaje: MensajeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private historialService: HistorialService,
    private dialogRe: MatDialogRef<AdminClaseDiaComponent>,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  titulo: string
  objetivo: string
  descripcion: string
  codigo: string
  dia: string
  codigoClase: string
  ngOnInit(): void {
    console.log(this.data)
    this.titulo = this.data.titulo
    this.codigo = this.data.codigo
    this.codigoClase = this.data.codigoClase
    this.dia = this.data.dia
    this.objetivo = this.data.objetivo
    this.descripcion = this.data.descripcion
    this.initForm()
  }
  initForm(): void {
    this.formulario = this.formBuilder.group({
      descripcion: [this.descripcion, Validators.required],
      objetivo: [this.objetivo, Validators.required],
      titulo: [{ value: this.titulo, disabled: true }, Validators.required], 
    });
  }

  operar() {

    console.log(this.formulario.value)
    if (this.formulario.valid) {
      const objclase: ClaseDev = {
        codigo: this.codigoClase,
        titulo: this.formulario.get('titulo')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        objetivo: this.formulario.get('objetivo')?.value,
        clase: this.codigo,
        usuarioActualizacion: this.loginService.getUser().username,
        dia: this.dia
      };
      console.log(objclase)
     
      const historial: Historial = {
        usuario: this.loginService.getUser().username, 
        detalle: `El usuario ${this.loginService.getUser().username} registró al clase detalle ${objclase.titulo} y con el  dia  ${this.dia}.`
      };

      this.claseService.actualizarDev(objclase).subscribe(
        () => {

          this.historialService.registrar(historial).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE ACTUALIZO CARGA DE CLASE");
              this.formulario.reset();
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError(error);
            }
          );
        },
        error => {
  
          this.mensaje.MostrarBodyError("Error al registrar el historial: " + error);
        }
      );
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

}
