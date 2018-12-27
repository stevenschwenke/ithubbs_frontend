import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private $localStorage: LocalStorageService, private http: HttpClient) {
  }

  getUsername(): string {
    return this.$localStorage.retrieve('username');
  }

  setUsername(username: string) {
    this.$localStorage.store('username', username);
  }

  getRoles(): string[] {
    const token = this.$localStorage.retrieve('authenticationToken');
    if (token !== undefined) {
      const tokenData = token.split('.')[1];
      const decodedTokenData = window.atob(tokenData);
      return JSON.parse(decodedTokenData).auth.split(',');
    } else {
      return [''];
    }
  }
}

