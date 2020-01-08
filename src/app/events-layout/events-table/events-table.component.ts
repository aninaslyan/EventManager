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
  currentPage = 1;
  dialogMessage: string;
  eventId: number;

  constructor(private eventService: EventService) {
  }

  fetchEventsFollowChanges(pageNum) {
    this.eventService.fetchEventsAndTypes(pageNum, this.limit)
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

  ngOnInit(): void {
    this.fetchEventsFollowChanges(1);
  }

  onDelete(id: number) {
    this.dialogMessage = 'Are you sure you want to delete this event?';
    this.eventId = id;
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  onEmitCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }

  onCancel() {
    this.dialogMessage = null;
  }

  onDeleteSubmit() {
    this.eventService.deleteEvent(this.eventId)
        .subscribe(() => {

          this.events = this.eventService.deleteEventFromList(this.eventId);
          if (this.events.length === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.fetchEventsFollowChanges(this.currentPage);
        });
    this.dialogMessage = null;
  }
}
