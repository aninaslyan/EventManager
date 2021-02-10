import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsGridComponent } from './events-grid/events-grid.component';
import { EventsLayoutComponent } from './events-layout.component';
import { AuthGuard, AuthGuardAdmin } from '../auth/guards';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventFormComponent } from './events-table/event-form/event-form.component';

const routes: Routes = [
  {
    path: '',
    component: EventsLayoutComponent,
    canActivate: [AuthGuardAdmin],
    children: [
      { path: 'create', component: EventFormComponent },
      { path: 'edit/:id', component: EventFormComponent }
    ]
  },
  {
    path: 'grid',
    component: EventsLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EventsGridComponent }
    ]
  },
  {
    path: 'table',
    component: EventsLayoutComponent,
    canActivate: [AuthGuardAdmin],
    children: [
      { path: '', component: EventsTableComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsLayoutRoutingModule {}
