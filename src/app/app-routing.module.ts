import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ImprintComponent} from './imprint/imprint.component';
import {MissionStatementComponent} from './mission-statement/mission-statement.component';
import {JourFixesComponent} from './jour-fixes/jour-fixes.component';
import {LocalGroupsComponent} from './local-groups/local-groups.component';
import {CurrentEverythingComponent} from './current-everything/current-everything.component';
import {UsageComponent} from './usage/usage.component';
import {ConferenceComponent} from './conference/conference.component';
import {AssociationComponent} from './association/association.component';

const routes = [
  { path: '', component: CurrentEverythingComponent},
  { path: 'current', component: CurrentEverythingComponent},
  { path: 'conference', component: ConferenceComponent},
  { path: 'gruppen', component: LocalGroupsComponent},
  { path: 'orga', component: JourFixesComponent},
  { path: 'use', component: UsageComponent},
  { path: 'mission', component: MissionStatementComponent},
  { path: 'association', component: AssociationComponent},
  { path: 'impressum', component: ImprintComponent},
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
