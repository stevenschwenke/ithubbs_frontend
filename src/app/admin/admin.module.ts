import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminEventsComponent} from './events/admin-events.component';
import {LoginMaskComponent} from './login-mask/login-mask.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminEventService} from './shared/admin.event.service';
import {AdminGroupsComponent} from './groups/admin-groups.component';
import {AdminGroupService} from './shared/admin.group.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  AutoCompleteModule,
  CalendarModule,
  CheckboxModule,
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule,
  FileUploadModule,
  MessageModule,
  MessageService,
  OverlayPanelModule,
  TooltipModule
} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminEventsComponent,
    LoginMaskComponent,
    AdminGroupsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessageModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AdminRoutingModule,
    OverlayPanelModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
    FileUploadModule,
    CheckboxModule,
    TooltipModule,
    AutoCompleteModule,
    SharedModule
  ],
  providers: [
    AdminEventService,
    AdminGroupService,
    MessageService,
    ConfirmationService
  ]
})
export class AdminModule { }
