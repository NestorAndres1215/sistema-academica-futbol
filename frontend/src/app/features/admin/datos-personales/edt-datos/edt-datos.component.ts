import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AdminService } from 'src/app/core/services/admin.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';

import { DatosPersonalesComponent } from '../datos-personales.component';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edt-datos',
  templateUrl: './edt-datos.component.html',
  styleUrls: ['./edt-datos.component.css']
})
export class EdtDatosComponent implements OnInit {


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
    private dialogRe: MatDialogRef<DatosPersonalesComponent>,
    private adminService: AdminService,
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

  defaultFileName: string = 'imagen.png'; // Nombre del archivo por defecto

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


  //imageUrl: string | ArrayBuffer | null = null; // Variable para la URL de la imagen




  imageUrl: string | null = null; // Variable para la URL de la imagen

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file; // Almacena el archivo seleccionado
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string; // Actualiza la URL de la imagen
      };
      reader.readAsDataURL(file);
    } else if (!this.selectedFile && this.logo) {
      // Si no selecciona un archivo, mantener la imagen existente
      this.imageUrl = this.mostrarImagen(this.logo);
    } else {
      // Usar la imagen por defecto si no hay archivo ni logo
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

      contra: [{ value: this.contra, disabled: true }, Validators.required],
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

  listarEdiciones() {
    // Acceso a los datos del objeto row
    // Asegúrate de que 'this.lista.row' tiene los datos correctamente estructurados.
    const firstRow = this.lista.row[0];  // Suponiendo que row es un array
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
  operar() {
    const formValues = this.formulario.value;


    const logo = this.selectedFile
      ? this.selectedFile 
      : this.logo   
        ? new File([new Blob()], 'imagen_actual.jpeg', { type: 'image/jpeg' }) 
        : new File([new Blob()], 'imagen_defecto.jpeg', { type: 'image/jpeg' }); 

    formValues.logo = logo;
    let edad: string | null;
    const fechaNacimiento = this.formulario.get('nacimiento').value;
    edad = this.edadNacimiento(fechaNacimiento); 

      const registrar = {
        codigoAdmin: this.codigoAdmin,
        codigoUsuario: this.codigoUsuario,
        usuario: formValues.usuario,
        contra: formValues.contra,          
        primerNombre: formValues.primerNombre,  
        segundoNombre: formValues.segundoNombre,
        apellidoPaterno: formValues.apellidoPaterno, 
        apellidoMaterno: formValues.apellidoMaterno, 
        telefono: formValues.telefono,     
        email: formValues.email,            
        dni: formValues.dni,           
        direccion: formValues.direccion,    
        nacimiento: formValues.nacimiento,
        nacionalidad: formValues.nacionalidad,
        edad: edad, // Nacionalidad
        perfil: formValues.logo,
      };
      console.log(registrar)
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} actualizó el administrador con el código ${this.codigoAdmin}.`
      };


      this.adminService.actualizarAdminImg(this.codigoAdmin, registrar).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.formulario.reset();
          this.cdr.markForCheck();
          this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
          this.dialog.closeAll();
        },
        error: (error) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
        }
      });
    }
  }

