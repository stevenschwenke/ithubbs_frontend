import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Event} from '../../shared/event';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AdminEventService {

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves all events, including events in the past.
   */
  getAllEvents() {
    return this.http.get<EventListData>(environment.adminEventsUrl).pipe(map(x => {
      return x._embedded.eventModelList;
    }));
  }

  createNewEvent(newEvent: Event): Observable<Event> {
    return this.http.post<Event>(environment.adminEventsUrl, newEvent);
  }

  editEvent(newEvent: Event): Observable<Event> {
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
