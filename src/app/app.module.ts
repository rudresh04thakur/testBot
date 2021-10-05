import { APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QuillModule } from 'ngx-quill'
import { CookieService } from 'ngx-cookie-service';
import {MatExpansionModule} from '@angular/material/expansion';
import Counter from './counter';


import { NgxSpinnerModule } from "ngx-spinner";
import { isPlatformBrowser } from '@angular/common';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular'; // Import MsalInterceptor
import { InteractionType,PublicClientApplication } from '@azure/msal-browser';
import { TokenInterceptor } from './helpers/token-interceptor';


//const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    ToastrModule.forRoot(
      {
        timeOut: 1000,
        preventDuplicates: true,
      }
    ),
    Ng2SearchPipeModule,
    QuillModule.forRoot(
       {
          suppressGlobalRegisterWarning: true
      //   customModules: [{
      //     implementation: Counter,
      //     path: 'modules/counter'
      //   }],
      //   customOptions: [{
      //     import: 'formats/font',
      //     whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      //   }]
      }
    ),
    NgxSpinnerModule,

    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: 'f080c94c-fd05-49ec-8b75-0986d97040c1', // This is your client ID
        authority:'https://login.microsoftonline.com/common',
        redirectUri: "http://localhost:4200/admin/bot/all-bots",// This is your redirect URI
        //authority: 'https://login.microsoftonline.com/ed3bd29e-78ea-4f10-8eb9-0932a899667c', // This is your tenant ID ed3bd29e-78ea-4f10-8eb9-0932a899667c
        //postLogoutRedirectUri: 'http://localhost:4200/',
        //clientSecret:'EgO-.blpQJ-g49lc~f91EvbVsKd34K0qh8',
        //navigateToLoginRequestUrl: false,
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true, // Set to true for Internet Explorer 11
      }
    }), 
    {
      interactionType: InteractionType.Popup,
      authRequest: {
        scopes: ["user.read","openid","profile"]
        }
    }, {
      interactionType: InteractionType.Popup, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([ 
          ['https://graph.microsoft.com/v1.0/me', ["user.read","openid","profile"]]
      ])
    }
    )
  ],
  providers: [AuthGuard, CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,@Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
      console.log(`Running ${platform} with appId=${appId}`);
  }

 }

 

// {
//   customModules: [{
//     implementation: Counter,
//     path: 'modules/counter'
//   }],
//   customOptions: [{
//     import: 'formats/font',
//     whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
//   }]
// }
