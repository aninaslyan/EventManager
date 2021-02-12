import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthGuardLogin, AuthGuardAdmin, AuthGuard } from './guards';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    DatePipe,
    AuthGuardLogin,
    AuthGuardAdmin,
    AuthGuard
  ],
  exports: []
})
export class AuthModule {}
