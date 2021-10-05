import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { PluginConfigPopupComponent } from '../plugin-config-popup/plugin-config-popup.component';
@Component({
  selector: 'app-bot-plugin-detail',
  templateUrl: './bot-plugin-detail.component.html',
  styleUrls: ['./bot-plugin-detail.component.scss']
})
export class BotPluginDetailComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onboardingCarouselOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    margin: 15,
    stagePadding: 100
  }

    /**
   * @name onPluginConfig
   * @description open plugin config popup
   */
     public onPluginConfig(){
      const dialogRef = this._dialog.open(PluginConfigPopupComponent, {
        width: '500px',
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe((result) => {
      });
    }

}
