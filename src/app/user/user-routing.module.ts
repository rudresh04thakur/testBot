import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallationGuideComponent } from './installation-guide/installation-guide.component';
import { LandingMaPageComponent } from './landing-ma-page/landing-ma-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  {
    path: "home",
    component: LandingPageComponent,
  },
  {
    path: "mobile",
    component: LandingMaPageComponent,
  },
  {
    path: "pricing",
    component: PricingComponent,
  },
  {
    path: "setup",
    component: InstallationGuideComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
