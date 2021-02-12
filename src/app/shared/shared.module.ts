import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent, DialogBoxComponent, AlertComponent } from '@shared/components';
import { OrderByPipe } from '@shared/pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PaginationComponent,
    DialogBoxComponent,
    AlertComponent,
    OrderByPipe
  ],
  providers: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationComponent,
    DialogBoxComponent,
    AlertComponent,
    OrderByPipe
  ]
})
export class SharedModule {}
