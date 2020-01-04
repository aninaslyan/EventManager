import { Component, OnInit } from '@angular/core';

import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.css']
})
export class EventsGridComponent implements OnInit {
  events: Event[];

  constructor(private eventsService: EventService) {
  }

  ngOnInit() {
    this.eventsService.getEvents()
        .subscribe(events => {
          this.events = events;
        });
  }
}
