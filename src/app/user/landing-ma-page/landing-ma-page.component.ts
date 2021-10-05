import { Component, OnInit } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landing-ma-page',
  templateUrl: './landing-ma-page.component.html',
  styleUrls: ['./landing-ma-page.component.scss']
})
export class LandingMaPageComponent implements OnInit {

  landingCarouselOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
