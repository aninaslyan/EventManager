import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent, DialogBoxComponent, AlertComponent } from '@shared/components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent,
    DialogBoxComponent,
    AlertComponent
  ],
  providers: [],
  exports: [
    PaginationComponent,
    DialogBoxComponent,
    AlertComponent
  ]
})
export class SharedModule {}
