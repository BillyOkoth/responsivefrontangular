import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../../service/biller-service/biller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-eslips',
  templateUrl: './invoice-eslips.component.html',
  styleUrls: ['./invoice-eslips.component.css']
})
export class InvoiceEslipsComponent implements OnInit {

  rows = [];
  loading = false;
  disputedInvoices = [];
  searchValue = '';
  aa = false;
  constructor(
    private billerService: BillerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMyInvoiceEslips();
  }


  getMyInvoiceEslips() {
    this.loading = false;

    const payload = {

      biller_code: sessionStorage.getItem('biller_code')
    };

    this.billerService.getMyInvoiceEslips(payload).subscribe(
      (response: any) => {
        this.loading = false;

        this.rows = response;
      }
    );


  }


  viewEslipInfo(eslip: string) {

    sessionStorage.setItem('eslip', eslip);
    this.router.navigate(['app/dashboard/eslip-info']);

  }

  viewEslipBills(eslip: string) {

    sessionStorage.setItem('eslip', eslip);
    this.router.navigate(['app/dashboard/eslip-bills']);

  }

  viewEslipAc(eslip: string) {

    sessionStorage.setItem('eslip', eslip);
    this.router.navigate(['app/dashboard/eslip-accounts']);

  }


  setIndex(ii) {
    this.aa = ii;
  }
}
