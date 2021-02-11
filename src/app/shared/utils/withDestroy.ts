import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export type Constructor<T = {}> = new (...args: any[]) => T;

export const WithDestroy = <T extends Constructor>(Base: T = class {} as T) => {
  return class extends Base implements OnDestroy {
    destroy$  = new Subject<void>();

    ngOnDestroy() {
      this.destroy$.next();
    }
  };
};
