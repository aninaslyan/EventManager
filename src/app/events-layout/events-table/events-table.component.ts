import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

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

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    forkJoin(this.eventService.fetchEvents(1, 2), this.eventService.fetchEventTypes())
        .subscribe((response) => {
          this.totalCount = Number(response[0].headers.get('X-Total-Count'));
          console.log(this.totalCount);
          this.events = this.eventService.getEventTypeFromNumber(response);
        });

    this.eventsSubscription = this.eventService.eventsChanged
        .subscribe(evn => {
          this.events = evn;
          console.log(this.events, 'table');
        });

    this.events = this.eventService.getEvents();
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }
}
