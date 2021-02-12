import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any, field: string): any {
    if (!Array.isArray(value)) {
      return value;
    }
    return value.sort((a, b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
  }
}
