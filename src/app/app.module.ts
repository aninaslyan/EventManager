import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsGridComponent } from './events-layout/events-grid/events-grid.component';
import { EventsTableComponent } from './events-layout/events-table/events-table.component';
import { EventFormComponent } from './events-layout/events-table/event-form/event-form.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    EventsLayoutComponent,
    EventsGridComponent,
    EventsTableComponent,
    EventFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
