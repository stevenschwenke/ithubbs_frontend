import {Component, OnInit} from '@angular/core';
import {AdminEventService} from '../shared/admin.event.service';
import {UserService} from '../shared/user.service';
import {LoginService} from '../core/login/login.service';
import {faEdit, faPlusSquare, faRadiation, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {OverlayPanel} from 'primeng/primeng';
import {Event} from '../../shared/event';
import {Group} from '../../shared/group';
import {GroupService} from '../shared/group.service';
import {EventUpdateDTO} from '../../shared/eventUpdateDTO';

@Component({
  selector: 'app-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  newEventForm: FormGroup;
  editEventForm: FormGroup;

  faPlusSquare = faPlusSquare;
  faRadiation = faRadiation;
  faEdit = faEdit;
  faSignOutAlt = faSignOutAlt;

  loginUser: string;

  events: Event[];

  displayEventEditDialog: boolean;

  // link group to event combobox
  allGroups: Group[];
  availableGroupsAfterFiltering: Group[];

  /** global variable to keep selected group while editing event because it cannot be saved as FormControl */
  selectedGroup: Group;

  constructor(private formBuilder: FormBuilder,
              private adminEventService: AdminEventService,
              private userService: UserService,
              private messageService: MessageService,
              private loginService: LoginService,
              private groupService: GroupService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {

    this.newEventForm = this.formBuilder.group({
      'newEventName': new FormControl('', Validators.required),
      'newEventDate': new FormControl('', Validators.required),
      'newEventURL': new FormControl('', Validators.required),
      'newEventGroup': new FormControl(''),
      'newEventGeneralPublic': new FormControl('')
    });

    this.editEventForm = this.formBuilder.group({
      'existingEventId': new FormControl('', Validators.required),
      'existingEventName': new FormControl('', Validators.required),
      'existingEventDate': new FormControl('', Validators.required),
      'existingEventURL': new FormControl('', Validators.required),
      'existingEventGroup': new FormControl(''),
      'existingEventGeneralPublic': new FormControl('')
    });

    this.adminEventService.getAllEvents().subscribe((events: Event[]) => {
      this.events = events;
    });

    this.groupService.getAllGroups().subscribe((groups: Group[]) => {
      this.allGroups = [...groups];
      this.availableGroupsAfterFiltering = [...groups];
    });

    this.loginUser = this.userService.getUsername();
  }

  logout() {
    this.loginService.logout();
  }

  onAddNewEvent(event, newEventForm: FormGroup, overlay: OverlayPanel) {

    const newEvent = new EventUpdateDTO(
      null,
      newEventForm.value.newEventName,
      newEventForm.value.newEventDate,
      newEventForm.value.newEventURL,
      this.selectedGroup ? this.selectedGroup.id : null,
      newEventForm.value.newEventGeneralPublic);

    this.selectedGroup = null;

    this.adminEventService.createNewEvent(newEvent).subscribe((eventFromServer: Event) => {
      overlay.hide();

      newEvent.id = eventFromServer.id;
      this.events.push(eventFromServer);
      this.messageService.add({severity: 'info', summary: 'Anlegen erfolgreich', detail: 'Neues Event angelegt.'});
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Server-Fehler',
        detail: 'Neues Event konnte nicht gespeichert werden: \n' + error.message
      });
    }, () => {
      // Reset form. If that is not done, the form will contain the last input when opened again.
      newEventForm.reset();
    });
  }

  onEditEvent(editEventForm: FormGroup, event: Event) {
    this.displayEventEditDialog = true;
    this.selectedGroup = event.group;

    editEventForm.setValue({
      existingEventId: event.id,
      existingEventName: event.name,
      existingEventDate: event.datetime,
      existingEventURL: event.url,
      existingEventGroup: event.group ? event.group : 'none',
      existingEventGeneralPublic: event.generalPublic ? event.generalPublic : false
    });
  }

  onSaveEditedEvent($event: {}, editEventForm: FormGroup) {

    const newEvent = new EventUpdateDTO(
      editEventForm.value.existingEventId,
      editEventForm.value.existingEventName,
      editEventForm.value.existingEventDate,
      editEventForm.value.existingEventURL,
      this.selectedGroup ? this.selectedGroup.id : null,
      editEventForm.value.existingEventGeneralPublic);

    this.adminEventService.editEvent(newEvent).subscribe(() => {

      this.displayEventEditDialog = false;

      const changedEvent = this.events.find(g => g.id === newEvent.id);
      changedEvent.name = newEvent.name;
      changedEvent.datetime = newEvent.datetime;
      changedEvent.url = newEvent.url;
      changedEvent.generalPublic = newEvent.generalPublic;
      changedEvent.group = this.selectedGroup;
      this.selectedGroup = null;

      this.messageService.add({severity: 'info', summary: 'Änderung erfolgreich', detail: 'Event geändert.'});
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Server-Fehler',
        detail: 'Event konnte nicht gespeichert werden: \n' + error.message
      });
    });
  }

  onDeleteEvent(event: Event) {
    this.confirmationService.confirm({
      message: 'Event wirklich löschen? Achtung: Sie ist dann wirklich, wirklich weg!',
      accept: () => {
        this.adminEventService.deleteEvent(event).subscribe(() => {

          const deletedEvent = this.events.find(g => g.id === event.id);
          this.events.splice(this.events.indexOf(deletedEvent), 1);

          this.messageService.add({severity: 'info', summary: 'Löschen erfolgreich', detail: 'Event gelöscht.'});
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Server-Fehler',
            detail: 'Event konnte nicht gelöscht werden: \n' + error.message
          });
        });
      }
    });
  }

  search(event) {
    this.availableGroupsAfterFiltering =
      [...this.allGroups]
        .filter((group) => group.name.toLowerCase().includes(event.query.toLowerCase()));
  }

  selectGroup(selectedGroup: Group) {
    this.selectedGroup = selectedGroup;
  }
}
