import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../bank/home-page/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuardService {

  constructor(
    private _authService: LoginService,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {


    if (sessionStorage.getItem('Billers')) {

      this._router.navigate(['/admin/billers']);

    } else if (sessionStorage.getItem('Payers')) {

      this._router.navigate(['/admin/payers']);

    } else if ( sessionStorage.getItem('DashBoard')) {

      this._router.navigate(['/admin']);

    } else if (sessionStorage.getItem('My_Account')) {

      this._router.navigate(['/admin/viewAccounts']);

    } else if (sessionStorage.getItem('Invoices')) {

      this._router.navigate(['/']);

    } else if (sessionStorage.getItem('eslips')) {

      this._router.navigate(['/admin/pay-on-behalf']);

    } else if (sessionStorage.getItem('Reports')) {

      this._router.navigate(['/admin/reports']);

    } else if (sessionStorage.getItem('My_Team')) {

      this._router.navigate(['/admin/my-team']);

    } else if (sessionStorage.getItem('My_Team')) {

      this._router.navigate(['/admin/service-charge']);

    } else {

      // this._router.navigate(['/']);
    }


    return false;

  }


    // navigate to login page
    this._router.navigate(['/']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
