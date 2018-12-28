import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminEventsComponent} from './events/admin-events.component';
import {LoginMaskComponent} from './login-mask/login-mask.component';
import {FormsModule} from '@angular/forms';
import {AdminEventService} from './shared/admin.event.service';
import { AdminGroupsComponent } from './groups/admin-groups.component';
import {AdminGroupService} from './shared/admin.group.service';

@NgModule({
  declarations: [
    AdminEventsComponent,
    LoginMaskComponent,
    AdminGroupsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  providers: [
    AdminEventService,
    AdminGroupService
  ]
})
export class AdminModule { }
