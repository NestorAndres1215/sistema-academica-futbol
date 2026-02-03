import { Component, Inject, OnInit } from '@angular/core';
import { MantEquipoComponent } from '../mant-equipo/mant-equipo.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visor-equpo',
  templateUrl: './visor-equpo.component.html',
  styleUrls: ['./visor-equpo.component.css']
})
export class VisorEqupoComponent implements OnInit {
  public formulario: UntypedFormGroup;
  lista: any;
  nombre: string;
  categoria: string;
  sede: string;
  genero: string;
  usuarioCreacion: string;
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  constructor(
    private dialogRe: MatDialogRef<MantEquipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }
    
  ngOnInit(): void {
    this.lista = this.data
    this.listarEdiciones()
  }

  listarEdiciones() {
    this.nombre = this.lista.row.nombre;
    this.categoria = this.lista.row.categoria;
    this.sede = this.lista.row.sede;
    this.genero = this.lista.row.genero;
    this.usuarioCreacion = this.lista.row.usuarioRegistro;
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
      categoria: [this.categoria, Validators.required],
      genero: [this.genero, Validators.required],
      sede: [this.sede, Validators.required],
    });
  }

  deshabilitar() {
    this.formulario.disable();
  }
  
  cerrar() {
    this.dialogRe.close();
  }


}

