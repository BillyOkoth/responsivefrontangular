import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Location} from  '@angular/common';
import { BillerService } from '../../../services/biller-service/biller.service';

@Component({
  selector: 'app-payer-profile',
  templateUrl: './payer-profile.component.html',
  styleUrls: ['./payer-profile.component.css']
})
export class PayerProfileComponent implements OnInit {

  account_name;
  account_no;
  personnel_name;
  phone_number;
  branch;
  country;
  email;
  location;
  sector;
  status;
  compCode;
  compName;
  total_amount_transacted;
  loading = true;
  constructor(
    private router: Router,
    private local: Location,
    private toastr: ToastrService,
    private billerService: BillerService

  ) { }

  ngOnInit() {
    const payerNo = sessionStorage.getItem('payerCode');

    const payload = {
      payerNo: payerNo
    };
    this.loading = true;
    this.billerService.viewAPayer(payload).subscribe((response: any) => {
      this.loading = false;

      this.account_name = response.accountName;
      this.account_no = response.accountNo;
      this.personnel_name = response.personelName;
      this.branch = response.branch;
      this.country = response.country;
      this.email = response.email;
      this.phone_number = response.phoneNo;
      this.location = response.location;
      this.sector = response.sector;
      this.status = response.status;
      this.compCode = response.companyCode;
      this.compName = response.companyName;
      this.total_amount_transacted = response.total_amount_transacted;
    }),
    (err: any) => {
      this.toastr.error('There is no server connection!');
    };
  }

  closeButton() {
    this.local.back();
  }

}
