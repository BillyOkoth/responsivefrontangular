import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../../service/biller-service/biller.service';

@Component({
  selector: 'app-eslip-bills',
  templateUrl: './eslip-bills.component.html',
  styleUrls: ['./eslip-bills.component.css']
})
export class EslipBillsComponent implements OnInit {

  loading: boolean;
  rows = [];
  aa = false;
  searchValue = '';
  constructor(
    private billerService: BillerService
  ) { }

  ngOnInit() {
    this.getInvoiceEslipBills();
  }

  getInvoiceEslipBills() {

    this.loading = true;
    const payload = {
      eslip_no:  sessionStorage.getItem('eslip')
    };

    this.billerService.getInvoiceEslipBills(payload).subscribe(
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
