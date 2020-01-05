import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Event } from './event.model';
import { environment } from '../../environments/environment';

export interface IEventTypes {
  value: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [];
  private eventTypes: IEventTypes[] = [];
  eventsChanged = new Subject<Event[]>();
  eventTypesChanged = new Subject<IEventTypes[]>();

  constructor(private http: HttpClient) {
  }

  fetchEvents() {
    return this.http.get<Event[]>(`${environment.apiUrl}/events`)
        .pipe(
            tap(events => {
              this.setEvents(events);
            })
        );
  }

  getEvents() {
    return this.events.slice();
  }

  setEvents(events: Event[]) {
    this.events = events;
    this.eventsChanged.next(this.events.slice());
  }

  fetchEventTypes() {
    return this.http.get<IEventTypes[]>(`${environment.apiUrl}/eventTypes`)
        .pipe(
            tap(evnTypes => {
              this.setEventTypes(evnTypes);
            })
        );
  }

  getEventTypes() {
    return this.eventTypes.slice();
  }

  setEventTypes(eventTypes: IEventTypes[]) {
    this.eventTypes = eventTypes;
    this.eventTypesChanged.next(this.eventTypes.slice());
  }
}
