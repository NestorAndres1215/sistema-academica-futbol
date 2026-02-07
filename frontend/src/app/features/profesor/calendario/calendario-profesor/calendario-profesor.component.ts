import { Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ModalEventsComponent } from 'src/app/shared/modal/modal-events/modal-events.component';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { HorarioService } from 'src/app/core/services/horario.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ModalEventsService } from 'src/app/core/services/modal-events.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { Calendar } from 'src/app/core/model/calendar';
import { Events } from 'src/app/core/model/events';
import { DIAS, MESES } from 'src/app/core/constants/calendario';

@Component({
  selector: 'app-calendario-profesor',
  templateUrl: './calendario-profesor.component.html',
  styleUrls: ['./calendario-profesor.component.css']
})
export class CalendarioProfesorComponent implements OnInit {

  botonesConfig = {
    editar: false,
    volver: true,

  };

  listarDato: any
  partidoFiltrado: any
  selectedDayName: string = '';
  selectedDay: any = null;
  mes: number
  user: any
  partido: any
  nameDay = DIAS;
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
    if (day.day === null) {
      return;
    }
    this.mes = MESES.findIndex(m => m.toLowerCase() === this.año.toLowerCase());
    const selectedDate = new Date(this.date.getFullYear(), this.mes, day.day);
    const dayOfWeek = selectedDate.getDay();
    const dayName = this.nameDay[dayOfWeek];

    const clasesConDiasSeparados = this.clases.map(clase => {
      const diasInfo = clase.dia
        .split(' - ')
        .map((dia, index) => ({ [`dia ${index + 1}`]: dia.trim() }));

      const inicio = new Date(clase.inicio);
      const fin = new Date(clase.fin);

      return { ...clase, dias: diasInfo, inicio: inicio, fin: fin };
    });


    this.listarDato = clasesConDiasSeparados.filter(clase => {

      if (isNaN(clase.inicio.getTime()) || isNaN(clase.fin.getTime())) {
        return false;
      }

      const fechaInicio = clase.inicio;
      const fechaFin = clase.fin;

      if (selectedDate.getTime() < fechaInicio.getTime() || selectedDate.getTime() > fechaFin.getTime()) {
        return false;
      }

      const fechaSeleccionada = new Date(selectedDate).toLocaleDateString();
      const esFeriado = this.feriado.map(feriado => {
        const [day, month, year] = feriado.fecha.split('/');
        const fecha = new Date(`${year}-${month}-${day}`);
        return fecha.toLocaleDateString();
      });


      if (esFeriado.includes(fechaSeleccionada)) {

        return
      }

      this.partidoFiltrado = this.partido.filter(partido => {
        const fechaPartido = new Date(partido.fecha);
        const selected = new Date(selectedDate);

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

        return fechaPartidoUTC.getTime() === selectedUTC.getTime();
      });


      return clase.dias.some(diaObj =>
        Object.values(diaObj).some(dia => removeAccents(dia).toUpperCase() === removeAccents(dayName).toUpperCase()) // Eliminar tildes y comparar
      );
    });


    this.selectedDayName = dayName;
    this.selectedDay = day;

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