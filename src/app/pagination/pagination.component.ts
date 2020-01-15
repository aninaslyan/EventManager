import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges, OnInit {
  @Input() totalCount: number;
  @Input() limit: number;
  currentPage: number;
  pageNums: Array<number>;

  // todo put this into shared folder, this is reusable component
  constructor(private paginationService: PaginationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageNums = this.paginationService.setPageNumbers(this.totalCount, this.limit);
  }

  onPageNum(num: number) {
    this.currentPage = num;
    this.paginationService.currentPageChanged.next(this.currentPage);
    // is necessary in case of external changes (e.g delete)
    this.paginationService.currentPageChanged
        .subscribe(page => {
          if (this.currentPage !== page) {
            this.currentPage = page;
          }
        });
    // this.router.navigate([], { queryParams: { page: this.currentPage } });
  }

  ngOnInit() {
    this.onPageNum(1);
    // this.route.queryParams
    //     .subscribe((params: Params) => {
    //       if (params.page) { // todo  && params.page <= this.pageNums.length && params.page > 0
    //         this.currentPage = Number(params.page);
    //       } else {
    //         this.currentPage = 1;
    //       }
    //       this.onPageNum(this.currentPage);
    //     });
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
}
