import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Events } from '../model/events';
import { ModalEventsComponent } from '../../shared/modal/modal-events/modal-events.component';

@Injectable({
  providedIn: 'root'
})
export class ModalEventsService {
 
  private modalData = new BehaviorSubject<Events | null>(null);
  private dialog = inject(MatDialog);
  private storageKey = 'calendarEvents';

  constructor() {
    this.loadEvents();
  }
  get getEvent$() {
    return this.modalData.asObservable();
  }

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

  get getEvent(): Events | null {
    return this.modalData.value; 
  }


  setEvent(event: Events) {
    this.modalData.next(event); 
    this.saveEvents();
  }

  getAllEvents(): Events[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

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

  loadEvents() {
    const events = this.getAllEvents();
    if (events.length > 0) {
      this.modalData.next(events[events.length - 1]); 
    }
  }

  deleteEvent(eventId: string) {
    let events = this.getAllEvents();
    events = events.filter(e => e.id !== eventId);
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }
}
