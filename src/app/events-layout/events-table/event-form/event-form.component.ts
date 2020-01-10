import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EventService } from '../../event.service';
import { Event } from '../../event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  id: number;
  editMode = false;
  formText: string;
  eventForm: FormGroup;
  events: Event[];
  eventToEdit: Event = null;
  eventSubscription: Subscription;
  // form fields
  eventName = '';
  eventDescription = '';
  eventDate = new Date();
  eventType;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
    this.route.params
        .subscribe((params: Params) => {
          this.id = Number(params.id);
          this.editMode = !!params.id;
          this.formText = this.editMode ? 'Edit' : 'Create';
          this.handleForm();
        });
  }

  fetchEvents() {
    this.eventService.subscribeToEvents();
    this.eventSubscription = this.eventService.eventsChanged
        .subscribe(events => {
          this.events = events;
        });
    this.events = this.eventService.getEvents();
    this.eventToEdit = this.eventService.getEventById(this.id);

    if (this.eventToEdit) {
      this.eventName = this.eventToEdit.name;
      this.eventDescription = this.eventToEdit.description;
      this.eventDate = this.eventToEdit.date;
      this.eventType = this.eventToEdit.eventType;
    } else {
      this.router.navigate(['/events-table']);
    }
  }

  private handleForm() {
    if (this.editMode) {
      this.fetchEvents();
    }
    this.initForm();
  }

  private initForm() {
    this.eventForm = new FormGroup({
      name: new FormControl(this.eventName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      description: new FormControl(this.eventDescription, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(100)
      ]),
      // date: new FormControl(this.eventDate, [Validators.required]),
      // type: new FormControl(this.eventType, [Validators.required]),
      // todo image uploading
    });
  }

  onFormSubmit() {
    console.log(this.eventForm, 'eventForm');
  }
}
