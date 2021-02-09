import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent, DialogBoxComponent, AlertComponent } from '@shared/components';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
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
    AlertComponent,
    RouterModule
  ]
})
export class SharedModule {}
