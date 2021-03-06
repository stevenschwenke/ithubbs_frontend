// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  authenticateUrl: 'https://ithubbstestbackend.cfapps.io/ithubbs/api/authenticate',

  adminUrl: 'https://ithubbstestbackend.cfapps.io/ithubbs/api/admin',
  adminEventsUrl: 'https://ithubbstestbackend.cfapps.io/ithubbs/api/admin/events',
  adminGroupsUrl: 'https://ithubbstestbackend.cfapps.io/ithubbs/api/admin/groups',
  groupsUrl: 'https://ithubbstestbackend.cfapps.io/ithubbs/api/groups',

  eventsUrl: 'https://ithubbstestbackend.cfapps.io/ithubbs/api/events'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
