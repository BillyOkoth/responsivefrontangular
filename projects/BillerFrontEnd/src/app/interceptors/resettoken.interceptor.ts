import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("h-token"); // you probably want to store it in localStorage or something
   
    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set("Authorization", `${token}`)
    });

    return next.handle(req1).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let newToken: any = sessionStorage.setItem(
            "h-token",
            event.headers.get("Authorization")
          );

          return newToken;
        }
      })
    );
  }
}
