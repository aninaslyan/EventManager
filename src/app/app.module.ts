import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard, AuthGuardAdmin, AuthGuardLogin } from './auth/guards';

import { CoreModule } from './core/core.module';
import { EventsLayoutModule } from './events-layout/events-layout.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    EventsLayoutModule,
    AuthModule
  ],
  providers: [
    AuthGuard,
    AuthGuardAdmin,
    AuthGuardLogin
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
