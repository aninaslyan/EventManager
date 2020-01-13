import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Subject } from 'rxjs';
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
  eventsChanged: Subject<Event[]> = new Subject();
  private event: Event;
  eventChanged: Subject<Event> = new Subject();
  // messages
  eventMessage: string;
  eventMessageChanged: Subject<string> = new Subject();
  errorMessage: string;
  errorMessageChanged: Subject<string> = new Subject();

  constructor(private http: HttpClient) {
  }

  fetchEvents(pageNum?: number, limit?: number) {
    const params = new HttpParams()
        .set('_page', String(pageNum))
        .set('_limit', String(limit));
    // todo params are being passed undefined for grid
    return this.http.get<Event[]>(
        `${environment.apiUrl}/events`,
        { params, observe: 'response' })
        .pipe(
            tap(eventsResp => {
              this.setEvents(eventsResp.body);
            })
        );
  }

  fetchEventById(id: number) {
    return this.http.get<Event>(`${environment.apiUrl}/events/${id}`);
  }

  getEvents() {
    return this.events.slice();
  }

  getEventById(id: number) {
    this.event = this.events.find(event => event.id === id);
    this.eventChanged.next(this.event);
  }

  getEvent() {
    return this.event;
  }

  setEvents(events: Event[]) {
    this.events = events;
    this.eventsChanged.next(this.events.slice());
  }

  fetchEventTypes() {
    return this.http.get<IEventTypes[]>(`${environment.apiUrl}/eventTypes`);
  }

  getEventTypeFromNumber(res) {
    const events = res[0].body;
    const eventTypes = res[1];

    for (const evn of events) {
      for (const type of eventTypes) {
        if (evn.eventType === type.value) {
          evn.eventType = type.type;
          break;
        }
      }
    }
    return events;
  }

  fetchEventsAndTypes(pageNum?, limit?) {
    return forkJoin(this.fetchEvents(pageNum, limit), this.fetchEventTypes());
  }

  subscribeToEvents() {
    this.fetchEventsAndTypes()
        .subscribe((response) => {
          this.events = this.getEventTypeFromNumber(response);
          this.eventsChanged.next(this.events.slice());
        });
  }

  deleteEvent(id: number) {
    return this.http.delete(`${environment.apiUrl}/events/${id}`);
  }

  deleteEventFromList(id: number) {
    this.events = this.events.filter(event => event.id !== id);
    this.eventsChanged.next(this.events.slice());
  }

  addEvent(event: Event) {
    return this.http.post<Event>(`${environment.apiUrl}/events`, {
      name: event.name,
      eventType: event.eventType,
      date: event.date,
      description: event.description
    });
  }

  updateEvent(id: number, event: Event) {
    return this.http.put<Event>(`${environment.apiUrl}/events/${id}`, {
      name: event.name,
      eventType: event.eventType,
      date: event.date,
      description: event.description
    });
  }

  // messages
  setEventMessage(message) {
    this.eventMessage = message;
    this.eventMessageChanged.next(this.eventMessage);
  }

  setErrorMessage(message) {
    this.errorMessage = message;
    this.errorMessageChanged.next(this.errorMessage);
  }
}
