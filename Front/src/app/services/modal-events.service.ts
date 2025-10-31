import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';  // Importamos BehaviorSubject
import { Events } from '../model/events';
import { ModalEventsComponent } from '../modules/admin/components/modal-events/modal-events.component';

@Injectable({
  providedIn: 'root'
})
export class ModalEventsService {
  // Usamos BehaviorSubject en lugar de signal
  private modalData = new BehaviorSubject<Events | null>(null);
  private dialog = inject(MatDialog);
  private storageKey = 'calendarEvents';

  constructor() {
    this.loadEvents();
  }
  get getEvent$() {
    return this.modalData.asObservable();
  }

  // Método para abrir el modal
  openModal(data?: Events): void {
    const dialogRef = this.dialog.open(ModalEventsComponent, {
      data,
      width: '900px',
      height: '520px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setEvent(result);
        this.saveEvents();
      }
    });
  }

  // Getter para obtener el evento actual
  get getEvent(): Events | null {
    return this.modalData.value;  // Usamos .value para acceder al valor almacenado en el BehaviorSubject
  }

  // Setter para establecer un nuevo evento
  setEvent(event: Events) {
    this.modalData.next(event);  // Usamos .next() para actualizar el valor del BehaviorSubject
    this.saveEvents();
  }

  // Obtener todos los eventos almacenados en localStorage
  getAllEvents(): Events[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Guardar eventos en localStorage
  saveEvents() {
    const allEvents = this.getAllEvents();
    const updatedEvent = this.getEvent;
    if (updatedEvent) {
      const index = allEvents.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) {
        allEvents[index] = updatedEvent;
      } else {
        allEvents.push(updatedEvent);
      }
    }
    localStorage.setItem(this.storageKey, JSON.stringify(allEvents));
  }

  // Cargar eventos desde localStorage
  loadEvents() {
    const events = this.getAllEvents();
    if (events.length > 0) {
      this.modalData.next(events[events.length - 1]);  // Usamos .next() para cargar el último evento
    }
  }

  // Eliminar un evento por su ID
  deleteEvent(eventId: string) {
    let events = this.getAllEvents();
    events = events.filter(e => e.id !== eventId);
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }
}
