import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // todo RouterModule

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/guards';
import { AuthGuardAdmin } from './auth/guards';
import { AuthGuardLogin } from './auth/guards';
import { EventsGridComponent } from './events-layout/events-grid/events-grid.component';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsTableComponent } from './events-layout/events-table/events-table.component';
import { EventFormComponent } from './events-layout/events-table/event-form/event-form.component';

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
      { path: '', component: EventsTableComponent },
    ]
  },
  // todo find a better solution for not showing /event route
  {
    path: 'event',
    component: EventsLayoutComponent,
    canActivate: [AuthGuardAdmin],
    children: [
      { path: 'create', component: EventFormComponent },
      { path: 'edit/:id', component: EventFormComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
