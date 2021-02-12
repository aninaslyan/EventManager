import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/Operators';

import { PaginationService } from './pagination.service';
import { WithDestroy } from '@shared/utils';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent extends WithDestroy() implements OnChanges, OnInit {
  @Input() totalCount: number;
  @Input() limit: number;
  public currentPage: number;
  public pageNums: Array<number>;

  constructor(private paginationService: PaginationService, private router: Router, private route: ActivatedRoute) {
    super();
  }

  private static setPageNumbers(total: number, limit: number) {
    return Array.from({ length: total % limit === 0 ? total / limit : total / limit + 1 }, (v, k) => k + 1);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageNums = PaginationComponent.setPageNumbers(this.totalCount, this.limit);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params.page && params.page > 0) {
          this.currentPage = Number(params.page);
        } else {
          this.currentPage = 1;
        }
        this.onPageNum(this.currentPage);
      });
  }

  public onPageNum(num: number) {
    this.currentPage = num;
    this.paginationService.currentPageChanged.next(this.currentPage);
    // is necessary in case of external changes (e.g delete)
    this.paginationService.currentPageChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(page => {
        if (this.currentPage !== page) {
          this.currentPage = page;
        }
      });
  }

  public onPrevClick() {
    if (this.currentPage - 1 >= 1) {
      this.onPageNum(this.currentPage - 1);
    }
  }

  public onNextClick() {
    if (this.currentPage < this.pageNums.length) {
      this.onPageNum(this.currentPage + 1);
    }
  }
}
