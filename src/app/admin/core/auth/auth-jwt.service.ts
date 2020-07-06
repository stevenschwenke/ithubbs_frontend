import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {
  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
    };
    return this.http.post(environment.authenticateUrl, data, {observe: 'response'}).pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      const idToken = resp.body['id_token'];
      localStorage.setItem('authenticationToken', idToken);
      return idToken;
    }
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      localStorage.removeItem('authenticationToken');
      localStorage.removeItem('username');
      observer.complete();
    });
  }
}
