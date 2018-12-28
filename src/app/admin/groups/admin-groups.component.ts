import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {LoginService} from '../core/login/login.service';
import {Group} from '../../shared/group';
import {AdminGroupService} from '../shared/admin.group.service';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent implements OnInit {

  loginUser: string;

  constructor(private adminGroupService: AdminGroupService,
              private userService: UserService,
              private loginService: LoginService) { }

  groups: Group[];

  ngOnInit() {
    this.adminGroupService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
    this.loginUser = this.userService.getUsername();
  }

  logout() {
    this.loginService.logout();
  }

}
