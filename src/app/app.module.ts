import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsGridComponent } from './events-layout/events-grid/events-grid.component';
import { EventsTableComponent } from './events-layout/events-table/events-table.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PaginationComponent } from './pagination/pagination.component';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    EventsLayoutComponent,
    EventsGridComponent,
    EventsTableComponent,
    PaginationComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
