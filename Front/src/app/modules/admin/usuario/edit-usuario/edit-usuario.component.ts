import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LstUsuarioComponent } from '../lst-usuario/lst-usuario.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { LoginService } from 'src/app/services/login.service';
import { Admin } from 'src/app/model/Admin';
import { MatTableDataSource } from '@angular/material/table';
import { Historial } from 'src/app/model/historial';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {


  showPassword: false;
  public formulario: UntypedFormGroup;
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
  codigoUsuario: string;
  codigoAdmin: string;
  constructor(
    private dialogRe: MatDialogRef<LstUsuarioComponent>,
    private router: Router,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private mensaje: MensajeService,
    private historialService: HistorialService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }


  ngOnInit(): void {
    this.lista = this.data
    console.log(this.lista)
    this.listarEdiciones()
    this.listarUsuario()
  }
  listarEdiciones() {
    this.codigoUsuario = this.lista.row.usuario.codigo;
    this.codigoAdmin = this.lista.row.codigo;
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

    this.nacionalidad = this.lista.row.nacionalidad;
    this.usuarioCreacion = this.lista.row.usuarioCreacion;
    this.fechaCreacion = this.lista.row.fechaCreacion;
    this.horaCreacion = this.lista.row.horaCreacion;
    this.usuarioActualizacion = this.lista.row.usuarioActualizacion;
    this.fechaActualizacion = this.lista.row.fechaActualizacion;
    this.horaActualizacion = this.lista.row.horaActualizacion;
    this.validarFecha()
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

      nacionalidad: [this.nacionalidad, Validators.required],
    });

  }



  deshabilitar() {
    this.formulario.get('contra')?.disable();
    this.formulario.get('usuario')?.disable();
    this.formulario.get('nacionalidad')?.disable();
  }
  cerrar() {
    this.dialogRe.close();
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
    console.log(this.formulario.value);
    let edad: string | null; // Declaramos la variable
    const fechaNacimiento = this.formulario.get('nacimiento').value;
    edad = this.edadNacimiento(fechaNacimiento); // Llamamos a la función para calcular la edad
    console.log(edad)
    console.log(this.codigoAdmin)
    if (this.formulario.valid) {
      const objAdmin: Admin = {
        codigoUsuario: this.codigoUsuario,
        codigoAdmin: this.codigoAdmin,
        primerNombre: this.formulario.get('primerNombre')?.value,
        segundoNombre: this.formulario.get('segundoNombre')?.value,
        apellidoPaterno: this.formulario.get('apellidoPaterno')?.value,
        apellidoMaterno: this.formulario.get('apellidoMaterno')?.value,
        correo: this.formulario.get('email')?.value,
        telefono: this.formulario.get('telefono')?.value,
        dni: this.formulario.get('dni')?.value,
        direccion: this.formulario.get('direccion')?.value,
        nacionalidad: this.formulario.get('nacionalidad')?.value,
        username: this.formulario.get('usuario')?.value,
        password: this.formulario.get('contra')?.value,
        fechaNacimiento: this.formulario.get('nacimiento')?.value,
        edad: edad,
        usuarioCreacion: this.usuarioCreacion,
        usuarioActualizacion: this.loginService.getUser().username,
      };
      console.log(objAdmin)

      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} actualizó los datos del administrador con código ${this.codigoAdmin}.`
      };

      // Registrar el historial
      this.historialService.registrar(historial).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder a actualizar el administrador
          this.adminService.actualizarAdmin(objAdmin).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE ACTUALIZÓ USUARIO ");
              this.dialog.closeAll(); // Cerrar el diálogo después de actualizar
              this.cdr.detectChanges(); // Detectar cambios en el componente
            },
            error => {
              this.mensaje.MostrarBodyError(error); // Manejar el error si ocurre
            }
          );
        },
        error => {
          this.mensaje.MostrarBodyError("Error al registrar el historial: " + error); // Manejar el error de historial
        }
      );
    }
    else {
      this.mensaje.MostrarMensaje("FORMULARIO VACIO")
      this.formulario.markAllAsTouched();
    }


  }
  usuarios: any;
  dataSource: MatTableDataSource<any>;

  async listarUsuario() {
    await this.adminService.listarAdmins().subscribe((r) => {
      console.log(r)
      this.usuarios = r;
    });
  }



}


