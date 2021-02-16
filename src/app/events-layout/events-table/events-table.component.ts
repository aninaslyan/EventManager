import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/Operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { Event } from '@shared/models';
import { EventService } from '../event.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { WithDestroy } from '@shared/utils';
import { IEventTypes } from '@shared/interfaces';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent extends WithDestroy() implements OnInit {
  public events: Event[];
  public eventsNotConverted: Event[];
  public totalCount: number;
  public limit = 10;
  public dialogMessage: string;
  public actionMessage: string;
  public showActionAlert = false;
  public errorMessage: string;
  public showErrorAlert = false;
  public orderByField: string;
  private currentPage = 1;
  private eventId: number;

  constructor(
    private eventService: EventService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribingCurrentPageChange();
    // is needed only first time
    this.fetchEventsFollowChanges(this.currentPage);
    this.subscribingMessages();
  }

  public onCancel() {
    this.dialogMessage = null;
  }

  public onDelete(id: number) {
    this.dialogMessage = 'Are you sure you want to delete this event?';
    this.eventId = id;
  }

  public onDeleteSubmit() {
    this.eventService.deleteEventRequest(this.eventId)
      .subscribe(() => {
          this.deleteEvent();
      });
    this.dialogMessage = null;
  }

  public alertActionShowChanged(show: boolean) {
    this.showActionAlert = show;
  }

  public alertErrorShowChanged(show: boolean) {
    this.showErrorAlert = show;
  }

  private fetchEventsFollowChanges(pageNum: number) {
    this.eventService.fetchEventsAndTypes(this.eventService.fetchRawEvents(pageNum, this.limit), this.eventService.fetchEventTypes())
      .subscribe((response: [HttpResponse<Event[]>, IEventTypes[]]) => {
        this.totalCount = Number(response[0].headers.get('X-Total-Count'));
        this.eventsNotConverted = JSON.parse(JSON.stringify(response[0].body));
        this.events = this.eventService.getEventTypeFromNumber(response[0].body, response[1]);
        this.eventService.eventsChanged
          .pipe(takeUntil(this.destroy$))
          .subscribe(evn => {
            this.events = evn;
          });

        this.events = this.eventService.getEvents();
        console.log(this.events);
      });
    this.router.navigate([], {queryParams: {page: pageNum}});
  }

  private deleteEvent() {
    this.eventService.deleteEventFromList(this.eventId);
    this.eventService.eventsChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(events => {
        this.events = events;
      });

    if (this.events.length === 0) {
      this.currentPage = this.currentPage - 1;
    }
    this.paginationService.currentPageChanged.next(this.currentPage);
    this.fetchEventsFollowChanges(this.currentPage);
  }

  private subscribingCurrentPageChange() {
    this.paginationService.currentPageChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(currPage => {
        console.log('currentPageChanged');
        if (this.currentPage !== currPage) {
          this.currentPage = currPage;
          this.fetchEventsFollowChanges(this.currentPage);
        }
      });
  }

  private subscribingMessages() {
    this.eventService.eventMessageChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: string) => {
        this.actionMessage = message;
        this.showActionAlert = true;
      });

    this.eventService.errorMessageChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: string) => {
        this.errorMessage = message;
        this.showErrorAlert = true;
      });
  }
}
