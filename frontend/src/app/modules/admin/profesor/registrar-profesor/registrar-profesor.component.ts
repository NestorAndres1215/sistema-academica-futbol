import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Historial } from 'src/app/core/model/historial';
import { Profesor } from 'src/app/core/model/profesor';

import { AdminService } from 'src/app/core/services/admin.service';
import { CargoService } from 'src/app/core/services/cargo.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { SedeService } from 'src/app/core/services/sede.service';


@Component({
  selector: 'app-registrar-profesor',
  templateUrl: './registrar-profesor.component.html',
  styleUrls: ['./registrar-profesor.component.css']
})
export class RegistrarProfesorComponent implements OnInit {
  public formulario: UntypedFormGroup;
  cargos: any;
  nacionalidad: any;
  sedes: any
  genero: any
  tiposDocumento: any
  constructor(
    private sede: SedeService,
    private generales: GeneralService,
    private cargo: CargoService,
    private historialService: HistorialService,
    private router: Router,
    private profesorService: ProfesorService,
    private formBuilder: UntypedFormBuilder,
    private mensaje: MensajeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private loginService: LoginService

  ) { }
  edad: number | null = null;
  ngOnInit(): void {

    this.listarCargo()
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
    const today = new Date();
    const minYear = today.getFullYear() - 120; // Máximo 120 años atrás
    this.minDate = `1980-01-01`; // Fecha mínima permitida
    this.maxDate = this.formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 20))); 
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Día con dos dígitos
    return `${year}-${month}-${day}`;
  }



  initForm(): void {
    this.formulario = this.formBuilder.group({
    
      cargo: [this.cargos, Validators.required],
      sede: [this.sedes, Validators.required],
      genero: [this.genero, Validators.required],
      tipo: [this.tiposDocumento, Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required], // Corregido: Eliminar la coma extra
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
        this.calcularEdad(date);
      }
    });
  }


  volver(): void {
    this.router.navigate(['/administrador']);
  }

  calcularEdad(fechaNacimiento: string) {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    this.edad = edad;
    this.formulario.patchValue({ edad: this.edad }); // Actualiza el valor de edad
  }


  operar(): void {
    console.log(this.loginService.getUser().username);
    console.log(this.formulario.value);

    const edad = this.formulario.value.edad;

    if (edad < 0) {
      this.mensaje.MostrarMensaje("NO DEBE SER NEGATIVO");
      return;
    }

    const genero = this.formulario.value.genero;
    const cargo = this.formulario.value.cargo;
    const sede = this.formulario.value.sede;
    const tipo = this.formulario.value.tipo;

    const segundoNombre = this.formulario.value.segundoNombre || '-';


    console.log(segundoNombre)
    const usuario = "P" + this.formulario.value.dni;
    const apellidoPaterno = this.formulario.get('apellidoPaterno')?.value || ''; // Obtén el valor
    const primerCaracter = apellidoPaterno.charAt(0); // O también apellidoPaterno[0]
    const contra = this.formulario.value.dni + primerCaracter

    // Solo proceder si el formulario es válido
    if (this.formulario.valid) {
      const objProfesor: Profesor = {
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
        cargo: cargo,
        genero: genero,
        tipoDoc: tipo,
      };

      // Crear el historial de la acción
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} registró un nuevo profesor: ${objProfesor.username}.`
      };

      // Registrar el historial antes de guardar el profesor
      this.historialService.registrar(historial).subscribe(
        () => {
          // Si el historial se registra correctamente, guardar el profesor
          this.profesorService.guardarProfesor(objProfesor).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE REGISTRO USUARIO PROFESOR");
              this.formulario.reset();

              // Limpiar los estados de los controles del formulario
              Object.keys(this.formulario.controls).forEach(key => {
                const control = this.formulario.get(key);
                control?.markAsPristine();
                control?.markAsUntouched();
                control?.updateValueAndValidity();
                const inputElement = document.querySelector(`[formControlName="${key}"]`);
                if (inputElement) {
                  inputElement.classList.remove('error');
                }
              });
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
    } else {
      console.log("Formulario vacío");
      this.mensaje.MostrarMensaje("FORMULARIO VACÍO");
      this.formulario.markAllAsTouched();
    }
  }

  async listarCargo() {
    this.cargo.listarCargoActivado().subscribe((data) => {
      console.log(data)
      this.cargos = data;

    })
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
