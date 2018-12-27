import {Component, ElementRef, OnInit, Renderer} from '@angular/core';
import {NgForm} from '@angular/forms';
import {faLightbulb} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {LoginService} from '../core/login/login.service';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-login-mask',
  templateUrl: './login-mask.component.html'
})
export class LoginMaskComponent implements OnInit {

  authenticationError: boolean;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginService.logout();
  }

  onLogin(form: NgForm) {

    const username = form.value.username;
    const password = form.value.password;

    this.loginService.login({username: username, password: password})
      .then(() => {
        this.authenticationError = false;
        this.userService.setUsername(username);
        this.router.navigate(['admin']);
      })
      .catch(() => {
        this.authenticationError = true;
      });

  }
}
