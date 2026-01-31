import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/core/model/Admin';
import { Historial } from 'src/app/core/model/historial';

import { AdminService } from 'src/app/core/services/admin.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

@Component({
  selector: 'app-reg-usuario',
  templateUrl: './reg-usuario.component.html',
  styleUrls: ['./reg-usuario.component.css']
})
export class RegUsuarioComponent implements OnInit {

  public formulario: UntypedFormGroup;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private historialService:HistorialService,
    private formBuilder: UntypedFormBuilder,
    private mensaje: MensajeService,
    private loginService: LoginService

  ) { }
  edad: number | null = null;
  ngOnInit(): void {
this.validarFecha()
    this.initForm(); // Llamamos al método que inicializa el formulario
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
  // Método para inicializar el formulario
  initForm(): void {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]], // Contraseña con validación mínima
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
      edad: [{ value: '', disabled: true }]
    });
    this.formulario.get('fechaNacimiento')?.valueChanges.subscribe(date => {
      if (date) {
        this.calcularEdad(date);
      }
    });
  }

  // Método para volver a la página anterior
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

// Método para operar
operar(): void {
  console.log(this.loginService.getUser().username);
  console.log(this.formulario.value);

  if (this.formulario.valid) {
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

    console.log(objAdmin);

    this.adminService.guardarAdmin(objAdmin).subscribe(
      response => {
        this.mensaje.MostrarMensajeExito("SE REGISTRO USUARIO ADMINISTRADOR");

        // Registro de la acción en el historial
        const historial: Historial = {
          usuario: this.loginService.getUser().username,
          detalle: `El usuario ${this.loginService.getUser().username} registró al administrador con el código ${objAdmin.username}.`
        };

        // Registrar el historial
        this.historialService.registrar(historial).subscribe(
          () => {
            // Si se registra el historial con éxito, limpiar el formulario
            this.formulario.reset();
            Object.keys(this.formulario.controls).forEach(key => {
              const control = this.formulario.get(key);
              control?.markAsPristine();
              control?.markAsUntouched();
            });
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
  } else {
    this.mensaje.MostrarMensaje("FORMULARIO VACIO");
    this.formulario.markAllAsTouched();
  }
}

}
