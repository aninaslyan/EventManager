import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { AuthGuardLogin, AuthGuardAdmin, AuthGuard } from './guards';

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
    AuthService, // todo - be cautious of lazily loading
    AuthGuardLogin,
    AuthGuardAdmin,
    AuthGuard
  ],
  exports: []
})
export class AuthModule {}
