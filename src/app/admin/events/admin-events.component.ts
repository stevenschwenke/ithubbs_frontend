import { Component, OnInit } from '@angular/core';
import {AdminEventService} from '../shared/admin.event.service';
import {UserService} from '../shared/user.service';
import {LoginService} from '../core/login/login.service';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;

  loginUser: string;

  constructor(private adminEventService: AdminEventService,
              private userService: UserService,
              private loginService: LoginService) { }

  events: Event[];

  ngOnInit() {
    this.adminEventService.getAllIdeas().subscribe((events) => {
      this.events = events;
    });
    this.loginUser = this.userService.getUsername();
  }

  logout() {
    this.loginService.logout();
  }
}
