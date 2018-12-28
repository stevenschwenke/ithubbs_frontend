import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Group} from '../../shared/group';

@Injectable()
export class AdminGroupService {

  private adminGroupsUrl = environment.adminGroupsUrl;

  constructor(private http: HttpClient) {
  }

  getAllGroups() {
    return this.http.get<Group[]>(this.adminGroupsUrl);
  }

}
