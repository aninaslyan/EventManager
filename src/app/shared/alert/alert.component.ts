import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() show: boolean;
  @Output() showChanged = new EventEmitter<boolean>();
  @Input() alertProps: IAlertOptions;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.onClose();
    }, 5000);
  }

  onClose() {
    this.show = false;
    this.showChanged.emit(false);
  }
}
