import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsGridComponent } from './events-layout/events-grid/events-grid.component';
import { HeaderComponent } from './header/header.component';
import { EventsTableComponent } from './events-layout/events-table/events-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    EventsLayoutComponent,
    EventsGridComponent,
    EventsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
