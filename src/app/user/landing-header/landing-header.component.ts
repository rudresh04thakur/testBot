import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
  public menuEnable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public openMenu(){
    this.menuEnable = true;
  }

  public closeMenu(){
    this.menuEnable = false;
  }

}
