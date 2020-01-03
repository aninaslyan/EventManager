import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { EventsGridComponent } from './events-layout/events-grid/events-grid.component';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsTableComponent } from './events-layout/events-table/events-table.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthGuardAdmin } from './auth/auth-guard-admin.service';
import { AuthGuardLogin } from './auth/auth-guard-login.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuardLogin]
  },
  {
    path: 'events-grid',
    component: EventsLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EventsGridComponent }
    ]
  },
  {
    path: 'events-table',
    component: EventsLayoutComponent,
    canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: EventsTableComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
