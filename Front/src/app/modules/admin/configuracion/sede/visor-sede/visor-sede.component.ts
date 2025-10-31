import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SedeComponent } from '../sede/sede.component';

@Component({
  selector: 'app-visor-sede',
  templateUrl: './visor-sede.component.html',
  styleUrls: ['./visor-sede.component.css']
})
export class VisorSedeComponent implements OnInit {

lista:any
constructor(
    private dialogRe: MatDialogRef<SedeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }
  public formulario: UntypedFormGroup;
  ngOnInit(): void {
    this.lista=this.data
    this.listarEdiciones()
  }

  nombre: string
  telefono: string
  direccion: string
  usuarioCreacion: string
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion:string;
  listarEdiciones() {
    this.nombre = this.lista.row.nombre;
    this.telefono = this.lista.row.telefono;
    this.direccion = this.lista.row.direccion;
 
    this.usuarioCreacion = this.lista.row.usuarioCreacion;
    this.fechaCreacion = this.lista.row.fechaCreacion;
    this.horaCreacion = this.lista.row.horaCreacion;
    this.usuarioActualizacion = this.lista.row.usuarioActualizacion;
    this.fechaActualizacion = this.lista.row.fechaActualizacion;
    this.horaActualizacion = this.lista.row.horaActualizacion;

    this.initForm()
    this.deshabilitar()
  }
initForm() {
    this.formulario = this.formBuilder.group({
      nombre: [this.nombre, Validators.required],
      telefono: [this.telefono, Validators.required],
      direccion: [this.direccion, Validators.required],
      
    });
  }
  deshabilitar() {
    this.formulario.disable();
  }


  cerrar() {
    this.dialogRe.close();
  }
}
