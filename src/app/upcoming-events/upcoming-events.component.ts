import {Component, OnInit} from '@angular/core';
import {EventService} from '../shared/event.service';
import {Event} from '../shared/event';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styles: []
})
export class UpcomingEventsComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getAllIdeas().subscribe((events) => {
      this.events = events;
    });
  }

}
