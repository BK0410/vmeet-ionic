// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientId: '8b800a53-c972-469b-9c01-59eebee31936',
    authorization_user_agent:'WEBVIEW',
    redirectUri: 'http://localhost:8100',
    postLogoutRedirectUri: 'http://localhost:8100',
    authority: 'https://login.microsoftonline.com/',
    tenantId: '7f7268a4-7179-4a42-9837-40255b1c21e5',
    scope: [
      'user.read',
      'mail.send',
      'calendars.readwrite',
      'user.readbasic.all',
      'people.read',
    ],
    navigateToLoginRequestUrl: true,
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
  apiUrl: 'http://localhost:8080/api',
  graphApiUrl: 'https://graph.microsoft.com/v1.0',
  graphApiBetaUrl: 'https://graph.microsoft.com/beta',
  cryptoJSSecret: 'cryptoJSSecret-vmeet',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
