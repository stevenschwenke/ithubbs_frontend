import {Component, OnInit} from '@angular/core';
import {EventService} from '../shared/event.service';
import {Event} from '../shared/event';
import {EventStatistics} from '../shared/EventStatistics';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {

  events: Event[];
  eventStatistics: EventStatistics;
  years: number[];

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getAllCurrentEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
    this.eventService.getEventStatistics().subscribe(eventStatistics => {
      this.eventStatistics = eventStatistics;
    });
    this.eventService.getEventYears().subscribe((years: number[]) => {
      this.years = years;
    });
  }

  selectYear(year: number) {
    if (year !== 0) {
      this.eventService.getEventsOfYear(year).subscribe((events: Event[]) => {
        this.events = events;
      });
    } else {
      this.eventService.getAllCurrentEvents().subscribe((events: Event[]) => {
        this.events = events;
      });
    }
  }
}
