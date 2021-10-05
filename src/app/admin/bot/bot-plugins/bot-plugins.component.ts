import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bot-plugins',
  templateUrl: './bot-plugins.component.html',
  styleUrls: ['./bot-plugins.component.scss'],
})
export class BotPluginsComponent implements OnInit {
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;

  colorCtr = new FormControl(null);
  currentBot =""
  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  public listColors = ['primary', 'accent', 'warn'];

  constructor(private activeRouter:ActivatedRoute ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {  
      //this._botService.currentBot.subscribe((currentBot)=>{
      this.currentBot = params.name//currentBot.split("###")[0]
      //})
    });
  }
}
