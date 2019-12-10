// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  authenticateUrl: 'http://localhost:8090/ithubbs/api/authenticate',

  adminUrl: 'http://localhost:8090/ithubbs/api/admin',
  adminEventsUrl: 'http://localhost:8090/ithubbs/api/admin/events',
  adminGroupsUrl: 'http://localhost:8090/ithubbs/api/admin/groups',
  groupsUrl: 'http://localhost:8090/ithubbs/api/groups',

  eventsUrl: 'http://localhost:8090/ithubbs/api/events'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
