import { Component, EventEmitter, Input, Output, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Event } from '../events-layout/event.model';
import { PaginationService } from './pagination.service';
import { EventService } from '../events-layout/event.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges, OnInit, OnDestroy {
  @Input() totalCount: number;
  @Input() limit: number;
  @Input() currentPage: number;
  @Output() currentPageEmit = new EventEmitter();
  events: Event[];
  pageNums: Array<number>;
  eventsSubscription: Subscription;

  // todo make this component fully reusable, and after put this into shared folder
  constructor(private paginationService: PaginationService, private eventService: EventService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageNums = this.paginationService.setPageNumbers(this.totalCount, this.limit);
  }

  onPageNum(num: number) {
    this.currentPage = num;
    this.currentPageEmit.emit(this.currentPage);

    this.eventService.fetchEventsAndTypes(num, this.limit)
        .subscribe((response) => {
          this.events = this.eventService.getEventTypeFromNumber(response);
        });

    this.eventsSubscription = this.eventService.eventsChanged
        .subscribe(evn => {
          this.events = evn;
        });

    this.events = this.eventService.getEvents();
  }

  ngOnInit() {
    this.currentPage = 1;
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

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
