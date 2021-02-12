import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  @Input() message: string;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() submitDialog = new EventEmitter<void>();

  public dialogCancel() {
    this.closeDialog.emit();
  }

  public dialogYes() {
    this.submitDialog.emit();
  }
}
