import { Component, Inject, OnInit } from '@angular/core';
import { HorarioComponent } from '../horario/horario.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-visor-horario',
  templateUrl: './visor-horario.component.html',
  styleUrls: ['./visor-horario.component.css']
})
export class VisorHorarioComponent implements OnInit {
  cerrar() {
    this.dialogRe.close();
  }
  constructor(
    private dialogRe: MatDialogRef<HorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }

  lista: any

  ngOnInit(): void {
    this.lista = this.data
    console.log(this.lista)
    this.listarEdiciones()
  }
  
  inicio: string
  final: string
  usuarioCreacion: string;
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  formulario: UntypedFormGroup;

  listarEdiciones() {
    this.inicio = this.lista.row.inicioHora;
    this.final = this.lista.row.finHora;
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
      inicio: [this.inicio, Validators.required],
      fin: [this.final, Validators.required],

    });
  }
  deshabilitar() {
    this.formulario.disable();
  }
}
