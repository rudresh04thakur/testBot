import { Component, OnInit } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public videoConfig: any;
  public menuEnable: boolean = false;

  public openMenu(){
    this.menuEnable = true;
  }

  public closeMenu(){
    this.menuEnable = false;
  }

  landingCarouselOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 6,
    nav: false,
    responsive: {
      0: {
        items: 2
      },
      550: {
        items: 3
      },
      768: {
        items: 3
      },
      998: {
        items: 5
      },
      1400: {
        items: 6
      },
      1600: {
        items: 6
      }
    }
  }

  constructor() {
    this.videoConfig = {
      autoplay: false,
      controls: true,
      fluid: true,
      sources: [{ src: '../../../assets/images/video.mp4', type: 'video/mp4' }],
      poster: "../../../assets/images/lead-generation-image.png",
      playToggle: false
    };
  }

  ngOnInit(): void {

  }

}
