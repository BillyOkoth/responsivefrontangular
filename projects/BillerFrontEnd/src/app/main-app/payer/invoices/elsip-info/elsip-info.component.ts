import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../../service/biller-service/biller.service';

@Component({
  selector: 'app-elsip-info',
  templateUrl: './elsip-info.component.html',
  styleUrls: ['./elsip-info.component.css']
})
export class ElsipInfoComponent implements OnInit {
  loading: boolean;
  rows = [];
  eslip_date;
  expiry_date;
  eslip_amount;
  account_number;
  eslip_no;
  createdBy;
  biller_logo;
  mpesaDisplay = false;
  value;

  accn_number;
  accn_amount;
  accountDetails = [];
  email: any;
  website: any;
  biller_phone: any;
  status: any;
  constructor(
    private billerService: BillerService
  ) { }

  ngOnInit() {
    this.getInvoiceEslipInfo();
  }

  getInvoiceEslipInfo() {

    this.loading = true;
    const payload = {
      eslip_no:  sessionStorage.getItem('eslip')
    };

    this.billerService.getInvoiceEslipInfo(payload).subscribe(
      (response: any) => {
        this.loading = false;
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
      }
    );
  }

  downloadEslip() {
    this.loading = true;
    const mediaType = 'application/pdf';
    const payload = {
      eslip_no: sessionStorage.getItem('eslip')
    };

    this.billerService.InvoiceEslipPdfReport(payload).subscribe(
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
