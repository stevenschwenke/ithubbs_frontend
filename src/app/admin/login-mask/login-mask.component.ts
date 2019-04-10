import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../core/login/login.service';
import {UserService} from '../shared/user.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login-mask',
  templateUrl: './login-mask.component.html'
})
export class LoginMaskComponent implements OnInit {

  authenticationError: boolean;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
  }

  onLogin(form: NgForm) {

    const username = form.value.username;
    const password = form.value.password;

    this.loginService.login({username: username, password: password})
      .then(() => {
        this.authenticationError = false;
        this.userService.setUsername(username);
        this.router.navigate(['admin/events']);
      })
      .catch(() => {
        this.authenticationError = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Login-Fehler',
          detail: 'Login nicht erfolgreich.'
        });
      });

  }
}
