import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { UserRoutingModule } from './user-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { InstallationGuideComponent } from './installation-guide/installation-guide.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingBannerComponent } from './landing-banner/landing-banner.component';
import { LandingFooterComponent } from './landing-footer/landing-footer.component';
import { LandingDemoRequestComponent } from './landing-demo-request/landing-demo-request.component';
import { LandingMaPageComponent } from './landing-ma-page/landing-ma-page.component';
import { PricingComponent } from './pricing/pricing.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    InstallationGuideComponent,
    LandingHeaderComponent,
    LandingBannerComponent,
    LandingFooterComponent,
    LandingDemoRequestComponent,
    LandingMaPageComponent,
    PricingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    CarouselModule
  ]
})
export class UserModule { }
