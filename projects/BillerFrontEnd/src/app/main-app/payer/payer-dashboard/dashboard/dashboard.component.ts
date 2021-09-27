import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import { FAQsComponent } from '../../misc/faqs/faqs.component';
import { BillerService } from '../../../../service/biller-service/biller.service';
import { MyAccountsService } from '../../../../service/my-accounts service/my-accounts.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  capturedToken: any;
  brandTheme = '#0033A1';
  billerBaseColor1 = '#0d47a1';
  billerBaseColor = '#0033A1';
  display;
  booleanString = true;
  openBiller = [];
  // brandColor = `linear-gradient(to bottom, ${this.brandTheme}, ${this.billerBaseColor})`;
  checked2 = true;
  firstname;
  lastname;
  usertype;
  brand_color;
  viewType;
  notificationValue;
  dashboardType;
  brandColor;
  menuItem = [];
  loading: boolean;

  showDefaultLogo = true;
  showDefaultColor = true;
  billerLogo = '';
  billerName = '';
  send_invoice;

  menuItemMenu: any;

  dashboard = '';
  mypayers = '';
  myaccount = '';
  invoices = '';
  eslips = '';
  policies = '';
  reports = '';
  myteam = '';
  theOneColor = '';
  showPayerBillerButton = false;
  isCollapsed = false;
  inpSwitchVal: string;
  inpSwitchModel: boolean;
  biller: string;
  billerInsuranceFlag;
  policyGeneral;
  policyChckOff;
  closed_biller_type: string;

  constructor(
    private toastr: ToastrService,
    private routers: ActivatedRoute,
    public loginService: LoginService,
    private billerService: BillerService,
    private router: Router,

    private myaccountsService: MyAccountsService,
    private modalService: NzModalService,

  ) {
    this.inpSwitchVal = sessionStorage.getItem('notifyvalue');
    this.inpSwitchModel = this.inpSwitchVal == 'Y';
  }

  ngOnInit() {
    // sessionStorage.setItem("notifyvalue",notify);

    this.policyGeneral = sessionStorage.getItem('general');
    this.policyChckOff = sessionStorage.getItem('check-off');


    this.billerInsuranceFlag =  sessionStorage.getItem('biller_code');
    this.biller = sessionStorage.getItem('biller-type').toLowerCase();
    this.closed_biller_type = sessionStorage.getItem('closed_biller_type');
    if (sessionStorage.getItem('notifyvalue') === 'Y') {
      this.checked2 = true;
    } else if (sessionStorage.getItem('notifyvalue') === 'N') {
      this.checked2 = false;
    }

    this.myaccountsService.cast.subscribe(user => {
      this.firstname = user;
    });

    if (sessionStorage.getItem('switch') === 'render payer') {
      this.showPayerBillerButton = true;
    } else {
      this.showPayerBillerButton = false;
    }
    this.myaccountsService.fetchUpdateProfile.subscribe(value => {
      this.getPayerProfile();
    });
    sessionStorage.setItem('brand_theme', this.brandTheme);
    this.billerName = sessionStorage.getItem('biller-alias');

    // menus
    this.dashboard = sessionStorage.getItem('DashBoard');
    this.mypayers = sessionStorage.getItem('My_Payers');
    this.myaccount = sessionStorage.getItem('My_Account');
    this.invoices = sessionStorage.getItem('Invoices');
    this.eslips = sessionStorage.getItem('Eslip');
    this.reports = sessionStorage.getItem('Reports');
    this.myteam = sessionStorage.getItem('My_Team');
    this.policies = sessionStorage.getItem('Policies');


  }


  // user idle
  getPayerProfile() {
    this.loading = true;
    const payload = {};

    this.loginService.payerProfile(payload).subscribe((response: any) => {
      this.loading = false;

      this.dashboardType = response[0].user_type;

      this.loginService.testPercentage = response[0].test_invoice;
      this.loginService.brandLogoPercentage = response[0].base64Logo;
      this.loginService.brandThemePercentage = response[0].brand_theme;
      // session storage
      sessionStorage.setItem('firstName', response[0].personel_f_name);
      this.firstname = response[0].personel_f_name;

      this.loginService.FirstName = response[0].personel_f_name;

      this.billerBaseColor = response[0].brand_theme;
      sessionStorage.setItem('base_color', response[0].brand_theme);

      this.lastname = response[0].personel_l_name;
      this.loginService.LastName = response[0].personel_l_name;
      this.usertype = response[0].user_type;
      this.loginService.emailprofile = response[0].email;
      sessionStorage.setItem('company_name', response[0].company_name);
      this.loginService.CompanyName = response[0].company_name;
      this.viewType = this.usertype;
      this.send_invoice = response[0].test_invoice;
      sessionStorage.setItem('name', this.firstname);

      sessionStorage.setItem('upgrade-to-biller', response[0].status);

      sessionStorage.setItem('billerPhone', response[0].biller_phone);

      if (!sessionStorage.getItem('biller_code')) {
        this.loginService.brand_color = this.billerBaseColor1;
      } else {
        this.loginService.brand_color = sessionStorage.getItem('biller-color');

        setTimeout(() => {
          this.billerLogo = sessionStorage.getItem('biller-logo');
          this.showDefaultLogo = false;
        }, 500);
      }

      if (this.send_invoice === '1') {
        this.loginService.sendInvoicePercent = 100;
      } else {
        this.loginService.sendInvoicePercent = 0;
      }
    }),
      (err: any) => {
        this.loading = false;
      };

    if (
      sessionStorage.getItem('user-type') === 'payer' &&
      sessionStorage.getItem('upgrade-to-biller') == 'pending'
    ) {
      this.billerService.upgradeToBiller = false;
    }
  }

  /**
   * @description: logout the user from the system
   */
  logout() {
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }

  /**
   * @description: FAQ,s  pop up menu
   */
  popFAQs() {
    // const dialogRef = this.dialog.open(FAQsComponent, {
    //   width: '70vw',
    //   data: { name: 'this.name' }
    // });
    this.modalService.create({
      nzTitle: 'Ebiller FAQS',
      nzContent: FAQsComponent,
      nzFooter: null,
      nzWidth: '1200'
    });
  }

  /**
   * @description::  change the biller
   */
  changeBiller() {
    this.router.navigate(['app/view-billers']);
  }

  // calling the change password function
  myProfile() {
    this.router.navigate(['app/dashboard/my-profile']);
  }

  /**
   * @description:: define menu items
   */

  changeToBiller() {
    sessionStorage.setItem('user-type', 'biller');
    this.router.navigate(['/biller/dashboard']);
  }

  switchNotification() {
    if (this.checked2 === true) {
      this.notificationValue = 'Y';
    } else if (this.checked2 === false) {
      this.notificationValue = 'N';
    }

    const payload = {
      biller_code: sessionStorage.getItem('biller_code'),
      notif_value: this.notificationValue
    };

    this.loginService.updateNotificationSettings(payload).subscribe(
      (response: any) => {
        if (response.messageCode === '00') {
          this.loginService.emailNotification.next(true);

          this.toastr.success(response.message, 'Success');
        } else if (response.messageCode === '02') {
          this.toastr.warning(response.message, 'Warning');
        } else if (response.messageCode === '06') {
          this.toastr.warning(response.message, 'Warning');
        }
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error('There is no Server Connectioin !');
      }
    );
  }
}
