import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HorarioService } from 'src/app/core/services/horario.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { ClaseService } from 'src/app/core/services/clase.service';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Events } from 'src/app/core/model/events';
import { Clase } from 'src/app/core/model/Clase';
import { Historial } from 'src/app/core/model/historial';
import { CalendarioComponent } from 'src/app/features/admin/calendario/calendario/calendario.component';
import { formatDate } from 'src/app/core/utils/fechaValidator';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-events',
  templateUrl: './modal-events.component.html',
  styleUrls: ['./modal-events.component.css']
})
export class ModalEventsComponent implements OnInit {

  equipo: any;

  selectequipo(event: any) {
    this.selectedHorario = event.value;
    this.selectedDia = event.value;
    this.isFormEnabled = this.selectedHorario !== '';
    this.isFormEnabled = this.selectedDia !== '';
  }
  cerrar() {
    this.dialogRe.close();
  }


  formulario: UntypedFormGroup;

  constructor(
    private dialogRe: MatDialogRef<CalendarioComponent>,
    private alertService: AlertService,
    private historialService: HistorialService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private fb: FormBuilder,
    private claseService: ClaseService,
    private generales: GeneralService,
    private equipoService: EquipoService,
    private horarioService: HorarioService,
    @Inject(MAT_DIALOG_DATA) public data: Events
  ) { }

  ngOnInit(): void {
    this.listarClase();
    this.listarHorarios();
    this.listarEquipo();
    this.listaDia()
    this.validarFecha()
    this.initForm()
  }

  maxDate: string;
  minDate: string;

  async validarFecha() {
    const today = new Date();

    const formattedDate = formatDate(today);
    const maxYear = today.getFullYear() + 2;
    this.minDate = formattedDate;
    this.maxDate = `${maxYear}-01-01`;
  }

  save() {

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const fechaFin = this.formulario.value.fechaFin;
    const fechaInicio = new Date(this.formulario.value.fechaInicio);
    const fechaActual = new Date();

    if (fechaInicio > new Date(fechaFin)) {
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.FECHA_INICIO_MAYOR_FIN);
      return;
    }

    if (fechaInicio < fechaActual) {
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.FECHA_INICIO_MENOR_ACTUAL);
      return;
    }

    const objetoClase: Clase = {
      nombre: this.formulario.get('nombre')?.value,
      equipo: this.formulario.get('equipo')?.value,
      horario: this.formulario.get('horario')?.value,
      dia: this.formulario.get('dia')?.value,
      inicio: this.formulario.get('fechaInicio')?.value,
      fin: this.formulario.get('fechaFin')?.value,
      descripcion: this.formulario.get('desc')?.value,
      usuarioCreacion: this.loginService.getUser().username,
    }

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registro  una clase de  para el equipo ${objetoClase.nombre} para los dias ${objetoClase.dia}.`
    };

    this.claseService.registrar(objetoClase).subscribe({
      next: async () => {
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        await firstValueFrom(this.historialService.registrar(historial));
        this.formulario.reset();
        this.dialog.closeAll();
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });


  }
  horarioListar: any = [];

  async listarHorarios() {
    this.horarioService.listarHorarioActivado().subscribe((data) => {
      this.horarioListar = data
      this.validar()
    })
  }

  claseListar: any[] = [];
  async listarClase() {
    this.claseService.listarClaseActivado().subscribe((data) => {
      this.claseListar = data
      this.validar()
    })
  }

  repetidos: string[] = [];
  async validar() {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    const cola = this.claseListar.map((index) => index.horario.codigo)
    for (const item of cola) {
      if (seen.has(item)) {
        duplicates.add(item);
      } else {
        seen.add(item);
      }
    }
    this.repetidos = Array.from(duplicates);
    this.horarioListar = this.horarioListar.filter((index) => !this.repetidos.includes(index.codigo))

    const hola = this.claseListar.map((index) => index.equipo.codigo);
    const equiposFiltrados = this.equipoListar.filter(
      (equipo) => !hola.includes(equipo.codigo)
    );
    this.equipoListar = equiposFiltrados;
  }

  selectedHorario: any;
  selectedDia: any
  dias: any
  isFormEnabled = true;

  isHorarioSelected(dia: any): boolean {

    if (!this.isFormEnabled) {
      this.isFormEnabled = true;
    }
    if (!this.selectedHorario) {
      return false;
    }

    const listaDias = this.claseListar.filter(i => i.horario.codigo === this.selectedHorario);
    const diasAsociados = listaDias.map(i => i.dia);
    return diasAsociados.includes(dia.descripcion1);
  }

  equipoListar: any = [];

  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      this.equipoListar = data
      this.validar()
    })
  }

  onHorarioChange(event: any): void {
    this.selectedHorario = event.value;
    this.isFormEnabled = this.selectedHorario !== '';
  }

  initForm() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      equipo: [''],
      horario: [''],
      dia: [''],
      fechaInicio: [''],
      fechaFin: [''],
      desc: [''],
    });
  }

  listarDia: any = [];

  async listaDia() {
    this.generales.listarGeneralDevActivado("0007").subscribe((data) => {
      this.listarDia = data;
      this.validar()
    })
  }
}

