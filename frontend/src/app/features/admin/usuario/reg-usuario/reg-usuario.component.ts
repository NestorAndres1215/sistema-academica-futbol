import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/core/model/Admin';
import { Historial } from 'src/app/core/model/historial';

import { AdminService } from 'src/app/core/services/admin.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { calcularEdad, formatDate } from 'src/app/core/utils/fechaValidator';

@Component({
  selector: 'app-reg-usuario',
  templateUrl: './reg-usuario.component.html',
  styleUrls: ['./reg-usuario.component.css']
})
export class RegUsuarioComponent implements OnInit {

  formulario: UntypedFormGroup;
  botonesConfig = {
    editar: false,
    volver: true,

  };
  constructor(
    private router: Router,
    private adminService: AdminService,
    private historialService: HistorialService,
    private formBuilder: UntypedFormBuilder,
    private mensaje: MensajeService,
    private loginService: LoginService

  ) { }
  edad: number | null = null;
  ngOnInit(): void {
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
      username: ['', Validators.required],
      password: ['', [Validators.required]],
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
      edad: [{ value: '', disabled: true }]
    });
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

    if (!this.formulario.valid) {
      this.mensaje.MostrarMensaje("FORMULARIO VACÍO");
      this.formulario.markAllAsTouched();
      return;
    }
    
    const objAdmin: Admin = {
      primerNombre: this.formulario.get('primerNombre')?.value,
      segundoNombre: this.formulario.get('segundoNombre')?.value,
      apellidoPaterno: this.formulario.get('apellidoPaterno')?.value,
      apellidoMaterno: this.formulario.get('apellidoMaterno')?.value,
      correo: this.formulario.get('correo')?.value,
      telefono: this.formulario.get('telefono')?.value,
      dni: this.formulario.get('dni')?.value,
      direccion: this.formulario.get('direccion')?.value,
      nacionalidad: this.formulario.get('nacionalidad')?.value,
      username: this.formulario.get('username')?.value,
      password: this.formulario.get('password')?.value,
      fechaNacimiento: this.formulario.get('fechaNacimiento')?.value,
      edad: this.formulario.get('edad')?.value,
      usuarioCreacion: this.loginService.getUser().username,
    };

    this.adminService.guardarAdmin(objAdmin).subscribe(
      response => {
        this.mensaje.MostrarMensajeExito("SE REGISTRO USUARIO ADMINISTRADOR");

        const historial: Historial = {
          usuario: this.loginService.getUser().username,
          detalle: `El usuario ${this.loginService.getUser().username} registró al administrador con el código ${objAdmin.username}.`
        };

        this.historialService.registrar(historial).subscribe(
          () => {

            this.mensaje.MostrarMensajeExito("SE REGISTRÓ USUARIO");
            this.formulario.reset();
          },
          error => {
            this.mensaje.MostrarBodyError("Error al registrar el historial: " + error); // Manejar el error de historial
          }
        );
      },
      error => {
        this.mensaje.MostrarBodyError(error);
      }
    );

  }

}
