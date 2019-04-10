import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class AdminEventService {

  private adminEventUrl = environment.adminEventsUrl;

  constructor(private http: HttpClient) {
  }

  getAllIdeas() {
    return this.http.get<Event[]>(this.adminEventUrl);
  }

}
