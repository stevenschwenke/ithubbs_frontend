import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CurrentCampaignsComponent} from './current-campaigns/current-campaigns.component';
import {CurrentEverythingComponent} from './current-everything/current-everything.component';
import {ImprintComponent} from './imprint/imprint.component';
import {JourFixesComponent} from './jour-fixes/jour-fixes.component';
import {LocalGroupsComponent} from './local-groups/local-groups.component';
import {MissionStatementComponent} from './mission-statement/mission-statement.component';
import {RegionalConferencesComponent} from './regional-conferences/regional-conferences.component';
import {UpcomingEventsComponent} from './upcoming-events/upcoming-events.component';
import {FooterComponent} from './footer/footer.component';
import {UsageComponent} from './usage/usage.component';
import {CollapseModule} from 'ngx-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EventService} from './shared/event.service';
import {HttpClientModule} from '@angular/common/http';
import {ConferenceComponent} from './conference/conference.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CurrentCampaignsComponent,
    CurrentEverythingComponent,
    LocalGroupsComponent,
    ImprintComponent,
    UsageComponent,
    JourFixesComponent,
    MissionStatementComponent,
    RegionalConferencesComponent,
    UpcomingEventsComponent,
    FooterComponent,
    ConferenceComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CollapseModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
