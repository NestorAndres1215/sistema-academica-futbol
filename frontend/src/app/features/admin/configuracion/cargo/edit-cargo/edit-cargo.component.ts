import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CargoComponent } from '../cargo/cargo.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CargoService } from 'src/app/core/services/cargo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Cargo } from 'src/app/core/model/Cargo';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-cargo',
  templateUrl: './edit-cargo.component.html',
  styleUrls: ['./edit-cargo.component.css']
})
export class EditCargoComponent implements OnInit {

  lista: any
  constructor(
    private dialogRe: MatDialogRef<CargoComponent>,
    private cargo: CargoService,
    private historialService: HistorialService,


    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private alertService: AlertService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }
  formulario: UntypedFormGroup;

  
  ngOnInit(): void {
    this.lista = this.data
    this.listarEdiciones()
  }

  nombre: string
  descripcion: string
  usuarioCreacion: string
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  codigo: string

  listarEdiciones() {
    this.codigo = this.lista.row.codigo
    this.nombre = this.lista.row.nombre;
    this.descripcion = this.lista.row.descripcion;
    this.usuarioCreacion = this.lista.row.usuarioCreacion;
    this.fechaCreacion = this.lista.row.fechaCreacion;
    this.horaCreacion = this.lista.row.horaCreacion;
    this.usuarioActualizacion = this.lista.row.usuarioActualizacion;
    this.fechaActualizacion = this.lista.row.fechaActualizacion;
    this.horaActualizacion = this.lista.row.horaActualizacion;
    this.initForm()

  }

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: [this.nombre, Validators.required],
      descripcion: [this.descripcion, Validators.required],
    });
  }

  operar() {

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const objRegistrar: Cargo = {
      codigo: this.codigo,
      nombre: this.formulario.get('nombre')?.value,
      descripcion: this.formulario.get('descripcion')?.value,
      usuarioCreacion: this.usuarioCreacion,
      usuarioActualizacion: this.loginService.getUser().username,
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizo un nuevo cargo ${this.formulario.get('nombre')?.value} `
    };

    this.cargo.actualizarCargo(objRegistrar).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
        this.dialog.closeAll();
        this.cdr.detectChanges();
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });
  }

  cerrar() {
    this.dialogRe.close();
  }

}
