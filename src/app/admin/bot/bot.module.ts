import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotRoutingModule } from './bot-routing.module';
import { AllBotsComponent } from './all-bots/all-bots.component';
import { CreateNewBotPopupComponent } from './create-new-bot-popup/create-new-bot-popup.component';
import { CreateWorkspacePopupComponent } from './create-workspace-popup/create-workspace-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotSidebarComponent } from './bot-sidebar/bot-sidebar.component';
import { BotComponent } from './bot/bot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PluginConfigPopupComponent } from './plugin-config-popup/plugin-config-popup.component';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';
import { BotPluginDetailComponent } from './bot-plugin-detail/bot-plugin-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AllBotsComponent,
    CreateNewBotPopupComponent,
    CreateWorkspacePopupComponent,
    BotSidebarComponent,
    BotComponent,
    BotPluginDetailComponent,
    PluginConfigPopupComponent
    ],
  imports: [
    CommonModule,
    BotRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    NgxMatColorPickerModule,
    ReactiveFormsModule,
  ],
  providers:[{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }

  ]
})
export class BotModule { }