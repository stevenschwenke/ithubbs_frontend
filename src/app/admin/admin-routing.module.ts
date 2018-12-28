import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminEventsComponent} from './events/admin-events.component';
import {LoginMaskComponent} from './login-mask/login-mask.component';
import {AdminGroupsComponent} from './groups/admin-groups.component';

const routes: Routes = [

  { path: '', component: AdminEventsComponent},
  { path: 'login', component: LoginMaskComponent},
  { path: 'events', component: AdminEventsComponent},
  { path: 'groups', component: AdminGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
