import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPageChanged = new Subject<number>();

  setPageNumbers(total: number, limit: number) {
    return Array.from({ length: total % limit === 0 ? total / limit : total / limit + 1 }, (v, k) => k + 1);
  }
}
