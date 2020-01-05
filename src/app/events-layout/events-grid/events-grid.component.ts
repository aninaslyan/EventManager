import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';

import { EventService, IEventTypes } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.css']
})
export class EventsGridComponent implements OnInit, OnDestroy {
  events: Event[];
  // eventTypes: IEventTypes[];
  // eventsSubscription: Subscription;
  // eventTypesSubscription: Subscription;

  error: Error;

  constructor(private eventsService: EventService) {
  }

  ngOnInit(): void {
    // todo Subject changes are not followed here
    forkJoin(this.eventsService.fetchEvents(), this.eventsService.fetchEventTypes())
        .subscribe((res) => {
              const events = res[0];
              const eventTypes = res[1];

              for (const evn of events) {
                for (const type of eventTypes) {
                  if (evn.eventType === type.value) {
                    evn.eventType = type.type;
                    break;
                  }
                }
              }
              this.events = events;
            },
            error => {
              this.error = error;
            });

    // this.eventsSubscription = this.eventsService.eventsChanged
    //     .subscribe(events => {
    //       this.events = events;
    //       console.log(this.events, 'eventsChanged');
    //     });

    // this.eventTypesSubscription = this.eventsService.eventTypesChanged
    //     .subscribe(evnTypes => {
    //       this.eventTypes = evnTypes;
    //     });

    // this.events = this.eventsService.getEvents();
    // this.eventTypes = this.eventsService.getEventTypes();
  }

  ngOnDestroy(): void {
    // this.eventsSubscription.unsubscribe();
    // this.eventTypesSubscription.unsubscribe();
  }
}
