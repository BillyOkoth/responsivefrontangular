// / This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare const baseurl: any;
export const environment = {
  production: false,

  // baseurl: 'http://192.168.0.118:8080/api/v1/',
  // baseurl: 'http://66.42.61.192:8080/ebillerapi/api/v1/',

  //  baseurl: 'http://192.168.0.118:8080/api/v1/',
  // baseurl: "http://66.42.61.192:8080/ebillerapi/api/v1/"
  // baseurl: 'https://10.235.5.108/ebillerapi/ebillerapi/api/v1/',
  baseurl: baseurl
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
