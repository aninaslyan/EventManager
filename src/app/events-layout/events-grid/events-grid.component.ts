import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { EventService } from '../event.service';
import { Event } from '@shared/models';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.css']
})
export class EventsGridComponent implements OnInit {
  events: Event[];
  eventsNotConverted: Event[];
  noImagePath = '../../../assets/img/noImage.png';

  constructor(public eventService: EventService) {
  }

  ngOnInit(): void {
    this.getCompleteEvents();
  }

  getCompleteEvents() {
    forkJoin(this.eventService.fetchEvents(), this.eventService.fetchEventTypes())
      .subscribe(response => {
        this.eventsNotConverted = JSON.parse(JSON.stringify(response[0].body));
        this.events = this.eventService.getEventTypeFromNumber(response[0].body, response[1]);
      });
  }
}
