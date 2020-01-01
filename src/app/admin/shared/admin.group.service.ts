import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Group} from '../../shared/group';
import {Observable} from 'rxjs';

@Injectable()
export class AdminGroupService {


  constructor(private http: HttpClient) {
  }

  getAllGroups() {
    return this.http.get<Group[]>(environment.groupsUrl);
  }

  createNewGroup(newGroup: Group): Observable<Group> {
    return this.http.post<Group>(environment.adminGroupsUrl, newGroup);
  }

  postNewLogo(groupId: number, logo: File): Observable<object> {
    const formData = new FormData();
    formData.append('groupID', groupId + '');
    formData.append('file', logo);

    return this.http.post<object>(environment.adminGroupsUrl + '/logo', formData);
  }

  editGroup(newGroup: Group): Observable<Group> {
    return this.http.post<Group>(environment.adminGroupsUrl + '/edit', newGroup);
  }

  deleteGroup(group: Group): Observable<Group> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: group.id
      }
    };
    return this.http.delete<Group>(environment.adminGroupsUrl + '/delete', options);
  }

}
