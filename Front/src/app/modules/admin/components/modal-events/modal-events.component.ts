import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Events } from 'src/app/model/events';
import { ModalEventsService } from 'src/app/services/modal-events.service';
import { CalendarioComponent } from '../../calendario/calendario/calendario.component';
import { HorarioService } from 'src/app/services/horario.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { GeneralService } from 'src/app/services/general.service';
import { Clase } from 'src/app/model/Clase';
import { ClaseService } from 'src/app/services/clase.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Historial } from 'src/app/model/historial';
import { LoginService } from 'src/app/services/login.service';
import { HistorialService } from 'src/app/services/historial.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-modal-events',
  templateUrl: './modal-events.component.html',
  styleUrls: ['./modal-events.component.css']
})
export class ModalEventsComponent implements OnInit {
  hola(arg0: any) {
    throw new Error('Method not implemented.');
  }
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


  public formulario: UntypedFormGroup;

  constructor(
    private dialogRe: MatDialogRef<CalendarioComponent>,
    private mensaje: MensajeService,
    private historialService: HistorialService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private fb: FormBuilder,
    private claseService: ClaseService,
    private generales: GeneralService,
    private formBuilder: UntypedFormBuilder,
    private equipoService: EquipoService,
    private horarioService: HorarioService,
    private modalSvc: ModalEventsService,
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
    console.log(today)
    const formattedDate = formatDate(today);
    const minYear = today.getFullYear(); // Máximo 120 años atrás
    const maxYear = today.getFullYear() + 2;
    this.minDate = formattedDate; // Fecha mínima permitida
    this.maxDate = `${maxYear}-01-01`;//today.toISOString().split('T')[0]; // Fecha máxima: hoy
    console.log(this.minDate)
    console.log(this.maxDate)
  }

  save() {

    const fechaFin = this.formulario.value.fechaFin;
    const fechaInicio = new Date(this.formulario.value.fechaInicio);
    const fechaActual = new Date();

    console.log('Fecha actual:', fechaActual);

    // Validar que la fecha de inicio sea menor que la fecha de fin
    if (fechaInicio > new Date(fechaFin)) {

      this.mensaje.MostrarMensaje("LA FECHA INICIAL DEBE SER MENOR QUE LA FECHA FINAL");
      // Validar que la fecha de inicio no sea menor a la fecha actual
    } else if (fechaInicio < fechaActual) {
  
      this.mensaje.MostrarMensaje("LA FECHA INICIAL NO PUEDE SER MENOR A LA FECHA ACTUAL");
    } else {
      console.log('Fechas válidas:', fechaInicio, fechaFin);
    }


    if (this.formulario.valid) {
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
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} registro  una clase de  para el equipo ${objetoClase.nombre} para los dias ${objetoClase.dia}.`
      };

      console.log(objetoClase)
      this.claseService.registrar(objetoClase).subscribe(
        response => {
          // Si el estudiante se registra correctamente, proceder con el registro del historial
          this.historialService.registrar(historial).subscribe(
            () => {
              this.mensaje.MostrarMensajeExito("SE REGISTRÓ CLASE");
              this.formulario.reset();
              this.dialog.closeAll();
            },
            error => {
              // Si hubo un error al registrar el historial, mostrar un mensaje de error
              this.mensaje.MostrarBodyError("Error al registrar el historial: " + error);
            }
          );
        },
        error => {
          // Si hubo un error al registrar el estudiante, mostrar un mensaje de error
          this.mensaje.MostrarBodyError(error);
        }
      );


    } else {
      console.log("formulario vacio")
      this.mensaje.MostrarMensaje("FORMULARIO VACIO")
      this.formulario.markAllAsTouched();
    }

  }
  horarioListar: any = [];

  async listarHorarios() {
    this.horarioService.listarHorarioActivado().subscribe((data) => {
      this.horarioListar = data
      this.validar()
    })
  }
  claseListar: any = [];
  async listarClase() {
    this.claseService.listarClaseActivado().subscribe((data) => {
      console.log(data)
      this.claseListar = data
      console.log(this.claseListar)
      this.validar()
    })
  }
  repetidos: string[] = [];
  async validar() {


    // DIA 
    console.log(this.listarDia.map(indexe => indexe.descripcion1))
    console.log(this.claseListar)




    //HORARIO
    const seen = new Set<string>(); // Especificar el tipo 'string' para el Set
    const duplicates = new Set<string>(); // Especificar el tipo 'string' para el Set
    const cola = this.claseListar.map((index) => index.horario.codigo)
    for (const item of cola) {
      if (seen.has(item)) {
        duplicates.add(item);
      } else {
        seen.add(item);
      }
    }
    this.repetidos = Array.from(duplicates); // Convierte el Set a un array de 'string'
    this.horarioListar = this.horarioListar.filter((index) => !this.repetidos.includes(index.codigo))
    console.log(this.horarioListar)
    //LISTAR EQUIPO  
    const hola = this.claseListar.map((index) => index.equipo.codigo);
    const equiposFiltrados = this.equipoListar.filter(
      (equipo) => !hola.includes(equipo.codigo)
    );
    this.equipoListar = equiposFiltrados;
  }
  selectedHorario: any; // to store the selected horario
  selectedDia: any
  dias: any
  isFormEnabled = true;
  // Function to check if the horario is already selected


  isHorarioSelected(dia: any): boolean {

    if (!this.isFormEnabled) {
      this.isFormEnabled = true; // Activas el formulario
    }
    if (!this.selectedHorario) {
      return false;
    }

    // Obtener los días asociados al horario seleccionado
    const listaDias = this.claseListar.filter(i => i.horario.codigo === this.selectedHorario);
    const diasAsociados = listaDias.map(i => i.dia);
    console.log(diasAsociados.includes(dia.descripcion1))
    // Verificar si el día actual está en la lista de días asociados
    return diasAsociados.includes(dia.descripcion1);
  }

  equipoListar: any = [];
  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {

      console.log(data)
      this.equipoListar = data
      this.validar()
    })

  }

  onHorarioChange(event: any): void {
    this.selectedHorario = event.value;
    this.isFormEnabled = this.selectedHorario !== ''; // Habilita si se selecciona un horario.
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
      console.log(data)
      this.listarDia = data;
      this.validar()

    })
  }
}
function formatDate(date: Date): string {
  const year = date.getFullYear(); // Año en formato YYYY
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11) -> Añadir 1 y formato MM
  const day = String(date.getDate()).padStart(2, '0'); // Día en formato DD
  return `${year}-${month}-${day}`;
}