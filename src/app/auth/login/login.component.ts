import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Login } from 'src/app/interfaces/login';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationResult } from '@azure/msal-browser';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../../interfaces/signUp';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  products: any = [];

  //login model
  login: Login = {
    email: '',
    password: '',
  };

  //form input validation
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember_me: [false],
  });

  //variable declaration
  remember_me: any;
  errorMsg: any;
  error: boolean = false;
  expiredDate = new Date();
  constructor(
    protected router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    protected notifyService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private msAuthService: MsalService,
    private http: HttpClient
  ) {

    this.expiredDate.setDate(this.expiredDate.getDate() + 30);
  }

  ngOnInit(): void {
    //console.log("G ---- ",this.cookieService.get('refresh'));
    // let temp: any;
    // if (isPlatformBrowser(this.platformId))
    //   temp = this.cookieService.get('remember_me')//localStorage.getItem('remember_me');
    // if ('true' === temp) 
    //   this.remember_me = true;
    // else 
    //   this.remember_me = false;

    /**
     * if remember_me is true then we can use email and password
     * which already saved in localstorage and directly
     * we can login with the help of that credentials
     */
    if (this.cookieService.get('refresh')) {
      if (isPlatformBrowser(this.platformId)) {
        let input = { refresh: this.cookieService.get('refresh') };
        this.autoLogin(input);
      }
    }
  }

  // /**
  //  * @name rememberMe
  //  * @description set values in localStorage like email & password
  //  */
  // public rememberMe() {
  //   // if (isPlatformBrowser(this.platformId)) {
  //   this.cookieService.set('remember_me', this.remember_me,this.expiredDate ); // To Set Cookie
  //   // localStorage.setItem('remember_me', this.remember_me);
  //   // }
  // }

  /**
   * @name autoLogin
   * @description if remember me is true the automatically login into the account
   * @param  {any} input
   */
  autoLogin(input: any) {
    this.subscriptions.push(
      this.authService.refreshToken(input).subscribe(
        (response) => this.successLogin(response, true),
        (error) => { this.loginFail(error.error); }
      )
    );
  }

  onboardingCarouselOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  /**
   * @name signIn
   * @description getting input from user and calling login api
   */
  public signIn() {
    this.subscriptions.push(
      this.authService.login(this.form.value).subscribe(
        (response) => this.successLogin(response, this.form.controls['remember_me'].value),
        (error) => {
          this.loginFail(error);
        }
      )
    );
  }

  /**
   * @name successLogin
   * @description storing token to local storage and navigate to dashboard
   * @param  {any} response
   */
  public successLogin(response: any, remember_me: any) {
    //token here is stored in a local storage
    if (remember_me) {
      this.cookieService.deleteAll('/')
      this.cookieService.set('refresh', response.refresh, this.expiredDate);
      this.cookieService.set('access', response.access, this.expiredDate);
    } else {
      this.cookieService.set('refresh', response.refresh);
      this.cookieService.set('access', response.access);
    }
    //localStorage.setItem('refresh', response.refresh);
    //localStorage.setItem('access', response.access);

    //navigate to the dashboard
   
    this.router.navigate(['admin/bot/all-bots']);
  }



  /**
   * @name loginFail
   * @description failure message
   * @param  {any} error
   */
  public loginFail(error: any) {

    this.error = true;
    console.log("Login error ", error)
    //this.errorMsg = error.detail;
  }

  msSingIn(reg = true) {
    this.msAuthService.loginPopup()
      .subscribe((msResponse: AuthenticationResult) => {
        Object.keys(sessionStorage).forEach((x: any) => {
          if (x.includes('login.windows.net-refreshtoken')) {
            let tempJson = JSON.parse(sessionStorage.getItem(x))
            //////this.cookieService.set('refresh',tempJson['secret']); 
          }
        })
        //this.cookieService.set('refresh',sessionStorage.get("buid"))
        //////this.cookieService.set('access',msResponse.accessToken);
        this.msAuthService.instance.setActiveAccount(msResponse.account);
        let tempUser: SignUp = {
          username: '',
          email: '',
          password: 'Ai@123',
          password2: 'Ai@123',
          company_name: '',
          employee_strength: 0,
          company_logo: '',
          confirmPassword: '',
          is_web_signin: false
        }

        if (this.msAuthService.instance.getActiveAccount() != null) {
          tempUser['username'] = this.msAuthService.instance.getActiveAccount().username
          tempUser['email'] = this.msAuthService.instance.getActiveAccount().username
        }

        // this.http.get("https://graph.microsoft.com/v1.0/me").subscribe( resp  => {
        //   console.log("user -- ",resp)
        // })

        // this.http.get("https://graph.microsoft.com/v1.0/me/messages").subscribe( resp  => {
        //   console.log("msg -- ",resp)
        // })
        if (reg) {
          this.authService.signUp(tempUser).subscribe(
            (response: any) => {
              this.form.patchValue(tempUser);
              this.signIn()
              //this.notifyService.tostMessage('success',response.detail);
              //navigate to the login page
              //this.router.navigate(['auth/login']);
            },
            (error) => {
              this.notifyService.errorToastMessage(error.detail);
            })
        } else {
          this.form.patchValue(tempUser);
          this.signIn()
        }



      });
  }

  logout() { // Add log out function here
    this.msAuthService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }

  // unsubscribe to avoid memory leaks
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
