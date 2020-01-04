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
  subscription: Subscription;
  error: Error;

  constructor(private eventsService: EventService) {
  }

  ngOnInit(): void {
    this.events = this.eventsService.getEvents();
    this.eventsService.fetchEvents()
        .subscribe(() => {
            },
            error => {
              this.error = error;
            });
    this.subscription = this.eventsService.eventsChanged
        .subscribe(events => {
          this.events = events;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
