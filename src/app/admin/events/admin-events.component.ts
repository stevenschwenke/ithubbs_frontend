import { Component, OnInit } from '@angular/core';
import {AdminEventService} from '../shared/admin.event.service';

@Component({
  selector: 'app-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  constructor(private adminEventService: AdminEventService) { }

  events: Event[];

  ngOnInit() {
    this.adminEventService.getAllIdeas().subscribe((events) => {
      this.events = events;
    });
  }

}
