import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LsClaseComponent } from '../ls-clase/ls-clase.component';

@Component({
  selector: 'app-visor-clase',
  templateUrl: './visor-clase.component.html',
  styleUrls: ['./visor-clase.component.css']
})
export class VisorClaseComponent implements OnInit {
usuarioCreacion: string;
fechaCreacion:string;
horaCreacion: string;
usuarioActualizacion: string;
fechaActualizacion: string;
horaActualizacion: string;
volver() {
  this.dialogRe.close();
}
  codigo: string;
  nombre: string;
  equipo: string;
  genero: string;
  inicioHora: string;
  finHora: string;
  fechaInicio: string;
  fechaFin: string;
  dia: string;

  public formulario: UntypedFormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRe: MatDialogRef<LsClaseComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {}

  ngOnInit(): void {
   
    // Inicializar el formulario y cargar los datos
    this.listaEdiciones();
  }

  // Simulación de datos (en lugar de recibirlos desde el backend)
  listaEdiciones() {
    this.codigo = this.data.row.codigo;
    this.nombre = this.data.row.nombre;
    this.equipo = this.data.row.equipo.nombre;
    this.genero =  this.data.row.equipo.genero;
    this.inicioHora =  this.data.row.horario.inicioHora;
    this.finHora = this.data.row.horario.finHora;
    this.fechaInicio = this.data.row.horario.fechaInicio;
    this.fechaFin = this.data.row.horario.fechaFin;
    this.dia =  this.data.row.dia;
this.usuarioCreacion=this.data.row.usuarioCreacion;
this.fechaCreacion=this.data.row.fechaCreacion;
this.horaCreacion=this.data.row.horaCreacion;
    // Inicializar el formulario con los datos cargados
    this.initForm();

    // Deshabilitar el formulario para que sea solo lectura
    this.deshabilitar();
  }

  // Configuración del formulario con validaciones
  initForm() {
    this.formulario = this.formBuilder.group({
      codigo: [this.codigo, Validators.required],
      nombre: [this.nombre, Validators.required],
      equipo: [this.equipo, Validators.required],
      genero: [this.genero, Validators.required],
      inicioHora: [this.inicioHora, Validators.required],
      finHora: [this.finHora, Validators.required],
      fechaInicio: [this.fechaInicio, Validators.required],
      fechaFin: [this.fechaFin, Validators.required],
      dia: [this.dia, Validators.required]
    });
  }

  // Deshabilitar todos los campos del formulario
  deshabilitar() {
    this.formulario.disable();
  }
}
