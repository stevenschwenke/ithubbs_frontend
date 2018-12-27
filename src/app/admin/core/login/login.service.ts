import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {

  private userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private authServerProvider: AuthServerProvider,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService) {

    // If application refreshed with F5, the LoginService "forgets" that it has been logged in. Hence, have a look if we have a token:
    if (!!this.userLoggedIn) {
      const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
      this.userLoggedIn.next(token);
    }
  }

  login(credentials, callback?) {
    const cb = callback || function () {
    };

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          resolve(data);
          this.userLoggedIn.next(true);
          return cb();
        },
        err => {
          this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  logout() {
    this.userLoggedIn.next(false);
    this.authServerProvider.logout().subscribe();
  }
}
