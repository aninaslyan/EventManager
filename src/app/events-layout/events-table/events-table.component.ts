import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Event } from '../event.model';
import { EventService } from '../event.service';
import { PaginationService } from '../../pagination/pagination.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit, OnDestroy {
  events: Event[];
  eventsSubscription: Subscription;
  totalCount: number;
  limit = 2; // todo
  currentPage = 1;
  dialogMessage: string;
  eventId: number;
  actionMessage: string;
  errorMessage: string;
  currentPageChangedSubscription: Subscription;

  constructor(private eventService: EventService,
              private paginationService: PaginationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  fetchEventsFollowChanges(pageNum) {
    this.eventService.fetchEventsAndTypes(pageNum, this.limit)
        .subscribe(response => {
          console.log('fetch', pageNum);
          this.totalCount = Number(response[0].headers.get('X-Total-Count'));
          this.events = this.eventService.getEventTypeFromNumber(response[0].body, response[1]);
          this.eventsSubscription = this.eventService.eventsChanged
              .subscribe(evn => {
                this.events = evn;
              });

          this.events = this.eventService.getEvents();
          console.log(this.events);
        });
    this.router.navigate([], { queryParams: { page: pageNum } });
  }

  ngOnInit(): void {
    this.currentPageChangedSubscription = this.paginationService.currentPageChanged
        .subscribe(currPage => {
          console.log('currentPageChanged');
          if (this.currentPage !== currPage) {
            this.currentPage = currPage;
            this.fetchEventsFollowChanges(this.currentPage);
          }
        });
    // is needed only first time
    this.fetchEventsFollowChanges(this.currentPage);

    // messages
    this.eventService.eventMessageChanged
        .subscribe((message: string) => {
          this.actionMessage = message;
        });

    this.eventService.errorMessageChanged
        .subscribe((message: string) => {
          this.errorMessage = message;
        });
  }

  onCancel() {
    this.dialogMessage = null;
  }

  onDelete(id: number) {
    this.dialogMessage = 'Are you sure you want to delete this event?';
    this.eventId = id;
  }

  onDeleteSubmit() {
    this.eventService.deleteEventRequest(this.eventId)
        .subscribe(() => {
          this.eventService.deleteEventFromList(this.eventId);
          this.eventService.eventsChanged
              .subscribe(events => {
                this.events = events;
              });

          if (this.events.length === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.paginationService.currentPageChanged.next(this.currentPage);
          this.fetchEventsFollowChanges(this.currentPage);
        });
    this.dialogMessage = null;
  }

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    this.currentPageChangedSubscription.unsubscribe();
  }
}
