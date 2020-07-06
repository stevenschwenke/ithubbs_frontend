import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Group} from '../../shared/group';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GroupStatistics} from '../../shared/GroupStatistics';

@Injectable()
export class GroupService {


  constructor(private http: HttpClient) {
  }

  getAllGroups() {
    return this.http.get<GroupListData>(environment.groupsUrl).pipe(map(x => {
      return x._embedded ? x._embedded.groupModelList : [];
    }));
  }

  getGroup(uri: string): Observable<Group> {
    return this.http.get<Group >(uri);
  }

  getGroupStatistics() {
    return this.http.get<GroupStatistics>(environment.groupsUrl + '/statistics');
  }
}

interface GroupListData {
  _embedded: GroupModelList;
}

interface GroupModelList {
  groupModelList: Group[];
}
