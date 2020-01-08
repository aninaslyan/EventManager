import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  setPageNumbers(total: number, limit: number) {
    return Array.from({ length: total % limit === 0 ? total / limit : total / limit + 1 }, (v, k) => k + 1);
  }
}
