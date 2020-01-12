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
  // messages
  errorRes: string;
  actionMessage: string;
  // form fields
  eventName = '';
  eventType: number;
  eventDate: Date;
  eventDescription = '';

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.route.params
        .subscribe((params: Params) => {
          this.id = Number(params.id);
          this.editMode = !!params.id;
          this.initForm();
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
        }, () => {
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
    this.eventType = Number(this.eventToEdit.eventType);
    this.eventDate = this.eventToEdit.date; // '2019-12-28T12:56' "YYYY-MM-DDThh:mm"// todo maybe use moment
    this.eventDescription = this.eventToEdit.description;
  }

  private initForm() {
    this.eventForm = new FormGroup({
      name: new FormControl({ value: this.eventName, disabled: this.editMode }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      type: new FormControl({ value: this.eventType, disabled: this.editMode }, Validators.required),
      date: new FormControl(this.eventDate, Validators.required),
      description: new FormControl(this.eventDescription, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(100)
      ]),
      // todo image uploading
    });
  }

  onFormSubmit() {
    const formData = this.eventForm.value;
    const newEvent = new Event(
        formData.date,
        formData.description,
    );

    if (this.editMode) {
      newEvent.name = this.eventName;
      newEvent.eventType = this.eventType;

      this.eventService.updateEvent(this.id, newEvent)
          .subscribe(() => {
            this.actionMessage = `${newEvent.name} event successfully updated`;
            this.eventService.setEventMessage(this.actionMessage);
          }, () => {
            this.errorRes = 'Server error, please try again later';
            this.eventService.setErrorMessage(this.errorRes);
          });
    } else {
      newEvent.name = formData.name;
      newEvent.eventType = Number(formData.type);

      this.eventService.addEvent(newEvent)
          .subscribe(() => {
            this.actionMessage = `${newEvent.name} event successfully created`;
            this.eventService.setEventMessage(this.actionMessage);
          }, () => {
            this.errorRes = 'Server error, please try again later';
            this.eventService.setErrorMessage(this.errorRes);
          });
    }
    this.navigateToTable();
  }

  navigateToTable() {
    this.router.navigate(['/events-table']);
  }
}
