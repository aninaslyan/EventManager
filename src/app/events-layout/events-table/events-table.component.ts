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

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
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
