import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Event } from '../events-layout/event.model';
import { PaginationService } from './pagination.service';
import { EventService } from '../events-layout/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges, OnInit, OnDestroy {
  @Input() totalCount: number;
  @Input() limit: number;
  currentPage: number;
  events: Event[];
  eventsSubscription: Subscription;
  pageNums: Array<number>;

  // todo make this component fully reusable, and after put this into shared folder
  constructor(private paginationService: PaginationService, private eventService: EventService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageNums = this.paginationService.setPageNumbers(this.totalCount, this.limit);
  }

  onPageNum(num: number) {
    this.currentPage = num;
    this.paginationService.currentPageChanged.next(this.currentPage);
    // todo there is a similar function in service
    this.eventService.fetchEventsAndTypes(this.currentPage, this.limit)
        .subscribe((response) => {
          this.events = this.eventService.getEventTypeFromNumber(response);
          this.eventService.eventsChanged.next(this.events);
          this.eventsSubscription = this.eventService.eventsChanged
              .subscribe(evn => {
                this.events = evn;
              });

          this.events = this.eventService.getEvents();
        });

    this.router.navigate([], { queryParams: { page: this.currentPage } });
  }

  ngOnInit() {
    this.paginationService.currentPageChanged
        .subscribe(currPage => {
          this.currentPage = currPage;
        });
    this.route.queryParams
        .subscribe((params: Params) => {
          if (params.page) { // todo  && params.page <= this.pageNums.length && params.page > 0
            this.currentPage = Number(params.page);
          } else {
            this.currentPage = 1;
          }
          this.paginationService.currentPageChanged.next(this.currentPage);
          this.onPageNum(this.currentPage);
        });
  }

  onPrevClick() {
    if (this.currentPage - 1 >= 1) {
      this.onPageNum(this.currentPage - 1);
    }
  }

  onNextClick() {
    if (this.currentPage < this.pageNums.length) {
      this.onPageNum(this.currentPage + 1);
    }
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
