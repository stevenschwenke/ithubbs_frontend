import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Group} from '../../shared/group';
import {Observable} from 'rxjs';

@Injectable()
export class GroupService {


  constructor(private http: HttpClient) {
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(environment.groupsUrl);
  }

  getGroup(uri: string): Observable<Group> {
    return this.http.get<Group >(uri);
  }
}
