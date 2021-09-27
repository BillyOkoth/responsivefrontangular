import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillersService } from 'src/app/core/services/billers/billers.service';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-biller-profile',
  templateUrl: './biller-profile.component.html',
  styleUrls: ['./biller-profile.component.scss'],
})
export class BillerProfileComponent implements OnInit {
  biller_code;
  biller_month;
  biller_type;
  branch;
  country;
  account_name;
  account_no;
  fname;
  lname;
  emp_no;
  phone_no;
  sector;
  status;
  company;
  no_of_payers;
  invoiceRaised;
  cashMoved;
  billsPaid;
  billerLogo = '';
  showDefaultLogo = true;
  loading: boolean;

  constructor(private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private billerService: BillersService) {}

  ngOnInit() {
    this.loading = true;
    const biller_code = sessionStorage.getItem('biller_code');
    this.billerService.viewABiller(biller_code).subscribe(response => {
      this.loading = false;
      this.company = response[0].company_name || ' .';
      this.biller_code = response[0].biller_code || ' .';
      this.biller_month = response[0].biller_month || ' .';
      this.biller_type = response[0].biller_type || ' .';
      this.branch = response[0].branch || ' .';
      this.country = response[0].country || ' .';
      this.account_name = response[0].stb_acc_name || ' .';
      this.account_no = response[0].stb_acc_no || ' .';
      this.fname = response[0].fname || ' .';
      this.lname = response[0].lname || ' .';
      this.emp_no = response[0].employee_no || ' .';
      this.phone_no = response[0].biller_phone || ' .';
      this.sector = response[0].sector || ' .';
      this.status = response[0].status || '. ';
      this.no_of_payers = response[0].payers || '. ';
      this.invoiceRaised = response[0].invoiceRaised || '. ';
      this.cashMoved = response[0].cashMoved || '. ';
      this.billsPaid = response[0].billsPaid || '. ';
      if (this.billerLogo = response[0].base64Logo || '. ') {
        this.billerLogo = response[0].base64Logo || '. ';
        this.showDefaultLogo = false;
      } else {
        this.showDefaultLogo =  true ;
      }
    }),
    (err: any) => {
      this.toastr.error('There is no server connection!');
    };
  }

  closeButton() {
    this.location.back();
  }
}
