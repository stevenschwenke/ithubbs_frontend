import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
  }

  getRoles(): string[] {
    const token = localStorage.getItem('authenticationToken');
    if (token !== undefined) {
      const tokenData = token.split('.')[1];
      const decodedTokenData = window.atob(tokenData);
      return JSON.parse(decodedTokenData).auth.split(',');
    } else {
      return [''];
    }
  }
}

