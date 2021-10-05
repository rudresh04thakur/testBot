import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { InstallationGuideComponent } from './installation-guide/installation-guide.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'install',
    component: InstallationGuideComponent
  },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password',component:ForgotPasswordComponent},
  {path: 'reset-password/:key1/:key2', component: ResetPasswordComponent },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AuthRoutingModule { }
