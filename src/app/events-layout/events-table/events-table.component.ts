import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Event } from '../event.model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit, OnDestroy {
  events: Event[];
  eventsSubscription: Subscription;
  totalCount: number;
  limit = 2;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.fetchEventsAndTypes(1, this.limit)
        .subscribe((response) => {
          this.totalCount = Number(response[0].headers.get('X-Total-Count'));
          this.events = this.eventService.getEventTypeFromNumber(response);
        });

    this.eventsSubscription = this.eventService.eventsChanged
        .subscribe(evn => {
          this.events = evn;
        });

    this.events = this.eventService.getEvents();
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }
}
