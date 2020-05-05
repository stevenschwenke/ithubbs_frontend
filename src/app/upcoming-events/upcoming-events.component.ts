import {Component, OnInit} from '@angular/core';
import {EventService} from '../shared/event.service';
import {Event} from '../shared/event';
import {GroupService} from '../admin/shared/group.service';

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
      this.events = events;
    });
  }

}
