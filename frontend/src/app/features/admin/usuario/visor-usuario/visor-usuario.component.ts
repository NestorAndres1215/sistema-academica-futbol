import { Component, Inject, OnInit } from '@angular/core';
import { LstUsuarioComponent } from '../lst-usuario/lst-usuario.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-visor-usuario',
  templateUrl: './visor-usuario.component.html',
  styleUrls: ['./visor-usuario.component.css']
})
export class VisorUsuarioComponent implements OnInit {
  showPassword: false;
  formulario: UntypedFormGroup;
  lista: any;
  nombrePrimero: string
  nombreSegundo: string
  apellidoPaterno: string
  apellidoMaterno: string
  correo: string
  telefono: string
  dni: string
  direccion: string
  edad: string
  nacimiento: string
  usuario: string
  contra: string
  nacionalidad: string
  usuarioCreacion: string
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;

  botonesConfig = {
    editar: false,
    volver: true,

  };


  constructor(
    private dialogRe: MatDialogRef<LstUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }


  ngOnInit(): void {
    this.lista = this.data
    this.listarEdiciones()
  }

  listarEdiciones() {
    this.usuario = this.lista.row.usuario.username;
    this.contra = this.lista.row.usuario.password;
    this.nombrePrimero = this.lista.row.primerNombre;
    this.nombreSegundo = this.lista.row.segundoNombre;
    this.apellidoPaterno = this.lista.row.apellidoPaterno;
    this.apellidoMaterno = this.lista.row.apellidoMaterno;
    this.telefono = this.lista.row.telefono;
    this.correo = this.lista.row.correo;
    this.dni = this.lista.row.dni;
    this.direccion = this.lista.row.direccion;
    this.nacimiento = this.lista.row.fechaNacimiento;
    this.edad = this.lista.row.edad;
    this.nacionalidad = this.lista.row.nacionalidad;
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
      usuario: [this.usuario, Validators.required],
      contra: [this.contra, Validators.required],
      primerNombre: [this.nombrePrimero, Validators.required],
      segundoNombre: [this.nombreSegundo, Validators.required],
      apellidoPaterno: [this.apellidoPaterno, [Validators.required]],
      apellidoMaterno: [this.apellidoMaterno, Validators.required],
      telefono: [this.telefono, [Validators.required]],
      email: [this.correo, Validators.required],
      dni: [this.dni, Validators.required],
      direccion: [this.direccion, Validators.required],
      nacimiento: [this.nacimiento, Validators.required],
      edad: [this.edad, Validators.required],
      nacionalidad: [this.nacionalidad, Validators.required],
    });
  }

  deshabilitar() {
    this.formulario.disable();
  }
  
  cerrar() {
    this.dialogRe.close();
  }
}
