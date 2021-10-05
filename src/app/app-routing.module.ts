import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
//const isIframe = window !== window.parent && !window.opener;
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',

  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  initialNavigation: 'enabled'
  //initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes

};

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
