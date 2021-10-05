import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
// import { MatAccordion } from '@angular/material/expansion';
import { isPlatformBrowser } from '@angular/common';

import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ai_bot-web';
  isIframe = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit() {
    AOS.init();
    if (isPlatformBrowser(this.platformId)) {
      this.isIframe = window !== window.parent && !window.opener;
    }
  }
}
