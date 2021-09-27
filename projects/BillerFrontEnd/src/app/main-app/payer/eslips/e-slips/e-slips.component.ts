import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login.service';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { MyAccountsService } from '../../../../service/my-accounts service/my-accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-e-slips',
  templateUrl: './e-slips.component.html',
  styleUrls: ['./e-slips.component.css']
})
export class ESlipsComponent implements OnInit {
  value = 'KPLC201900008914';



  pdfSrc;
  eslip_date;
  expiry_date;
  eslip_amount;
  account_number;
  eslip_no;
  createdBy;
  biller_logo;
  mpesaDisplay = false;
  alias: any;
  billerPrefix: any;
  paybill: any;
  company_name: any;
  accn_number;
  accn_amount;
  accountDetails = [];
  loading = true;
  email: any;
  website: any;
  customer_care: any;
  client_name: any;
  biller_phone: any;
  status: any;



  constructor(
    private router: Router,
    private eslipService: LoginService,
    private myaccountsService: MyAccountsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getEslipInfo();
    this.biller_logo = sessionStorage.getItem('biller-logo');
    this.loading = true;

    this.alias =  sessionStorage.getItem('biller-alias');
    this.company_name = sessionStorage.getItem('company_name');

  }

  /**
   * @description::  close the view get the user back
   */
  closeView() {

    this.router.navigate(['/app/dashboard/generated-e-slip']);
  }

  getEslipInfo() {
    this.loading = true;
    const truncatedArr = [];
    const payload = {
      eslip_no: sessionStorage.getItem('slip_no')
    };

    this.eslipService.getEslipInfo(payload).subscribe((response: any) => {
      this.loading = false;

      this.pdfSrc = response.path;
      this.account_number = response.account_no;

      this.eslip_no = response.eslip_no;
      this.createdBy = response.created_by;
      this.expiry_date = response.expiry_date;
      this.eslip_amount = response.amount_to_pay;
      this.eslip_date = response.eslip_date;
      this.value = sessionStorage.getItem('slip_no');
      this.email = response.email;
      this.website = response.company_website;
      this.biller_phone = response.biller_phone;
      this.status = response.status.toLowerCase();
      this.customer_care = response.company_customer_care;
      this.client_name = response.client_name;
      this.paybill = response.paybill;
      this.billerPrefix = response.prefix;

      if (this.eslip_amount <= 70000) {
        this.mpesaDisplay = true;
      }
      response.accountDetails;

      if (response.accountDetails.length > 9) {
        this.accountDetails = response.accountDetails.slice(0, 10);


        this.accn_amount = response.accountDetails[0].accountAmount;
        this.accn_number = response.accountDetails[0].accountNo;
      } else {
        this.accountDetails = response.accountDetails;
        this.accn_amount = response.accountDetails[0].accountAmount;
        this.accn_number = response.accountDetails[0].accountNo;
      }
    }),
      (err: any) => {

      };
  }
  downloadEslip() {
    this.loading = true;
    const mediaType = 'application/pdf';
    const payload = {
      eslip_no: sessionStorage.getItem('slip_no')
    };

    this.myaccountsService.downloadEslip(payload).subscribe(
      (response: any) => {
        this.loading = false;

        const blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'Eslip.pdf');
      },
      (err: any) => {

      }
    );
  }
}
