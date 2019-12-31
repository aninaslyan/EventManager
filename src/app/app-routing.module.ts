import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { EventsGridComponent } from './events-grid/events-grid.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'events-grid', component: EventsGridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
