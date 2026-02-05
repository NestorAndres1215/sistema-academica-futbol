import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { DatosPersonalesProfesoresComponent } from '../datos-personales-profesores/datos-personales-profesores.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';

import Swal from 'sweetalert2';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css']
})
export class EditPerfilComponent implements OnInit {


  cerrar() {
    this.dialogRe.close();
  }
  logo: File | undefined;



  public formulario: UntypedFormGroup;

  usuario: string = '';
  contra: string = '';
  nombrePrimero: string = '';
  nombreSegundo: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  telefono: string = '';
  correo: string = '';
  dni: string = '';
  direccion: string = '';
  nacimiento: string = '';
  nacionalidad: string = '';
  codigoUsuario: string = '';
  codigoAdmin: string = '';
  usuarioCreacion: string = '';
  fechaCreacion: string = '';
  horaCreacion: string = '';
  usuarioActualizacion: string = '';
  fechaActualizacion: string = '';
  horaActualizacion: string = '';
  lista: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRe: MatDialogRef<DatosPersonalesProfesoresComponent>,
    private adminService: ProfesorService,
    private cdr: ChangeDetectorRef,
    private loginService: LoginService,
    private historialService: HistorialService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder,) { }


  imagenUrlBase = 'data:image/jpeg;base64,';
  mostrarImagen(perfil: any): string {
    return this.lista.row[0].perfil ? this.imagenUrlBase + this.lista.row[0].perfil : '';
  }

  defaultFileName: string = 'imagen.png';

  get selectedFileName(): string {
    return this.selectedFile ? this.selectedFile.name : this.defaultFileName;
  }
  selectedFile: File | undefined;

  imagen() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(this.logo);
  }
  defaultImageUrl: string = 'assets/image/components/icono-perfil.jpg';


  imageUrl: string | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else if (!this.selectedFile && this.logo) {
      this.imageUrl = this.mostrarImagen(this.logo);
    } else {
      this.imageUrl = this.defaultImageUrl;
    }
  }

  ngOnInit(): void {

    this.lista = this.data
    console.log(this.lista)
    this.listarEdiciones(); this.initForm()
    console.log(this.lista.row[0].telefono)

  }
  initForm() {
    this.formulario = this.formBuilder.group({
      usuario: [this.usuario, Validators.required],
      primerNombre: [this.nombrePrimero, Validators.required],
      segundoNombre: [this.nombreSegundo, Validators.required],
      apellidoPaterno: [this.apellidoPaterno, [Validators.required]],
      apellidoMaterno: [this.apellidoMaterno, Validators.required],
      telefono: [this.telefono, [Validators.required]],
      email: [this.correo, Validators.required],
      direccion: [this.direccion, Validators.required],

    });

  }

  listarEdiciones() {

    const firstRow = this.lista.row[0];
    this.codigoUsuario = firstRow.usuario.codigo;
    this.codigoAdmin = firstRow.codigo;
    this.usuario = firstRow.usuario.username;
    this.contra = firstRow.usuario.password;
    this.nombrePrimero = firstRow.primerNombre;
    this.nombreSegundo = firstRow.segundoNombre;
    this.apellidoPaterno = firstRow.apellidoPaterno;
    this.apellidoMaterno = firstRow.apellidoMaterno;
    this.telefono = firstRow.telefono;
    this.correo = firstRow.correo;
    this.dni = firstRow.dni;
    this.direccion = firstRow.direccion;
    this.nacimiento = firstRow.fechaNacimiento;
    this.nacionalidad = firstRow.nacionalidad;
    this.usuarioCreacion = firstRow.usuarioCreacion;
    this.fechaCreacion = firstRow.fechaCreacion;
    this.horaCreacion = firstRow.horaCreacion;
    this.usuarioActualizacion = firstRow.usuarioActualizacion;
    this.fechaActualizacion = firstRow.fechaActualizacion;
    this.horaActualizacion = firstRow.horaActualizacion;

  }

  edadNacimiento(fechaNacimiento: string): string {
    if (fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);

      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

      if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }

      return ` ${edad}`;
    } else {
      return 'Por favor, ingresa una fecha de nacimiento válida.'; // Mensaje de error
    }
  }
  operar() {

    const formValues = this.formulario.value;
    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const logo = this.selectedFile
      ? this.selectedFile
      : this.logo
        ? new File([new Blob()], 'imagen_actual.jpeg', { type: 'image/jpeg' })
        : new File([new Blob()], 'imagen_defecto.jpeg', { type: 'image/jpeg' });

    formValues.logo = logo;


    const registrar = {
      codigoAdmin: this.codigoAdmin,
      codigoUsuario: this.codigoUsuario,
      usuario: formValues.usuario,
      primerNombre: formValues.primerNombre,
      segundoNombre: formValues.segundoNombre,
      apellidoPaterno: formValues.apellidoPaterno,
      apellidoMaterno: formValues.apellidoMaterno,
      telefono: formValues.telefono,
      email: formValues.email,
      direccion: formValues.direccion,
      perfil: formValues.logo,
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizó el administrador con el código ${this.codigoAdmin}.`
    };


    this.adminService.actualizarAdminImg(this.codigoAdmin, registrar).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.formulario.reset();
        this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
        this.dialog.closeAll();
        this.cdr.markForCheck();
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);

      }
    });

  }



}
