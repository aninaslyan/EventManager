import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent, DialogBoxComponent, AlertComponent } from '@shared/components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PaginationComponent,
    DialogBoxComponent,
    AlertComponent,
  ],
  providers: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationComponent,
    DialogBoxComponent,
    AlertComponent
  ]
})
export class SharedModule {}
