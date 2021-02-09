import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    DatePipe,
    AuthService,
  ],
  exports: []
})
export class AuthModule {}
