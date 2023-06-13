import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.urlWithParams);
    const start = new Date();
    return next.handle(request).pipe(
      tap((res) => {
        if (res instanceof HttpResponse) {
          const end = new Date();
          const timer = end.getTime() - start.getTime();
          console.log(`${timer} ms`);
        }
      })
    );
  }
}
