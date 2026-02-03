import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ListEstudianteComponent } from '../list-estudiante/list-estudiante.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { Router } from '@angular/router';
import { SedeService } from 'src/app/core/services/sede.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { LoginService } from 'src/app/core/services/login.service';

import { HistorialService } from 'src/app/core/services/historial.service';
import { Estudiante } from 'src/app/core/model/estudiante';
import { Historial } from 'src/app/core/model/historial';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { edadNacimiento } from 'src/app/core/utils/fechaValidator';

@Component({
  selector: 'app-edit-estudiante',
  templateUrl: './edit-estudiante.component.html',
  styleUrls: ['./edit-estudiante.component.css']
})
export class EditEstudianteComponent implements OnInit {

  showPassword: false;
  tipo: string
  lista: any
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
  codigoUsuario: string;
  codigoAdmin: string;
  cargo: string;
  genero: string;
  sede: string

  nacionalidades: any
  usuarios: any;
  dataSource: MatTableDataSource<any>;
  sedes: any
  public formulario: UntypedFormGroup;

  constructor(
    private dialogRe: MatDialogRef<ListEstudianteComponent>,
    private router: Router,
    private estudianteService: EstudianteService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private historialService: HistorialService,
    private sedeService: SedeService,
    private formBuilder: UntypedFormBuilder,
    private mensaje: MensajeService,
    private generales: GeneralService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
  numdoc: string; // Valor predeterminado
  ngOnInit(): void {
    this.lista = this.data.row;
    console.log(this.data.row)
    this.nacionalidad = this.lista.nacionalidad
    this.sede = this.lista.sede.codigo
    this.codigoUsuario = this.lista.usuario.codigo
    this.codigoAdmin = this.lista.codigo
    this.usuarioCreacion = this.lista.usuarioCreacion
    this.fechaCreacion = this.lista.fechaCreacion
    this.horaCreacion = this.lista.horaCreacion
    this.genero = this.lista.genero
    this.numdoc = this.lista.dni
    this.tipo = this.lista.tipo

    this.contra = this.lista.usuario.password
    this.nombrePrimero = this.lista.primerNombre
    this.nombreSegundo = this.lista.segundoNombre
    this.apellidoPaterno = this.lista.apellidoPaterno
    this.apellidoMaterno = this.lista.apellidoMaterno
    this.direccion = this.lista.direccion;

    this.telefono = this.lista.telefono;
    this.edad = this.lista.edad;
    this.nacimiento = this.lista.fechaNacimiento;
    this.correo = this.lista.correo;
    this.usuario = this.lista.usuario.username;


    this.listaGenero();



    this.listarSede();
    this.listaNacionalidad();
    this.listaDoc();
    this.initForm();
  }
  initForm() {
    this.formulario = this.formBuilder.group({
      primerNombre: [this.nombrePrimero, Validators.required],
      direccion: [this.direccion, Validators.required],
      sede: [this.sede, Validators.required],
      tipo: [this.tipo, Validators.required],
      segundoNombre: [this.nombreSegundo, Validators.required],
      apellidoPaterno: [this.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.apellidoMaterno, Validators.required],
      usuario: [this.usuario, Validators.required],
      telefono: [this.telefono, [Validators.required, Validators.pattern('[0-9]*')]],
      correo: [this.correo, [Validators.required, Validators.email]],
      fechaNacimiento: [this.nacimiento, Validators.required],
      genero: [this.genero, Validators.required],
      nacionalidad: [this.nacionalidad, Validators.required],
      dni: [this.lista.dni, Validators.required],
      numero: [this.numdoc, Validators.required],
      contra: [{ value: this.contra, disabled: true }, Validators.required]
    });
  }

  cargos: any
  generos: any



  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.generos = data;

    })
  }


  
  cerrar() {
    this.dialogRe.close();
  }
  cargoActual = String;

  @Output() onActualizar: EventEmitter<boolean> = new EventEmitter();
  operar() {
    let edad: string | null; // Declaramos la variable
    const fechaNacimiento = this.formulario.get('fechaNacimiento').value;
    edad = edadNacimiento(fechaNacimiento); 
    console.log(edad)
    console.log(this.codigoAdmin)

    if (this.formulario.valid) {
      const objAdmin: Estudiante = {
        codigoUsuario: this.codigoUsuario,
        codigoProfesor: this.codigoAdmin,
        primerNombre: this.formulario.get('primerNombre')?.value,
        segundoNombre: this.formulario.get('segundoNombre')?.value,
        apellidoPaterno: this.formulario.get('apellidoPaterno')?.value,
        apellidoMaterno: this.formulario.get('apellidoMaterno')?.value,
        correo: this.formulario.get('correo')?.value,
        telefono: this.formulario.get('telefono')?.value,
        dni: this.formulario.get('numero')?.value,
        direccion: this.formulario.get('direccion')?.value,
        nacionalidad: this.formulario.get('nacionalidad')?.value,
        username: this.formulario.get('usuario')?.value,
        password: this.formulario.get('contra')?.value,
        nacimiento: this.formulario.get('fechaNacimiento')?.value,
        tipoDoc: this.formulario.get('tipo')?.value,
        edad: edad,
        usuarioCreacion: this.usuarioCreacion,
        usuarioActualizacion: this.loginService.getUser().username,
        sede: this.formulario.get('sede')?.value,

        genero: this.formulario.get('genero')?.value,

      };
      console.log(objAdmin)
      // Crear el objeto del historial
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} actualizó al estudiante ${objAdmin.primerNombre} ${objAdmin.apellidoPaterno}.`,
      };

      // Registrar el historial
      this.historialService.registrar(historial).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder con la actualización del estudiante
          this.estudianteService.actualizarEstudiante(objAdmin).subscribe(
            response => {
              this.mensaje.MostrarMensaje("SE ACTUALIZÓ PROFESOR");
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError(error);
            }
          );
        },
        error => {
          // Si hubo un error al registrar el historial, mostrar un mensaje de error
          this.mensaje.MostrarBodyError("Error al registrar el historial: " + error);
        }
      );
    }
    else {
      this.mensaje.MostrarMensaje("FORMULARIO VACIO")
      this.formulario.markAllAsTouched();
    }

  }
  tiposDocumento: any

  async listarSede() {
    this.sedeService.listarSedeActivado().subscribe((data) => {
      console.log(data)
      this.sedes = data;

    })
  }
  async listaNacionalidad() {
    this.generales.listarGeneralDevActivado("0003").subscribe((data) => {
      console.log(data)
      this.nacionalidades = data;

    })
  }

  async listaDoc() {
    this.generales.listarGeneralDevActivado("0001").subscribe((data) => {
      console.log(data)
      this.tiposDocumento = data;

    })
  }

}
