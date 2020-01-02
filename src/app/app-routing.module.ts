import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { EventsGridComponent } from './events-layout/events-grid/events-grid.component';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'events-grid',
    component: EventsLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EventsGridComponent }
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
