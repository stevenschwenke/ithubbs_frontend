import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {LoginService} from '../core/login/login.service';
import {Group} from '../../shared/group';
import {AdminGroupService} from '../shared/admin.group.service';
import {faPlusSquare as faPlusSquare, faEdit as faEdit, faSignOutAlt as faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService, OverlayPanel} from 'primeng/primeng';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html'
})
export class AdminGroupsComponent implements OnInit {

  newGroupForm: FormGroup;
  editGroupForm: FormGroup;

  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faSignOutAlt = faSignOutAlt;

  loginUser: string;

  groups: Group[];

  constructor(private formBuilder: FormBuilder,
              private adminGroupService: AdminGroupService,
              private userService: UserService,
              private messageService: MessageService,
              private loginService: LoginService) {
  }

  ngOnInit() {

    this.newGroupForm = this.formBuilder.group({
      'newGroupName': new FormControl('', Validators.required),
      'newGroupURL': new FormControl('', Validators.required),
      'newGroupDescription': new FormControl('', Validators.required)
    });

    this.editGroupForm = this.formBuilder.group({
      'existingGroupId': new FormControl('', Validators.required),
      'existingGroupName': new FormControl('', Validators.required),
      'existingGroupURL': new FormControl('', Validators.required),
      'existingGroupDescription': new FormControl('', Validators.required)
    });

    this.adminGroupService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
    this.loginUser = this.userService.getUsername();
  }

  logout() {
    this.loginService.logout();
  }

  onAddNewGroup(event, newGroupForm: FormGroup, overlay: OverlayPanel) {

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

  onEditGroup($event: MouseEvent, overlayEditGroup: OverlayPanel, editGroupForm: FormGroup, group: Group) {
    overlayEditGroup.toggle(event);
    editGroupForm.setValue({
      existingGroupId: group.id,
      existingGroupName: group.name,
      existingGroupURL: group.url,
      existingGroupDescription: group.description
    });
  }

  onSaveEditedGroup($event: {}, editGroupForm: FormGroup, overlayEditGroup: OverlayPanel) {
    const newGroup = new Group(
      editGroupForm.value.existingGroupName,
      editGroupForm.value.existingGroupURL,
      editGroupForm.value.existingGroupDescription);
    newGroup.id = editGroupForm.value.existingGroupId;

    this.adminGroupService.editGroup(newGroup).subscribe(() => {

      overlayEditGroup.hide();

      const changedGroup = this.groups.find(g => g.id === newGroup.id);
      changedGroup.name = newGroup.name;
      changedGroup.url = newGroup.url;
      changedGroup.description = newGroup.description;

      this.messageService.add({severity: 'info', summary: 'Änderung erfolgreich', detail: 'Gruppe geändert.'});
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Server-Fehler',
        detail: 'Gruppe konnte nicht gespeichert werden: \n' + error.message
      });
    });
  }
}
