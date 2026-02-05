import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MantEquipoComponent } from '../mant-equipo/mant-equipo.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SedeService } from 'src/app/core/services/sede.service';
import { GeneralService } from 'src/app/core/services/general.service';

import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { Equipo } from 'src/app/core/model/equipo';
import { Historial } from 'src/app/core/model/historial';
import { MensajeService } from 'src/app/core/services/mensaje.service';


@Component({
  selector: 'app-edit-equipo',
  templateUrl: './edit-equipo.component.html',
  styleUrls: ['./edit-equipo.component.css']
})
export class EditEquipoComponent implements OnInit {


  formulario: UntypedFormGroup;
  lista: any;
  nombre: string;
  categoria: string;
  sede: string;
  genero: string;
  usuarioCreacion: string;
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  codigo: string

  constructor(
    private mensaje: MensajeService,
    private sedeService: SedeService,
    private historialService: HistorialService,
    private equipoService: EquipoService,
    private generales: GeneralService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private loginService: LoginService,
    private dialogRe: MatDialogRef<MantEquipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.lista = this.data
    this.listarSede()
    this.listaGenero()
    this.listaPosicion()
    this.listarEdiciones()
  }

  sedes: any[] = [];
  generos: any[] = [];
  categorias: any[] = [];
  
  listarEdiciones() {
    this.codigo = this.lista.row.codigo;
    this.nombre = this.lista.row.nombre;
    this.categoria = this.lista.row.categoria;
    this.sede = this.lista.row.sede;
    this.genero = this.lista.row.genero;
    this.usuarioCreacion = this.lista.row.usuarioRegistro;
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
      categoria: [this.categoria, Validators.required],
      genero: [this.genero, Validators.required],
      sede: [this.sede, Validators.required],
    });
  }

  deshabilitar() {
    this.formulario.disable();
  }

  cerrar() {
    this.dialogRe.close();
  }

  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      this.generos = data;

    })
  }
  async listaPosicion() {
    this.generales.listarGeneralDevActivado("0004").subscribe((data) => {
      this.categorias = data;
    })
  }

  listarSede(): void {
    this.sedeService.listarSedeActivado().subscribe(
      (data) => {
        this.sedes = data;
      }
    );
  }

  operar() {
    if (this.formulario.valid) {
      const objEquipo: Equipo = {
        codigo: this.codigo,
        nombre: this.formulario.get('nombre')?.value,
        sede: this.formulario.get('sede')?.value,
        categoria: this.formulario.get('categoria')?.value,
        genero: this.formulario.get('genero')?.value,
        usuarioRegistro: this.usuarioCreacion,
        usuarioActualizacion: this.loginService.getUser().username,
      }
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} actualizó al equipo ${objEquipo.nombre}`,
      };
      this.historialService.registrar(historial).subscribe(
        () => {
          this.equipoService.actualizar(objEquipo).subscribe(
            response => {
              this.mensaje.MostrarMensaje("SE ACTUALIZÓ PROFESOR");
              this.dialog.closeAll();
              this.cdr.detectChanges();
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
      this.mensaje.MostrarMensaje("FORMULARIO VACIO")
    }
  }
}
