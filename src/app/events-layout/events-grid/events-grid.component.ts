import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.css']
})
export class EventsGridComponent implements OnInit, OnDestroy {
  events: Event[];
  eventsSubscription: Subscription;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    forkJoin(this.eventService.fetchEvents(), this.eventService.fetchEventTypes())
        .subscribe((response) => {
          this.events = this.eventService.getEventTypeFromNumber(response);
        });

    this.eventsSubscription = this.eventService.eventsChanged
        .subscribe(evn => {
          this.events = evn;
          console.log(this.events, 'grid');
        });

    this.events = this.eventService.getEvents();
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }
}
