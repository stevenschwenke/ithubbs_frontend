import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from '@rars/ngx-webstorage';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService {

  private userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private authServerProvider: AuthServerProvider,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private router: Router) {

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
          console.log('Wrong credentials!');
          this.userLoggedIn.next(false);
          this.authServerProvider.logout().subscribe();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  logout() {
    this.userLoggedIn.next(false);
    this.authServerProvider.logout().subscribe();
    this.router.navigate(['']);
  }
}
