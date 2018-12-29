import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {LoginService} from '../core/login/login.service';
import {Group} from '../../shared/group';
import {AdminGroupService} from '../shared/admin.group.service';
import {
  faPlusSquare as faPlusSquare
} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {MessageService, OverlayPanel} from 'primeng/primeng';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html'
})
export class AdminGroupsComponent implements OnInit {

  faPlusSquare = faPlusSquare;

  loginUser: string;

  groups: Group[];

  constructor(private adminGroupService: AdminGroupService,
              private userService: UserService,
              private messageService: MessageService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.adminGroupService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
    this.loginUser = this.userService.getUsername();
  }

  logout() {
    this.loginService.logout();
  }

  onAddNewGroup(event, newGroupForm: NgForm, overlay: OverlayPanel) {

    const newGroup = new Group(
      newGroupForm.value.newGroupName,
      newGroupForm.value.newGroupURL,
      newGroupForm.value.newGroupDescription);

    this.adminGroupService.createNewGroup(newGroup).subscribe(() => {
      overlay.hide();
      this.groups.push(newGroup);
      this.messageService.add({severity: 'info', summary: 'Anlegen erfolgreich', detail: 'Neue Gruppe angelegt.'});
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Server-Fehler',
        detail: 'Neue Gruppe konnte nicht gespeichert werden: \n' + error.message
      });
    });
  }
}
