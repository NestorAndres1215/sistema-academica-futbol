import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { Admin } from 'src/app/core/model/Admin';
import { Historial } from 'src/app/core/model/historial';
import { AdminService } from 'src/app/core/services/admin.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
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
    private alertService: AlertService,
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
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
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

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró al administrador con el código ${objAdmin.username}.`
    };

    this.adminService.guardarAdmin(objAdmin).subscribe({
      next: async () => {
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        await firstValueFrom(this.historialService.registrar(historial));
        this.formulario.reset();
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });
  }

}
