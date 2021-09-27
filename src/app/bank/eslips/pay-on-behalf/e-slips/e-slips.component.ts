import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { throwError } from 'rxjs';
import { saveAs } from 'file-saver';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
event instanceof HttpResponse;

@Component({
  selector: 'app-e-slips',
  templateUrl: './e-slips.component.html',
  styleUrls: ['./e-slips.component.css']
})
export class ESlipsComponent implements OnInit {
  value = 'KPLC201900008914';

  pdfSrc;
  eslip_date;
  billerPrefix;
  client_name;
  expiry_date;
  eslip_amount;
  account_number;
  eslip_no;
  biller_logo;
  website;
  phonenumber;
  createdBy;
  customerCare;
  status ;
  biller_phone;
  alias: any;
  paybill: any;
  email;
  mpesaDisplay = false;

  accn_number;
  accn_amount;
  accountDetails = [];
  loading: boolean;
  clientName: any;
  company_name;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private eslipService: EslipsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getEslipInfo();
    this.loading = true;
  }

  /**
   * @description::  close the view get the user back
   */
  closeView(): void {
    this.location.back();
  }

  getEslipInfo() {
    const truncatedArr = [];
    const payload = {
      eslip_no: this.eslipService.eslip_no
    };
    this.eslipService.getEslipInfo(payload).subscribe((response: any) => {

      this.pdfSrc = response.path;
      this.loading = false;

      this.phonenumber = response.biller_phone;
      this.clientName = response.client_name;
      this.alias = response.alias;
      this.pdfSrc = response.path;
      this.account_number = response.account_no;
      this.biller_logo = response.billerlogo;
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
      this.customerCare = response.company_customer_care;
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
        this.toastr.error('There is no server connection!');
      };
  }

  downloadEslip() {
    this.loading = true;
    const mediaType = 'application/pdf';
    const payload = {
      eslip_no: this.eslipService.eslip_no
    };

    this.eslipService.downloadEslip(payload).subscribe(
      (response: any) => {
        this.loading = false;
        const blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'Eslip.pdf');
      },


      e => {
        this.toastr.error('There is no server connection!');
      }
    );
  }
}
