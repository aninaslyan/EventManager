import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthGuardLogin } from './guards';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuardLogin]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
