import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visor-lesiondet',
  templateUrl: './visor-lesiondet.component.html',
  styleUrls: ['./visor-lesiondet.component.css']
})
export class VisorLesiondetComponent implements OnInit {
  cerrar() {
    this.dialogRe.close();
  }

  constructor(

    private dialogRe: MatDialogRef<VisorLesiondetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    console.log(this.data.row)
    this.listaEdiciones()
  }
  codigo: string
  tipoLesion: string
  fechaLesion: string
  gravedad: string
  estado: string
  tiempoRecuperacion: string
  nombre: string
  fecha: string
  hora: string
  tipoEvento: string
  descripcion: string
  responsable: string
  observaciones: string

    listaEdiciones() {
      this.codigo = this.data.row.codigo;
      this.tipoLesion = this.data.row.tipoLesion;
      this.fechaLesion = this.data.row.fechaLesion;
      this.gravedad = this.data.row.gravedad;
      this.estado = this.data.row.estado;
      this.tiempoRecuperacion = this.data.row.tiempoRecuperacion;
      this.nombre = this.data.row.nombre;
      this.fecha = this.data.row.fecha;
      this.hora = this.data.row.hora;
      this.tipoEvento = this.data.row.tipoEvento;
      this.descripcion = this.data.row.descripcion;
      this.responsable = this.data.row.responsable;
      this.observaciones = this.data.row.observaciones;
      this.initForm()
      this.deshabilitar()
    }
    
      public formulario: UntypedFormGroup;
  
    initForm() {
      this.formulario = this.formBuilder.group({
  
        tipoLesion: [this.tipoLesion, Validators.required],
        fechaLesion: [this.fechaLesion, Validators.required],
        gravedad: [this.gravedad, Validators.required],
        estado: [this.estado, Validators.required],
        tiempoRecuperacion: [this.tiempoRecuperacion, Validators.required],
        nombre: [this.nombre, Validators.required],
        fecha: [this.fecha, Validators.required],
        hora: [this.hora, Validators.required],
        tipoEvento: [this.tipoEvento, Validators.required],
        descripcion: [this.descripcion, Validators.required],
        responsable: [this.responsable, Validators.required],
        observaciones: [this.observaciones, Validators.required]
      });
    }
    deshabilitar(){
      this.formulario.disable();
    }
}
