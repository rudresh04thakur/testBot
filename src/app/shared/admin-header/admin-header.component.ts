import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,Location } from '@angular/common';
import { Router } from '@angular/router';

import { NotificationService } from 'src/app/services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { MsalService } from '@azure/msal-angular';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent  implements OnInit {

  constructor(protected router: Router,
    protected notifyService: NotificationService,
    private cookieService: CookieService,
    private location:Location,
    private authService:AuthService,
    private msAuthService: MsalService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit(): void {}

  /**
  * @name logout
  * @description login out and cleaning local storage
  */
  logout() {
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll('/auth');
    //this.authService.logout('/auth/login').subscribe((res:any)=>{
    if (this.msAuthService.instance.getActiveAccount() != null) {
      this.msAuthService.logoutPopup({
          mainWindowRedirectUri: "http://localhost:4200/auth/login"
      });
    }else{
      this.router.navigate(['/auth/login'])
    }
    //this.router.navigate(['/auth/login'])
    //})
  }
}
