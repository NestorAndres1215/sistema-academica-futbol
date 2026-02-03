import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Estudiante } from 'src/app/core/model/estudiante';
import { Historial } from 'src/app/core/model/historial';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

import { SedeService } from 'src/app/core/services/sede.service';
import { calcularEdad, formatDate } from 'src/app/core/utils/fechaValidator';

@Component({
  selector: 'app-reg-estudiante',
  templateUrl: './reg-estudiante.component.html',
  styleUrls: ['./reg-estudiante.component.css']
})
export class RegEstudianteComponent implements OnInit {

  botonesConfig = {
    editar: false,
    volver: true,

  };
  public formulario: UntypedFormGroup;

  nacionalidad: any;
  sedes: any
  genero: any
  tiposDocumento: any
  constructor(
    private sede: SedeService,
    private generales: GeneralService,

    private router: Router,
    private estudiante: EstudianteService,
    private formBuilder: UntypedFormBuilder,
    private mensaje: MensajeService,
    private historialService: HistorialService,
    private loginService: LoginService

  ) { }
  edad: number | null = null;
  ngOnInit(): void {


    this.listarSede()
    this.listaNacionalidad()
    this.listaGenero()
    this.listaDoc();
    this.validarFecha()
    this.initForm();
  }
  maxDate: string;
  minDate: string;

  async validarFecha() {
    this.minDate = `1980-01-01`;
    this.maxDate = formatDate(new Date());
  }


  initForm(): void {
    this.formulario = this.formBuilder.group({
      sede: [this.sedes, Validators.required],
      genero: [this.genero, Validators.required],
      tipo: [this.tiposDocumento, Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: [this.edad, [Validators.required, Validators.min(0)]],
    });
    this.formulario.get('edad')?.disable();
    this.formulario.get('fechaNacimiento')?.valueChanges.subscribe(date => {
      if (date) {
        calcularEdad(date);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/administrador']);
  }

  operar(): void {

    const edad = this.formulario.value.edad;

    if (edad < 0) {
      this.mensaje.MostrarMensaje("NO DEBE SER NEGATIVO");
      return;
    }

    const genero = this.formulario.value.genero;
    const sede = this.formulario.value.sede;
    const tipo = this.formulario.value.tipo;
    const usuario = "E" + this.formulario.value.dni;
    const apellidoPaterno = this.formulario.get('apellidoPaterno')?.value || '';
    const primerCaracter = apellidoPaterno.charAt(0);
    const contra = this.formulario.value.dni + primerCaracter
    if (this.formulario.valid) {
      const objProfesor: Estudiante = {

        primerNombre: this.formulario.get('primerNombre')?.value,
        segundoNombre: this.formulario.get('segundoNombre')?.value,
        apellidoPaterno: this.formulario.get('apellidoPaterno')?.value,
        apellidoMaterno: this.formulario.get('apellidoMaterno')?.value,
        telefono: this.formulario.get('telefono')?.value,
        dni: this.formulario.get('dni')?.value,
        direccion: this.formulario.get('direccion')?.value,
        correo: this.formulario.get('correo')?.value,
        edad: this.formulario.get('edad')?.value,
        nacimiento: this.formulario.get('fechaNacimiento')?.value,
        nacionalidad: this.formulario.get('nacionalidad')?.value,
        username: usuario,
        password: contra,
        usuarioCreacion: this.loginService.getUser().username,
        sede: sede,
        genero: genero,
        tipoDoc: tipo,
      };


      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} registró al estudiante ${objProfesor.primerNombre} ${objProfesor.apellidoPaterno}.`
      };

      this.historialService.registrar(historial).subscribe(
        () => {

          this.estudiante.guardarEstudiante(objProfesor).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE REGISTRÓ ESTUDIANTE");
              this.formulario.reset();
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


  async listaNacionalidad() {
    this.generales.listarGeneralDevActivado("0003").subscribe((data) => {
      console.log(data)
      this.nacionalidad = data;

    })
  }
  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.genero = data;

    })
  }
  async listaDoc() {
    this.generales.listarGeneralDevActivado("0001").subscribe((data) => {
      console.log(data)
      this.tiposDocumento = data;

    })
  }
  async listarSede() {
    this.sede.listarSedeActivado().subscribe((data) => {
      console.log(data)
      this.sedes = data;

    })
  }
}
