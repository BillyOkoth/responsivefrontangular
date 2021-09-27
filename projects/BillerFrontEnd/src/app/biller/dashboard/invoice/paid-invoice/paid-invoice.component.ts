import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../services/biller-service/biller.service';
import { ExcelDataService } from '../../../services/excel-data.service';

@Component({
  selector: 'app-paid-invoice',
  templateUrl: './paid-invoice.component.html',
  styleUrls: ['./paid-invoice.component.css']
})
export class PaidInvoiceComponent implements OnInit {
 loading = false;
 rows = [];
  searchValue = '';
  paidInvoices = [];
  aa = false;
  constructor(
    private billerService: BillerService,
    private excelDownload: ExcelDataService
  ) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.loading = true;
    const payload = {};

    this.rows = [];
    this.paidInvoices = [];

    this.billerService.getInvoices(payload).subscribe(
      (response: any) => {
        this.loading = false;
        response.forEach((value: any) => {
          if (value.status === 'Paid') {
            this.paidInvoices.push(value);
          }
        });
       this.rows = this.paidInvoices;
      }
    );
  }

  setIndex(ii) {
    this.aa = ii;
  }
  downloadExcel() {
    this.loading =  true;
    const rows = [...this.rows];

    this.excelDownload.paidInvoice('Paid Invoice', rows);
    this.loading =  false;
  }

}
