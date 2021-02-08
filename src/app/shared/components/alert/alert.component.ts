import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { IAlertOptions } from '../../interfaces';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnChanges {
  @Input() show = false;
  @Output() showChanged = new EventEmitter<boolean>();
  @Input() alertProps: IAlertOptions;

  constructor() { }

  ngOnChanges() {
    if (this.show) {
      setTimeout(() => {
        this.onClose();
      }, 5000);
    }
  }

  public onClose() {
    this.show = false;
    this.showChanged.emit(false);
  }
}
