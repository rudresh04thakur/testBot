import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpParams, HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
// import { CommonService } from '../shared/common.service'
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  baseUrl = environment.API_BASE_URL;
  requestBodyObj:any;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private expiredDate:any=new Date();
  constructor(
    @Inject(PLATFORM_ID)
    private _platformId: Object,
    private http: HttpClient,
    private cookieService:CookieService
  ) {
    console.log("in interceptor 1")
    this.expiredDate.setDate( this.expiredDate.getDate() + 30 );
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Taking an access token
    console.log("in interceptor 2",request)
    let accessToken = "";
    if (isPlatformBrowser(this._platformId)) {
      accessToken = this.cookieService.get('access');
    }
    // cloing a request and adding Authorization header with token
    if (accessToken && (!request.url.includes("/token") && !request.url.includes("/register") &&  !request.url.includes("/token/refresh") && !request.url.includes("/get_category"))) {
      request = this.addToken(request, accessToken);
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401)) {
          if (request.url.includes("/token") || request.url.includes("/register") || request.url.includes("/token/refresh")) {
            return throwError(error);
          } else {
            return this.handle401Error(request, next);
          }
        } else {
          console.log("in interceptor 3",request)
          return throwError(error);
        }
      }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    console.log("in interceptor 4",request)
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // If Refresh token api is not already in progress
    if (this.isRefreshing) {
      // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
      // – which means the new token is ready and we can retry the request again
      return this.refreshTokenSubject
        .pipe(
          filter(token => token != null),
          take(1),
          switchMap(jwt => {
            return next.handle(this.addToken(request, jwt))
          }));
    } else {
      
      this.isRefreshing = true;
      // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);
      let refreshToken = "";
      if (isPlatformBrowser(this._platformId)) {
        refreshToken = this.cookieService.get('refresh')
      }
      
      const tokenDataString = new FormData().append('refresh', refreshToken);
      return this.http.post<any>(this.baseUrl + '/token/refresh', tokenDataString)
        .pipe(switchMap((tokens) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens.access);
          // updating value of expires in variable                    
          this.cookieService.set('access', tokens.access,this.expiredDate);
          this.cookieService.set('refresh', tokens.refresh,this.expiredDate);
          return next.handle(this.addToken(request, tokens.access));
        }));
    }
  }

}
