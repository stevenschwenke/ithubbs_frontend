import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminEventsComponent} from './events/admin-events.component';

const routes: Routes = [
  { path: '', component: AdminEventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
