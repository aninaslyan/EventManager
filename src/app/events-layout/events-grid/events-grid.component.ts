import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  error: Error;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.eventService.eventsChanged
        .subscribe(evn => {
          this.events = evn;
        }, error => {
          this.error = error;
        });
    this.events = this.eventService.getEvents();
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }
}
