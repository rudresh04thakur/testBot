import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-plugin-config-popup',
  templateUrl: './plugin-config-popup.component.html',
  styleUrls: ['./plugin-config-popup.component.scss'],
})
export class PluginConfigPopupComponent implements OnInit {
  constructor(public _dialogRef: MatDialogRef<PluginConfigPopupComponent>) {}

  ngOnInit(): void {}

  /**
   * @name closeDialog
   * @description close popup
   */
  public closeDialog(): void {
    this._dialogRef.close();
  }
}
