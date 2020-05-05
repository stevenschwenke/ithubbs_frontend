import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Event} from '../../shared/event';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {EventUpdateDTO} from '../../shared/eventUpdateDTO';
import {Group} from '../../shared/group';
import {GroupService} from './group.service';

@Injectable()
export class AdminEventService {

  constructor(private http: HttpClient,
              private groupService: GroupService) {
  }

  /**
   * Retrieves all events, including events in the past.
   */
  getAllEvents() {
    return this.http.get<EventListData>(environment.adminEventsUrl).pipe(map(x => {
      return x._embedded ? x._embedded.eventModelList : [];
    }));
  }

  createNewEvent(newEvent: EventUpdateDTO): Observable<Event> {

    return this.http.post<Event>(environment.adminEventsUrl, newEvent).pipe(

      switchMap(eventFromServer => {

        const groupLink = eventFromServer._links.group;
        if (groupLink) {
          this.groupService.getGroup(groupLink.href).subscribe((group: Group) => {
            eventFromServer.group = group;
          });
        }

        return of(eventFromServer);
      })
    );
  }

  editEvent(newEvent: EventUpdateDTO): Observable<Event> {
    return this.http.post<Event>(environment.adminEventsUrl, newEvent);
  }

  deleteEvent(event: Event): Observable<Event> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: event.id
      }
    };
    return this.http.delete<Event>(environment.adminEventsUrl, options);
  }
}

interface EventListData {
  _embedded: EventModelList;
}

interface EventModelList {
  eventModelList: Event[];
}
