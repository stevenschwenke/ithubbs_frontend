import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {CurrentCampaignsComponent} from './current-campaigns/current-campaigns.component';
import {CampaignsComponent} from './campaigns/campaigns.component';
import {CurrentEverythingComponent} from './current-everything/current-everything.component';
import {LocalGroupsComponent} from './local-groups/local-groups.component';
import {ImprintComponent} from './imprint/imprint.component';
import {UsageComponent} from './usage/usage.component';
import {JourFixesComponent} from './jour-fixes/jour-fixes.component';
import {MissionStatementComponent} from './mission-statement/mission-statement.component';
import {RegionalConferencesComponent} from './regional-conferences/regional-conferences.component';
import {UpcomingEventsComponent} from './upcoming-events/upcoming-events.component';
import {EventsComponent} from './events/events.component';
import {ParticipateComponent} from './participate/participate.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {CollapseModule} from 'ngx-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserModule,
        CollapseModule.forRoot(),
        AppRoutingModule,
        FontAwesomeModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        CurrentCampaignsComponent,
        CampaignsComponent,
        CurrentEverythingComponent,
        LocalGroupsComponent,
        ImprintComponent,
        UsageComponent,
        JourFixesComponent,
        MissionStatementComponent,
        ParticipateComponent,
        RegionalConferencesComponent,
        UpcomingEventsComponent,
        EventsComponent,
        FooterComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
