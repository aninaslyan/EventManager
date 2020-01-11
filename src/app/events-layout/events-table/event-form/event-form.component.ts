import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EventService, IEventTypes } from '../../event.service';
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
  buttonText: string;
  eventForm: FormGroup;
  events: Event[];
  eventToEdit: Event = null;
  eventTypes: IEventTypes[];
  // form fields
  eventName = '';
  eventDescription = '';
  eventDate: Date;
  eventType: number;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
    this.route.params
        .subscribe((params: Params) => {
          this.id = Number(params.id);
          this.editMode = !!params.id;
          this.formText = this.editMode ? 'Edit' : 'Create';
          this.buttonText = this.editMode ? 'Save' : 'Create';
          this.handleForm();
        });
  }

  getEventInitForm() {
    this.eventService.fetchEventById(this.id)
        .subscribe((event: Event) => {
          this.eventToEdit = event;
          this.setFormValues();
          this.initForm();
        }, error => {
          this.navigateToTable();
        });
  }

  getEventTypes() {
    this.eventService.fetchEventTypes()
        .subscribe((eventTypes: IEventTypes[]) => {
          this.eventTypes = eventTypes;
        });
  }

  private handleForm() {
    this.getEventTypes();
    if (this.editMode) {
      this.getEventInitForm();
    }
  }

  setFormValues() {
    this.eventName = this.eventToEdit.name;
    this.eventDescription = this.eventToEdit.description;
    this.eventDate = this.eventToEdit.date; // '2019-12-28T12:56' "YYYY-MM-DDThh:mm"// todo maybe use moment
    this.eventType = Number(this.eventToEdit.eventType);
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
      date: new FormControl(this.eventDate, [Validators.required]),
      type: new FormControl(this.eventType, [Validators.required]),
      // todo image uploading
    });
  }

  onFormSubmit() {
    console.log(this.eventForm, 'eventForm');
  }

  navigateToTable() {
    this.router.navigate(['/events-table']);
  }
}
