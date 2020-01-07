import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Event } from '../events-layout/event.model';
import { PaginationService } from './pagination.service';
import { EventService } from '../events-layout/event.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() totalCount: number;
  @Input() limit: number;
  events: Event[];
  pageNums: Array<number>;
  eventsSubscription: Subscription;

  constructor(private paginationService: PaginationService, private eventService: EventService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageNums = this.paginationService.setPageNumber(this.totalCount, this.limit);
  }

  onPageNum(num: number) {
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
}
