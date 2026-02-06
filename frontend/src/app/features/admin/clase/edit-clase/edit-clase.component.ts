import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LsClaseComponent } from '../ls-clase/ls-clase.component';
import { GeneralService } from 'src/app/core/services/general.service';
import { HorarioService } from 'src/app/core/services/horario.service';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { ClaseService } from 'src/app/core/services/clase.service';
import { Clase } from 'src/app/core/model/Clase';
import { Historial } from 'src/app/core/model/historial';

import { formatDate } from 'src/app/core/utils/fechaValidator';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-clase',
  templateUrl: './edit-clase.component.html',
  styleUrls: ['./edit-clase.component.css']
})
export class EditClaseComponent implements OnInit {
  operar() {


    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }
    const objetoClase: Clase = {
      codigo: this.codigo,
      nombre: this.formulario.get('nombre')?.value,
      equipo: this.formulario.get('equipo')?.value,
      horario: this.formulario.get('horario')?.value,
      dia: this.formulario.get('dia')?.value,
      inicio: this.formulario.get('fechaInicio')?.value,
      fin: this.formulario.get('fechaFin')?.value,
      descripcion: this.formulario.get('genero')?.value,
      usuarioCreacion: this.loginService.getUser().username,
    }
    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizo  una clase de  para el equipo ${objetoClase.nombre} para los dias ${objetoClase.dia}.`
    };

    this.claseService.actualizar(objetoClase).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
        this.formulario.reset();
        this.dialog.closeAll();
      },
      error: (error) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });
  }

  volver() {
    this.dialogRe.close();
  }

  codigo: string;
  nombre: string;
  equipo: string;
  genero: string;
  horario: string;
  finHora: string;
  fechaInicio: Date;
  fechaFin: string;
  dia: string;
  horarioListar: any = [];
  maxDate: string;
  minDate: string;
  formulario: UntypedFormGroup;

  constructor(
    private formBuilder: FormBuilder, private loginService: LoginService, private historialService: HistorialService,
    private dialog: MatDialog, private claseService: ClaseService,
    private dialogRe: MatDialogRef<LsClaseComponent>,
    private horarioService: HorarioService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private generales: GeneralService
  ) { }

  ngOnInit(): void {
    this.listarHorarios()
    this.listaEdiciones();
    this.validarFecha()
    this.listaDia()

  }

  listaEdiciones() {
    const fechaLocal = new Date(this.data.row.inicio);
    this.codigo = this.data.row.codigo;
    this.nombre = this.data.row.nombre;
    this.equipo = this.data.row.equipo.nombre;
    this.genero = this.data.row.descripcion;
    this.horario = this.data.row.horario.codigo,
      this.fechaInicio = fechaLocal;
    this.fechaFin = this.data.row.fin;
    this.dia = this.data.row.dia;
    this.initForm();
  }

  async validarFecha() {
    const today = new Date();

    const formattedDate = formatDate(today);
    const maxYear = today.getFullYear() + 2;
    this.minDate = formattedDate;
    this.maxDate = `${maxYear}-01-01`;
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: [this.nombre, Validators.required],
      equipo: [{ value: this.equipo, disabled: true }, Validators.required],
      genero: [this.genero, Validators.required],
      horario: [this.horario, Validators.required],
      fechaInicio: [this.fechaInicio, Validators.required],
      fechaFin: [this.fechaFin, Validators.required],
      dia: [{ value: this.dia, disabled: true }, Validators.required]
    });
  }

  listarDia: any = [];

  async listaDia() {
    this.generales.listarGeneralDevActivado("0007").subscribe((data) => {
      this.listarDia = data;
    })
  }

  async listarHorarios() {
    this.horarioService.listarHorarioActivado().subscribe((data) => {
      this.horarioListar = data
    })
  }
}
