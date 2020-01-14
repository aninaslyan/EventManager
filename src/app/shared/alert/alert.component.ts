import { Component, Input, OnInit } from '@angular/core';

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
export class AlertComponent implements OnInit {
  @Input() alert: IAlertOptions;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.onClose();
    }, 5000);
  }

  onClose() {
    this.alert = null;
  }
}
