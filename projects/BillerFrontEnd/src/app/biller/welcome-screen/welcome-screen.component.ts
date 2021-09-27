import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';
// import { BillerService } from "../../service/biller-service/biller.service";
import { NzModalService } from 'ng-zorro-antd/modal';
import { TestInvoiceComponent } from '../invoices/test-invoice/test-invoice.component';
import { CommissionSettingsComponent } from '../commission-settings/commission-settings.component';
import { CurrencyManagementComponent } from '../currency-management/currency-management.component';
import { InvoiceMappingComponent } from '../dashboard/invoice/invoice-map/invoice-mapping/invoice-mapping.component';
// import { BillerService } from "../../service/biller-service/biller.service";
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { BillerService } from '../services/biller-service/biller.service';
import { UserProfileService } from '../../service/user-profile.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {
  capturedToken: any;
  firstname;
  lastname;
  sendinvoicePercent;
  send_invoice;
  brandPercent;
  companyProfile;
  brandColorTest;
  brandLogoTest;
  billerType;
  brandTheme = '#3D64A0';

  congartulations: boolean;

  testInvoicePercent;
  constructor(
    private router: Router,
    public loginService: LoginService,
    private billerService: BillerService,
    private modalService: NzModalService,
    private profileService: UserProfileService
  ) {
    this.getPayerProfile();

    this.billerType = sessionStorage.getItem('biller-type').toLowerCase();
  }

  ngOnInit() {
    this.billerService.fetchInvoiceUpdateSubject.subscribe(value => {

      this.getPayerProfile();

    });
  }

  /*
  @description: route customer to customization page
  */
  customizeLook(): void {
    this.router.navigate(['/biller/customize-invoice']);
  }

  sendTestInvoice(): void {
    this.modalService.create({
      nzTitle: '<i>Send Test Invoice</i>',
      nzContent: TestInvoiceComponent,
      nzWidth: '70%',
      nzFooter: null
    });
  }

  skipCustomization() {
    this.router.navigate(['/biller/customer-dashboard']);
  }

  setUpCommisions() {
    this.modalService.create({
      nzTitle: 'Set Up Commisions',
      nzContent: CommissionSettingsComponent,
      nzWidth: '60%',
      nzFooter: null
    });
  }

  mapInvoice() {
    this.modalService.create({
      nzTitle: 'Invoice Columns',
      nzContent: InvoiceMappingComponent,
      nzWidth: '60%',
      nzFooter: null
    });
  }
  //  getting the name of the payer
  getPayerProfile() {
    const payload = {};

    this.loginService.payerProfile(payload).subscribe(response => {
      this.send_invoice = response[0].test_invoice;
      this.profileService.brandImage = response[0].base64Logo;
      if (response[0].base64Logo !== null) {
        this.profileService.defaultLogo = false;
       }
      this.profileService.brandColor = response[0].brand_theme;
      this.profileService.dashboardColor = `linear-gradient(to bottom, ${this.brandTheme}, ${this.profileService.brandColor})`;
      this.firstname = response[0].personel_f_name;
      this.lastname = response[0].personel_l_name;

      this.loginService.companyPercentage = parseInt(
        response[0].companypercentage,
        10
      );

      this.loginService.brandPercentage = parseInt(
        response[0].brandpercentage,
        10
      );
      this.loginService.commissionPercentage = parseInt(
        response[0].commission_percentage
      );
      this.loginService.forexPercentage = parseInt(
        response[0].forex_percentage,
        10
      );

      if (this.send_invoice === '1') {
        this.loginService.sendInvoicePercent = 100;

      } else {
        this.loginService.sendInvoicePercent = 0;
      }
    }),
      (err: any) => { };
  }

  setUpForex() {
    this.modalService.create({
      nzTitle: 'Forex Management',
      nzContent: CurrencyManagementComponent,
      nzWidth: '70%',
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  congratulations() {
    console.log('modal is triggered.');
    this.modalService.create({
      nzContent: CongratulationsComponent,
      nzWidth: '70%',
      nzFooter: null,
      nzMaskClosable: true
    });
  }
}
