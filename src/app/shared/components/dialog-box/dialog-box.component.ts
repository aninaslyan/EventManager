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

  public onCloseDialog() {
    this.closeDialog.emit();
  }

  public onOkDialog() {
    this.submitDialog.emit();
  }
}
