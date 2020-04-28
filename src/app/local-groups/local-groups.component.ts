import {Component, OnInit} from '@angular/core';
import {Group} from '../shared/group';
import {GroupService} from '../admin/shared/group.service';

@Component({
  selector: 'app-local-groups',
  templateUrl: './local-groups.component.html',
  styles: []
})
export class LocalGroupsComponent implements OnInit {

  groups: Group[];

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.groupService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
      this.groups.forEach(group => {
        const imageLink = group._links.image;
        if (imageLink) {
          group.extractedImageURI = imageLink.href;
        }
        return  group;
      });

    });
  }

}
