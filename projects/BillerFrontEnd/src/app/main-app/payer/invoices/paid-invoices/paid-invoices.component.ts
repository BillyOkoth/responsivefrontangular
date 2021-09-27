import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../../service/biller-service/biller.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';

@Component({
  selector: 'app-paid-invoices',
  templateUrl: './paid-invoices.component.html',
  styleUrls: ['./paid-invoices.component.css']
})
export class PaidInvoicesComponent implements OnInit {
  rows = [];
  loading = false;
  paidInvoice = [];
  searchValue = '';
  aa = false;
  constructor(
    private billerService: BillerService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
    this.getInvoicesPayer();
  }

  setIndex(ii) {
    this.aa = ii;
  }

  getInvoicesPayer() {
    this.loading = false;

    const payload = {
      biller_code: sessionStorage.getItem('biller_code')

    };
    this.paidInvoice = [];
    this.rows = [];
    this.billerService.getInvoicesPayer(payload).subscribe(
      (response: any) => {
        this.loading = false;

        response.forEach(
          (value: any) => {
            if (value.status === 'Paid') {
              this.paidInvoice.push(value);
            }
        });

        this.rows = this.paidInvoice;
      }
    );


  }

  downloadExcel() {
    this.loading =  true;
    const rows = [...this.rows];

    this.excelDownload.paidInvoice('Paid Invoice', rows);
    this.loading =  false;
  }

}
