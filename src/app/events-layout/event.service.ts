import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Event } from '@shared/models';
import { IEventTypes } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [];
  eventsChanged: Subject<Event[]> = new Subject();
  // messages
  eventMessage: string;
  eventMessageChanged: Subject<string> = new Subject();
  errorMessage: string;
  errorMessageChanged: Subject<string> = new Subject();

  constructor(private http: HttpClient) {
  }

  fetchEvents(pageNum: number = 0, limit: number = 0) {
    const params = new HttpParams()
      .set('_page', String(pageNum))
      .set('_limit', String(limit));
    return this.http.get<Event[]>(
      `${environment.apiUrl}/events`,
      {params, observe: 'response'})
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
    return this.events;
  }

  setEvents(events: Event[]) {
    this.events = events;
    this.eventsChanged.next();
  }

  fetchEventTypes() {
    return this.http.get<IEventTypes[]>(`${environment.apiUrl}/eventTypes`);
  }

  getEventTypeFromNumber(eventsRes, eventTypesRes) {
    const events = eventsRes;

    for (const evn of eventsRes) {
      for (const type of eventTypesRes) {
        if (evn.eventType === type.value) {
          evn.eventType = type.type;
          break;
        }
      }
    }
    return events;
  }

  fetchEventsAndTypes(pageNum, limit) {
    return forkJoin(this.fetchEvents(pageNum, limit), this.fetchEventTypes());
  }

  deleteEventRequest(id: number) {
    return this.http.delete(`${environment.apiUrl}/events/${id}`);
  }

  deleteEventFromList(id: number) {
    this.events = this.events.filter(event => event.id !== id);
    this.eventsChanged.next(this.events);
  }

  createEventRequest(event: Event) {
    return this.http.post<Event>(`${environment.apiUrl}/events`, {
      name: event.name,
      eventType: event.eventType,
      date: event.date,
      description: event.description
    });
  }

  updateEventRequest(id: number, event: Event) {
    return this.http.put<Event>(`${environment.apiUrl}/events/${id}`, {
      name: event.name,
      eventType: event.eventType,
      date: event.date,
      description: event.description,
      image: event.image ? event.image : ''
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

  getImage(imageName) {
    return `${environment.apiUrl}/image/${imageName}`;
  }

  uploadEventImageRequest(id: number, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<string>(`${environment.apiUrl}/image-upload/${id}`, formData);
  }
}
