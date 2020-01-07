import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService} from '@rars/ngx-webstorage';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService) {
  }

  login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
    };
    return this.http.post(environment.authenticateUrl, data, {observe: 'response'}).pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      const idToken = resp.body['id_token'];
      this.storeAuthenticationToken(idToken);
      return idToken;
    }
  }


  storeAuthenticationToken(jwt) {
    this.$localStorage.store('authenticationToken', jwt);
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$localStorage.clear('username');
      observer.complete();
    });
  }
}
