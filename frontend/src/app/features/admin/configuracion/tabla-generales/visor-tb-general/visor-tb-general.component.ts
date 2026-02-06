import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LsTablaGeneralComponent } from '../ls-tabla-general/ls-tabla-general.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visor-tb-general',
  templateUrl: './visor-tb-general.component.html',
  styleUrls: ['./visor-tb-general.component.css']
})
export class VisorTbGeneralComponent implements OnInit {

  lista: any
  formulario: UntypedFormGroup;
  clave: string
  descripcion: string
  codigo: string
  usuarioCreacion: string
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  constructor(
    private dialogRe: MatDialogRef<LsTablaGeneralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.lista = this.data
    this.listarEdiciones()
  }

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
    this.deshabilitar()
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      codigo: [this.codigo, Validators.required],
      clave: [this.clave, Validators.required],
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
