import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';

import { BillerService } from '../services/biller-service/biller.service';
import { UserService } from '../services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd';
import { CurrencyManagementComponent } from '../currency-management/currency-management.component';
import { UserProfileService } from '../../service/user-profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  brandTheme = '#3D64A0';
  billerBaseColor;
  brandColor;
  biller_type;
  loading;
  billerLogo = '';
  billerName = '';
  showDefaultLogo = true;
  firstname: any;
  lastname: any;
  switchPayerFlag = '';
  currencySettings;
  isCollapsed = false;
  closed_biller_type: string;
  logo: string;
  checkoff;
  general;

  constructor(

    private toastr: ToastrService,
    public billerService: BillerService,
    private modalService: NzModalService,
    private router: Router,
    private userService: UserService,
    public profileService: UserProfileService
  ) {}

  ngOnInit() {
    this.biller_type = sessionStorage.getItem('biller-type').toLowerCase();
    this.closed_biller_type = sessionStorage.getItem('closed_biller_type');
    this.checkoff  =  sessionStorage.getItem('check-off');
    this.general =  sessionStorage.getItem('general');
    this.billerService.fetchInvoicesUpdateSubject.subscribe((value) => {
      this.getBillerProfile();
    });

    this.userService.cast.subscribe((user) => {
      this.firstname = user;
    });
    this.getBillerProfile();
  }

  // profile
  getBillerProfile() {
    this.loading = true;
    const payload = {};

    this.billerService.getBillerProfile(payload).subscribe((response: any) => {
      this.loading = false;
      this.profileService.brandColor = response[0].brand_theme;
      this.logo = response[0].base64Logo;
      this.profileService.brandImage = response[0].base64Logo;
    //  console.log(response[0].base64Logo.length);
     if (response[0].base64Logo !== null) {
      this.profileService.defaultLogo = false;
     }
      sessionStorage.setItem('base_color', response[0].brand_theme);
      sessionStorage.setItem('firstname', response[0].personel_f_name);
      sessionStorage.setItem('lastname', response[0].personel_l_name);
      sessionStorage.setItem('email', response[0].email);
      sessionStorage.setItem('companyname', response[0].company_name);
      sessionStorage.setItem('billertype', response[0].biller_type);
      sessionStorage.setItem('alias', response[0].alias);
      sessionStorage.setItem('paybill', response[0].paybill);
      sessionStorage.setItem('phone', response[0].biller_phone);
      sessionStorage.setItem('logo', response[0].base64Logo);

      this.currencySettings = response[0].forex_value;

      this.firstname = response[0].personel_f_name;
      this.lastname = response[0].personel_l_name;
      this.billerName = response[0].alias;
      this.biller_type = sessionStorage.getItem('billertype').toLowerCase();



      this.profileService.dashboardColor = `linear-gradient(to bottom, ${this.brandTheme}, ${this.profileService.brandColor})`;
      sessionStorage.setItem('biller-color', this.profileService.dashboardColor);

      if (!sessionStorage.getItem('comp_code')) {
        this.profileService.dashboardColor = `linear-gradient(to bottom, ${this.brandTheme}, ${this.profileService.brandColor})`;
      } else {
        this.profileService.dashboardColor = sessionStorage.getItem('biller-color');

        setTimeout(() => {
          this.billerLogo = response[0].base64Logo;
          this.showDefaultLogo = false;
        }, 500);
      }

      if (this.currencySettings === '0' && this.biller_type === 'closed') {
        // this.resetCurrency();
      }
    });
  }

  /**
   * @description: logout the user from the system
   */
  logout() {
    this.router.navigate(['/']);
    this.toastr.success('You have logged out successfully.');
    sessionStorage.clear();
  }

  switchToPayer() {
    this.switchPayerFlag = 'render payer';
    sessionStorage.setItem('user-type', 'payer');
    sessionStorage.setItem('switch', this.switchPayerFlag);
    sessionStorage.getItem('comp_code');
    sessionStorage.getItem('biller-type');
    this.router.navigate(['/app/view-billers']);
  }

  myProfile() {
    this.router.navigate(['biller/my-profile']);
  }

  settings() {
    this.router.navigate(['biller/dashboard/welcome-screen']);
  }
  changePassword() {}

  billerSettings() {
    this.router.navigate(['biller/dashboard/settings']);
  }

  billerSettings2() {
    this.router.navigate(['biller/dashboard/welcome-screen']);
  }

  welcomeScreen() {
    this.router.navigate(['biller/dashboard/welcome-screen']);
  }

  customizeLook(): void {
    this.router.navigate(['/biller/customize-invoice']);
  }

  resetCurrency() {
    this.modalService.create({
      nzTitle: 'Forex Management',
      nzContent: CurrencyManagementComponent,
      nzWidth: '70%',
      nzFooter: null,
      nzMaskClosable: false,
    });
  }
}
