import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../../service/biller-service/biller.service';

@Component({
  selector: 'app-invoice-accounts',
  templateUrl: './invoice-accounts.component.html',
  styleUrls: ['./invoice-accounts.component.css']
})
export class InvoiceAccountsComponent implements OnInit {

  loading: boolean;
  searchValue = '';
  aa = false;
  rows = [];
  constructor(
    private billerService: BillerService
  ) { }

  ngOnInit() {
    this.InvoiceEslipAccounts();
  }

  InvoiceEslipAccounts() {

    this.loading = true;
    const payload = {
      eslip_no:  sessionStorage.getItem('eslip')
    };

    this.billerService.InvoiceEslipAccounts(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = response;
      }
    );
  }

  setIndex(ii) {
    this.aa = ii;
  }



}
