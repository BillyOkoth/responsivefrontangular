import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { BillerService } from '../../services/biller-service/biller.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  eslip_date;
  expiry_date;
  eslip_amount;
  account_number;
  eslip_no;
  biller_logo;
  website;
  phonenumber;
  createdBy;
  customerCare;
  bank_ref;
  closed_biller_type: string;


  accn_number;
  accn_amount;
  accountDetails = [];
  loading: boolean;
  clientName: any;
  value: string;
  constructor(

    private location: Location,
    private eslipService: BillerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getEslipInfo();

    this.closed_biller_type = sessionStorage.getItem("closed_biller_type")
  }

  getEslipInfo() {
    const truncatedArr = [];
    const payload = {
      eslip_no:  sessionStorage.getItem('slip_no')
    };
    this.eslipService.getEslipInfo(payload).subscribe((response: any) => {
      this.account_number = response.account_no;
      this.eslip_no = response.eslip_no;
      this.expiry_date = response.expiry_date;
      this.eslip_amount = response.amount_to_pay;
      this.eslip_date = response.eslip_date;
      this.value = sessionStorage.getItem('slip_no');
      this.biller_logo = response.billerlogo;
      this.accountDetails = response.accountDetails.slice(0, 10);
      this.bank_ref = response.ft_no;
      this.accn_amount = response.accountDetails[0].accountAmount;
      this.accn_number = response.accountDetails[0].accountNo;

      this.createdBy = response.created_by;
      this.website = response.company_website;
      this.customerCare = response.company_customer_care;
      this.phonenumber = response.biller_phone;
      this.clientName = response.client_name;
    }),
    (err: any) => {
      this.loading = false;

    };
  }

  closeView(): void {
    // this.router.navigate(['/admin/pay-on-behalf']);
    this.location.back();
  }


  receiptPdf() {
    this.loading = true;
    const mediaType = 'application/pdf';
    const payload = {
      eslip_no: sessionStorage.getItem('slip_no')
    };

    this.eslipService.receiptPdf(payload).subscribe(
      (response: any) => {
        this.loading = false;


        const blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'Receipt.pdf');
      },
      e => {
        this.loading = false;

      }
    );
  }
}
