import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { EventsLayoutComponent } from './events-layout.component';
import { EventsGridComponent } from './events-grid/events-grid.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventFormComponent } from './events-table/event-form/event-form.component';
import { HeaderComponent } from './header/header.component';
import { EventService } from './event.service';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    EventsLayoutComponent,
    EventsGridComponent,
    EventsTableComponent,
    EventFormComponent,
    HeaderComponent
  ],
  providers: [
    EventService, // todo - maybe okay
    DatePipe
  ],
  exports: []
})
export class EventsLayoutModule {}
