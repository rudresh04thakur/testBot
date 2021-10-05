import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ToastrModule } from 'ngx-toastr';
import { InstallationGuideComponent } from './installation-guide/installation-guide.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InstallationGuideComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
