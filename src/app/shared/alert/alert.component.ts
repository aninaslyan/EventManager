import { Component, Input } from '@angular/core';

interface IAlertOptions {
  title: string;
  color: string;
  backgroundColor: string;
  closable: boolean;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() alert: IAlertOptions;
  constructor() { }

  onClick() {
    this.alert = null;
  }
}
