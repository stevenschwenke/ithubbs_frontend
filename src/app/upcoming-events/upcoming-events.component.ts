import {Component, OnInit} from '@angular/core';
import {EventService} from '../shared/event.service';
import {Event} from '../shared/event';
import {GroupService} from '../admin/shared/group.service';
import {Group} from '../shared/group';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styles: []
})
export class UpcomingEventsComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService, private groupService: GroupService) {
  }

  ngOnInit() {
    this.eventService.getAllCurrentEvents().subscribe((events: Event[]) => {
      events.every(event => {
        const seconds: number = <number> (<unknown> event.datetime);
        const date = new Date();
        date.setTime(seconds * 1000);
        event.datetime = date;

        const groupLink = event._links.group;
        if (groupLink) {
          this.groupService.getGroup(groupLink.href).subscribe((group: Group) => {
            event.group = group;
          });
        }

        return true;
      });
      this.events = events;
    });
  }

}
