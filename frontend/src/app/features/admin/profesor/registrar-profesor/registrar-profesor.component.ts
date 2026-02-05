import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { Historial } from 'src/app/core/model/historial';
import { Profesor } from 'src/app/core/model/profesor';
import { AlertService } from 'src/app/core/services/alert.service';
import { CargoService } from 'src/app/core/services/cargo.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { calcularEdad, formatDate } from 'src/app/core/utils/fechaValidator';


@Component({
  selector: 'app-registrar-profesor',
  templateUrl: './registrar-profesor.component.html',
  styleUrls: ['./registrar-profesor.component.css']
})
export class RegistrarProfesorComponent implements OnInit {
  formulario: UntypedFormGroup;
  cargos: any;
  nacionalidad: any;
  sedes: any
  genero: any
  tiposDocumento: any

  botonesConfig = {
    editar: false,
    volver: true,

  };

  constructor(
    private sede: SedeService,
    private generales: GeneralService,
    private cargo: CargoService,
    private historialService: HistorialService,
    private router: Router,
    private profesorService: ProfesorService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertService,
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
    this.minDate = `1980-01-01`;
    this.maxDate = formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 20)));
  }



  initForm(): void {
    this.formulario = this.formBuilder.group({
      cargo: [this.cargos, Validators.required],
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

    if (edad <= 0) {
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.EDAD_POSITIVA);
      return;
    }

    if (edad < 18) {
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.MAYOR_DE_EDAD);
      return;
    }

    const genero = this.formulario.value.genero;
    const cargo = this.formulario.value.cargo;
    const sede = this.formulario.value.sede;
    const tipo = this.formulario.value.tipo;
    const usuario = "P" + this.formulario.value.dni;
    const apellidoPaterno = this.formulario.get('apellidoPaterno')?.value || '';
    const primerCaracter = apellidoPaterno.charAt(0);
    const contra = this.formulario.value.dni + primerCaracter

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const objProfesor: Profesor = {
      primerNombre: this.formulario.get('primerNombre')?.value.primerNombre,
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

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró un nuevo profesor: ${objProfesor.username}.`
    };

    this.profesorService.guardarProfesor(objProfesor).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        this.formulario.reset();
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.message);
      }
    });
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
