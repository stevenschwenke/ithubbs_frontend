import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Event} from './event';
import {map} from 'rxjs/operators';

@Injectable()
export class EventService {

  private eventUrl = environment.eventsUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves current events, not including events in the past.
   */
  getAllCurrentEvents() {
    return this.http.get<EventListData>(this.eventUrl).pipe(map(x => {
      return x._embedded ? x._embedded.eventModelList : [];
    }));
  }

}

interface EventListData {
  _embedded: EventModelList;
}

interface EventModelList {
  eventModelList: Event[];
}
