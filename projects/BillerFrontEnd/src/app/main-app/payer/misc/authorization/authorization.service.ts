import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor() {}

  isAuthorized(allowedRoles: any): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    const access = JSON.parse(sessionStorage.getItem('access'));
    // const allowed = JSON.parse(allowedRoles);
    // const access = sessionStorage.getItem('access');
    const allowed = allowedRoles;
    // const allowed = allowedRoles;



    return access.includes(allowedRoles[0]);
    // for (let i in access) {
    //   for (let j in allowed) {
    //     if (access[i] === allowed[j]) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // }
  }
}
