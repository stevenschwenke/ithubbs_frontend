import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Event} from './event';
import {map} from 'rxjs/operators';
import {Group} from './group';
import {GroupService} from '../admin/shared/group.service';
import {EventStatistics} from './EventStatistics';

@Injectable()
export class EventService {

  private eventUrl = environment.eventsUrl;

  constructor(private http: HttpClient,
              private groupService: GroupService) {
  }

  /**
   * Retrieves current events, not including events in the past.
   */
  getAllCurrentEvents() {
    return this.http.get<EventListData>(this.eventUrl).pipe(map(x => {

      const events: Event[] = x._embedded ? x._embedded.eventModelList : [];

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

      return events;
    }));
  }

  getEventStatistics() {
    return this.http.get<EventStatistics>(this.eventUrl + '/statistics');
  }
}

interface EventListData {
  _embedded: EventModelList;
}

interface EventModelList {
  eventModelList: Event[];
}
