import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { AliasService } from 'projects/BillerFrontEnd/src/app/service/alias.service';
import { BillerIdService } from 'projects/BillerFrontEnd/src/app/service/billerId.service';
import { NotifyService } from 'projects/BillerFrontEnd/src/app/service/notify.service';
import { UserProfileService } from 'projects/BillerFrontEnd/src/app/service/user-profile.service';

@Component({
  selector: 'app-view-billers',
  templateUrl: './view-billers.component.html',
  styleUrls: ['./view-billers.component.css']
})
export class ViewBillersComponent implements OnInit {
  openbillers = [];
  openbillers2 = [];
  closedbillers = [];
  loading = false;
  brandTheme = '#0033A1';
  aliasValue;
  billerCodeValue;
  notifyValue = '';
  myaccount = '';
  closed_billers = [];
  testopenbiller = [];

  billerId = '';
  biller = '';
  alias = '';
  notify = '';
  closed_biller_type = '';
  billers = [];
  gridStyle = {
    width: '15%',
    textAlign: 'center'
  };
  constructor(
    private router: Router,
    private loginService: LoginService,
    private aliasService: AliasService,
    private notifyService: NotifyService,
    private billerIdService: BillerIdService,
    public profileService: UserProfileService
  ) { }

  ngOnInit() {
    this.myaccount = sessionStorage.getItem('My_Account');
    this.fetchBillers();
  }

  fetchBillers() {
    this.loginService.emailNotification.subscribe(value => {
      const payload = {};

      this.loading = true;
      this.loginService.viewBillers(payload).subscribe(
        (response: any) => {
          this.loading = false;

          this.billers = response.open_billers.concat(response.my_billers);
          console.log(this.billers);
          // let chuks = 1;
          // let payload = [];
          // let cpayload = [];
          // let counter = 1;
          // let ccounter = 1;
          // response.open_billers.forEach((value: any) => {
          //   this.loginService.notification = value.notif_value;
          //   this.notifyValue = value.notif_value;

          //   if (chuks < 4) {
          //     payload.push(value);
          //     if (counter === response.open_billers.length) {
          //       this.openbillers.push(payload);
          //     }

          //     chuks++;
          //   } else {
          //     payload.push(value);
          //     this.openbillers.push(payload);
          //     payload = [];

          //     chuks = 1;
          //   }

          //   counter++;

          //   this.billerCodeValue = value.billerCode;

          //   this.aliasValue = value.alias;
          // });

          // response.my_billers.forEach((value: any) => {
          //   if (value.biller_type == 'Closed') {
          //     this.closed_billers.push(value);
          //   }
          // });

          // this.closed_billers.forEach((value: any) => {
          //   if (chuks < 4) {
          //     cpayload.push(value);
          //     if (ccounter === this.closed_billers.length) {
          //       this.closedbillers.push(cpayload);
          //     }

          //     chuks++;
          //   } else {
          //     cpayload.push(value);
          //     this.closedbillers.push(cpayload);

          //     cpayload = [];
          //     chuks = 1;
          //   }

          //   ccounter++;

          //   this.billerCodeValue = value.billerCode;

          //   this.aliasValue = value.alias;
          // });

        },
      );


    });

  }

  closeView(): void {
    this.router.navigate(['/app/dashboard/customer-dashboard']);
  }

  billerPage(billerId: string, alias: string, notify: string, closed_biller_type: string): void {
    this.billerIdService.castBillerId.subscribe(
      billerId => (this.billerId = billerId)
    );
    this.aliasService.castAlias.subscribe(alias => (this.alias = alias));
    this.notifyService.castNotify.subscribe(notify => (this.notify = notify));
    this.aliasService.castClosedBillerType.subscribe(closed_biller_type => (this.closed_biller_type = closed_biller_type));
    this.loading = true;
    const payload = {
      biller_code: billerId
    };
    sessionStorage.setItem('closed_biller_type', closed_biller_type);
    sessionStorage.setItem('biller-alias', alias);
    sessionStorage.setItem('biller_code', billerId);
    sessionStorage.setItem('notifyvalue', notify);

    this.loginService.viewBillerProfile(payload).subscribe((response: any) => {
      this.loading = false;
      this.profileService.dashboardColor = `linear-gradient(to bottom, ${this.brandTheme}, ${response[0].invoiceColor})`;

      sessionStorage.setItem('biller-color', this.profileService.dashboardColor);
      sessionStorage.setItem('biller-logo', response[0].base64Logo);
      sessionStorage.setItem('biller-name', response[0].company_name);
      sessionStorage.setItem(
        'biller-type',
        response[0].biller_type.toLowerCase()
      );

      sessionStorage.setItem('rate', response[0].rate);
      sessionStorage.setItem('currency', response[0].currency);

      const loginValue = sessionStorage.getItem('loginvalue');
      const groupName = sessionStorage.getItem('name_group');
      const userType = sessionStorage.getItem('user-type');

      if (this.billerId !== '') {
        this.router.navigate(['/app/dashboard/invoices']);
      } else {
        if (groupName === 'SuperAdmin') {
          this.router.navigate(['/app/dashboard/view-my-accounts']);
        } else if (groupName !== 'SuperAdmin') {
          this.router.navigate(['/app/dashboard/customer-dashboard']);
        } else if (userType === 'payer') {
          this.router.navigate(['/app/dashboard/customer-dashboard']);
        } else {
          this.router.navigate(['app/dashboard/open-biller-admin']);
        }
      }
    });
  }
}
