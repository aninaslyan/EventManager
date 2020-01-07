import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  eventsChanged = new Subject<Event[]>();

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

  getEvents() {
    return this.events.slice();
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
}
