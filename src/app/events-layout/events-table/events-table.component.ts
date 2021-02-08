import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/Operators';
import { ActivatedRoute, Router } from '@angular/router';

import { Event } from '@shared/models';
import { EventService } from '../event.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit, OnDestroy {
  public events: Event[];
  public eventsNotConverted: Event[];
  public totalCount: number;
  public limit = 10;
  public dialogMessage: string;
  // messages
  public actionMessage: string;
  public showActionAlert = false;
  public errorMessage: string;
  public showErrorAlert = false;
  private eventsSubscription: Subscription;
  private currentPage = 1;
  private eventId: number;
  private currentPageChangedSubscription: Subscription;
  private ngUnsubscribe = new Subject();

  constructor(
    private eventService: EventService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.currentPageChangedSubscription = this.paginationService.currentPageChanged
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
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
        this.showActionAlert = true;
      });

    this.eventService.errorMessageChanged
      .subscribe((message: string) => {
        this.errorMessage = message;
        this.showErrorAlert = true;
      });
  }

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    this.currentPageChangedSubscription.unsubscribe();
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

  public alertActionShowChanged(show: boolean) {
    this.showActionAlert = show;
  }

  public alertErrorShowChanged(show: boolean) {
    this.showErrorAlert = show;
  }

  private fetchEventsFollowChanges(pageNum: number) {
    this.eventService.fetchEventsAndTypes(pageNum, this.limit)
      .subscribe(response => {
        console.log('fetch', pageNum);
        this.totalCount = Number(response[0].headers.get('X-Total-Count'));
        this.eventsNotConverted = JSON.parse(JSON.stringify(response[0].body));
        this.events = this.eventService.getEventTypeFromNumber(response[0].body, response[1]);
        this.eventsSubscription = this.eventService.eventsChanged
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(evn => {
            this.events = evn;
          });

        this.events = this.eventService.getEvents();
        console.log(this.events);
      });
    this.router.navigate([], {queryParams: {page: pageNum}});
  }
}
