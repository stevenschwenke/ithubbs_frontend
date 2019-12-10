import {BrowserModule} from '@angular/platform-browser';
import {Injector, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CurrentCampaignsComponent} from './current-campaigns/current-campaigns.component';
import {CurrentEverythingComponent} from './current-everything/current-everything.component';
import {ImprintComponent} from './imprint/imprint.component';
import {JourFixesComponent} from './jour-fixes/jour-fixes.component';
import {LocalGroupsComponent} from './local-groups/local-groups.component';
import {MissionStatementComponent} from './mission-statement/mission-statement.component';
import {UpcomingEventsComponent} from './upcoming-events/upcoming-events.component';
import {FooterComponent} from './footer/footer.component';
import {UsageComponent} from './usage/usage.component';
import {CollapseModule} from 'ngx-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EventService} from './shared/event.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LocalStorageService, Ng2Webstorage, SessionStorageService} from 'ngx-webstorage';
import {AuthInterceptor} from './blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {LoginMaskInterceptor} from './blocks/interceptor/login-mask.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import {ConferenceComponent} from './conference/conference.component';

import localeDE from '@angular/common/locales/de';
import {AssociationComponent} from './association/association.component';
import {GroupService} from './admin/shared/group.service';

registerLocaleData(localeDE);

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
    UpcomingEventsComponent,
    FooterComponent,
    ConferenceComponent,
    AssociationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
    Ng2Webstorage.forRoot({prefix: 'ithubbs', separator: '-'})
  ],
  providers: [
    EventService,
    GroupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [LocalStorageService, SessionStorageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Injector]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginMaskInterceptor,
      multi: true,
      deps: [Injector]
    },
    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
