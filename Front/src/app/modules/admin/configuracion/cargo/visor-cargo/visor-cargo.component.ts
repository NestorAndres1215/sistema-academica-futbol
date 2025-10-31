import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CargoComponent } from '../cargo/cargo.component';
@Component({
  selector: 'app-visor-cargo',
  templateUrl: './visor-cargo.component.html',
  styleUrls: ['./visor-cargo.component.css']
})
export class VisorCargoComponent implements OnInit {
lista:any
constructor(
    private dialogRe: MatDialogRef<CargoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }
  public formulario: UntypedFormGroup;
  ngOnInit(): void {
    this.lista=this.data
    this.listarEdiciones()
  }

  nombre: string
  descripcion: string
 
  usuarioCreacion: string
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion:string;
  listarEdiciones() {
    this.nombre = this.lista.row.nombre;
    this.descripcion = this.lista.row.descripcion;
  
 
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
      descripcion: [this.descripcion, Validators.required],

    });
  }
  deshabilitar() {
    this.formulario.disable();
  }


  cerrar() {
    this.dialogRe.close();
  }

}
