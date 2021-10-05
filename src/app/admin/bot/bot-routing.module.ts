import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBotsComponent } from './all-bots/all-bots.component';
import { AddNewTrainingComponent } from './bot-training/add-new-training/add-new-training.component';
import { BotComponent } from './bot/bot.component';

const routes: Routes = [
  {
    path: '',
    component: BotComponent,
    children: [
      {
        path: '',
        component: AllBotsComponent,
      },
      {
        path: 'all-bots',
        component: AllBotsComponent,
      },
      {
        path: 'training',
        loadChildren: () => import('./bot-training/bot-training.module').then(m => m.BotTrainingModule)
      },
      {
      path: 'add-new-training',
      component: AddNewTrainingComponent,
    },
    {
      path: 'configuration',
      //component: IframeSettingsComponent,
     loadChildren: () => import('./bot-training/bot-training.module').then(m=>m.BotTrainingModule)
    },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotRoutingModule {}