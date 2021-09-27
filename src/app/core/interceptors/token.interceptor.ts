/**
 * @description:: intercept all requests with expired tokens and redirect the user to login page
 */

import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    requests: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(requests).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
         
          
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.success === false) {
          } else {
            this.router.navigate([""]);
            sessionStorage.clear()
          }
        }
        return throwError(error);
      })
    );
  }
}
