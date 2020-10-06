import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

const HTTP_STATUS_CODE_EXPIRED = 498;

@Injectable({
  providedIn: 'root',
})
/**
 * Intercept all request, if one is 498 = cookie expired,
 * then the user is redirected to the login page
 */
// tslint:disable: no-any
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = this.router.url;

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((selector) => {
        if (selector.status === HTTP_STATUS_CODE_EXPIRED) {
          this.router.navigate(['login'], { queryParams: { returnUrl: url } });
        }
        return throwError(selector);
      })
    );
  }
}
