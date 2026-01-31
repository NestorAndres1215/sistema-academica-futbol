import { Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MESES } from 'src/app/core/constants/months.constants';

import { ModalEventsComponent } from 'src/app/shared/modal/modal-events/modal-events.component';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { HorarioService } from 'src/app/core/services/horario.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ModalEventsService } from 'src/app/core/services/modal-events.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { Calendar } from 'src/app/core/model/calendar';
import { Events } from 'src/app/core/model/events';

@Component({
  selector: 'app-calendario-profesor',
  templateUrl: './calendario-profesor.component.html',
  styleUrls: ['./calendario-profesor.component.css']
})
export class CalendarioProfesorComponent implements OnInit {


  currentMonth = 'Enero'; // Mes actual (ejemplo inicial)
  currentYear = 2025; // Año actual (ejemplo inicial)
  listarDato: any
  partidoFiltrado: any
  selectedDayName: string = ''; // Nombre del día (Lunes, Martes, etc.)
  selectedDay: any = null; // Variable para almacenar el día seleccionado
  mes: number
  user: any
  partido: any
  nameDay = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  calendarDays: Calendar[] = [];
  allEvents: Events[] = [];
  currentMonthAndYear?: string;
  private modalSvc = inject(ModalEventsService);
  private dialog = inject(MatDialog);
  clases: any
  feriado: any
  año: string
  añoActual: String
  private totalDays = 42;
  private date = new Date();

  listado: any[] = [];
  private eventSubscription: Subscription;
  trackByIndex: TrackByFunction<string>;


  selectDay(day: any): void {
    // Crear un objeto Date usando el día, mes y año actuales
    if (day.day === null) {
      console.log('Día seleccionado es null');
      return;  // Salir de la función si no hay un día seleccionado
    }
    console.log(this.date.getFullYear())
    if (this.año === 'Enero') {
      console.log('Enero, asignando 01');
      this.mes = 0; // Asigna '01' si el mes es enero
    } else if (this.año === 'Febrero') {
      console.log('Febrero, asignando 02');
      this.mes = 1; // Asigna '02' si el mes es febrero
    } else if (this.año === 'Marzo') {
      console.log('Marzo, asignando 03');
      this.mes = 2; // Asigna '03' si el mes es marzo
    } else if (this.año === 'Abril') {
      console.log('Abril, asignando 04');
      this.mes = 3; // Asigna '04' si el mes es abril
    } else if (this.año === 'Mayo') {
      console.log('Mayo, asignando 05');
      this.mes = 4; // Asigna '05' si el mes es mayo
    } else if (this.año === 'Junio') {
      console.log('Junio, asignando 06');
      this.mes = 5; // Asigna '06' si el mes es junio
    } else if (this.año === 'Julio') {
      console.log('Julio, asignando 07');
      this.mes = 6; // Asigna '07' si el mes es julio
    } else if (this.año === 'Agosto') {
      console.log('Agosto, asignando 08');
      this.mes = 7; // Asigna '08' si el mes es agosto
    } else if (this.año === 'Septiembre') {
      console.log('Septiembre, asignando 09');
      this.mes = 8; // Asigna '09' si el mes es septiembre
    } else if (this.año === 'Octubre') {
      console.log('Octubre, asignando 10');
      this.mes = 9; // Asigna '10' si el mes es octubre
    } else if (this.año === 'Noviembre') {
      console.log('Noviembre, asignando 11');
      this.mes = 10; // Asigna '11' si el mes es noviembre
    } else if (this.año === 'Diciembre') {
      console.log('Diciembre, asignando 12');
      this.mes = 11; // Asigna '12' si el mes es diciembre
    }


    const selectedDate = new Date(this.date.getFullYear(), this.mes, day.day);
    console.log(this.mes)
    console.log(selectedDate)
    // Rango de fechas permitido (ajustar año, mes y día explícitamente)


    // Validar si la fecha seleccionada está dentro del rango permitido

    console.log(this.año)
    console.log(selectedDate)

    // Obtener el índice del día de la semana (0 = Domingo, 1 = Lunes, etc.)
    const dayOfWeek = selectedDate.getDay();

    // Usar el índice para obtener el nombre del día
    const dayName = this.nameDay[dayOfWeek];

    console.log(day.day);
    // Separar los días
    const dias = this.clases.map(clase => clase.dia);
    console.log(dias);

    const diasSeparados = dias
      .flatMap(dia => dia.split(' - ')) // Separar todos los días
      .reduce((acc, dia, index) => {
        const blockIndex = Math.floor(index / 3); // Calcular el bloque de 3 días
        if (!acc[blockIndex]) acc[blockIndex] = {}; // Si no existe el bloque, lo creamos

        acc[blockIndex][`dia ${index % 3 + 1}`] = dia; // Asignamos el día correspondiente en el bloque
        return acc;
      }, []);

    console.log(this.partido)

    const clasesConDiasSeparados = this.clases.map(clase => {
      const diasInfo = clase.dia
        .split(' - ') // Separar los días
        .map((dia, index) => ({ [`dia ${index + 1}`]: dia.trim() })); // Crear un objeto para cada día y eliminar los espacios extra

      // Asegurarse de que las fechas se conviertan a objetos Date válidos
      const inicio = new Date(clase.inicio);
      const fin = new Date(clase.fin);

      return {
        ...clase,
        dias: diasInfo,
        inicio: inicio,
        fin: fin
      };
    });

    // Verificar si las fechas son válidas
    console.log("Fecha Inicio y Fin de las Clases:", clasesConDiasSeparados.map(clase => ({
      inicio: clase.inicio.toLocaleDateString(),
      fin: clase.fin.toLocaleDateString()
    })));
    console.log(clasesConDiasSeparados)
    // Filtrar las clases según el día seleccionado y la comparación de fechas
    this.listarDato = clasesConDiasSeparados.filter(clase => {
      // Verificar si las fechas son válidas
      if (isNaN(clase.inicio.getTime()) || isNaN(clase.fin.getTime())) {
        console.error('Fechas inválidas para clase:', clase);
        return false;  // Si las fechas no son válidas, descartamos esta clase
      }

      const fechaInicio = clase.inicio;
      const fechaFin = clase.fin;

      // Verificar si el día seleccionado está dentro del rango de la clase
      if (selectedDate.getTime() < fechaInicio.getTime() || selectedDate.getTime() > fechaFin.getTime()) {
        return false;  // Si el día seleccionado está fuera del rango de esta clase, lo descartamos
      }

      // Obtener la fecha seleccionada sin hora
      const fechaSeleccionada = new Date(selectedDate).toLocaleDateString(); // Eliminar hora
      console.log('Fecha seleccionada (sin hora):', fechaSeleccionada);

      // Crear el arreglo de fechas de feriados (sin horas)
      const esFeriado = this.feriado.map(feriado => {
        // Asumimos que 'feriado.fecha' es un string en formato 'DD/MM/YYYY'
        const [day, month, year] = feriado.fecha.split('/');

        // Crear un nuevo objeto Date con formato 'YYYY-MM-DD'
        const fecha = new Date(`${year}-${month}-${day}`);

        // Formatear la fecha sin la hora
        return fecha.toLocaleDateString();
      });

      console.log(esFeriado);
      // Comprobar si la fecha seleccionada está en el arreglo de feriados
      if (esFeriado.includes(fechaSeleccionada)) {
        console.log(`La fecha ${new Date(fechaSeleccionada).toLocaleDateString()} es un feriado.`);
        return
      }
      // Verificar si el día seleccionado es un feriado
      //     const esFeriado = this.feriado.map(feriado => {
      //     const fechaFeriado = new Date(feriado.fecha);
      //   console.log(fechaFeriado)  // Asegúrate de que la fecha esté en formato Date
      //  return selectedDate.toLocaleDateString() === fechaFeriado.toLocaleDateString(); // Comparar las fechas sin tener en cuenta las horas
      // });

      //      if (esFeriado) {
      //7      console.log(`El día ${selectedDate.toLocaleDateString()} es feriado. No se muestran clases.`);
      //   return false;  // Si el día es feriado, lo descartamos
      //}
      this.partidoFiltrado = this.partido.filter(partido => {
        const fechaPartido = new Date(partido.fecha);
        const selected = new Date(selectedDate);

        // Convertimos a UTC para evitar cambios por zona horaria
        const fechaPartidoUTC = new Date(Date.UTC(
          fechaPartido.getUTCFullYear(),
          fechaPartido.getUTCMonth(),
          fechaPartido.getUTCDate()
        ));

        const selectedUTC = new Date(Date.UTC(
          selected.getUTCFullYear(),
          selected.getUTCMonth(),
          selected.getUTCDate()
        ));

        console.log("Fecha del partido (original):", partido.fecha);
        console.log("Fecha del partido (convertida a UTC):", fechaPartidoUTC.toISOString());
        console.log("Fecha seleccionada (convertida a UTC):", selectedUTC.toISOString());

        return fechaPartidoUTC.getTime() === selectedUTC.getTime();
      });


      console.log(this.partidoFiltrado)
      // Si el día seleccionado está dentro del rango y no es feriado, comprobamos si corresponde a un día de la clase
      return clase.dias.some(diaObj =>
        Object.values(diaObj).some(dia => removeAccents(dia).toUpperCase() === removeAccents(dayName).toUpperCase()) // Eliminar tildes y comparar
      );
    });
    console.log(this.feriado.map(index => index.fecha))
    console.log(clasesConDiasSeparados)

    /*  if (selectedDate <= fechaInicio || selectedDate >= fechaFin) {
         console.log(`Día seleccionado (${selectedDate.toLocaleDateString()}) fuera del rango permitido.`);
         this.listarDato = []; 
         this.selectedDayName = null;
         this.selectedDay = null;
         return; 
       }*/
    console.log(this.partido)
    console.log(this.listarDato);

    console.log(this.clases);

    this.selectedDayName = dayName;
    this.selectedDay = day;

  }

  getMonthIndex(month: string): number {
    /* const months = [
       'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
     ];*/
    const months = MESES
    return months.findIndex(m => m.toLowerCase() === month.toLowerCase());
  }


  constructor(
    private loginService: LoginService,
    private equipoService: EquipoService,
    private claseService: ClaseService,
    private partidoService: PartidoService,
    private horario: HorarioService
  ) {
    this.eventSubscription = this.modalSvc.getEvent$.subscribe(newEvent => {
      if (newEvent) {
        this.updateEvent(newEvent);
      }
    });
  }

  ngOnInit(): void {
    this.initializeCalendar();
    this.listarEquipo()
    this.listarFearidos()

  }

  private initializeCalendar() {
    this.updateCurrentMonthAndYear();
    this.loadEvents();
    this.createCalendarDays();
  }

  private updateEvent(item: Events) {
    this.allEvents = this.allEvents.filter(event => event.id !== item.id).concat(item);
    this.modalSvc.saveEvents();
    this.createCalendarDays();
  }

  private loadEvents() {
    this.allEvents = this.modalSvc.getAllEvents();
  }

  formatDate(date: Date | string): string {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return 'Fecha inválida';
    }
    return parsedDate.toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  private updateCurrentMonthAndYear() {
    /* const monthNames = [
       'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
     ];*/
    const monthNames = MESES
    this.currentMonthAndYear = `${monthNames[this.date.getMonth()]} de ${this.date.getFullYear()}`;
    this.año = monthNames[this.date.getMonth()];

  }

  previousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.initializeCalendar();
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.initializeCalendar();
  }


  private createCalendarDays() {
    this.calendarDays = [];
    const today = new Date();
    const firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    const daysInMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    const prevDaysMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    this.addCalendarDaysFromPreviousMonth(firstDayOfMonth, prevDaysMonth);
    this.addCalendarDaysFromCurrentMonth(today, daysInMonth);
    this.addCalendarDaysFromNextMonth();
  }


  private addCalendarDaysFromPreviousMonth(firstDayOfMonth: number, prevDaysMonth: number) {
    for (let i = firstDayOfMonth; i > 0; i--) {
      const day = prevDaysMonth - i + 1;
      this.addCalendarDay(this.date.getFullYear(), this.date.getMonth() - 1, day, false, false);
    }
  }

  private addCalendarDaysFromCurrentMonth(today: Date, daysInMonth: number) {
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay = today.toDateString() === new Date(this.date.getFullYear(), this.date.getMonth(), i).toDateString();
      this.addCalendarDay(this.date.getFullYear(), this.date.getMonth(), i, isCurrentDay, true);
    }
  }

  private addCalendarDaysFromNextMonth() {
    const remainingDays = this.totalDays - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.addCalendarDay(this.date.getFullYear(), this.date.getMonth() + 1, i, false, false);
    }
  }


  private addCalendarDay(year: number, month: number, day: number, isCurrentDay: boolean, isCurrentMonth: boolean) {
    const date = new Date(year, month, day);
    const isSunday = date.getDay() === 0; 

    this.calendarDays.push({
      day: isCurrentMonth ? day : null, 
      currentDay: isCurrentDay,
      currentMonth: isCurrentMonth,
      events: this.getEventsForDate(date),
      date,
      isSunday,
      dayOfWeek: undefined
    });
  }

  private getEventsForDate(date: Date): Events[] {
    return this.allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalEventsComponent, {
      width: '900px',
      height: '520px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listarClases()
    });
  }



  createEvent(item: Events) {
    const existingEventIndex = this.allEvents.findIndex(event => event.id === item.id);
    if (existingEventIndex > -1) {
      this.allEvents[existingEventIndex] = item;
    } else {
      this.allEvents.push(item);
    }
    this.modalSvc.setEvent(item);
    this.createCalendarDays();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  async listarClases() {
    this.claseService.listarClaseActivado().subscribe((data) => {

      this.user = this.loginService.getUser();
      const listadoNormalizado = this.listado.map(e => e.toLowerCase().trim());
      const resultado = data.filter(i =>
        listadoNormalizado.includes(i.equipo.nombre.toLowerCase().trim())
      );

      this.clases = resultado
    });
  }
  async listarFearidos() {
    this.horario.listarFeriados().subscribe((data) => {

      this.feriado = data
    });
  }
  volver() {
    throw new Error('Method not implemented.');
  }

  async listarPartido() {
    this.partidoService.listarPartidosActuales().subscribe((data) => {

      this.user = this.loginService.getUser();
      const listadoNormalizado = this.listado.map(e => e.toLowerCase().trim());
      const resultado = data.filter(i =>
        listadoNormalizado.includes(i.equipo.nombre.toLowerCase().trim())
      );

      this.partido = resultado
    });
  }


  async listarEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      
      data = data.filter(item => item.profesor.codigo != "0000");

      const filteredData = data.filter(item =>
        item.profesor &&
        item.profesor.usuario &&
        item.profesor.usuario.codigo != null &&
        item.profesor.usuario.codigo === this.loginService.getUser().ul_codigo
      );
      this.listado = filteredData.map(i => i.equipo.nombre)
      this.listarPartido()
      this.listarClases()
    })
  }

}
function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}