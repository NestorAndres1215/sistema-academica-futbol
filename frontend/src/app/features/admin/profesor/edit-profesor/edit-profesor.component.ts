import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LstProfesoresComponent } from '../lst-profesores/lst-profesores.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { LoginService } from 'src/app/core/services/login.service';
import { CargoService } from 'src/app/core/services/cargo.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { switchMap } from 'rxjs';
import { Historial } from 'src/app/core/model/historial';
import { Profesor } from 'src/app/core/model/profesor';

@Component({
  selector: 'app-edit-profesor',
  templateUrl: './edit-profesor.component.html',
  styleUrls: ['./edit-profesor.component.css']
})
export class EditProfesorComponent implements OnInit {


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
    private dialogRe: MatDialogRef<LstProfesoresComponent>,
    private historialService:HistorialService,
    private router: Router,
    private profesorService: ProfesorService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private cargoService: CargoService,
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
    this.cargo = this.lista.cargo.codigo
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
this.validarFecha() 

    this.listaGenero();


    this.listarCargo();
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
      cargo: [this.cargo, Validators.required],
      genero: [this.genero, Validators.required],
      nacionalidad: [this.nacionalidad, Validators.required],
      dni: [this.lista.dni, Validators.required],
      numero: [this.numdoc, Validators.required],
      contra: [{ value: this.contra, disabled: true }, Validators.required]
    });
  }

  cargos: any
  generos: any


  async listarCargo() {
    this.cargoService.listarCargoActivado().subscribe((data) => {
      console.log(data)
      this.cargos = data;

    })
  }

  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.generos = data;

    })
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



  cerrar() {
    this.dialogRe.close();
  }
  cargoActual = String;
  edadNacimiento(fechaNacimiento: string): string {
    if (fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);

      // Calcular edad
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

      // Ajustar si aún no ha cumplido años este año
      if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }

      return ` ${edad}`; // Retornamos la edad como string
    } else {
      return 'Por favor, ingresa una fecha de nacimiento válida.'; // Mensaje de error
    }
  }
  @Output() onActualizar: EventEmitter<boolean> = new EventEmitter();
  operar() {
    let edad: string | null; // Declaramos la variable
    const fechaNacimiento = this.formulario.get('fechaNacimiento').value;
    edad = this.edadNacimiento(fechaNacimiento); // Llamamos a la función para calcular la edad
    console.log(edad)
    console.log(this.codigoAdmin)

    if (this.formulario.valid) {
      const objAdmin: Profesor = {
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
        cargo: this.formulario.get('cargo')?.value,
        genero: this.formulario.get('genero')?.value,

      };
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
        detalle: `El usuario ${this.loginService.getUser().username} actualizó al profesor con el código ${this.codigoAdmin} ` +
                 `con el nombre ${this.formulario.get('primerNombre')?.value} ${this.formulario.get('segundoNombre')?.value} ` +
                 `${this.formulario.get('apellidoPaterno')?.value} ${this.formulario.get('apellidoMaterno')?.value}.`, // Crear el mensaje personalizado

      };
      
      
      console.log(historial);
      
      console.log(objAdmin)
      this.profesorService.actualizarProfesor(objAdmin).pipe(
        switchMap(response => 
          this.historialService.registrar(historial) // Registrar historial solo si actualizarProfesor es exitoso
        )
      ).subscribe(
        () => {
          this.mensaje.MostrarMensajeExito("SE ACTUALIZÓ PROFESOR");
          this.dialog.closeAll(); // Cerrar todos los diálogos
          this.cdr.detectChanges(); // Forzar detección de cambios si es necesario
        },
        error => {
          this.mensaje.MostrarBodyError(error); // Manejar errores de cualquiera de las llamadas
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
