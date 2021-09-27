import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
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
  company_email;

  accn_number;
  accn_amount;
  accountDetails = [];
  loading: boolean;
  clientName: any;
  value: string;


  constructor(
    private location: Location,
    private eslipService: EslipsService,
    private toastr: ToastrService,
    public role: RolesService
  ) { }

  ngOnInit() {
    this.getEslipInfo();
  }

  closeView(): void {
    // this.router.navigate(['/admin/pay-on-behalf']);
    this.location.back();
  }

  getEslipInfo() {
    const truncatedArr = [];
    const payload = {
      eslip_no: this.eslipService.eslip_no
    };
    this.eslipService.getEslipInfo(payload).subscribe((response: any) => {
      this.account_number = response.account_no;
      this.eslip_no = response.eslip_no;
      this.bank_ref = response.ft_no;
      this.expiry_date = response.expiry_date;
      this.eslip_amount = response.amount_to_pay;
      this.eslip_date = response.eslip_date;
      this.value = sessionStorage.getItem('slip_no');
      this.biller_logo = response.billerlogo;
      this.accountDetails = response.accountDetails.slice(0, 10);
      this.company_email = response.email;
      this.accn_amount = response.accountDetails[0].accountAmount;
      this.accn_number = response.accountDetails[0].accountNo;

      this.createdBy = response.created_by;
      this.website = response.company_website;
      this.customerCare = response.company_customer_care;
      this.phonenumber = response.biller_phone;
      this.clientName = response.client_name;
    }),
    (err: any) => {
      this.toastr.error('There is no server connection!');
    };
  }
  // downloadEslip(value) {
  //   this.loading = true;
  //   var mediaType = 'application/pdf';
  //   const payload = {
  //     eslip_no: value
  //   };

  //   this.eslipService.downloadEslip(payload).subscribe(
  //     (response: any) => {
  //       this.loading = false;

  //       var blob = new Blob([response], { type: mediaType });
  //       saveAs(blob, 'Eslip.pdf');
  //     },
  //     e => {
  //       this.toastr.error('There is no server connection!');
  //     }
  //   );
  // }
  // receiptPdf(){
  //   this.loading = true;

  //   var mediaType = 'application/pdf';

  //   const payload = {
  //     eslip_no: this.eslipService.eslip_no
  //   }
  //   // this.eslipService.receiptPdf(payload).subscribe(
  //   //   (response:any)=>{

  //   //       this.loading = false;
  //   //       var blob = new Blob([response], { type: mediaType });
  //   //       saveAs(blob, '.pdf');
  //   //     },

  //   //   e =>{
  //   //     this.toastr.error('There is no Server Connection!');
  //   //   }
  //   // )
  //   this.eslipService.receiptPdf(payload).subscribe((response: any) => {

  //   })
  // }
  receiptPdf() {
    this.loading = true;
    const mediaType = 'application/pdf';
    const payload = {
      eslip_no: this.eslipService.eslip_no
    };

    this.eslipService.receiptPdf(payload).subscribe(
      (response: any) => {
        this.loading = false;


        const blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'Receipt.pdf');
      },
      e => {

        this.toastr.error('There is no server connection!');
      }
    );
  }

}
