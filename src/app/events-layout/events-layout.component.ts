import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Event } from './event.model';
import { EventService } from './event.service';

@Component({
  templateUrl: './events-layout.component.html',
})
export class EventsLayoutComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    // todo Layout is destroyed (header as well) therefore OnInit is called every time
    forkJoin(this.eventService.fetchEvents(), this.eventService.fetchEventTypes())
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
            });
  }
}
