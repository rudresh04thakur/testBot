import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-banner',
  templateUrl: './landing-banner.component.html',
  styleUrls: ['./landing-banner.component.scss'],
})
export class LandingBannerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() heading: string;
  @Input() description: string;
  @Input() btnURL: string;
  @Input() btnLabel: string;
  @Input() imageURL: string;
}
