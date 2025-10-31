import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LsClaseComponent } from '../ls-clase/ls-clase.component';
import { GeneralService } from 'src/app/services/general.service';
import { HorarioService } from 'src/app/services/horario.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Clase } from 'src/app/model/Clase';
import { Historial } from 'src/app/model/historial';
import { LoginService } from 'src/app/services/login.service';
import { HistorialService } from 'src/app/services/historial.service';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-edit-clase',
  templateUrl: './edit-clase.component.html',
  styleUrls: ['./edit-clase.component.css']
})
export class EditClaseComponent implements OnInit {
  operar() {
    console.log(this.formulario.value)
    if (this.formulario.valid) {
      const objetoClase: Clase = {
        codigo:this.codigo,
        nombre: this.formulario.get('nombre')?.value,
        equipo: this.formulario.get('equipo')?.value,
        horario: this.formulario.get('horario')?.value,
        dia: this.formulario.get('dia')?.value,
        inicio: this.formulario.get('fechaInicio')?.value,
        fin: this.formulario.get('fechaFin')?.value,
        descripcion:this.formulario.get('genero')?.value,
        usuarioCreacion: this.loginService.getUser().username,
      }
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} actualizo  una clase de  para el equipo ${objetoClase.nombre} para los dias ${objetoClase.dia}.`
      };
      console.log(objetoClase)
      console.log(objetoClase)
      this.claseService.actualizar(objetoClase).subscribe(
        response => {
          // Si el estudiante se registra correctamente, proceder con el registro del historial
          this.historialService.registrar(historial).subscribe(
            () => {
              this.mensaje.MostrarMensajeExito("SE ACTUALIZO  CLASE");
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
      this.mensaje.MostrarMensajeError("FORMULARIO VACIO")
      this.formulario.markAllAsTouched();
    }




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

  public formulario: UntypedFormGroup;

  constructor(
    private formBuilder: FormBuilder, private loginService: LoginService, private historialService: HistorialService,
    private dialog: MatDialog, private claseService: ClaseService,
    private dialogRe: MatDialogRef<LsClaseComponent>,
    private horarioService: HorarioService,
    private mensaje: MensajeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private generales: GeneralService
  ) { }

  ngOnInit(): void {
    console.log(this.data.row)
    // Inicializar el formulario y cargar los datos  
    this.listarHorarios()
    this.listaEdiciones();
    this.validarFecha()
    this.listaDia()

  }

  // Simulación de datos (en lugar de recibirlos desde el backend)
  listaEdiciones() {
    const fechaLocal = new Date(this.data.row.inicio);
    this.codigo=this.data.row.codigo;
    this.nombre = this.data.row.nombre;
    this.equipo = this.data.row.equipo.nombre;
    this.genero = this.data.row.descripcion;
    this.horario = this.data.row.horario.codigo,
      this.fechaInicio = fechaLocal;
    this.fechaFin = this.data.row.fin;
    this.dia = this.data.row.dia;
    console.log(this.data.row)

    this.initForm();

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

  // Configuración del formulario con validaciones
  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: [this.nombre, Validators.required],
      equipo: [{ value: this.equipo, disabled: true }, Validators.required],
      genero: [ this.genero, Validators.required],
      horario: [this.horario, Validators.required],
      fechaInicio: [this.fechaInicio, Validators.required],
      fechaFin: [this.fechaFin, Validators.required],
      dia: [{ value: this.dia, disabled: true }, Validators.required] // Deshabilitado
    });
    console.log(this.formulario.value)

  }

  listarDia: any = [];
  async listaDia() {
    this.generales.listarGeneralDevActivado("0007").subscribe((data) => {
      console.log(data)
      this.listarDia = data;

    })
  }
  horarioListar: any = [];

  async listarHorarios() {
    this.horarioService.listarHorarioActivado().subscribe((data) => {
      this.horarioListar = data

    })
  }
}
function formatDate(date: Date): string {
  const year = date.getFullYear(); // Año en formato YYYY
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11) -> Añadir 1 y formato MM
  const day = String(date.getDate()).padStart(2, '0'); // Día en formato DD
  return `${year}-${month}-${day}`;
}