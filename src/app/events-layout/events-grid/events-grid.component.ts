import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { environment } from '../../../environments/environment';
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.css']
})
export class EventsGridComponent implements OnInit {
  events: Event[];
  eventImagePath = `${environment.apiUrl}/image`;
  noImagePath = '../../../assets/img/noImage.png';

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getCompleteEvents();
  }

  getCompleteEvents() {
    forkJoin(this.eventService.fetchEvents(), this.eventService.fetchEventTypes())
        .subscribe((response) => {
          this.events = this.eventService.getEventTypeFromNumber(response);
        });
  }
}
