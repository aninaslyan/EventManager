import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Event } from './event.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [];
  eventsChanged = new Subject<Event[]>();

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
}
