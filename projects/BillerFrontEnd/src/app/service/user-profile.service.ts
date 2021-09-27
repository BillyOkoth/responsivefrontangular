import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  brandColor = this.loginService.brand_color;
  brandImage: any;
  dashboardColor: any;
  defaultLogo = true;

  constructor(private loginService: LoginService) {

  }
}
