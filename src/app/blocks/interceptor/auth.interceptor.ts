import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {environment} from '../../../environments/environment';

export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (
      !request
      || !request.url
      || (/^http/.test(request.url) && !(environment.adminUrl && request.url.startsWith(environment.adminUrl)))) {

      return next.handle(request);
    }

    const token = localStorage.getItem('authenticationToken') || sessionStorage.retrieve('authenticationToken');
    if (!!token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(request);
  }
}
