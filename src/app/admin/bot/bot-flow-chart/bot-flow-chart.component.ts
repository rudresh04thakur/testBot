import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateChildIntentPopupComponent } from '../create-child-intent-popup/create-child-intent-popup.component';

@Component({
  selector: 'app-bot-flow-chart',
  templateUrl: './bot-flow-chart.component.html',
  styleUrls: ['./bot-flow-chart.component.scss'],
})
export class BotFlowChartComponent implements OnInit {
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  onAddChildIntent() {
    const dialogRef = this._dialog.open(CreateChildIntentPopupComponent, {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
