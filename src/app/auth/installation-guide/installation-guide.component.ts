import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-installation-guide',
  templateUrl: './installation-guide.component.html',
  styleUrls: ['./installation-guide.component.scss']
})
export class InstallationGuideComponent implements OnInit {
  
  scriptCode = '<script src="//code.tidio.co/jeajskixpjsqv5tx7ms9rxq3odijxsim.js" async></script>';
  bodyTag = "</body>";

  constructor() { }

  ngOnInit(): void {}


}