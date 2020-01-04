import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from './event.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Event[];

  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get<Event[]>(`${environment.apiUrl}/events`);
  }
}
