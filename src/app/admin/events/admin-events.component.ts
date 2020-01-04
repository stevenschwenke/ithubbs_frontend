import {Component, OnInit} from '@angular/core';
import {AdminEventService} from '../shared/admin.event.service';
import {UserService} from '../shared/user.service';
import {LoginService} from '../core/login/login.service';
import {faEdit, faPlusSquare, faRadiation, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {OverlayPanel} from 'primeng/primeng';
import {Event} from '../../shared/event';

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

  constructor(private formBuilder: FormBuilder,
              private adminEventService: AdminEventService,
              private userService: UserService,
              private messageService: MessageService,
              private loginService: LoginService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {

    this.newEventForm = this.formBuilder.group({
      'newEventName': new FormControl('', Validators.required),
      'newEventDate': new FormControl('', Validators.required),
      'newEventURL': new FormControl('', Validators.required)
    });

    this.editEventForm = this.formBuilder.group({
      'existingEventId': new FormControl('', Validators.required),
      'existingEventName': new FormControl('', Validators.required),
      'existingEventDate': new FormControl('', Validators.required),
      'existingEventURL': new FormControl('', Validators.required)
    });

    this.adminEventService.getAllEvents().subscribe((events: Event[]) => {
      events.every(event => {
        const seconds: number = <number>(<unknown>event.datetime);
        const date = new Date();
        date.setTime(seconds * 1000);
        event.datetime = date;
        return true;
      });
      this.events = events;
    });
    this.loginUser = this.userService.getUsername();
  }

  logout() {
    this.loginService.logout();
  }


  onAddNewEvent(event, newEventForm: FormGroup, overlay: OverlayPanel) {

    const newEvent = new Event(
      newEventForm.value.newEventName,
      newEventForm.value.newEventDate,
      newEventForm.value.newEventURL);

    this.adminEventService.createNewEvent(newEvent).subscribe((eventFromServer: Event) => {
      overlay.hide();

      newEvent.id = eventFromServer.id;
      this.events.push(newEvent);
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

  onEditEvent($event: MouseEvent, overlayEditEvent: OverlayPanel, editEventForm: FormGroup, event: Event) {
    this.displayEventEditDialog = true;

    editEventForm.setValue({
      existingEventId: event.id,
      existingEventName: event.name,
      existingEventDate: event.datetime,
      existingEventURL: event.url
    });
  }

  onSaveEditedEvent($event: {}, editEventForm: FormGroup) {
    const newEvent = new Event(
      editEventForm.value.existingEventName,
      editEventForm.value.existingEventDate,
      editEventForm.value.existingEventURL);
    newEvent.id = editEventForm.value.existingEventId;

    this.adminEventService.editEvent(newEvent).subscribe(() => {

      this.displayEventEditDialog = false;

      const changedEvent = this.events.find(g => g.id === newEvent.id);
      changedEvent.name = newEvent.name;
      changedEvent.datetime = newEvent.datetime;
      changedEvent.url = newEvent.url;

      this.messageService.add({severity: 'info', summary: 'Änderung erfolgreich', detail: 'Event geändert.'});
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Server-Fehler',
        detail: 'Event konnte nicht gespeichert werden: \n' + error.message
      });
    });
  }

  onDeleteEvent($event: MouseEvent, overlayEditEvent: HTMLElement, editEventForm: FormGroup, event: Event) {
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
}
