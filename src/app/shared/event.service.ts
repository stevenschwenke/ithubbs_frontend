import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Event} from './event';

@Injectable()
export class EventService {

  private eventUrl = environment.eventsUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves current events, not including events in the past.
   */
  getAllCurrentEvents() {
    return this.http.get<Event[]>(this.eventUrl);
  }

}
