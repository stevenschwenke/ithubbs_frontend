import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../shared/user.service';
import {LoginService} from '../core/login/login.service';
import {Group} from '../../shared/group';
import {AdminGroupService} from '../shared/admin.group.service';
import {
  faEdit as faEdit,
  faPlusSquare as faPlusSquare,
  faRadiation as faRadiation,
  faSignOutAlt as faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, FileUpload, MessageService, OverlayPanel} from 'primeng/primeng';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html'
})
export class AdminGroupsComponent implements OnInit {

  newGroupForm: FormGroup;
  editGroupForm: FormGroup;

  @ViewChild('logoUploaderNewGroup') logoUploaderNewGroup: FileUpload;

  faPlusSquare = faPlusSquare;
  faRadiation = faRadiation;
  faEdit = faEdit;
  faSignOutAlt = faSignOutAlt;

  loginUser: string;

  groups: Group[];
  displayGroupEditDialog: boolean;
  private currentFileUpload: File;

  constructor(private formBuilder: FormBuilder,
              private adminGroupService: AdminGroupService,
              private userService: UserService,
              private messageService: MessageService,
              private loginService: LoginService,
              private confirmationService: ConfirmationService) {
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

      this.adminGroupService.createNewGroup(newGroup).subscribe((id: string) => {
        overlay.hide();

        newGroup.id = id;
        this.groups.push(newGroup);
        this.messageService.add({severity: 'info', summary: 'Anlegen erfolgreich', detail: 'Neue Gruppe angelegt.'});
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Server-Fehler',
          detail: 'Neue Gruppe konnte nicht gespeichert werden: \n' + error.message
        });
      }, () => {
        this.adminGroupService.postNewLogo(Number(newGroup.id), this.currentFileUpload).subscribe(() => {

        // Reset form. If that is not done, the form will contain the last input when opened again.
        newGroupForm.reset();
        this.currentFileUpload = null;
        this.logoUploaderNewGroup.clear();
      });
    });
  }

  onEditGroup($event: MouseEvent, overlayEditGroup: OverlayPanel, editGroupForm: FormGroup, group: Group) {
    this.displayGroupEditDialog = true;

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

      this.displayGroupEditDialog = false;

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

  onDeleteGroup($event: MouseEvent, overlayEditGroup: HTMLElement, editGroupForm: FormGroup, group: Group) {
    this.confirmationService.confirm({
      message: 'Gruppe wirklich löschen? Achtung: Sie ist dann wirklich, wirklich weg!',
      accept: () => {
        this.adminGroupService.deleteGroup(group).subscribe(() => {

          const deletedGroup = this.groups.find(g => g.id === group.id);
          this.groups.splice(this.groups.indexOf(deletedGroup), 1);

          this.messageService.add({severity: 'info', summary: 'Löschen erfolgreich', detail: 'Gruppe gelöscht.'});
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Server-Fehler',
            detail: 'Gruppe konnte nicht gelöscht werden: \n' + error.message
          });
        });
      }
    });
  }

  onUploadLogo(event) {
    this.currentFileUpload = event.files[0];
  }
}
