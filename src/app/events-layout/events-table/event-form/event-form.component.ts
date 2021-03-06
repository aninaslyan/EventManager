import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { EventService } from '../../event.service';
import { Event } from '@shared/models';
import { IEventTypes } from '@shared/interfaces';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  public formText: string;
  public buttonText: string;
  public eventForm: FormGroup;
  public eventTypes: IEventTypes[];
  public today = this.datePipe.transform(Date.now(), 'yyyy-MM-ddThh:mm');
  public newImage;
  public eventImage; // todo form field
  private id: number;
  private editMode = false;
  private eventToEdit: Event = null;
  private imageFile;
  // messages
  private errorRes: string;
  private actionMessage: string;
  // form fields
  private eventName = '';
  private eventType: number;
  private eventDate: Date | string = this.today;
  private eventDescription = '';

  constructor(
    public datePipe: DatePipe,
    public eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

  private getEventInitForm() {
    this.eventService.fetchEventById(this.id)
      .subscribe((event: Event) => {
        this.eventToEdit = event;
        this.setFormValues();
        this.initForm();
      }, () => {
        this.navigateToTable();
      });
  }

  private getEventTypes() {
    this.eventService.fetchEventTypes()
      .subscribe((eventTypes: IEventTypes[]) => {
        this.eventTypes = eventTypes;
      });
  }

  setFormValues() {
    this.eventName = this.eventToEdit.name;
    this.eventType = Number(this.eventToEdit.eventType);
    this.eventDate = this.eventToEdit.date; // '2019-12-28T12:56' "YYYY-MM-DDThh:mm"
    this.eventDescription = this.eventToEdit.description;
    this.eventImage = this.eventToEdit.image;
  }

  public onFormSubmit() {
    const formData = this.eventForm.value;
    const newEvent = new Event(
      formData.date,
      formData.description,
    );

    if (this.editMode) {
      newEvent.name = this.eventName;
      newEvent.eventType = this.eventType;
      // if image exists during edit, put it for not to be overwritten
      if (this.eventImage) {
        newEvent.image = this.eventImage;
      }

      this.eventService.updateEventRequest(this.id, newEvent)
        .subscribe((event) => {
          this.uploadImage(event.id);
          this.actionMessage = `${newEvent.name} event successfully updated`;
          this.eventService.setEventMessage(this.actionMessage);
        }, () => {
          this.errorRes = 'Server error, please try again later';
          this.eventService.setErrorMessage(this.errorRes);
        });
    } else {
      newEvent.name = formData.name;
      newEvent.eventType = Number(formData.type);

      this.eventService.createEventRequest(newEvent)
        .subscribe((event) => {
          this.uploadImage(event.id);
          this.actionMessage = `${newEvent.name} event successfully created`;
          this.eventService.setEventMessage(this.actionMessage);
        }, () => {
          this.errorRes = 'Server error, please try again later';
          this.eventService.setErrorMessage(this.errorRes);
        });
    }
    this.navigateToTable();
  }

  private uploadImage(id: number) {
    if (this.imageFile) {
      this.eventService.uploadEventImageRequest(id, this.imageFile)
        .subscribe(() => {
        });
    }
  }

  public onFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => this.newImage = reader.result;

      reader.readAsDataURL(this.imageFile);
    }
  }

  private navigateToTable() {
    this.router.navigate(['/event/table']);
  }

  private initForm() {
    this.eventForm = new FormGroup({
      name: new FormControl({value: this.eventName, disabled: this.editMode}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      type: new FormControl({value: this.eventType, disabled: this.editMode}, Validators.required),
      date: new FormControl(this.eventDate, Validators.required),
      description: new FormControl(this.eventDescription, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(100)
      ]),
      image: new FormControl(null)
    });
  }

  private handleForm() {
    this.getEventTypes();
    if (this.editMode) {
      this.getEventInitForm();
    }
  }
}
